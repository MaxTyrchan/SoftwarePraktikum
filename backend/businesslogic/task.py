from uuid import UUID
from businesslogic.business_object import BusinessObject


class Task(BusinessObject):
    """
    Class Task, which implements a simple task with attributes for task name, estimated
    working time, and project id of the associated project.
    """

    def __init__(self, task_name, est_working_time, project_id):
        super().__init__()
        self._task_name = task_name
        self._est_working_time = est_working_time
        self._project_id = project_id

    def set_task_name(self, _task_name: str):
        """
        Defines the name of the task.
        :param _task_name: string containing the name.
        """
        self._task_name = _task_name
        super()._update_change_timestamp()

    def get_task_name(self) -> str:
        """
        Returns the name of the task.
        :return: string containing the name.
        """
        return self._task_name

    def set_est_working_time(self, est_working_time: float):
        """
        Defines the estimated worktime of the task.
        :param est_working_time: estimated worktime as float.
        """
        self._est_working_time = est_working_time
        super()._update_change_timestamp()

    def get_est_working_time(self) -> float:
        """
        Returns the estimated worktime.
        :return: estimated worktime as float.
        """
        return self._est_working_time

    def set_project_id(self, id):
        """
        Defines the project the task belongs to.
        :param id: id of a specific project.
        """
        self._project_id = id
        super()._update_change_timestamp()

    def get_project_id(self):
        """
        Returns the project the task belongs to.
        :return: id of a specific project.
        """
        return self._project_id

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a project object out of a dict.
        :return: project object.
        """
        task = Task(dictionary["task_name"], dictionary["est_working_time"], UUID(dictionary["project_id"]))

        if set_id == True:
            task._set_id(UUID(dictionary["id"]))
        return task
