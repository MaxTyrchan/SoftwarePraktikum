import React from "react";
import Timebox from "../components/Timebox";
import TimeTracker from "../components/TimeTracker";
import TaskTracker from "../components/TaskTracker";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import Container from "@mui/material/Container";
import { Box } from "@mui/system";

import API from "../api/API";
import AccountBO from "../api/AccountBO";

/**
 * This is the users personal dashboard page where transactions on tasks can be made.
 * They also can keep track of their working hours so they know how much time they can use for task transactions.
 */

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateToDisplay: new Date(),
      currentAccount: new AccountBO(""),
    };
  }

  decrementDate() {
    let currentDate = new Date(this.state.dateToDisplay.getTime());
    currentDate.setDate(currentDate.getDate() - 1);
    this.setState({ dateToDisplay: currentDate });
  }

  incrementDate() {
    let currentDate = new Date(this.state.dateToDisplay.getTime());
    currentDate.setDate(currentDate.getDate() + 1);
    this.setState({ dateToDisplay: currentDate });
  }

  fetchCurrentAccountIdFromDb(personId) {
    return API.getAPI().getAccountByPersonId(personId)
      .then((accountBO) => {
        this.setState({
          currentAccount: accountBO
        });
      })
  }

  componentDidMount() {
    this.fetchCurrentAccountIdFromDb(this.props.currentPerson.getId());
  }

  render() {
    return (
      <Container style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} maxWidth={false}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 1, flexWrap: 'wrap' }}>
          <IconButton onClick={() => this.decrementDate()}>
            <ChevronLeftIcon />
          </IconButton>
          <Timebox date={this.state.dateToDisplay} />
          <IconButton onClick={() => this.incrementDate()}>
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: 1, flexWrap: 'wrap' }} >
          <TimeTracker currentAccount={this.state.currentAccount} currentDate={this.state.dateToDisplay} />
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 2 }}>
            <TaskTracker currentAccount={this.state.currentAccount} currentDate={this.state.dateToDisplay} />
          </Box>
        </Box>
      </Container>
    );
  }
}

export default Dashboard;