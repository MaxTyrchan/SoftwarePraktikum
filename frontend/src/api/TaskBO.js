import BusinessObject from "./BusinessObject";

export default class TaskBO extends BusinessObject {
  constructor(aTaskName, aEstWorkingTime, aProjectId) {
    super();
    this.task_name = aTaskName;
    this.est_working_time = aEstWorkingTime;
    this.project_id = aProjectId;
    this.project = ""; // set project as empty string for select in textfield
  }

  setTaskName(aTaskName) {
    this.task_name = aTaskName;
  }

  getTaskName() {
    return this.task_name;
  }

  setEstWorkingTime(aEstWorkingTime) {
    this.est_working_time = aEstWorkingTime;
  }

  getEstWorkingTime() {
    return this.est_working_time;
  }

  setProjectId(aProjectId) {
    this.project_id = aProjectId;
  }

  getProjectId() {
    return this.project_id;
  }

  setProject(aProject) {
    this.project = aProject;
  }

  getProject() {
    return this.project;
  }

  static getEmptyTask() {
    let task = new TaskBO("", 0.0, "");
    return task;
  }

  static fromJSON(tasks) {
    let result = [];

    if (Array.isArray(tasks)) {
      /* Multiple entries */
      tasks.forEach((f) => {
        Object.setPrototypeOf(f, TaskBO.prototype);
        result.push(f);
      });
    } else {
      /* Single entry */
      let f = tasks;
      Object.setPrototypeOf(f, TaskBO.prototype);
      result.push(f);
    }

    return result;
  }
}