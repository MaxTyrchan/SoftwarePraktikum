import BusinessObject from "./BusinessObject";

export default class IntervalTransactionBO extends BusinessObject {
  constructor(aAccountId, aTaskId, aIntervalId) {
    super();
    this.account_id = aAccountId;
    this.task_id = aTaskId;
    this.time_id = aIntervalId;
    this.interval = "";
    this.task = "";
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

  getTaskId() {
    return this.task_id;
  }

  setTaskId(aTaskId) {
    this.task_id = aTaskId;
  }

  getIntervalId() {
    return this.time_id;
  }

  setIntervalId(aIntervalId) {
    this.time_id = aIntervalId;
  }

  getInterval() {
    return this.interval;
  }

  setInterval(aInterval) {
    this.interval = aInterval;
  }

  getTask() {
    return this.task;
  }

  setTask(aTask) {
    this.task = aTask;
  }

  static fromJSON(intervalTransactions) {
    let result = [];

    if (Array.isArray(intervalTransactions)) {
      /* Multiple entries */
      intervalTransactions.forEach((f) => {
        Object.setPrototypeOf(f, IntervalTransactionBO.prototype);
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = intervalTransactions;
      Object.setPrototypeOf(f, IntervalTransactionBO.prototype);
      result.push(f);
    }
    return result;
  }
}
