import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import PauseBO from '../api/PauseBO';
import API from '../api/API';
import { dateToJSONFormat, addLeadingZeroes } from "./helpers/HelperFunctions";
import EventTransactionBO from '../api/EventTransactionBO';
import ArrivalBO from '../api/ArrivalBO';
import LeaveBO from '../api/LeaveBO';
import IntervalTransactionBO from '../api/IntervalTransactionBO';

// The following three lines are copied from https://mui.com/material-ui/react-snackbar/
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class TimeTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrivalEventTransaction: null,
      leaveEventTransaction: null,
      pauseTimeTransaction: null,
      openSnackbarFirstInput: false,
      openSnackbarUpdateInput: false,
      openSnackbarForPause: false,
    };
  }

  setStartWorkTime = (timeString) => {
    if (this.state.arrivalEventTransaction === null) {
      // New Event Transaction has to be created
      let event = new ArrivalBO(this.hhmmToDate(timeString, this.props.currentDate));
      event.setId("00000000-0000-0000-0000-000000000000");
      API.getAPI().addArrival(event)
        .then((newEvent) => {
          let eventTransaction = new EventTransactionBO(this.props.currentAccount.getId(), newEvent.getId());
          eventTransaction.setId("00000000-0000-0000-0000-000000000000");
          API.getAPI().addEventTransaction(eventTransaction)
            .then((newEventTransaction) => {
              newEventTransaction.setEvent(newEvent);
              this.setState({
                arrivalEventTransaction: newEventTransaction,
              })
            })
        })
    } else {
      // Event Transaction has to be updated
      // As Event Transaction only includes the account and the reference to an event, only the event can be updated
      let arrival = new ArrivalBO(this.hhmmToDate(timeString, this.props.currentDate));
      arrival.setId(this.state.arrivalEventTransaction.getEvent().getId());
      API.getAPI().updateArrival(arrival)
        .then(() => {
          let arrivalEventTransaction = structuredClone(this.state.arrivalEventTransaction);
          Object.setPrototypeOf(arrivalEventTransaction, EventTransactionBO.prototype);
          arrivalEventTransaction.setEvent(arrival);
          this.setState({
            arrivalEventTransaction: arrivalEventTransaction,
            openSnackbarUpdateInput: true,
          })
        })
    }
  };

  setEndWorkTime = (timeString) => {
    if (this.state.leaveEventTransaction === null) {
      // New Event Transaction has to be created
      let event = new LeaveBO(this.hhmmToDate(timeString, this.props.currentDate));
      event.setId("00000000-0000-0000-0000-000000000000");
      API.getAPI().addLeave(event)
        .then((newEvent) => {
          let eventTransaction = new EventTransactionBO(this.props.currentAccount.getId(), newEvent.getId());
          eventTransaction.setId("00000000-0000-0000-0000-000000000000");
          API.getAPI().addEventTransaction(eventTransaction)
            .then((newEventTransaction) => {
              newEventTransaction.setEvent(newEvent);
              this.setState({
                leaveEventTransaction: newEventTransaction,
                openSnackbarFirstInput: true,
              })
            })
        })
    } else {
      // Event Transaction has to be updated
      // As Event Transaction only includes the account and the reference to an event, only the event can be updated
      let leave = new LeaveBO(this.hhmmToDate(timeString, this.props.currentDate));
      leave.setId(this.state.leaveEventTransaction.getEvent().getId());
      API.getAPI().updateLeave(leave)
        .then(() => {
          let leaveEventTransaction = structuredClone(this.state.leaveEventTransaction);
          Object.setPrototypeOf(leaveEventTransaction, EventTransactionBO.prototype);
          leaveEventTransaction.setEvent(leave);
          this.setState({
            leaveEventTransaction: leaveEventTransaction,
            openSnackbarUpdateInput: true,
          })
        })
    }
  }

  setStartBreakTime = (timeString) => {
    if (this.state.pauseTimeTransaction === null) {
      // New Interval Transaction has to be created
      let pause = new PauseBO(this.hhmmToDate(timeString, this.props.currentDate), this.hhmmToDate(timeString, this.props.currentDate));
      pause.setId("00000000-0000-0000-0000-000000000000");
      API.getAPI().addPause(pause)
        .then((newPause) => {
          let intervalTransaction = new IntervalTransactionBO(this.props.currentAccount.getId(), null, newPause.getId())
          intervalTransaction.setId("00000000-0000-0000-0000-000000000000");
          API.getAPI().addIntervalTransactionForCurrentUser(intervalTransaction)
            .then((newIntervalTransaction) => {
              newIntervalTransaction.setInterval(newPause);
              this.setState({
                pauseTimeTransaction: newIntervalTransaction,
              })
            })
        })
    } else {
      // Pause has to be updated
      let pause = new PauseBO(this.hhmmToDate(timeString, this.props.currentDate), this.state.pauseTimeTransaction.getInterval().getEndTime());
      pause.setId(this.state.pauseTimeTransaction.getInterval().getId());
      API.getAPI().updatePause(pause)
        .then(() => {
          let intervalTransaction = structuredClone(this.state.pauseTimeTransaction);
          Object.setPrototypeOf(intervalTransaction, IntervalTransactionBO.prototype);
          intervalTransaction.setInterval(pause);
          this.setState({
            pauseTimeTransaction: intervalTransaction,
          })
        })
    }
  }

  setEndBreakTime = (timeString) => {
    if (this.state.pauseTimeTransaction === null) {
      // New Interval Transaction has to be created
      let pause = new PauseBO(this.hhmmToDate(timeString, this.props.currentDate), this.hhmmToDate(timeString, this.props.currentDate));
      pause.setId("00000000-0000-0000-0000-000000000000");
      API.getAPI().addPause(pause)
        .then((newPause) => {
          let intervalTransaction = new IntervalTransactionBO(this.props.currentAccount.getId(), null, newPause.getId())
          intervalTransaction.setId("00000000-0000-0000-0000-000000000000");
          API.getAPI().addIntervalTransactionForCurrentUser(intervalTransaction)
            .then((newIntervalTransaction) => {
              newIntervalTransaction.setInterval(newPause);
              this.setState({
                pauseTimeTransaction: newIntervalTransaction,
              })
            })
        })
    } else {
      // Pause has to be updated
      let pause = new PauseBO(this.state.pauseTimeTransaction.getInterval().getStartTime(), this.hhmmToDate(timeString, this.props.currentDate));
      pause.setId(this.state.pauseTimeTransaction.getInterval().getId());
      API.getAPI().updatePause(pause)
        .then(() => {
          let intervalTransaction = structuredClone(this.state.pauseTimeTransaction);
          Object.setPrototypeOf(intervalTransaction, IntervalTransactionBO.prototype);
          intervalTransaction.setInterval(pause);
          this.setState({
            pauseTimeTransaction: intervalTransaction,
            openSnackbarForPause: true,
          })
        })
    }
  }

  displayWorkTime = () => {
    let timeAtWorkString = "00h 00m";
    if ((this.state.arrivalEventTransaction != null) && (this.state.leaveEventTransaction != null) && (this.state.pauseTimeTransaction != null)) {
      const diffWorkTime = this.state.leaveEventTransaction.getEvent().getOccurrence() - this.state.arrivalEventTransaction.getEvent().getOccurrence();
      const diffBreakTime = this.state.pauseTimeTransaction.getInterval().getEndTime() - this.state.pauseTimeTransaction.getInterval().getStartTime();
      const diffTotalTime = diffWorkTime - diffBreakTime;
      const hours = Math.floor(diffTotalTime / 3600000);
      const minutes = Math.floor((diffTotalTime % 3600000) / 60000);
      timeAtWorkString = addLeadingZeroes(hours.toString(), 2) + 'h ' + addLeadingZeroes(minutes.toString(), 2) + 'm';
    }
    return timeAtWorkString;
  }

  hhmmToDate = (hourMinutesString, dateToSet) => {
    let hours = parseInt(hourMinutesString.split(':')[0]);
    let minutes = parseInt(hourMinutesString.split(':')[1]);
    let newDate = new Date(dateToSet.getTime());
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0, 0);
    return newDate;
  }

  getDayStart(date) {
    let dateStart = new Date(date.getTime());
    dateStart.setUTCHours(0, 0, 0, 0);
    return dateStart;
  }

  getDayEnd(date) {
    let dateStart = new Date(date.getTime());
    dateStart.setUTCHours(23, 59, 59, 999);
    return dateStart;
  }

  // Formats date to date string YYYY-MM-DD
  dateToHHMM(date) {
    return addLeadingZeroes(date.getHours().toString(), 2) + ":" + addLeadingZeroes(date.getMinutes().toString(), 2);
  }

  fetchArrivalEventTransactionsFromDb(account_id, fromTime, toTime) {
    return API.getAPI().getArrivalEventTransactionsByAccountFromTo(account_id, dateToJSONFormat(fromTime), dateToJSONFormat(toTime))
      .then((eventTransactionBOs) => {
        if (eventTransactionBOs.length != 0) {
          // We only should get 1 object, so we are only interested in the first one
          let transaction = eventTransactionBOs[0];
          API.getAPI().getArrival(transaction.getEventId())
            .then((arrival) => {
              transaction.setEvent(arrival);
              this.setState({
                arrivalEventTransaction: transaction
              })
            })
        } else {
          this.setState({
            arrivalEventTransaction: null,
            leaveEventTransaction: null
          })
        }
      })
  }

  fetchLeaveEventTransactionsFromDb(account_id, fromTime, toTime) {
    return API.getAPI().getLeaveEventTransactionsByAccountFromTo(account_id, dateToJSONFormat(fromTime), dateToJSONFormat(toTime))
      .then((eventTransactionBOs) => {
        if (eventTransactionBOs.length != 0) {
          // We only should get 1 object, so we are only interested in the first one
          let transaction = eventTransactionBOs[0];
          API.getAPI().getLeave(transaction.getEventId())
            .then((leave) => {
              transaction.setEvent(leave);
              this.setState({
                leaveEventTransaction: transaction
              })
            })
        } else {
          this.setState({
            arrivalEventTransaction: null,
            leaveEventTransaction: null
          })
        }
      })
  }

  fetchPauseTimeIntervalTransactionsFromDb(account_id, fromTime, toTime) {
    return API.getAPI().getIntervalTransactionsPauseTimesByAccountFromTo(account_id, dateToJSONFormat(fromTime), dateToJSONFormat(toTime))
      .then((intervalTransactionBOs) => {
        if (intervalTransactionBOs.length != 0) {
          // We only should get 1 object, so we are only interested in the first one
          let transaction = intervalTransactionBOs[0];
          API.getAPI().getPause(transaction.getIntervalId())
            .then((taskTime) => {
              transaction.setInterval(taskTime);
              this.setState({
                pauseTimeTransaction: transaction
              })
            })
        } else {
          this.setState({
            pauseTimeTransaction: null
          })
        }
      })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentAccount !== this.props.currentAccount) {
      this.onAccountChanged(this.props.currentAccount);
    }

    if (prevProps.currentDate !== this.props.currentDate) {
      this.onDateChanged(this.props.currentDate);
    }
  }

  onAccountChanged(newAccount) {
    this.fetchArrivalEventTransactionsFromDb(newAccount.getId(), this.getDayStart(this.props.currentDate), this.getDayEnd(this.props.currentDate));
    this.fetchLeaveEventTransactionsFromDb(newAccount.getId(), this.getDayStart(this.props.currentDate), this.getDayEnd(this.props.currentDate));
    this.fetchPauseTimeIntervalTransactionsFromDb(newAccount.getId(), this.getDayStart(this.props.currentDate), this.getDayEnd(this.props.currentDate));
  }

  onDateChanged(newDate) {
    this.fetchArrivalEventTransactionsFromDb(this.props.currentAccount.getId(), this.getDayStart(newDate), this.getDayEnd(newDate));
    this.fetchLeaveEventTransactionsFromDb(this.props.currentAccount.getId(), this.getDayStart(newDate), this.getDayEnd(newDate));
    this.fetchPauseTimeIntervalTransactionsFromDb(this.props.currentAccount.getId(), this.getDayStart(newDate), this.getDayEnd(newDate));
  }

  getTimeString(type) {
    let timeString = "";
    if (type == "workstart") {
      if (this.state.arrivalEventTransaction === null) {
        timeString = "";
      } else {
        timeString = this.dateToHHMM(this.state.arrivalEventTransaction.getEvent().getOccurrence());
      }
    } else if (type == "workend") {
      if (this.state.leaveEventTransaction === null) {
        timeString = "";
      } else {
        timeString = this.dateToHHMM(this.state.leaveEventTransaction.getEvent().getOccurrence());
      }
    } else if (type == "pausestart") {
      if (this.state.pauseTimeTransaction === null) {
        timeString = "";
      } else {
        timeString = this.dateToHHMM(this.state.pauseTimeTransaction.getInterval().getStartTime());
      }
    } else if (type == "pauseend") {
      if (this.state.pauseTimeTransaction === null) {
        timeString = "";
      } else {
        timeString = this.dateToHHMM(this.state.pauseTimeTransaction.getInterval().getEndTime());
      }
    }
    return timeString
  }

  handleClose = () => {
    this.setState({
      openSnackbarFirstInput: false,
      openSnackbarUpdateInput: false,
      openSnackbarForPause: false,

    })
    return;
  }

  render() {
    //console.log(this.state.startWorkTime);

    return (
      <Card sx={{ maxHeight: 750, maxWidth: 400, marginBottom: 1, marginTop: 1 }}>
        <CardContent >
          <CardContent sx={{ paddingBottom: 0 }}>
            <Typography variant="h4" gutterBottom>
              Time Tracking
            </Typography>
          </CardContent>
          <CardContent sx={{ paddingBottom: 0, mt: 0, mb: 3 }}>
            <Typography variant="h6" component="div" >
              Time at Work
            </Typography>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 0 }}>
              <CardContent>
                <Typography>
                  From
                </Typography>
                <TextField size="small" type="time" onChange={(event) => this.setStartWorkTime(event.target.value)} value={this.getTimeString("workstart")} />
              </CardContent>
              <CardContent>
                <Typography>
                  Until
                </Typography>
                <TextField size="small" type="time" onChange={(event) => this.setEndWorkTime(event.target.value)} value={this.getTimeString("workend")} />
              </CardContent>
            </CardContent>
          </CardContent>
          <CardContent sx={{ paddingBottom: 0, paddingTop: 0, mt: 0, mb: 3 }}>
            <Typography variant="h6" component="div" sx={{ paddingBottom: 0, paddingTop: 0 }}>
              Time at Break
            </Typography>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography>
                  From
                </Typography>
                <TextField size="small" type="time" onChange={(event) => this.setStartBreakTime(event.target.value)} value={this.getTimeString("pausestart")} />
              </CardContent>
              <CardContent>
                <Typography>
                  Until
                </Typography>
                <TextField size="small" type="time" onChange={(event) => this.setEndBreakTime(event.target.value)} value={this.getTimeString("pauseend")} />
              </CardContent>
            </CardContent>
          </CardContent>
          <CardContent sx={{ paddingBottom: 0, paddingTop: 0 }}>
            <Typography sx={{ fontSize: 25, mt: 1, fontWeight: 'bold', display: 'flex', justifyContent: 'center' }} gutterBottom>
              Time at Work
            </Typography>
            <Typography sx={{ fontSize: 20, mt: 1, fontWeight: 'bold', display: 'flex', justifyContent: 'center' }} gutterBottom>
              {this.displayWorkTime()}
            </Typography>
          </CardContent>
          <Snackbar open={this.state.openSnackbarFirstInput} autoHideDuration={3500} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
              Work time successfully saved!
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.openSnackbarUpdateInput} autoHideDuration={3500} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
              Work time change successfully saved!
            </Alert>
          </Snackbar>
          <Snackbar open={this.state.openSnackbarForPause} autoHideDuration={3500} onClose={this.handleClose}>
            <Alert onClose={this.handleClose} severity="success" sx={{ width: '100%' }}>
              Break time successfully saved!
            </Alert>
          </Snackbar>
        </CardContent >
      </Card >
    );
  }
}

export default TimeTracker;