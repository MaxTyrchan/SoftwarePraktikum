from businesslogic.task_time import TaskTime
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart
"""


class TaskTimeMapper(Mapper):
    """
    Class TaskTimeMapper, which maps the task_time objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as object.
        :return: all task-times as objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM task_times;")
        tuples = cursor.fetchall()

        for (id, last_change, start_time, end_time) in tuples:
            task_time = TaskTime(start_time, end_time)
            task_time._set_id(UUID(id))
            task_time._set_last_change(last_change)
            result.append(task_time)

        self._connection.commit()

        return result

    def find_by_key(self, key):
        """
        Get data set of the task-time with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: task-time object, which matches the key; returns None if no match is found.
        """
        result = None

        cursor = self._connection.cursor()
        cursor.execute("SELECT * from task_times WHERE id='{}'".format(key))
        tuples = cursor.fetchall()

        try:
            (id, last_change, start_time, end_time) = tuples[0]
            task_time = TaskTime(start_time, end_time)
            task_time._set_id(UUID(id))
            task_time._set_last_change(last_change)
            result = task_time
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, task_time: TaskTime):
        """
        Inserts new task-time object into database.
        :param task_time: task-time object, which is to be added to the database.
        :return: task-time object, which has been added.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO task_times (id, last_change, start_time, end_time) VALUES (%s, %s, %s, %s)"
        data = (
            str(task_time._get_id()),
            task_time._get_last_change(),
            task_time.get_start_time(),
            task_time.get_end_time(),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return task_time

    def update(self, task_time: TaskTime):
        """
        Updates an already existing task-time in database-
        :param task_time: task-time object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()

        query = "UPDATE task_times SET last_change=%s, start_time=%s, end_time=%s WHERE id=%s"
        data = (
                task_time._get_last_change(),
                task_time.get_start_time(),
                task_time.get_end_time(),
                str(task_time._get_id())
                )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return task_time

    def delete(self, task_time_id):
        """
        Deletes task-time object from database.
        :param task_time_id: primary key attribute of data set, which is to be deleted.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM task_times WHERE id='{}'".format(str(task_time_id)))

        self._connection.commit()
        cursor.close()
