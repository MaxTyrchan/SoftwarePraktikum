import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';

import CreateTaskForm from './dialogs/CreateTaskForm';
import Stack from '@mui/material/Stack';

/**
 * This is the task card component which is displayed on the tasks page.
 * Every task has its own card.
 */

class TaskCard extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      editDialogOpen: false,
    };
  }

  handleEditButtonClick = () => {
    this.setState({ editDialogOpen: true });
  }

  // Gets called when task values have been changed
  onUpdateValues(updatedValues) {
    this.props.onUpdateCard(updatedValues);
  }

  render() {
    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography fontWeight={"bold"} variant="h5" component="div">
            {this.props.task.getTaskName()}
        </Typography>
        <Stack>
          <Typography sx={{ mb: 1.5, mt: 0.5 }} color="text.secondary" fontStyle='italic'>
              {this.props.task.getProject().getProjectName()}
          </Typography>
        </Stack>
        <Stack>
          <Typography sx={{ mb: 0 }} color="text.secondary">
              Est. capacity: {this.props.task.getEstWorkingTime() + " person day(s)"}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={1.2}>
          <Button size="small" variant="outlined" onClick={() => this.handleEditButtonClick()} startIcon={<EditIcon />}>Edit</Button>
          <Button size="small" variant="outlined" onClick={() => this.props.onDelete()} startIcon={<DeleteIcon />} color="error">Delete</Button>
        </Stack>
      </CardActions>
      <CreateTaskForm 
      open={this.state.editDialogOpen}
      onClose={() => this.setState({ editDialogOpen: false })}
      task={this.props.task}
      availableProjects={this.props.availableProjects}
      onSaveValues={(updatedValues) => this.onUpdateValues(updatedValues)} />
    </Card>
    );
  }
}

TaskCard.defaultProps = {
  task: null,
}

TaskCard.propTypes = {
  onUpdateCard: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
