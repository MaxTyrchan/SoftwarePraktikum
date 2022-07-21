import ProjectBO from './ProjectBO';
import TaskBO from './TaskBO';
import PersonBO from './PersonBO';
import PauseBO from './PauseBO';
import ProjectTimeBO from './ProjectTimeBO';
import TaskTimeBO from './TaskTimeBO';
import IntervalTransactionBO from './IntervalTransactionBO';
import EventTransactionBO from './EventTransactionBO';
import ArrivalBO from './ArrivalBO';
import LeaveBO from './LeaveBO';
import AccountBO from './AccountBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 * 
 * Credits:
 * Code copied and modified from API.js which was obtained from the authors
 * of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
 */
export default class API {

  // Singelton instance
  static #api = null;

  // Local Python backend
  #ServerBaseURL = 'http://127.0.0.1:5000/timetrackingapp/api';

  //Account related
  #getAccountsURL = () => `${this.#ServerBaseURL}/accounts`;
  #getAccountURL = (id) => `${this.#ServerBaseURL}/accounts/${id}`;
  #getAccountByPersonURL = (personId) => `${this.#ServerBaseURL}/accounts/person/${personId}`;
  #updateAccountURL = (id) => `${this.#ServerBaseURL}/accounts/${id}`;
  #deleteAccountURL = (id) => `${this.#ServerBaseURL}/accounts/${id}`;
  #getTotalTimeAmountOfAccountURL = (id) => `${this.#ServerBaseURL}accounts/${id}/total_time_amount`;

  // Project related
  #getProjectsURL = () => `${this.#ServerBaseURL}/projects`;
  #getProjectsByCurrentUserURL = () => `${this.#ServerBaseURL}/projects-by-current-user`;
  #getProjectURL = (id) => `${this.#ServerBaseURL}/projects/${id}`;
  #addProjectURL = () => `${this.#ServerBaseURL}/projects`;
  #updateProjectURL = (id) => `${this.#ServerBaseURL}/projects/${id}`;
  #deleteProjectURL = (id) => `${this.#ServerBaseURL}/projects/${id}`;
  #getProjectMembersURL = (id) => `${this.#ServerBaseURL}/projects/${id}/members`;
  #addProjectMembersURL = (id) => `${this.#ServerBaseURL}/projects/${id}/members`;
  #deleteProjectMembersURL = (id, memberId) => `${this.#ServerBaseURL}/projects/${id}/members/${memberId}`;

  // Task related
  #getTasksURL = () => `${this.#ServerBaseURL}/tasks`;
  #getTasksByProjectURL = (id) => `${this.#ServerBaseURL}/tasks-by-project/${id}`;
  #getTaskURL = (id) => `${this.#ServerBaseURL}/tasks/${id}`;
  #addTaskURL = () => `${this.#ServerBaseURL}/tasks`;
  #updateTaskURL = (id) => `${this.#ServerBaseURL}/tasks/${id}`;
  #deleteTaskURL = (id) => `${this.#ServerBaseURL}/tasks/${id}`;

  // Person related
  #getPersonsURL = () => `${this.#ServerBaseURL}/persons`;
  #getPersonURL = (id) => `${this.#ServerBaseURL}/persons/${id}`;
  #getPersonByGoogleIdURL = (id) => `${this.#ServerBaseURL}/persons-by-google-id/${id}`;
  #addPersonURL = () => `${this.#ServerBaseURL}/persons`;
  #updatePersonURL = (id) => `${this.#ServerBaseURL}/persons/${id}`;
  #deletePersonURL = (id) => `${this.#ServerBaseURL}/persons/${id}`;

  // Pause related
  #getPausesURL = () => `${this.#ServerBaseURL}/pauses`;
  #getPauseURL = (id) => `${this.#ServerBaseURL}/pauses/${id}`;
  #addPauseURL = () => `${this.#ServerBaseURL}/pauses`;
  #deletePauseURL = (id) => `${this.#ServerBaseURL}/pauses/${id}`;
  #updatePauseURL = (id) => `${this.#ServerBaseURL}/pauses/${id}`;

