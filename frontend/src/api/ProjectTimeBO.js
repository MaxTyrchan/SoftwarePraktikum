import IntervalBO from "./IntervalBO";

export default class ProjectTimeBO extends IntervalBO {
  constructor(aStartTime, aEndTime) {
    super(aStartTime, aEndTime);
  }

  static fromJSON(intervals) {
    return super.fromJSON(intervals, ProjectTimeBO);
  }
}
