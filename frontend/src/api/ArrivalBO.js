import EventBO from "./EventBO";

class ArrivalBO extends EventBO {
    constructor(aOccurence) {
        super(aOccurence);
    }

  static fromJSON(intervals) {
    return super.fromJSON(intervals, ArrivalBO);
  }
}

export default ArrivalBO;