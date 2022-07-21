import React from "react";
import API from "../api/API";
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
import { MenuItem, Stack } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import { addLeadingZeroes } from "./helpers/HelperFunctions";

/**
 * This is the project related reporting card component which is displayed on the project related reporting page.
 * Every transaction made on a task which belongs to the selected project is displayed in a table.
 */

class ReportingCardProjectRelated extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableProjects: [],
      selectedProject: "",
      selectedProjectValidity: false,
      selectedFromDate: "",
      selectedFromDateValidity: false,
      selectedToDate: "",
      selectedToDateValidity: false,
      intervalTransactions: [],
      allowReportCreation: false,
    }
  }

  fetchAvailableProjectsFromDb = () => {
    return API.getAPI().getProjects()
      .then((projects) => {
        this.setState({
          availableProjects: projects,
        })
      })
  }

  handleSendClick() {
    return API.getAPI().getIntervalTransactionsByProjectFromTo(this.state.selectedProject.getId(), this.convertFromDatestringToBackendFormat(this.state.selectedFromDate),
      this.convertToDatestringToBackendFormat(this.state.selectedToDate))
      .then((intervalTransactionBOs) => {
        var promises = [];
        intervalTransactionBOs.forEach((transaction) => {
          promises.push(
            new Promise((resolve) => {
              API.getAPI().getTask(transaction.getTaskId())
                .then((task) => {
                  API.getAPI().getProject(task.getProjectId())
                    .then((project) => {
                      task.setProject(project);
                      transaction.setTask(task);
                      resolve();
                    })
                })
            }))
          promises.push(
            new Promise((resolve) => {
              API.getAPI().getTaskTime(transaction.getIntervalId())
                .then((taskTime) => {
                  transaction.setInterval(taskTime);
                  resolve();
                })
            }))
          promises.push(
            new Promise((resolve) => {
              API.getAPI().getAccount(transaction.getAccountId())
                .then((account) => {
                  API.getAPI().getPerson(account.getPersonId())
                    .then((person) => {
                      account.setPerson(person);
                      transaction.setAccount(account);
                      resolve();
                    })
                })
            }))
        })
        Promise.all(promises)
          .then(() => {
            // Sort result array in a suitable way
            // Sort by start time
            intervalTransactionBOs.sort((a, b) => {
              return a.getInterval().getStartTime().getHours() * 60 + a.getInterval().getStartTime().getMinutes() -
                b.getInterval().getStartTime().getHours() * 60 + b.getInterval().getStartTime().getMinutes();
            })
            // Sort by task
            intervalTransactionBOs.sort((a, b) => {
              return a.getTask().getTaskName().toUpperCase().localeCompare(b.getTask().getTaskName().toUpperCase());
            })
            // Sort by person
            intervalTransactionBOs.sort((a, b) => {
              return (a.getAccount().getPerson().getFirstName() + a.getAccount().getPerson().getLastName()).toUpperCase()
                .localeCompare((b.getAccount().getPerson().getFirstName() + b.getAccount().getPerson().getLastName()).toUpperCase());
            })
            // Sort by date
            intervalTransactionBOs.sort((a, b) => {
              let aWithoutTime = new Date(a.getInterval().getStartTime().getTime());
              aWithoutTime.setHours(0, 0, 0, 0);
              let bWithoutTime = new Date(b.getInterval().getStartTime().getTime());
              bWithoutTime.setHours(0, 0, 0, 0);

              return aWithoutTime - bWithoutTime;
            })
            this.setState({
              intervalTransactions: intervalTransactionBOs,
              allowReportCreation: true,
            });
          })
      })
  }

  convertFromDatestringToBackendFormat(date) {
    return date + ' 00:00:00';
  }

  convertToDatestringToBackendFormat(date) {
    return date + ' 23:59:59';
  }

  componentDidMount = () => {
    this.fetchAvailableProjectsFromDb();
  }

  handleSelectedProjectChange(selectedProject) {
    this.setState({
      selectedProject: selectedProject,
      selectedProjectValidity: true,
      allowReportCreation: false,
    })
  }

  handleSelectedFromDateChange(selectedFromDate) {
    this.setState({
      selectedFromDate: selectedFromDate,
      selectedFromDateValidity: true,
      allowReportCreation: false,
    })
  }

  handleSelectedToDateChange(selectedToDate) {
    this.setState({
      selectedToDate: selectedToDate,
      selectedToDateValidity: true,
      allowReportCreation: false,
    })
  }

  isInputValid() {
    let inputValidity = false;
    if (this.state.selectedProjectValidity === true &&
      this.state.selectedFromDateValidity === true &&
      this.state.selectedToDateValidity === true) {
      inputValidity = true;
    }
    return inputValidity;
  }

  dateToHHMM(date) {
    return addLeadingZeroes(date.getHours().toString(), 2) + ":" + addLeadingZeroes(date.getMinutes().toString(), 2);
  }

  dateDifferenceToHHMM(dateDifference) {
    return addLeadingZeroes(Math.floor(dateDifference / (60 * 60 * 1000)).toString(), 2) + ":" + addLeadingZeroes(((dateDifference / (60 * 1000)) % 60).toString(), 2);
  }

  // Transforms a js date to DD.MM.YYYY
  dateToDate(date) {
    return addLeadingZeroes(date.getDate().toString(), 2) + '.' + addLeadingZeroes((date.getMonth() + 1).toString(), 2) + '.' + date.getFullYear().toString();
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

  handleCreateReportClick() {
    let csv = this.createCSVFromSelection();
    this.donwloadCSVFile(this.generateCSVFileName(), csv);
  }

  createCSVFromSelection() {
    let csv = "";
    csv += "Date\tEmployee\tTask\tStart Time\tEnd Time\n";
    this.state.intervalTransactions.forEach((intervalTransaction) => {
      csv += this.dateToDate(intervalTransaction.getInterval().getStartTime()) + "\t";
      csv += intervalTransaction.getAccount().getPerson().getFirstName() + " " + intervalTransaction.getAccount().getPerson().getLastName() + "\t";
      csv += intervalTransaction.getTask().getTaskName() + "\t";
      csv += this.dateToHHMM(intervalTransaction.getInterval().getStartTime()) + "\t";
      csv += this.dateToHHMM(intervalTransaction.getInterval().getEndTime()) + "\t";
      csv += "\n";
    })
    return csv;
  }

  // Original source: https://thewebdev.info/2021/11/20/how-to-download-a-string-as-txt-file-in-react/
  // Code was then modified to create a csv instead of a txt file
  donwloadCSVFile(filename, content) {
    const element = document.createElement("a");
    const file = new Blob([content], {
      type: "text/csv"
    });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  }

  generateCSVFileName() {
    let filename = this.state.selectedProject.getProjectName();
    filename += "_" + this.state.selectedFromDate + "_" + this.state.selectedToDate + ".csv";
    return filename;
  }

  render() {
    return (
      <Card sx={{ marginBottom: 1, marginTop: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent>
          <Stack direction="row" spacing={5}>
            <Stack>
              <Typography variant="h6" component="div">
                Select a project
              </Typography>
              <TextField size="small" select value={this.state.selectedProject} onChange={(event) => { this.handleSelectedProjectChange(event.target.value) }} error={!this.state.selectedProjectValidity}>
                {this.state.availableProjects.map((project) => (
                  <MenuItem key={project.getId()} value={project}>
                    {project.getProjectName()}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack>
              <Typography variant="h6" component="div">
                From
              </Typography>
              <TextField size="small" type="date" value={this.state.selectedFromDate} onChange={(event) => { this.handleSelectedFromDateChange(event.target.value) }} error={!this.state.selectedFromDateValidity} />
            </Stack>
            <Stack>
              <Typography variant="h6" component="div">
                To
              </Typography>
              <TextField size="small" type="date" value={this.state.selectedToDate} onChange={(event) => { this.handleSelectedToDateChange(event.target.value) }} error={!this.state.selectedToDateValidity} />
            </Stack>
            <Stack>
              <Button variant="contained" sx={{ m: 1 }} disabled={!this.isInputValid()} onClick={() => this.handleSendClick()} endIcon={<SendIcon />}>
                Send
              </Button>
              <Button variant="contained" sx={{ m: 1 }} disabled={!this.state.allowReportCreation} onClick={() => this.handleCreateReportClick()} startIcon={<AssignmentReturnedIcon />}>
                Create Report
              </Button>
            </Stack>
          </Stack>
        </CardContent>
        <CardContent sx={{ paddingBottom: 0 }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Date
                  </TableCell>
                  <TableCell>
                    Employee
                  </TableCell>
                  <TableCell>
                    Task
                  </TableCell>
                  <TableCell>
                    Start time
                  </TableCell>
                  <TableCell>
                    End time
                  </TableCell>
                  <TableCell>
                    Duration
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.intervalTransactions.map((intervalTransaction) => (
                  <TableRow key={intervalTransaction.getId()} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>
                      {this.dateToDate(intervalTransaction.getInterval().getStartTime())}
                    </TableCell>
                    <TableCell>
                      {intervalTransaction.getAccount().getPerson().getFirstName() + " " + intervalTransaction.getAccount().getPerson().getLastName()}
                    </TableCell>
                    <TableCell>
                      {intervalTransaction.getTask().getTaskName()}
                    </TableCell>
                    <TableCell>
                      {this.dateToHHMM(intervalTransaction.getInterval().getStartTime())}
                    </TableCell>
                    <TableCell>
                      {this.dateToHHMM(intervalTransaction.getInterval().getEndTime())}
                    </TableCell>
                    <TableCell>
                      {this.dateDifferenceToHHMM((intervalTransaction.getInterval().getEndTime() - intervalTransaction.getInterval().getStartTime()))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>
                    {this.calculateSumOfDurations()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }
}

export default ReportingCardProjectRelated;