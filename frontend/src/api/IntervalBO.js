import BusinessObject from "./BusinessObject";

import { dateToJSONFormat } from "../components/helpers/HelperFunctions";

export default class IntervalBO extends BusinessObject {
  constructor(aStartTime, aEndTime) {
    super();
    this.start_time = aStartTime;
    this.end_time = aEndTime;
  }

  getStartTime() {
    return this.start_time;
  }

  setStartTime(aStartTime) {
    this.start_time = aStartTime;
  }

  getEndTime() {
    return this.end_time;
  }

  setEndTime(aEndTime) {
    this.end_time = aEndTime;
  }

  formatDatesJSONReady() {
    this.start_time = dateToJSONFormat(this.start_time);
    this.end_time = dateToJSONFormat(this.end_time);
  }

  static fromJSON(intervals, boType) {
    let result = [];

    if (Array.isArray(intervals)) {
      /* Multiple entries */
      intervals.forEach((f) => {
        Object.setPrototypeOf(f, boType.prototype);
        f.setStartTime(new Date(f.getStartTime()));
        f.setEndTime(new Date(f.getEndTime()));
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = intervals;
      Object.setPrototypeOf(f, boType.prototype);
      f.setStartTime(new Date(f.getStartTime()));
      f.setEndTime(new Date(f.getEndTime()));
      result.push(f);
    }

    return result;
  }
}
