import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import SaveIcon from '@mui/icons-material/Save';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from "@mui/material/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Select from "@mui/material/Select";
import IconButton from '@mui/material/IconButton';

import { addLeadingZeroes } from "../helpers/HelperFunctions";
import { MenuItem } from '@mui/material';
import API from "../../api/API";

/**
 * This is the project form component which is displayed when a new project is created or an existing project is edited.
 */

class CreateProjectForm extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      projectName: "",
      customer: "",
      startTime: new Date(),
      endTime: new Date(),
      members: [],
      membersToBeDeleted: [],
      membersToBeAdded: [],
      personsNotInProject: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open === false) {
      if (this.props.open === true) {
        // Init state with props
        this.setState({
          projectName: this.props.project.getProjectName(),
          customer: this.props.project.getCustomer(),
          startTime: this.props.project.getProjectTime().getStartTime(),
          endTime: this.props.project.getProjectTime().getEndTime(),
          members: this.props.members.slice(),
          membersToBeDeleted: [],
          membersToBeAdded: [],
        })
      }
    }
  }

  // Formats date to date string YYYY-MM-DD
  dateToYYYYMMDD(date) {
    return date.getFullYear().toString() + "-" + addLeadingZeroes((date.getMonth() + 1).toString(), 2) + "-" + addLeadingZeroes(date.getDate().toString(), 2);
  }

  // Creates a date object based on dateString
  yyyyMMDDToDate(dateString) {
    let newDate = new Date(dateString);
    return newDate;
  }

  // Gets called when project name is changed
  handleProjectNameChange(event) {
    this.setState({
      projectName: event.target.value,
    })
  }

  // Gets called when project customer is changed
  handleProjectCustomerChange(event) {
    this.setState({
      customer: event.target.value,
    })
  }

  // Gets called when project start time is changed
  handleProjectStartTimeChange(event) {
    this.setState({
      startTime: this.yyyyMMDDToDate(event.target.value),
    })
  }
  // Gets called when project end time is changed
  handleProjectEndTimeChange(event) {
    this.setState({
      endTime: this.yyyyMMDDToDate(event.target.value),
    })
  }

  // Gets called when the 'Save' button is clicked
  handleSaveClick() {
    let newValues = {
      projectName: this.state.projectName,
      customer: this.state.customer,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      membersToBeDeleted: this.state.membersToBeDeleted,
      membersToBeAdded: this.state.membersToBeAdded,
    }
    this.props.onSaveValues(newValues);
    this.props.onClose();
  }

  filterPersons = (allPersons) => {
    let personsNotInProject = [];
    allPersons.forEach((person) => {
      if (this.state.members.some((member) => member.getId() === person.getId())) {
        // person is already member of project. Don't add person to list.
      } else {
        personsNotInProject.push(person)
      }
    })
    return personsNotInProject;
  }

  fetchAllPersonsFromDb = () => {
    return API.getAPI().getPersons()
      .then((persons) => {
        let personsNotInProject = this.filterPersons(persons);
        this.setState({
          personsNotInProject: personsNotInProject,
        })
      })
  }

  handleAddNewProjectMember = (member) => {
    let membersToBeAdded = this.state.membersToBeAdded.slice();
    let membersToBeDeleted = this.state.membersToBeDeleted.slice();
    // Check if member was already added to the list, if yes, ignore the call
    let foundIndex = membersToBeAdded.findIndex((element) => { return (element.getId() === member.getId()) });
    if (foundIndex === -1) {
      // Member was not found in list
      // Check if member was already added to the delete list, if yes, delete member from delete list
      foundIndex = membersToBeDeleted.findIndex((element) => { return (element.getId() === member.getId()) });
      if (foundIndex >= 0) {
        // Member was found in delete list
        membersToBeDeleted.splice(foundIndex, 1);
      }
      membersToBeAdded.push(member);
      let members = this.state.members.slice();
      members.push(member);
      this.setState({
        members: members,
        membersToBeAdded: membersToBeAdded,
        membersToBeDeleted: membersToBeDeleted,
      })
    }
  }

  handleDeleteProjectMember = (member) => {
    let membersToBeAdded = this.state.membersToBeAdded.slice();
    let membersToBeDeleted = this.state.membersToBeDeleted.slice();
    // Check if member was already added to the list, if yes, ignore the call
    let foundIndex = membersToBeDeleted.findIndex((element) => { return (element.getId() === member.getId()) });
    if (foundIndex === -1) {
      // Member was not found in list
      // Check if member was already added to the add list, if yes, delete member from add list
      foundIndex = membersToBeAdded.findIndex((element) => { return (element.getId() === member.getId()) });
      if (foundIndex >= 0) {
        // Member was found in delete list
        membersToBeAdded.splice(foundIndex, 1);
      }
      membersToBeDeleted.push(member);
      let members = this.state.members.slice();
      let index = members.findIndex((element) => { return (element.getId() === member.getId()) });
      members.splice(index, 1);
      this.setState({
        members: members,
        membersToBeAdded: membersToBeAdded,
        membersToBeDeleted: membersToBeDeleted,
      })
    }
  }

  render() {
    return (
      <Dialog maxWidth="xl" open={this.props.open}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Typography fontWeight={"bold"} variant="h5" component="div">
            Edit Project
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={2}>
          <Grid item justifyContent="center">
            <Stack sx={{ mt: 3, mb: 5, mx: 2 }} spacing={3}>
              <Container>
                <Typography variant="h6" component="div">
                  Project Name
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.projectName} onChange={(event) => this.handleProjectNameChange(event)} />
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  Customer
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.customer} onChange={(event) => this.handleProjectCustomerChange(event)} />
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  Start Time
                </Typography>
                <TextField id="outlined-basic" variant="outlined" type="date" fullWidth={true} value={this.dateToYYYYMMDD(this.state.startTime)} onChange={(event) => this.handleProjectStartTimeChange(event)} />
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  End Time
                </Typography>
                <TextField id="outlined-basic" variant="outlined" type="date" fullWidth={true} value={this.dateToYYYYMMDD(this.state.endTime)} onChange={(event) => this.handleProjectEndTimeChange(event)} />
              </Container>
            </Stack>
          </Grid>
          <Stack sx={{ mt: 5, mb: 1, mx: 2 }} spacing={3}>
            <Stack>
              <Typography variant="h6" component="div">
                Add New Member
              </Typography>
              <Select label="New Member" value="" onOpen={() => this.fetchAllPersonsFromDb()} onChange={(event) => this.handleAddNewProjectMember(event.target.value)}>
                {this.state.personsNotInProject.map((person) => (
                  <MenuItem value={person}>{person.getFirstName() + " " + person.getLastName()}</MenuItem>
                ))}
              </Select>
            </Stack>
            <Grid item>
              <Box sx={{ my: 0, mx: 2 }}>
                <Typography variant="h6" component="div">
                  Members
                </Typography>
              </Box>
              <TableContainer sx={{ maxHeight: 700 }}>
                <Table>
                  <TableHead>
                    <TableRow >
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        First Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        Last Name
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        E-mail Address
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>
                        User Name
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          {member.getFirstName()}
                        </TableCell>
                        <TableCell>
                          {member.getLastName()}
                        </TableCell>
                        <TableCell>
                          {member.getEmail()}
                        </TableCell>
                        <TableCell>
                          {member.getUserName()}
                        </TableCell>
                        <TableCell>
                          <IconButton aria-label="delete" onClick={() => this.handleDeleteProjectMember(member)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Stack>
        </Grid>
        <Box sx={{ my: 3, mx: 5, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }} >
          <Button variant="text" onClick={() => this.props.onClose()}>Cancel</Button>
          <Button mb={2} variant="contained" startIcon={<SaveIcon />} onClick={() => this.handleSaveClick()}>Save</Button>
        </Box>
      </Dialog>
    );
  }
}

CreateProjectForm.defaultProps = {
  project: null,
  members: [],
}

CreateProjectForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSaveValues: PropTypes.func.isRequired,
};

export default CreateProjectForm;
