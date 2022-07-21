import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default class DatePicker extends React.Component {

    handleChange = (event) => {
        event.preventDefault();
        const date = event.target.value;
        // pass props to onDatePick
        this.props.onDatePick(date);
    };
    render() {
        return (
            <Stack component="form" noValidate spacing={3} >
                <TextField
                    id="date"
                    // label="Date"
                    type="date"
                    // set default value to current date
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={this.handleChange.bind(this)}
                />
            </Stack>
        );
    }
}