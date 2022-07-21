import React from "react";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default class TimePicker extends React.Component {

    handleChange = (event) => {
        event.preventDefault();
        const time = event.target.value;
        // pass props to onTimePick
        this.props.onTimePick(time);
    };

    // componentDidUpdate(prevProps) {

    render() {
        return (
            <Stack noValidate spacing={0}>
                <TextField
                    id="time"
                    // label="Time"
                    type="time"
                    sx={{ width: 150 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    onChange={this.handleChange.bind(this)}
                // value={this.props.value}
                />
            </Stack>
        );
    }
}