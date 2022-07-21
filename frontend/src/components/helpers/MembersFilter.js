import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Button, TextField, InputAdornment, IconButton, Grid, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear'
import MemberListEntry from './helpers/MemberListEntry';
import API from '../api/API';


class MembersFilter extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div sx={{ width: '100%' }}>
                <Grid sx={{ marginTop: 2, marginBottom: 1 }} container spacing={1} justify='flex-start' alignItems='center'>
                    <Grid item>
                        <Typography>
                            Filter Members by Name:
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            autoFocus
                            fullWidth
                            id='personFilter'
                            type='text'
                            variant='standard'
                            value={this.props.personFilter}
                            onChange={this.filterFieldValueChange}
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position='end'>
                                        <IconButton onClick={this.props.clearFilterFieldButtonClicked}>
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>,
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default MembersFilter;
