import BusinessObject from "./BusinessObject";
import ProjectTimeBO from "./ProjectTimeBO";

export default class ProjectBO extends BusinessObject {
  constructor(aProjectName, aProjectTimeID, aCustomer) {
    super();
    this.project_name = aProjectName;
    this.project_time_id = aProjectTimeID;
    this.customer = aCustomer;
    this.project_time = null;
  }

  setProjectName(aProjectName) {
    this.project_name = aProjectName;
  }

  getProjectName() {
    return this.project_name;
  }

  setCustomer(aCustomer) {
    this.customer = aCustomer;
  }

  getCustomer() {
    return this.customer;
  }

  setProjectTimeId(aProjectTimeId) {
    this.project_time_id = aProjectTimeId;
  }

  getProjectTimeId() {
    return this.project_time_id;
  }

  setProjectTime(aProjectTime) {
    this.project_time = aProjectTime;
  }

  getProjectTime() {
    return this.project_time;
  }

  static getEmptyProject() {
    let project = new ProjectBO("", "", "");
    let project_time = new ProjectTimeBO(new Date(), new Date());
    project.setProjectTime(project_time);
    return project;
  }

  static fromJSON(projects) {
    let result = [];

    if (Array.isArray(projects)) {
      /* Multiple entries */
      projects.forEach((f) => {
        Object.setPrototypeOf(f, ProjectBO.prototype);
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = projects;
      Object.setPrototypeOf(f, ProjectBO.prototype);
      result.push(f);
    }

    return result;
  }
}
