import BusinessObject from "./BusinessObject";

class PersonBO extends BusinessObject {
  constructor(aGoogleID, aFirstName, aLastName, aEmail, aUserName) {
    super();
    this.google_id = aGoogleID;
    this.first_name = aFirstName;
    this.last_name = aLastName;
    this.email = aEmail;
    this.user_name = aUserName;
    this.role = 'EMPLOYEE';
  }

  setGoogleID(aGoogleID) {
    this.google_id = aGoogleID;
  }

  getGoogleID() {
    return this.google_id;
  }

  setFirstName(aFirstName) {
    this.first_name = aFirstName;
  }

  getFirstName() {
    return this.first_name;
  }

  setLastName(aLastName) {
    this.last_name = aLastName;
  }

  getLastName() {
    return this.last_name;
  }

  setEmail(aEmail) {
    this.email = aEmail;
  }

  getEmail() {
    return this.email;
  }

  setUserName(aUserName) {
    this.user_name = aUserName;
  }

  getUserName() {
    return this.user_name;
  }

  setRole(aRole) {
    this.role = aRole
  }

  getRole() {
    return this.role;
  }

  static fromJSON(persons) {
    let result = [];

    if (Array.isArray(persons)) {
      /* Multiple entries */
      persons.forEach((f) => {
        Object.setPrototypeOf(f, PersonBO.prototype);
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = persons;
      Object.setPrototypeOf(f, PersonBO.prototype);
      result.push(f);
    }

    return result;
  }
}

export default PersonBO;