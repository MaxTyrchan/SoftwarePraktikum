import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { MenuItem, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import TaskCard from "../components/TaskCard";
import API from "../api/API";
import TaskBO from "../api/TaskBO";
import CreateTaskForm from "../components/dialogs/CreateTaskForm";
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';

/**
 * This is the Tasks page where users can either view all tasks or filter the tasks for a certain project.
 */

class Tasks extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      allTasks: [],
      filteredTasks: [],
      newTaskOpen: false,
      availableProjects: [],
      selectedProject: "",
      selectionMade: false,
    };
  }

  //fetches all Tasks and Projects from the Backend
  fetchAllTasksAndProjectsFromDb = () => {
    API.getAPI().getTasks()
      .then((taskBOs) => {
        API.getAPI().getProjects()
          .then((projectBOs) => {
            taskBOs.forEach((task) => {
              projectBOs.every((project) => {
                if (task.getProjectId() === project.getId()) {
                  task.setProject(project);
                  return false;
                } else {
                  return true;
                }
              })
            })
            this.setState({
              allTasks: taskBOs,
              filteredTasks: taskBOs,
              availableProjects: projectBOs
            })
          })
      })
      // 'Resets' tasks state to an empty associative array
      .catch(e =>
        this.setState({
          allTasks: [],
          filteredTasks: [],
          availableProjects: []
        })
      );
  }

  componentDidMount() {
    this.fetchAllTasksAndProjectsFromDb();
  }

  // When a task card is updated, this function is called
  onUpdateTask = (id, newValues) => {
    let tasks = this.state.allTasks.slice();
    let index = tasks.findIndex((task) => { return (id === task.id) });
    let task = new TaskBO(newValues["taskName"], newValues["estWorkingTime"], newValues["project"].getId());
    task.setId(tasks[index].getId());
    API.getAPI().updateTask(task)
      .then(() => {
        // After task has been updated, update task in state, so it can be seen without having to get it from the database again
        tasks[index].setTaskName(newValues["taskName"]);
        tasks[index].setEstWorkingTime(newValues["estWorkingTime"]);
        tasks[index].setProject(newValues["project"]);
        tasks[index].setProjectId(newValues["project"].getId());
        this.filterTasks(this.state.selectedProject, tasks);
        this.setState({
          allTasks: tasks,
        })
      })
  }

  // Adds a new task
  addNewTask = (taskValues) => {
    let task = new TaskBO(taskValues["taskName"], taskValues["estWorkingTime"], taskValues["project"].getId());
    task.setId("00000000-0000-0000-0000-000000000000");
    API.getAPI().addTask(task)
      .then((taskBO) => {
        taskBO.setProject(taskValues["project"]);
        let tasks = this.state.allTasks.slice();
        tasks.push(taskBO);
        this.filterTasks(this.state.selectedProject, tasks);
        this.setState({
          allTasks: tasks,
        })
      })
  }

  // Deletes a task from the database
  handleDelete = (id) => {
    // Copy the task state into a variable
    let tasks = this.state.allTasks.slice();
    // Find index of task to be deleted in tasks array
    let index = tasks.findIndex((task) => { return (id === task.id) });
    API.getAPI().deleteTask(id)
      .then(() => {
        tasks.splice(index, 1);
        this.filterTasks(this.state.selectedProject, tasks);
        this.setState({
          allTasks: tasks,
        })
      })
  }

  // Filters all Tasks
  filterTasks(selectedProject, allTasks) {
    if (selectedProject !== "") {
      let tasks = [];
      allTasks.forEach((task) => {
        if (task.getProjectId() === selectedProject.getId()) {
          tasks.push(task);
        }
      })
      this.setState({
        filteredTasks: tasks,
      })
    } else {
      this.setState({
        filteredTasks: allTasks,
      })
    }
  }

  handleProjectChange(event) {
    this.filterTasks(event.target.value, this.state.allTasks);
    this.setState({
      selectedProject: event.target.value,
      selectionMade: true,
    })
  }

  handleProjectClear() {
    let allTasks = this.state.allTasks.slice();
    this.setState({
      selectedProject: "",
      filteredTasks: allTasks,
      selectionMade: false,
    })
  }

  render() {
    return (
      <Container disableGutters>
        <Box sx={{ display: "flex" }}>
          <Card sx={{ minWidth: 1200, mb: 2 }}>
            <CardContent>
              <Stack direction="row" spacing={3}>
                <Typography variant="h5" fontWeight={"bold"} mb={0} mt={1}>
                  Filter for
                </Typography>
                <TextField size="small" variant="outlined" disabled={this.state.selectionMade} value={this.state.selectedProject} onChange={(event) => this.handleProjectChange(event)} sx={{ ml: 2, mt: 2 }}
                  select >
                  {this.state.availableProjects.map((project) => (
                    <MenuItem key={project.getId()} value={project}>
                      {project.getProjectName()}
                    </MenuItem>
                  ))}
                </TextField>
                <Button variant="contained" onClick={() => this.handleProjectClear()} startIcon={<ClearIcon />}>
                  Clear
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
          {this.state.filteredTasks.map((task) => (
            <Grid item key={task.getId()}>
              <TaskCard task={task}
                onUpdateCard={(updatedValues) => this.onUpdateTask(task.id, updatedValues)}
                onDelete={() => this.handleDelete(task.getId())}
                availableProjects={this.state.availableProjects} />
            </Grid>
          ))}
          {/* Add Button to add a new task*/}
          <IconButton size="large" color="primary" onClick={() => this.setState({ newTaskOpen: true })}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
        <CreateTaskForm open={this.state.newTaskOpen} onClose={() => this.setState({ newTaskOpen: false })} task={TaskBO.getEmptyTask()} availableProjects={this.state.availableProjects}
          onSaveValues={(updatedValues) => this.addNewTask(updatedValues)} />
      </Container >
    );
  }
}

export default Tasks;