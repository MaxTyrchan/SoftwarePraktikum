import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import API from "../api/API";
import { dateToJSONFormat, addLeadingZeroes } from "./helpers/HelperFunctions";
import TaskTimeBO from '../api/TaskTimeBO';
import IntervalTransactionBO from '../api/IntervalTransactionBO';

/**
 * This is the task tracker component which is displayed on the dashboard page.
 */

class TaskTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalTransactions: [],
      newTransactionValues: {
        projectId: "",
        projectValidity: false,
        taskId: "",
        taskValidity: false,
        fromTime: "",
        fromTimeValidity: false,
        toTime: "",
        toTimeValidity: false,
      },
      showNewTransactionField: false,
      availableProjects: [],
      filteredProjectTasks: [],
    };
  }

  fetchIntervalTransactionsFromDb(account_id, fromTime, toTime) {
    return API.getAPI().getIntervalTransactionsTaskTimesByAccountFromTo(account_id, dateToJSONFormat(fromTime), dateToJSONFormat(toTime))
      .then((intervalTransactionBOs) => {
        var promises = [];
        intervalTransactionBOs.forEach((transaction) => {
          promises.push(
            new Promise((resolve) => {
              this.fetchTaskFromDb(transaction.getTaskId())
                .then((task) => {
                  this.fetchProjectFromDb(task.getProjectId())
                    .then((project) => {
                      task.setProject(project);
                      transaction.setTask(task);
                      resolve();
                    })
                })
            }))
          promises.push(
            new Promise((resolve) => {
              this.fetchTaskTimeFromDb(transaction.getIntervalId())
                .then((taskTime) => {
                  transaction.setInterval(taskTime);
                  resolve();
                })
            }))
        });

        Promise.all(promises)
          .then(() => {
            // Sort result array in a suitable way
            // Sort by project
            intervalTransactionBOs.sort((a, b) => {
              return a.getTask().getProject().getProjectName().toUpperCase().localeCompare(b.getTask().getProject().getProjectName().toUpperCase());
            })
            // Sort by task
            intervalTransactionBOs.sort((a, b) => {
              return a.getTask().getTaskName().toUpperCase().localeCompare(b.getTask().getTaskName().toUpperCase());
            })
            // Sort by start time
            intervalTransactionBOs.sort((a, b) => {
              return a.getInterval().getStartTime().getHours() * 60 + a.getInterval().getStartTime().getMinutes() -
                b.getInterval().getStartTime().getHours() * 60 + b.getInterval().getStartTime().getMinutes();
            })
            this.setState({
              intervalTransactions: intervalTransactionBOs
            });
          })
      })
  }

  writeIntervalTransactionToDb(transaction) {

  }

  deleteIntervalTransactionFromDb(transaction) {
    return API.getAPI().deleteTaskTime(transaction.getIntervalId())
      .then((project) => {
        API.getAPI().deleteIntervalTransaction(transaction.getId())
          .then(() => {
            return new Promise(function (resolve) {
              resolve(project);
            });
          })
      })
  }

  fetchProjectFromDb(project_id) {
    return API.getAPI().getProject(project_id)
      .then((project) => {
        return new Promise(function (resolve) {
          resolve(project);
        });
      })
  }

  fetchTaskFromDb(task_id) {
    return API.getAPI().getTask(task_id)
      .then((task) => {
        return new Promise(function (resolve) {
          resolve(task);
        });
      })
  }

  fetchTaskTimeFromDb(taskTimeId) {
    return API.getAPI().getTaskTime(taskTimeId)
      .then((taskTime) => {
        return new Promise(function (resolve) {
          resolve(taskTime);
        });
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

  onAccountChanged(account) {
    this.fetchIntervalTransactionsFromDb(account.getId(), this.getDayStart(this.props.currentDate), this.getDayEnd(this.props.currentDate));
  }

  onDateChanged(date) {
    this.fetchIntervalTransactionsFromDb(this.props.currentAccount.getId(), this.getDayStart(date), this.getDayEnd(date));
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

  dateDifferenceToHHMM(dateDifference) {
    return addLeadingZeroes(Math.floor(dateDifference / (60 * 60 * 1000)).toString(), 2) + ":" + addLeadingZeroes(((dateDifference / (60 * 1000)) % 60).toString(), 2);
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

  calculateTimeDifference = (fromString, toString) => {
    let diffString = "00:00";
    if ((fromString !== "") && (toString !== "")) {
      let toDate = this.hhmmToDate(toString, this.props.currentDate);
      let fromDate = this.hhmmToDate(fromString, this.props.currentDate);
      diffString = this.dateDifferenceToHHMM(toDate - fromDate);
    }
    return diffString;
  }

  handleTransactionDeleteClick(transaction) {
    this.deleteIntervalTransactionFromDb(transaction)
      .then(() => {
        this.fetchIntervalTransactionsFromDb(this.props.currentAccount.getId(), this.getDayStart(this.props.currentDate), this.getDayEnd(this.props.currentDate));
      })
  }

  handleTransactionAddClick() {
    this.setState({
      showNewTransactionField: true,
      newTransactionValues: {
        projectId: "",
        projectValidity: false,
        taskId: "",
        taskValidity: false,
        fromTime: "",
        fromTimeValidity: false,
        toTime: "",
        toTimeValidity: false,
      },
    })
  }

  onProjectNameChange(transaction, newValue) {
    // For now Project cannot be edited, only new entry can be created
  }

  onTaskChange(transaction, newValue) {
    // For now Task cannot be edited, only new entry can be created
  }

  onStartTimeChange(transaction, newValue) {
    let intervalTransactions = this.state.intervalTransactions.slice();
    let updatedTaskTime = new TaskTimeBO(transaction.getInterval().getStartTime(), transaction.getInterval().getEndTime());
    updatedTaskTime.setId(transaction.getInterval().getId());
    updatedTaskTime.setStartTime(this.hhmmToDate(newValue, this.props.currentDate));
    API.getAPI().updateTaskTime(updatedTaskTime)
      .then(() => {
        // Search affected interval transaction
        let index = intervalTransactions.findIndex((element) => { return (element.getId() === transaction.getId()) });
        intervalTransactions[index].setInterval(updatedTaskTime);
        this.setState({
          intervalTransactions: intervalTransactions,
        })
      })
  }

  onEndTimeChange(transaction, newValue) {
    let intervalTransactions = this.state.intervalTransactions.slice();
    let updatedTaskTime = new TaskTimeBO(transaction.getInterval().getStartTime(), transaction.getInterval().getEndTime());
    updatedTaskTime.setId(transaction.getInterval().getId());
    updatedTaskTime.setEndTime(this.hhmmToDate(newValue, this.props.currentDate));
    API.getAPI().updateTaskTime(updatedTaskTime)
      .then(() => {
        let index = intervalTransactions.findIndex((element) => { return (element.getId() === transaction.getId()) });
        intervalTransactions[index].setInterval(updatedTaskTime);
        this.setState({
          intervalTransactions: intervalTransactions,
        })
      })
  }

  copyNewTransactionValuesFromState() {
    let newTransactionValues = {
      projectValidity: this.state.newTransactionValues.projectValidity,
      projectId: this.state.newTransactionValues.projectId,
      taskId: this.state.newTransactionValues.taskId,
      taskValidity: this.state.newTransactionValues.taskValidity,
      fromTime: this.state.newTransactionValues.fromTime,
      fromTimeValidity: this.state.newTransactionValues.fromTimeValidity,
      toTime: this.state.newTransactionValues.toTime,
      toTimeValidity: this.state.newTransactionValues.toTimeValidity,
    };
    return newTransactionValues;
  }

  onNewTransactionProjectNameChange(newValue) {
    if (newValue !== "") {
      let newTransactionValues = this.copyNewTransactionValuesFromState();
      newTransactionValues.projectId = newValue;
      newTransactionValues.projectValidity = true;
      newTransactionValues.taskId = "";
      newTransactionValues.taskValidity = false;
      this.fetchProjectTasksFromDb(newValue);
      this.setState({
        newTransactionValues: newTransactionValues
      });
    }
  }

  onNewTransactionTaskChange(newValue) {
    if (newValue !== "") {
      let newTransactionValues = this.copyNewTransactionValuesFromState();
      newTransactionValues.taskId = newValue;
      newTransactionValues.taskValidity = true;
      this.setState({
        newTransactionValues: newTransactionValues
      });
    }
  }

  onNewTransactionStartTimeChange(newValue) {
    let newTransactionValues = this.copyNewTransactionValuesFromState();
    newTransactionValues.fromTime = newValue;
    newTransactionValues.fromTimeValidity = true;
    this.setState({
      newTransactionValues: newTransactionValues
    });
  }

  onNewTransactionEndTimeChange(newValue) {
    let newTransactionValues = this.copyNewTransactionValuesFromState();
    newTransactionValues.toTime = newValue;
    newTransactionValues.toTimeValidity = true;
    this.setState({
      newTransactionValues: newTransactionValues
    });
  }

  isNewTransactionValid() {
    let overallValidity = false;
    if ((this.state.newTransactionValues.projectValidity === true) &&
      (this.state.newTransactionValues.taskValidity === true) &&
      (this.state.newTransactionValues.fromTimeValidity === true) &&
      (this.state.newTransactionValues.toTimeValidity === true)) {
      overallValidity = true;
    }
    return overallValidity;
  }

  fetchCurrentUserProjectsFromDb = () => {
    API.getAPI().getProjectsByCurrentUser()
      .then((projectBOs) => {
        // This gets called when the backend responds to the project query
        this.setState({
          availableProjects: projectBOs
        });
      })
      // 'Resets' projects state to an empty associative array
      .catch(e =>
        this.setState({
          availableProjects: []
        })
      );
  }

  fetchProjectTasksFromDb = (project_id) => {
    API.getAPI().getTasksByProject(project_id)
      .then((taskBOs) => {
        // This gets called when the backend responds to the project query
        this.setState({
          filteredProjectTasks: taskBOs
        });
      })
      // 'Resets' projects state to an empty associative array
      .catch(e =>
        this.setState({
          filteredProjectTasks: []
        })
      );
  }

  showNewTransactionField() {
    if (this.state.showNewTransactionField === true) {
      return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell>
            <TextField size="small" value={this.state.newTransactionValues.projectId} onChange={(event) => { this.onNewTransactionProjectNameChange(event.target.value) }}
              select SelectProps={{ onOpen: () => this.fetchCurrentUserProjectsFromDb() }} error={!this.state.newTransactionValues.projectValidity}>
              {this.state.availableProjects.map((project) => (
                <MenuItem key={project.getId()} value={project.getId()}>
                  {project.getProjectName()}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
          <TableCell>
            <TextField size="small" value={this.state.newTransactionValues.taskId} onChange={(event) => { this.onNewTransactionTaskChange(event.target.value) }}
              select error={!this.state.newTransactionValues.taskValidity}>
              {this.state.filteredProjectTasks.map((tasks) => (
                <MenuItem key={tasks.getId()} value={tasks.getId()}>
                  {tasks.getTaskName()}
                </MenuItem>
              ))}
            </TextField>
          </TableCell>
          <TableCell>
            <TextField size="small" value={this.state.newTransactionValues.fromTime} onChange={(event) => { this.onNewTransactionStartTimeChange(event.target.value) }}
              type="time" error={!this.state.newTransactionValues.fromTimeValidity}>
            </TextField>
          </TableCell>
          <TableCell>
            <TextField size="small" value={this.state.newTransactionValues.toTime} onChange={(event) => { this.onNewTransactionEndTimeChange(event.target.value) }}
              type="time" error={!this.state.newTransactionValues.toTimeValidity}>
            </TextField>
          </TableCell>
          <TableCell>
            {this.calculateTimeDifference(this.state.newTransactionValues.fromTime, this.state.newTransactionValues.toTime)}
          </TableCell>
          <TableCell>
            <Button onClick={() => this.handleAbortNewTransactionClick()} color="error">
              Abort
            </Button>
          </TableCell>
          <TableCell>
            <Button disabled={!this.isNewTransactionValid()} onClick={() => { this.handleSendNewTransactionClick() }}>
              Save
            </Button>
          </TableCell>
        </TableRow>
      );
    } else {
      return;
    }
  }

  handleAbortNewTransactionClick() {
    this.setState({
      showNewTransactionField: false,
    })
  }

  handleSendNewTransactionClick() {
    if (this.isNewTransactionValid() === true) {
      let newTaskTimeBO = new TaskTimeBO(this.hhmmToDate(this.state.newTransactionValues.fromTime, this.props.currentDate), this.hhmmToDate(this.state.newTransactionValues.toTime, this.props.currentDate))
      API.getAPI().addTaskTime(newTaskTimeBO)
        .then((taskTimeBO) => {
          let newIntervalTransactionBO = new IntervalTransactionBO("", this.state.newTransactionValues.taskId, taskTimeBO.getId());
          API.getAPI().addIntervalTransactionForCurrentUser(newIntervalTransactionBO)
            .then((intervalTransactionBO) => {
              this.fetchIntervalTransactionsFromDb(this.props.currentAccount.getId(), this.getDayStart(this.props.currentDate), this.getDayEnd(this.props.currentDate))
                .then(() => {
                  this.setState({
                    showNewTransactionField: false,
                  })
                })
            })
        })
    }
  }

  calculateSumOfDurations() {
    let sumString = "";
    if (this.state.intervalTransactions.length !== 0) {
      let duration = 0;
      let intervalTransactions = this.state.intervalTransactions.slice();
      intervalTransactions.forEach((intervalTransaction) => {
        duration += intervalTransaction.getInterval().getEndTime() - intervalTransaction.getInterval().getStartTime();
      })
      sumString = "Σ " + this.dateDifferenceToHHMM(duration);
    }
    return sumString;
  }

  render() {
    return (
      <Card sx={{ marginBottom: 1, marginTop: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography variant="h4" gutterBottom>
            Task Tracking
          </Typography>
        </CardContent>
        <CardContent>
          <TableContainer>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
              <TableHead >
                <TableRow>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Project</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Task</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>From</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Until</TableCell>
                  <TableCell align="left" sx={{ fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.intervalTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.getId()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <TextField size="small" value={transaction.getTask().getProject().getProjectName()}
                        onChange={(event) => this.onProjectNameChange(transaction, event.target.value)}
                        disabled />
                    </TableCell>
                    <TableCell align="right">
                      <TextField size="small" value={transaction.getTask().getTaskName()}
                        onChange={(event) => this.onTaskChange(transaction, event.target.value)}
                        disabled />
                    </TableCell>
                    <TableCell align="right">
                      <TextField size="small" value={this.dateToHHMM(transaction.getInterval().getStartTime())}
                        onChange={(event) => this.onStartTimeChange(transaction, event.target.value)}
                        type="time" />
                    </TableCell>
                    <TableCell align="right">
                      <TextField size="small" value={this.dateToHHMM(transaction.getInterval().getEndTime())}
                        onChange={(event) => this.onEndTimeChange(transaction, event.target.value)}
                        type="time" />
                    </TableCell>
                    <TableCell align="center">
                      {this.dateDifferenceToHHMM((transaction.getInterval().getEndTime() - transaction.getInterval().getStartTime()))}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => this.handleTransactionDeleteClick(transaction)} startIcon={<DeleteIcon />} color="error">
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
                  <TableCell/>
                  <TableCell>
                    {this.calculateSumOfDurations()}
                  </TableCell>
                  <TableCell/>
                </TableRow>
                {this.showNewTransactionField()}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" fullWidth onClick={() => this.handleTransactionAddClick()} startIcon={<AddCircleIcon />}>
            Add Entry
          </Button>
        </CardContent>
      </Card>
    )
  }
}

export default TaskTracker;