  // Work related
  #getWorkTimesURL = () => `${this.#ServerBaseURL}/worktimes`;
  #getWorkTimeURL = (id) => `${this.#ServerBaseURL}/worktimes/${id}`;
  #addWorkTimeURL = () => `${this.#ServerBaseURL}/worktimes`;
  #deleteWorkTimeURL = (id) => `${this.#ServerBaseURL}/worktimes/${id}`;

  // ProjectTime related
  #getProjectTimesURL = () => `${this.#ServerBaseURL}/projecttimes`;
  #getProjectTimeURL = (id) => `${this.#ServerBaseURL}/projecttimes/${id}`;
  #updateProjectTimeURL = (id) => `${this.#ServerBaseURL}/projecttimes/${id}`;
  #addProjectTimeURL = () => `${this.#ServerBaseURL}/projecttimes`;
  #deleteProjectTimeURL = (id) => `${this.#ServerBaseURL}/projecttimes/${id}`;

  // TaskTime related
  #getTaskTimesURL = () => `${this.#ServerBaseURL}/tasktimes`;
  #getTaskTimeURL = (id) => `${this.#ServerBaseURL}/tasktimes/${id}`;
  #updateTaskTimeURL = (id) => `${this.#ServerBaseURL}/tasktimes/${id}`;
  #addTaskTimeURL = () => `${this.#ServerBaseURL}/tasktimes`;
  #deleteTaskTimeURL = (id) => `${this.#ServerBaseURL}/tasktimes/${id}`;

  // Interval Transaction related
  #getIntervalTransactionsTaskTimesByAccountFromToURL = (accountId, fromTime, toTime) => `${this.#ServerBaseURL}/transactions/intervals-task-times/${accountId}/${fromTime}/${toTime}`;
  #getIntervalTransactionsPauseTimesByAccountFromToURL = (accountId, fromTime, toTime) => `${this.#ServerBaseURL}/transactions/intervals-pause-times/${accountId}/${fromTime}/${toTime}`;
  #addIntervalTransactionForCurrentUserURL = () => `${this.#ServerBaseURL}/transactions/intervals`;
  #deleteIntervalTransactionURL = (id) => `${this.#ServerBaseURL}/transactions/intervals/${id}`;
  #updateIntervalTransactionURL = (id) => `${this.#ServerBaseURL}/transactions/intervals/${id}`;
  #getIntervalTransactionsByPersonFromToURL = (personId, fromTime, toTime) => `${this.#ServerBaseURL}/transactions/intervals-by-person/${personId}/${fromTime}/${toTime}`;
  #getIntervalTransactionsByProjectFromToURL = (projectId, fromTime, toTime) => `${this.#ServerBaseURL}/transactions/intervals-by-project/${projectId}/${fromTime}/${toTime}`;

  // Event Transaction related
  #getArrivalEventTransactionsByAccountFromToURL = (accountId, fromTime, toTime) => `${this.#ServerBaseURL}/transactions/events-by-account-arrivals-from-to/${accountId}/${fromTime}/${toTime}`;
  #getLeaveEventTransactionsByAccountFromToURL = (accountId, fromTime, toTime) => `${this.#ServerBaseURL}/transactions/events-by-account-leaves-from-to/${accountId}/${fromTime}/${toTime}`;
  #addEventTransactionForCurrentUserURL = () => `${this.#ServerBaseURL}/transactions/events`;
  #deleteEventTransactionURL = (id) => `${this.#ServerBaseURL}/transactions/events/${id}`;
  #updateEventTransactionURL = (id) => `${this.#ServerBaseURL}/transactions/events/${id}`;

  // Arrival related
  #getArrivalsURL = () => `${this.#ServerBaseURL}/arrivals`;
  #getArrivalURL = (id) => `${this.#ServerBaseURL}/arrivals/${id}`;
  #updateArrivalURL = (id) => `${this.#ServerBaseURL}/arrivals/${id}`;
  #addArrivalURL = () => `${this.#ServerBaseURL}/arrivals`;
  #deleteArrivalURL = (id) => `${this.#ServerBaseURL}/arrivals/${id}`;

