import EventBO from "./EventBO";

class LeaveBO extends EventBO {
    constructor(aOccurence) {
        super(aOccurence);
    }

  static fromJSON(intervals) {
    return super.fromJSON(intervals, LeaveBO);
  }
}

export default LeaveBO;