import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { addLeadingZeroes } from "../components/helpers/HelperFunctions";

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getDateDesignator(date) {
        let designator = "";
        const currentDate = new Date();
        if (date.getFullYear() === currentDate.getFullYear()) {
            if (date.getMonth() === currentDate.getMonth()) {
                if (date.getDate() === currentDate.getDate()) {
                    designator = "Today";
                } else if (date.getDate() === (currentDate.getDate() - 1)) {
                    designator = "Yesterday";
                } else if (date.getDate() === (currentDate.getDate() + 1)) {
                    designator = "Tomorrow";
                }
            }
        }
        return designator;
    }

    render() {
        const date = addLeadingZeroes(this.props.date.getDate().toString(), 2) + "." + addLeadingZeroes((this.props.date.getMonth() + 1).toString(), 2) + "." + this.props.date.getFullYear().toString();

        return (
            <Box sx={{ maxWidth: 450, marginBottom: 2, marginTop: 1, fontWeight: 'bold', boxShadow: 0, display: 'flex', flexDirection: { xs: 'column', md: 'column' }, alignItems: 'center' }}>
                <Typography variant="h2" component="span" marginBottom={1} >
                    {this.getDateDesignator(this.props.date)}
                </Typography>
                <Typography variant="h5" component="span">
                    The {date}
                </Typography>
            </Box >
        )
    }
}

Timebox.defaultProps = {
    date: new Date(),
}

export default Timebox;