  // Leave related
  #getLeavesURL = () => `${this.#ServerBaseURL}/leaves`;
  #getLeaveURL = (id) => `${this.#ServerBaseURL}/leaves/${id}`;
  #updateLeaveURL = (id) => `${this.#ServerBaseURL}/leaves/${id}`;
  #addLeaveURL = () => `${this.#ServerBaseURL}/leaves`;
  #deleteLeaveURL = (id) => `${this.#ServerBaseURL}/leaves/${id}`;

  /** 
  * Get the Singelton instance 
  * 
  * @public
  */
  static getAPI() {
    if (this.#api == null) {
      this.#api = new API();
    }
    return this.#api;
  }

  /**
   *  Default cookie setting for SameSite attribute was 'None' in the past, which allowed cookies to be sent with
   *  both cross-site and same-site requests. As of now the default for SameSite attribute is 'Lax', which means 
   *  cookies are not sent for cross-site requests. As react runs on port 3000 and flask(backend) on 5000 in this dev environment,
   *  a backend fetch is considered a cross-site request (as different ports are used). So no cookie is sent.
   *  For SameSite attribute to be 'None', also the attribute secure (only use https) has to be set in Chrome 
   *  and all other modern browsers as they reject the sending of cookies with only SameSite attribute set as 'None'.
   * 
   *  As a workaround we add the token of the cookie to the request headers. The backend then extracts it from there.
   * 
   *  Returns a Promise which resolves to a json object. 
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
   *  fetchAdvanced throws an Error also an server status errors
   */
  #fetchAdvanced(url, init) {
    // If no init parameter is used, create empty init
    if (typeof init === 'undefined') {
      init = { headers: {} };
    }

    // If no headers parameter is used, create empty header
    if (typeof init.headers === 'undefined') {
      init["headers"] = {};
    }

    // Read the Cookie with the security token
    // Note: Node.js seems to add a _xsrf token to the cookie with '; ' as separator
    let token = document.cookie.split('; ').map(cookie => {
      let c = cookie.split('=')
      return {
        name: c[0],
        value: c[1]
      }
    }).find(cookie => cookie.name === 'token');

    // Add the token to every request, so that we can use it in the backend.
    init.headers.Token = token.value;

