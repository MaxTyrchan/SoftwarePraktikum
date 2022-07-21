import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar, AvatarGroup } from '@mui/material';
import Divider from '@mui/material/Divider';

import CreateProjectForm from './dialogs/CreateProjectForm';
import API from "../api/API";

/**
 * This is the project card component which is displayed on the projects page.
 * Every project has its own card.
 */

class ProjectCard extends React.Component {

  constructor(props) {
    super(props);
     // Don't call this.setState() here!
     this.state = {
      editDialogOpen: false,
      projectMembers: [],
      currentDate: new Date(),
    };
  }

  currentDate() {
    let dateForDaysRemaining = new Date(this.state.currentDate.getTime());
    return dateForDaysRemaining
  }


  // Gets called when project values have been changed
  onUpdateValues(updatedValues) {
    this.props.onUpdateCard(updatedValues);

    // Update member avatar list without waiting for db
    let projectMembers = this.state.projectMembers.slice();
    if (updatedValues.membersToBeAdded.length > 0) {
      updatedValues.membersToBeAdded.map((member) => {
        projectMembers.push(member);
      })
    }
    if (updatedValues.membersToBeDeleted.length > 0) {
      updatedValues.membersToBeDeleted.map((member) => {
        let index = projectMembers.findIndex((element) => {return (element.getId() === member.getId())});
        projectMembers.splice(index, 1);
      })
    }
    this.setState({
      projectMembers: projectMembers,
    })
  }

  fetchProjectMembersFromDb = (id) => {
    return API.getAPI().getProjectMembers(id)
      .then((projectMembers) => {
        this.setState({
          projectMembers: projectMembers,
        })
      })
  }

  handleEditButtonClick = () => {
    this.fetchProjectMembersFromDb(this.props.project.getId())
    .then(() => {
      this.setState({editDialogOpen: true});
    })
  }

  componentDidMount() {
    this.fetchProjectMembersFromDb(this.props.project.getId());
  }

  render() {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography fontWeight={"bold"} variant="h5" component="div">
            {this.props.project.getProjectName()}
          </Typography>
          <Stack>
            <Typography sx={{ mb: 1.5, mt: 0.5 }} color="text.secondary" fontStyle='italic'>
              {this.props.project.getCustomer()}
            </Typography>
          </Stack>
          <Stack mt={1}>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              Start: {this.props.project.getProjectTime().getStartTime().toDateString()}
            </Typography>
            <Typography sx={{ mb: 0.5 }} color="text.secondary">
              End: {this.props.project.getProjectTime().getEndTime().toDateString()}
            </Typography>
            <Typography sx={{ mb: 0 }} color="text.secondary">
              Days remaining: {Math.floor((this.props.project.getProjectTime().getEndTime() - this.currentDate())/(1000*60*60*24))}
            </Typography>
          </Stack>
        </CardContent>
        <CardContent>
          <AvatarGroup max={3}>
            {this.state.projectMembers.map((member) => (
              <Avatar key={member.getId()} sx={{ bgcolor: "primary.main" }} > 
                {member.getFirstName().slice(0,1) + member.getLastName().slice(0,1)}
              </Avatar>
            ))}
          </AvatarGroup>
        </CardContent>
        <CardActions>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1.2}>
            <Button size="small" variant="outlined" onClick={() => this.handleEditButtonClick()} startIcon={<EditIcon />}>Edit</Button>
            <Button size="small" variant="outlined"  onClick={() => this.props.onDelete()} startIcon={<DeleteIcon />} color="error"> Delete </Button>
          </Stack>
        </CardActions>
        <CreateProjectForm open={this.state.editDialogOpen} onClose={() => this.setState({editDialogOpen: false})} project={this.props.project}
        members={this.state.projectMembers} onSaveValues={(updatedValues) => this.onUpdateValues(updatedValues)}/>
      </Card>
    );
  }
}

ProjectCard.defaultProps = {
  project: null,
}

ProjectCard.propTypes = {
  onUpdateCard: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProjectCard;
