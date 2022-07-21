import IntervalBO from "./IntervalBO";

class PauseBO extends IntervalBO {
    constructor(aStartTime, aEndTime) {
        super(aStartTime, aEndTime);
    }

  static fromJSON(intervals) {
    return super.fromJSON(intervals, PauseBO);
  }
}

export default PauseBO;