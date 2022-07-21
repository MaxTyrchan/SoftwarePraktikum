from businesslogic.task import Task
from businesslogic.project import Project
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class TaskMapper(Mapper):
    """
    Class TaskMapper, which maps the task objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them das objects.
        :return: all task objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM tasks")
        tuples = cursor.fetchall()

        for (id, last_change, taskName, estWorkingTime, projectId) in tuples:
            task = Task(taskName, estWorkingTime,  UUID(projectId))
            task._id = UUID(id)
            task._last_change = last_change

            result.append(task)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get data set of the task with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: task object, which matches the key; returns None if no match is found.
        """
        result = None

        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM tasks WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, taskName, estWorkingTime, project_id) = tuples[0]
            task = Task(taskName, estWorkingTime,  UUID(project_id))
            task._id = UUID(id)
            task._last_change = last_change
            result = task
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_project(self, project_id: Project):
        """
        Get data set of the task associated with the given project id.
        :param project_id: primary key attribute of project object.
        :return: task object, which belongs to the project searched for.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM tasks WHERE project_id='{}'".format(str(project_id)))
        tuples = cursor.fetchall()

        for (id, last_change, task_name, est_working_time, projectId) in tuples:
            task = Task(task_name, est_working_time,  UUID(projectId))
            task._id = UUID(id)
            task._last_change = last_change

            result.append(task)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, task: Task):
        """
        Inserts new task object into database.
        :param task: task object, which is to be added to the database.
        :return: task object, which has been added.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO tasks VALUES (%s, %s, %s, %s, %s)"
        data = (str(task._get_id()), task._get_last_change(), task.get_task_name(), task.get_est_working_time(),
                str(task.get_project_id()))
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return task

    def update(self, task: Task):
        """
        Updates an already existing data set in database.
        :param task: task object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        query = "UPDATE tasks SET last_change=%s, task_name=%s, est_working_time=%s, project_id=%s WHERE id=%s"
        data = (task._get_last_change(), task.get_task_name(), task.get_est_working_time(),
                str(task.get_project_id()), str(task._get_id()))
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, task_id):
        """
        Deletes task object from database.
        :param task_id: primary key attribute of data set, which is to be deleted.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM tasks WHERE id='{}'".format(task_id))

        self._connection.commit()
        cursor.close()
