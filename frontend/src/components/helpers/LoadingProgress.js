import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LinearProgress } from '@mui/material';

/**
 * Shows a loading progress, if the show prop is true.
 * 
 * @See See Materiel-UIs [Progress](https://mui.com/material-ui/react-progress/)
 * @See See Materiel-UIs [LinearProgress](https://mui.com/material-ui/api/linear-progress/)
 * 
 */
class LoadingProgress extends Component {

  render() {
    const { show } = this.props;

    return (
      show ?
        <div >
          <LinearProgress sx={{ width: '100%', marginTop: 2 }} color='secondary' />
        </div>
        : null
    );
  }
}

/** PropTypes */
LoadingProgress.propTypes = {
  /** If true, the loading progress is rendered */
  show: PropTypes.bool.isRequired,
}

export default LoadingProgress;