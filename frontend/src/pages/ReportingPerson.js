import React from "react";
import ReportingCardPersonRelated from "../components/ReportingCardPersonRelated";

/**
 * This is the person related reporting page where users can create reports and view all
 * information regarding the selected person.
 */

class ReportingPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <ReportingCardPersonRelated/>
    );
  }
}

export default ReportingPerson;