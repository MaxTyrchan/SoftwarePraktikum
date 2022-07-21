import IntervalBO from "./IntervalBO";

export default class TaskTimeBO extends IntervalBO {
    constructor(aStartTime, aEndTime) {
        super(aStartTime, aEndTime);
    }

    static fromJSON(intervals) {
        return super.fromJSON(intervals, TaskTimeBO);
    }
}
