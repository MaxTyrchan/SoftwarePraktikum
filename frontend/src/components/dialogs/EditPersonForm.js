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
class EditPersonForm extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open === false) {
      if (this.props.open === true) {
        // Init state with props
        this.setState({
          firstname: this.props.person.getFirstName(),
          lastname: this.props.person.getLastName(),
          username: this.props.person.getUserName(),
        })
      }
    }
  }

  // Gets called when Firstname is changed
  handleFirstnameChange(event) {
    this.setState({
      firstname: event.target.value,
    })
  }

  // Gets called when Lastname is changed
  handleLastnameChange(event) {
    this.setState({
      lastname: event.target.value,
    })
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    })
  }


  // Gets called when the 'Save' button is clicked
  handleSaveClick() {
    let newValues = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
    }
    this.props.onSaveValues(newValues);
    this.props.onClose();
  }

  render() {
    return (
      <Dialog open={this.props.open}>
        <Box sx={{ my: 3, mx: 2 }} >
          <Typography variant="h5" component="div">
            Edit Person
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Grid container spacing={2}>
          <Grid item>
            <Stack sx={{ my: 3, mx: 2 }} spacing={3}>
              <Container>
                <Typography variant="h6" component="div">
                  First name
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.firstname} onChange={(event) => this.handleFirstnameChange(event)} />
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  Last name
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.lastname} onChange={(event) => this.handleLastnameChange(event)} />
              </Container>
              <Container>
                <Typography variant="h6" component="div">
                  User name
                </Typography>
                <TextField id="outlined-basic" variant="outlined" fullWidth={true} value={this.state.username} onChange={(event) => this.handleUsernameChange(event)} />
              </Container>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ my: 2, mx: 2, display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
          <Button size="medium" variant="text" onClick={() => this.props.onClose()}>Cancel</Button>
          <Button size="medium" variant="contained" startIcon={<SaveIcon />} onClick={() => this.handleSaveClick()}>Save</Button>
        </Box>
      </Dialog>
    );
  }
}

EditPersonForm.defaultProps = {
  task: null,
}

EditPersonForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSaveValues: PropTypes.func.isRequired,
};

export default EditPersonForm;
