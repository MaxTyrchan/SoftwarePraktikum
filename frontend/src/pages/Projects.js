import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import ProjectCard from "../components/ProjectCard";
import API from "../api/API";
import ProjectBO from "../api/ProjectBO";
import ProjectTimeBO from "../api/ProjectTimeBO";
import CreateProjectForm from "../components/dialogs/CreateProjectForm";

/**
 * This is the projects page where users can view all available projects and also create a new project.
 */

class Projects extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      projects: [],
      newProjectOpen: false
    };
  }

  // Fetches all projects with the corresponding projectTime from the database
  fetchAllProjectsFromDb = () => {
    API.getAPI().getProjects()
      .then((projectBOs) => {
        // This gets called when the backend responds to the project query
        var promises = [];
        projectBOs.forEach(project => {
          promises.push(
            this.fetchProjectTimeFromDb(project.getProjectTimeId())
              .then((projectTime) => {
                // This gets called when the backend responds to an individual projectTime query
                project.setProjectTime(projectTime);
              }))
        });
        Promise.all(promises).then(() => {
          // This gets called when the backend has responded to ALL projectTime querys
          this.setState({
            projects: projectBOs
          })
        })

      })
      // 'Resets' projects state to an empty associative array
      .catch(e =>
        this.setState({
          projects: []
        })
      );
  }

  // Fetches all project projectTimes from the database and returns them as ProjectTimeBOs
  fetchProjectTimeFromDb = (id) => {
    return API.getAPI().getProjectTime(id)
      .then((projectTimeBO) => {
        return new Promise(function (resolve) {
          resolve(projectTimeBO);
        });
      })
  }

  // Function that writes the new project values to the databse when they were changed vie 'EDIT' button
  writeNewProjectValueToDb = (project, projectTime) => {
    return API.getAPI().updateProject(project)
      .then(() => {
        // This gets called when the backend responds to the project query
        this.writeNewProjectTimeToDb(projectTime)
          .then(() => {
            // This gets called when the backend responds to an individual projectTime query
            return new Promise(function (resolve) {
              resolve();
            })
          })
      })
      .catch(e => {
        // Add Error Handler
      });
  }

  // Function that overwrites an existing ProjectTimeBO in the database
  writeNewProjectTimeToDb = (projectTime) => {
    return API.getAPI().updateProjectTime(projectTime)
      .then(() => {
        return new Promise(function (resolve) {
          resolve();
        });
      })
  }

  writeNewProjectMemberToDb = (projectId, member) => {
    return API.getAPI().addProjectMember(projectId, member)
      .then(() => {
        // Nothing to do
      })
  }

  deleteProjectMemberFromDb = (projectId, member) => {
    return API.getAPI().deleteProjectMember(projectId, member.getId())
      .then(() => {
        // Nothing to do
      })
  }

  sychronizeProjectMembersWithDb = (projectId, membersToBeAdded, membersToBeDeleted) => {
    membersToBeAdded.forEach((element) => {
      this.writeNewProjectMemberToDb(projectId, element);
    });
    membersToBeDeleted.forEach((element) => {
      this.deleteProjectMemberFromDb(projectId, element);
    });
  }

  componentDidMount() {
    this.fetchAllProjectsFromDb();
  }

  // When a project card is updated, this function is called
  onUpdateProject = (id, newValues) => {
    // .slice creates a copy of projects in state
    let projects = this.state.projects.slice();
    // Find index of project to be updated in projects array
    let index = projects.findIndex((project) => { return (id === project.id) });
    // Create new project object with updated values
    let project = new ProjectBO(newValues["projectName"], projects[index].getProjectTime().getId(), newValues["customer"]);
    project.setId(projects[index].getId());
    // Create new projectTime object with updated values which is associated to the project
    let projectTime = new ProjectTimeBO(newValues["startTime"], newValues["endTime"]);
    projectTime.setId(projects[index].getProjectTime().getId());
    // Write updated project to the database
    this.writeNewProjectValueToDb(project, projectTime)
      .then(() => {
        // After project and projectTime have been updated, update project in state, so it can be seen without having to get it from the database again
        projects[index].setProjectName(newValues["projectName"]);
        projects[index].setCustomer(newValues["customer"]);
        projects[index].getProjectTime().setStartTime(newValues["startTime"]);
        projects[index].getProjectTime().setEndTime(newValues["endTime"]);

        this.setState({
          projects: projects,
        })
      })

    this.sychronizeProjectMembersWithDb(id, newValues["membersToBeAdded"], newValues["membersToBeDeleted"]);
  }

  // Adds a new project and a new corresponding projectTime to the database
  addNewProject = (projectValues) => {
    // First create projectTime object with the given values from CreateProjectForm, since the new project needs to have a projectTime_id (which is created in the backend)
    let projectTime = new ProjectTimeBO(projectValues["startTime"], projectValues["endTime"], "PROJECT", "00000000-0000-0000-0000-000000000000");
    projectTime.setId("00000000-0000-0000-0000-000000000000");
    // Add projectTime to database
    API.getAPI().addProjectTime(projectTime)
      .then((projectTimeBO) => {
        // Create new project object with the given values from CreateProjectForm and add the id of the projectTime created beforehand
        let project = new ProjectBO(projectValues["projectName"], projectTimeBO.getId(), projectValues["customer"]);
        project.setId("00000000-0000-0000-0000-000000000000");
        project.setProjectTimeId(projectTimeBO.getId());
        // Add new project to database
        API.getAPI().addProject(project)
          .then((projectBO) => {
            // Set the projectTime as the projectTime of the project object, copy the state in a variable and 'append' it to the array
            projectBO.setProjectTime(projectTimeBO);
            let projects = this.state.projects.slice();
            projects.push(projectBO);
            this.sychronizeProjectMembersWithDb(projectBO.getId(), projectValues["membersToBeAdded"], projectValues["membersToBeDeleted"]);
            this.setState({
              projects: projects,
            })
          })
      })
  }

  // Deletes a project from the database
  handleDelete = (id) => {
    // Copy the project state into a variable
    let projects = this.state.projects.slice();
    // Find index of project to be deleted in projects array
    let index = projects.findIndex((project) => { return (id === project.id) });
    // Get projectTimeId of corresponding projectTime so it can also be deleted
    const projectTimeId = projects[index].getProjectTimeId();
    // First delete projectTime then the project from database
    API.getAPI().deleteProjectTime(projectTimeId)
      .then(() => {
        API.getAPI().deleteProject(id)
          .then(() => {
            projects.splice(index, 1);
            this.setState({
              projects: projects,
            })
          })
      })
  }

  render() {
    return (
      <Container disableGutters>
        <Box sx={{ display: "flex" }}>
          <h1>Projects</h1>
        </Box>
        <Grid container spacing={2}>
          {this.state.projects.map((project) => (
            <Grid item key={project.id}>
              <ProjectCard project={project}
                onUpdateCard={(updatedValues) => this.onUpdateProject(project.id, updatedValues)}
                onDelete={() => this.handleDelete(project.getId())} />
            </Grid>
          ))}
          {/* Add Button to add a new project*/}
          <IconButton size="large" color="primary" onClick={() => this.setState({ newProjectOpen: true })}>
            <AddCircleIcon />
          </IconButton>
          <CreateProjectForm open={this.state.newProjectOpen} onClose={() => this.setState({ newProjectOpen: false })} project={ProjectBO.getEmptyProject()}
            onSaveValues={(updatedValues) => this.addNewProject(updatedValues)} />
        </Grid>
      </Container>

    );
  }
}

export default Projects;