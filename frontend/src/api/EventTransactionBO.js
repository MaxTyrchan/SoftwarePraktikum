import BusinessObject from "./BusinessObject";

export default class EventTransactionBO extends BusinessObject {
  constructor(aAccountId, aEventId) {
    super();
    this.account_id = aAccountId;
    this.time_id = aEventId;
    this.event = "";
    this.account = null;
  }

  getAccountId() {
    return this.account_id;
  }

  setAccountId(aAccountId) {
    this.account_id = aAccountId;
  }

  getAccount() {
    return this.account;
  }

  setAccount(aAccount) {
    this.account = aAccount;
  }

  getEventId() {
    return this.time_id;
  }

  setEventId(aEventId) {
    this.time_id = aEventId;
  }

  getEvent() {
    return this.event;
  }

  setEvent(aEvent) {
    this.event = aEvent;
  }

  static fromJSON(eventTransactions) {
    let result = [];

    if (Array.isArray(eventTransactions)) {
      /* Multiple entries */
      eventTransactions.forEach((f) => {
        Object.setPrototypeOf(f, EventTransactionBO.prototype);
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = eventTransactions;
      Object.setPrototypeOf(f, EventTransactionBO.prototype);
      result.push(f);
    }
    return result;
  }
}
