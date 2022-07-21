import BusinessObject from "./BusinessObject";

export default class AccountBO extends BusinessObject {
  constructor(aOwnerId) {
    super();
    this.owner_id = aOwnerId;
    this.owner = null;
  }

  setPersonId(aOwnerId) {
    this.owner_id = aOwnerId;
  }

  getPersonId() {
    return this.owner_id;
  }

  setPerson(aOwner) {
    this.owner = aOwner;
  }

  getPerson() {
    return this.owner;
  }

  static fromJSON(accounts) {
    let result = [];

    if (Array.isArray(accounts)) {
      /* Multiple entries */
      accounts.forEach((f) => {
        Object.setPrototypeOf(f, AccountBO.prototype);
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = accounts;
      Object.setPrototypeOf(f, AccountBO.prototype);
      result.push(f);
    }

    return result;
  }
}
