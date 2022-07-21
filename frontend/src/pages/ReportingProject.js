import React from "react";
import ReportingCardProjectRelated from "../components/ReportingCardProjectRelated";

/**
 * This is the project related reporting page where users can create reports and view all
 * information regarding the selected project.
 */

class ReportingProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <ReportingCardProjectRelated/>
    );
  }
}

export default ReportingProject;