import React from "react";
import { DatePicker } from './TimeTracker';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

class AddMembersList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: null,
      startTime: null,
      endTime: null,
    };
  }

  handleTypeChange = (name) => {
      this.setState({ type: name.target.value });
  };

  setStartTime = (date) => {
      this.setState({ startTime: date });
  };

  setTime = (date) => {
      this.setState({ time: date });
  };

  createMembers = (event) => {
      event.preventDefault();
  };

  render() {
    const type = this.value;
    
    return (
      <Card sx={{ marginBottom: 1, marginTop: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
        <CardContent >
          <form noValidate onSubmit={this.createMembers}>
            <CardContent sx={{ paddingBottom: 0 }}>
              <Typography variant="h4" gutterBottom>
                Add Members List
              </Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 0 }}>
                <Typography variant="h6" component="div">
                  Firstname:
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <input type= 'text' name="name"></input>
                  </FormControl>
                </Box>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 0 }}>
                <Typography variant="h6" component="div">
                  Lastname:
                </Typography>
                <input type= 'text' name="name"></input>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 0 }}>
                <Typography variant="h6" component="div">
                  Time:
                </Typography>
                <DatePicker onDatePick={this.setTime} />
              </CardContent>
              <CardContent >
                <Button type="submit" variant="contained" endIcon={<SendIcon />} size='medium' sx={{ marginTop: 7 }} >
                    Send
                </Button>
              </CardContent>
            </CardContent>
          </form>
        </CardContent>
      </Card >
    );
  }
}

export default AddMembersList;