    return fetch(url, init).then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @public
   */
  getAccountByPersonId(personId) {
    return this.#fetchAdvanced(this.#getAccountByPersonURL(personId)).then((responseJSON) => {
      let accountBO = AccountBO.fromJSON(responseJSON)[0];

      return new Promise(function (resolve) {
        resolve(accountBO);
      });
    });
  }

  /**
 * Returns a Promise, which resolves to an Array of ProjectBOs
 *
 * @public
 */
  getAccount(accountId) {
    return this.#fetchAdvanced(this.#getAccountURL(accountId)).then((responseJSON) => {
      let accountBO = AccountBO.fromJSON(responseJSON)[0];

      return new Promise(function (resolve) {
        resolve(accountBO);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @public
   */
  getProjects() {
    return this.#fetchAdvanced(this.#getProjectsURL()).then((responseJSON) => {
      let projectsBOs = ProjectBO.fromJSON(responseJSON);

      return new Promise(function (resolve) {
        resolve(projectsBOs);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   *
   * @public
   */
  getProjectsByCurrentUser() {
    return this.#fetchAdvanced(this.#getProjectsByCurrentUserURL()).then((responseJSON) => {
      let projectsBOs = ProjectBO.fromJSON(responseJSON);

      return new Promise(function (resolve) {
        resolve(projectsBOs);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a ProjectBO
   *
   * @param {Number} projectID to be retrieved
   * @public
   */
  getProject(id) {
    return this.#fetchAdvanced(this.#getProjectURL(id)).then((responseJSON) => {
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a PersonBO list
   *
   * @param {id} Project Id of the project members to be retrieved
   * @public
   */
  getProjectMembers(id) {
    return this.#fetchAdvanced(this.#getProjectMembersURL(id)).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      });
    });
  }

  /**
   * Returns a Promise
   *
   * @param {projectId} Project Id of the project
   * @param {member} project member to be added
   * @public
   */
  addProjectMember(projectId, member) {
    return this.#fetchAdvanced(this.#addProjectMembersURL(projectId), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(member),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
   * Returns a Promise
   *
   * @param {projectId} Project Id of the project
   * @param {memberId} Id of the project member to be removed
   * @public
   */
  deleteProjectMember(projectId, memberId) {
    return this.#fetchAdvanced(this.#deleteProjectMembersURL(projectId, memberId), {
      method: 'DELETE',
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
   * 
   * Adds a Project and returns a Promise, which resolves to a new ProjectBO object with the 
   * ... and ... of the parameter ProjectBO object.
   * 
   * @param {ProjectBO} projectBO to be added. The ID of the new project is set by the backend
   * @public
   */
  addProject(projectBO) {
    return this.#fetchAdvanced(this.#addProjectURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO),
    }).then((responseJSON) => {
      let responseProjectBO = ProjectBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjectBO);
      });
    });
  }

  /**
   * Updates a project and returns a Promise, which resolves to a ProjectBO.
   * 
   * @param {ProjectBO} projectBO to be updated
   * @public
   */
  updateProject(projectBO) {
    return this.#fetchAdvanced(this.#updateProjectURL(projectBO.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectBO),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
   * Deletes a project.
   * 
   * @param {Number} projectID to be deleted
   * @public
   */
  deleteProject(id) {
    return this.#fetchAdvanced(this.#deleteProjectURL(id), {
      method: 'DELETE',
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
   * Returns a Promise, which resolves to an Array of TaskBOs
   *
   * @public
   */
  getTasks() {
    return this.#fetchAdvanced(this.#getTasksURL()).then((responseJSON) => {
      let taskBOs = TaskBO.fromJSON(responseJSON);

      return new Promise(function (resolve) {
        resolve(taskBOs);
      });
    });

  }

  /** 
   * Returns a Promise, which resolves to an Array of TaskBOs which are related to the given project.
   *
   * @param {Number} project_id, the tasks have to be related to
   * @public
   */
  getTasksByProject(project_id) {
    return this.#fetchAdvanced(this.#getTasksByProjectURL(project_id)).then((responseJSON) => {
      let taskBOs = TaskBO.fromJSON(responseJSON);

      return new Promise(function (resolve) {
        resolve(taskBOs);
      });
    });

  }

  /**
   * Returns a Promise, which resolves to a TaskBO
   *
   * @param {Number} TaskID to be retrieved
   * @public
   */
  getTask(id) {
    return this.#fetchAdvanced(this.#getTaskURL(id))
      .then((responseJSON) => {
        let responseTaskBO = TaskBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseTaskBO);
        });
      });
  }

  /**
   * Adds a Task and returns a Promise, which resolves to a new TaskBO object with the 
   * ... and ... of the parameter TaskBO object.
   * 
   * @param {TaskBO} TaskBO to be added. The ID of the new Task is set by the backend
   * @public
   */
  addTask(taskBO) {
    return this.#fetchAdvanced(this.#addTaskURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskBO),
    }).then((responseJSON) => {
      let responseTaskBO = TaskBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseTaskBO);
      });
    });

  }

  /**
   * Updates a Task and returns a Promise, which resolves to a TaskBO.
   * 
   * @param {TaskBO} TaskBO to be updated
   * @public
   */
  updateTask(taskBO) {
    return this.#fetchAdvanced(this.#updateTaskURL(taskBO.getId()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskBO),
    }).then((responseJSON) => {
      let responseTaskBO = TaskBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseTaskBO)
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of TaskBOs
   * 
   * @param {Number} TaskID to be deleted
   * @public
   */
  deleteTask(id) {
    return this.#fetchAdvanced(this.#deleteTaskURL(id), {
      method: 'DELETE',
    }).then((responseJSON) => {
      let taskBOs = TaskBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(taskBOs);
      });
    });

  }
  /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   *
   * @public
   */
  getPersons() {
    return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
      let personBOs = PersonBO.fromJSON(responseJSON);
      return new Promise(function (resolve) {
        resolve(personBOs);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a PersonBO
   *
   * @param {Number} UserID to be retrieved
   * @public
   */
  getPerson(id) {
    return this.#fetchAdvanced(this.#getPersonURL(id)).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  /**
   * Returns a Promise, which resolves to a PersonBO
   *
   * @param {Number} UserID to be retrieved
   * @public
   */
  getPersonbyGoogleId(id) {
    return this.#fetchAdvanced(this.#getPersonByGoogleIdURL(id)).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

  /**
   * Adds a Person and returns a Promise, which resolves to a new PersonBO object with the 
   * ... and ... of the parameter PersonBO object.
   * 
   * @param {PersonBO} PersonBO to be added. The ID of the new Person is set by the backend
   * @public
   */


  addPerson(personBO) {
    return this.#fetchAdvanced(this.#addPersonURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO),
    }).then((responseJSON) => {
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO)
      });
    });
  }
  
  /**
   * Updates a Person and returns a Promise, which resolves to a PersonBO.
   * 
   * @param {PersonBO} PersonBO to be updated
   * @public
   */
  updatePerson(personBO) {
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getId()), {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO),
    }).then((responseJSON) => {

      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePersonBO)
      })
    })
  }

  /**
   * Returns a Promise, which resolves to an Array of PersonBOs
   * 
   * @param {Number} userID to be deleted
   * @public
   */
  deletePerson(id) {
    return this.#fetchAdvanced(this.#deletePersonURL(id), {
      method: 'DELETE',
    }).then((responseJSON) => {
      let personBOs = PersonBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(personBOs);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to an Array of PauseBOs
   *
   * @public
   */
  getPauses() {
    return this.#fetchAdvanced(this.#getPausesURL()).then((responseJSON) => {
      let PauseBOs = PauseBO.fromJSON(responseJSON);

      return new Promise(function (resolve) {
        resolve(PauseBOs);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a PauseBO
   *
   * @param {Number} UserID to be retrieved
   * @public
   */
  getPause(id) {
    return this.#fetchAdvanced(this.#getPauseURL(id)).then((responseJSON) => {
      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      })
    })

  }

  /**
   * Adds a Pause and returns a Promise, which resolves to a new PauseBO object with the 
   * ... and ... of the parameter PauseBO object.
   * 
   * @param {PauseBO} PauseBO to be added. The ID of the new Pause is set by the backend
   * @public
   */
  addPause(pauseBO) {
    let pauseCopy = new ProjectTimeBO(pauseBO.getStartTime(), pauseBO.getEndTime());
    pauseCopy.setId(pauseBO.getId());
    pauseCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#addPauseURL(), {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(pauseCopy),
    }).then((responseJSON) => {

      let responsePauseBO = PauseBO.fromJSON(responseJSON)[0];

      return new Promise(function (resolve) {
        resolve(responsePauseBO);
      });
    });
  }

  /**
   * Deletes a Pause Interval.
   * 
   * @param {id} Id of the object to be deleted
   * @public
   */
  deletePause(id) {
    return this.#fetchAdvanced(this.#deletePauseURL(id), {
      method: 'DELETE',
    }).then((responseJSON) => {
      let PauseBOs = PauseBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(PauseBOs);
      });
    });
  }

  /**
   * Updates a Pause Interval.
   * 
   * @param {pauseBO} Pause to be updated
   * @public
   */
  updatePause(pauseBO) {
    let pauseCopy = new ProjectTimeBO(pauseBO.getStartTime(), pauseBO.getEndTime());
    pauseCopy.setId(pauseBO.getId());
    pauseCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#updatePauseURL(pauseCopy.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(pauseCopy),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
   * Returns a Promise, which resolves to a ProjectTimeBO
   *
   * @param {id} ProjectTime ID to be retrieved
   * @public
   */
  getProjectTime(id) {
    return this.#fetchAdvanced(this.#getProjectTimeURL(id)).then((responseJSON) => {
      let responseProjectTimeBO = ProjectTimeBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjectTimeBO);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a ProjectTimeBO
   *
   * @param {projectTime} ProjectTime to be updated
   * @public
   */
  updateProjectTime(projectTime) {
    let projectTimeCopy = new ProjectTimeBO(projectTime.getStartTime(), projectTime.getEndTime());
    projectTimeCopy.setId(projectTime.getId());
    projectTimeCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#updateProjectTimeURL(projectTime.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectTimeCopy),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
 * Returns a Promise, which resolves to a ProjectTimeBO
 *
 * @param {projectTime} projectTime to be retrieved
 * @public
 */
  addProjectTime(projectTime) {
    let projectTimeCopy = new ProjectTimeBO(projectTime.getStartTime(), projectTime.getEndTime());
    projectTimeCopy.setId(projectTime.getId());
    projectTimeCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#addProjectTimeURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(projectTimeCopy),
    }).then((responseJSON) => {
      let responseProjectTimeBO = ProjectTimeBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseProjectTimeBO)
      })
    })
  }

  deleteProjectTime(id) {
    return this.#fetchAdvanced(this.#deleteProjectTimeURL(id), {
      method: 'DELETE'
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
 * Returns a Promise, which resolves to an Array of IntervalTransactionBOs
 *
 * @param {account_id} AccountId of the transactions to be retrieved
 * @param {fromTime} Start time of the transactions to be retrieved
 * @param {toTime} End time of the transactions to be retrieved
 * @public
 */
  getIntervalTransactionsTaskTimesByAccountFromTo(account_id, fromTime, toTime) {
    return this.#fetchAdvanced(this.#getIntervalTransactionsTaskTimesByAccountFromToURL(account_id, fromTime, toTime))
      .then((responseJSON) => {
        let responseIntervalTransactionsBO = IntervalTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseIntervalTransactionsBO);
        });
      });
  }

  /**
 * Returns a Promise, which resolves to an Array of IntervalTransactionBOs
 *
 * @param {account_id} AccountId of the transactions to be retrieved
 * @param {fromTime} Start time of the transactions to be retrieved
 * @param {toTime} End time of the transactions to be retrieved
 * @public
 */
  getIntervalTransactionsPauseTimesByAccountFromTo(account_id, fromTime, toTime) {
    return this.#fetchAdvanced(this.#getIntervalTransactionsPauseTimesByAccountFromToURL(account_id, fromTime, toTime))
      .then((responseJSON) => {
        let responseIntervalTransactionsBO = IntervalTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseIntervalTransactionsBO);
        });
      });
  }

  /**
* Returns a Promise, which resolves to an Array of IntervalTransactionBOs
*
* @param {person_id} PersonId of the transactions to be retrieved
* @param {fromTime} Start time of the transactions to be retrieved
* @param {toTime} End time of the transactions to be retrieved
* @public
*/
  getIntervalTransactionsByPersonFromTo(person_id, fromTime, toTime) {
    return this.#fetchAdvanced(this.#getIntervalTransactionsByPersonFromToURL(person_id, fromTime, toTime))
      .then((responseJSON) => {
        let responseIntervalTransactionsBO = IntervalTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseIntervalTransactionsBO);
        });
      });
  }

  /**
* Returns a Promise, which resolves to an Array of IntervalTransactionBOs
*
* @param {project_id} ProjectId of the transactions to be retrieved
* @param {fromTime} Start time of the transactions to be retrieved
* @param {toTime} End time of the transactions to be retrieved
* @public
*/
  getIntervalTransactionsByProjectFromTo(project_id, fromTime, toTime) {
    return this.#fetchAdvanced(this.#getIntervalTransactionsByProjectFromToURL(project_id, fromTime, toTime))
      .then((responseJSON) => {
        let responseIntervalTransactionsBO = IntervalTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseIntervalTransactionsBO);
        });
      });
  }

  /**
* Deletes an IntervalTransactionBO.
*
@param {id} Id of the object to be deleted
* @public
*/
  deleteIntervalTransaction(id) {
    return this.#fetchAdvanced(this.#deleteIntervalTransactionURL(id), {
      method: 'DELETE',
    })
      .then(() => {
        return new Promise(function (resolve) {
          resolve();
        });
      });
  }

  /**
* Updates an IntervalTransactionBO
*
* @param {intervalTransactionBO} IntervalTransactionBO to be updated
* @public
*/
  updateIntervalTransaction(intervalTransactionBO) {
    return this.#fetchAdvanced(this.#updateIntervalTransactionURL(intervalTransactionBO.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(intervalTransactionBO),
    })
      .then((responseJSON) => {
        let responseIntervalTransactionBO = IntervalTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseIntervalTransactionBO);
        });
      });
  }

  /**
 * Returns a Promise, which resolves to a IntervalTransactionBO
 *
 * @param {intervalTransactionBO} IntervalTransactionBO to be added to the database.
 * @public
 */
  addIntervalTransactionForCurrentUser(intervalTransactionBO) {
    return this.#fetchAdvanced(this.#addIntervalTransactionForCurrentUserURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(intervalTransactionBO),
    })
      .then((responseJSON) => {
        let responseIntervalTransactionBO = IntervalTransactionBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
          resolve(responseIntervalTransactionBO);
        });
      });
  }

  /**
 * Returns a Promise, which resolves to an Array of Arrival EventTransactionBOs.
 *
 * @param {account_id} AccountId of the transactions to be retrieved
 * @param {fromTime} Start time of the transactions to be retrieved
 * @param {toTime} End time of the transactions to be retrieved
 * @public
 */
  getArrivalEventTransactionsByAccountFromTo(account_id, fromTime, toTime) {
    return this.#fetchAdvanced(this.#getArrivalEventTransactionsByAccountFromToURL(account_id, fromTime, toTime))
      .then((responseJSON) => {
        let responseEventTransactionsBO = EventTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseEventTransactionsBO);
        });
      });
  }

  /**
 * Returns a Promise, which resolves to an Array of Leave EventTransactionBOs.
 *
 * @param {account_id} AccountId of the transactions to be retrieved
 * @param {fromTime} Start time of the transactions to be retrieved
 * @param {toTime} End time of the transactions to be retrieved
 * @public
 */
  getLeaveEventTransactionsByAccountFromTo(account_id, fromTime, toTime) {
    return this.#fetchAdvanced(this.#getLeaveEventTransactionsByAccountFromToURL(account_id, fromTime, toTime))
      .then((responseJSON) => {
        let responseEventTransactionsBO = EventTransactionBO.fromJSON(responseJSON);
        return new Promise(function (resolve) {
          resolve(responseEventTransactionsBO);
        });
      });
  }

  /**
   * Returns a Promise, which resolves to a eventTransaction
   *
   * @param {eventTransaction} eventTransaction to be updated
   * @public
   */
  updateEventTransaction(eventTransaction) {
    return this.#fetchAdvanced(this.#updateEventTransactionURL(eventTransaction.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(eventTransaction),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
  * Returns a Promise, which resolves to a eventTransaction
  *
  * @param {eventTransaction} eventTransaction to be retrieved
  * @public
  */
  addEventTransaction(eventTransaction) {
    return this.#fetchAdvanced(this.#addEventTransactionForCurrentUserURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(eventTransaction),
    }).then((responseJSON) => {
      let responseEventTransactionBO = EventTransactionBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseEventTransactionBO)
      })
    })
  }

  deleteEventTransaction(id) {
    return this.#fetchAdvanced(this.#deleteEventTransactionURL(id), {
      method: 'DELETE'
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a TasktTimeBO
   *
   * @param {id} TaskTime ID to be retrieved
   * @public
   */
  getTaskTime(id) {
    return this.#fetchAdvanced(this.#getTaskTimeURL(id)).then((responseJSON) => {
      let responseTaskTimeBO = TaskTimeBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseTaskTimeBO);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a TaskTimeBO
   *
   * @param {taskTime} TaskTime to be updated
   * @public
   */
  updateTaskTime(taskTime) {
    let taskTimeCopy = new TaskTimeBO(taskTime.getStartTime(), taskTime.getEndTime());
    taskTimeCopy.setId(taskTime.getId());
    taskTimeCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#updateTaskTimeURL(taskTime.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskTimeCopy),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
  * Returns a Promise, which resolves to a TaskTimeBO
  *
  * @param {taskTime} TaskTime to be retrieved
  * @public
  */
  addTaskTime(taskTime) {
    let taskTimeCopy = new TaskTimeBO(taskTime.getStartTime(), taskTime.getEndTime());
    taskTimeCopy.setId(taskTime.getId());
    taskTimeCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#addTaskTimeURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(taskTimeCopy),
    }).then((responseJSON) => {
      let responseTaskTimeBO = TaskTimeBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseTaskTimeBO)
      })
    })
  }

  deleteTaskTime(id) {
    return this.#fetchAdvanced(this.#deleteTaskTimeURL(id), {
      method: 'DELETE'
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a TasktTimeBO
   *
   * @param {id} ID to be retrieved
   * @public
   */
  getArrival(id) {
    return this.#fetchAdvanced(this.#getArrivalURL(id)).then((responseJSON) => {
      let responseArrivalBO = ArrivalBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseArrivalBO);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a TaskTimeBO
   *
   * @param {arrival} arrival to be updated
   * @public
   */
  updateArrival(arrival) {
    let arrivalCopy = new ArrivalBO(arrival.getOccurrence());
    arrivalCopy.setId(arrival.getId());
    arrivalCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#updateArrivalURL(arrivalCopy.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arrivalCopy),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
  * Returns a Promise, which resolves to a TaskTimeBO
  *
  * @param {arrival} arrival to be retrieved
  * @public
  */
  addArrival(arrival) {
    let arrivalCopy = new ArrivalBO(arrival.getOccurrence());
    arrivalCopy.setId(arrival.getId());
    arrivalCopy.formatDatesJSONReady();
    console.log(arrivalCopy);
    return this.#fetchAdvanced(this.#addArrivalURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(arrivalCopy),
    }).then((responseJSON) => {
      let responseArrivalBO = ArrivalBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseArrivalBO)
      })
    })
  }

  deleteArrival(id) {
    return this.#fetchAdvanced(this.#deleteArrivalURL(id), {
      method: 'DELETE'
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a TasktTimeBO
   *
   * @param {id} Leave ID to be retrieved
   * @public
   */
  getLeave(id) {
    return this.#fetchAdvanced(this.#getLeaveURL(id)).then((responseJSON) => {
      let responseLeaveBO = LeaveBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseLeaveBO);
      });
    });
  }

  /**
   * Returns a Promise, which resolves to a TaskTimeBO
   *
   * @param {leave} Leave to be updated
   * @public
   */
  updateLeave(leave) {
    let leaveCopy = new LeaveBO(leave.getOccurrence());
    leaveCopy.setId(leave.getId());
    leaveCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#updateLeaveURL(leaveCopy.getId()), {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(leaveCopy),
    }).then(() => {
      return new Promise(function (resolve) {
        resolve()
      })
    })
  }

  /**
  * Returns a Promise, which resolves to a TaskTimeBO
  *
  * @param {leave} leave to be retrieved
  * @public
  */
  addLeave(leave) {
    let leaveCopy = new LeaveBO(leave.getOccurrence());
    leaveCopy.setId(leave.getId());
    leaveCopy.formatDatesJSONReady();
    return this.#fetchAdvanced(this.#addLeaveURL(), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(leaveCopy),
    }).then((responseJSON) => {
      let responseLeaveBO = LeaveBO.fromJSON(responseJSON)[0];
      return new Promise(function (resolve) {
        resolve(responseLeaveBO)
      })
    })
  }

  deleteLeave(id) {
    return this.#fetchAdvanced(this.#deleteLeaveURL(id), {
      method: 'DELETE'
    }).then(() => {
      return new Promise(function (resolve) {
        resolve();
      });
    });
  }
}
