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
import Grid from "@mui/material/Grid";
import InputAdornment from '@mui/material/InputAdornment';

import { MenuItem } from '@mui/material';

/**
 * This is the task form component which is displayed when a new task is created or an existing task is edited.
 */

class CreateTaskForm extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      taskName: this.props.task.getTaskName(),
      estWorkingTime: this.props.task.getEstWorkingTime(),
      project: this.props.task.getProject(),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open === false) {
      if (this.props.open === true) {
        // Init state with props
        this.setState({
          taskName: this.props.task.getTaskName(),
          estWorkingTime: this.props.task.getEstWorkingTime(),
          project: this.props.task.getProject(),
        })
      }
    }
  }

  // Gets called when task name is changed
  handleTaskNameChange(event) {
    this.setState({
      taskName: event.target.value,
    })
  }

  // Gets called when project is changed
  handleProjectChange(event) {
    this.setState({
      project: event.target.value,
    })
  }

  // Gets called when est working time is changed
  handleEstWorkingTimeChange(event) {
    this.setState({
      estWorkingTime: event.target.value,
    })
  }

  // Gets called when the 'Save' button is clicked
  handleSaveClick() {
    let newValues = {
      taskName: this.state.taskName,
      estWorkingTime: this.state.estWorkingTime,
      project: this.state.project,
    }
    this.props.onSaveValues(newValues);
    this.props.onClose();
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Typography variant="h5" component="div" fontWeight={"bold"}>
            Edit Task
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={2}>
          <Grid item>
            <Stack sx={{ my: 3, mx: 2 }} spacing={3}>
              <Container>
                <Typography variant="h6" component="div">
                  Task Name
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.taskName} onChange={(event) => this.handleTaskNameChange(event)} />
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  Project
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.project} onChange={(event) => this.handleProjectChange(event)} select >
                  {this.props.availableProjects.map((project) => (
                    <MenuItem key={project.getId()} value={project}>
                      {project.getProjectName()}
                    </MenuItem>
                  ))}
                </TextField>
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  Estimation
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} type="number" 
                  value={this.state.estWorkingTime} onChange={(event) => this.handleEstWorkingTimeChange(event)} 
                  InputProps={{
                    endAdornment: <InputAdornment position="end">person day(s)</InputAdornment>,
                  }} />
              </Container>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ my: 3, mx: 2, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
          <Button size="medium" variant="text" onClick={() => this.props.onClose()}>Cancel</Button>
          <Button size="medium" variant="contained" startIcon={<SaveIcon />} onClick={() => this.handleSaveClick()}>Save</Button>

        </Box>
      </Dialog>
    );
  }
}

CreateTaskForm.defaultProps = {
  task: null,
}

CreateTaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSaveValues: PropTypes.func.isRequired,
};

export default CreateTaskForm;
