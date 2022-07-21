from businesslogic.pause_time import Pause
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class PauseMapper(Mapper):
    """
    Class PauseMapper, which maps the pause objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as object.
        :return: all project-times as objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM pause_times;")
        tuples = cursor.fetchall()

        for (id, last_change, start_time, end_time) in tuples:
            pause_time = Pause(start_time, end_time)
            pause_time._set_id(UUID(id))
            pause_time._set_last_change(last_change)
            result.append(pause_time)

        self._connection.commit()

        return result

    def find_by_key(self, key):
        """
        Get data set of the pause_time with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: pause-time object, which matches the key; returns None if no match is found.
        """
        result = None

        cursor = self._connection.cursor()
        cursor.execute("SELECT * from pause_times WHERE id='{}'".format(key))
        tuples = cursor.fetchall()

        try:
            (id, last_change, start_time, end_time) = tuples[0]
            pause_time = Pause(start_time, end_time)
            pause_time._set_id(UUID(id))
            pause_time._set_last_change(last_change)
            result = pause_time
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, pause_time: Pause):
        """
        Inserts new pause-time object into database.
        :param pause_time: pause-time object, which is to be added to the database.
        :return: pause-time object, which is to be added to the database.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO pause_times (id, last_change, start_time, end_time) VALUES (%s, %s, %s, %s)"
        data = (
            str(pause_time._get_id()),
            pause_time._get_last_change(),
            pause_time.get_start_time(),
            pause_time.get_end_time(),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return pause_time

    def update(self, pause_time: Pause):
        """
         Updates an already existing pause_time in database.
         :param pause_time: pause-time object, which is to be written on the existing data set.
         """
        cursor = self._connection.cursor()

        query = "UPDATE pause_times SET last_change=%s, start_time=%s, end_time=%s WHERE id=%s"
        data = (
            pause_time._get_last_change(),
            pause_time.get_start_time(),
            pause_time.get_end_time(),
            str(pause_time._get_id())
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, pause_time: Pause):
        """
         Deletes pause-time object from database.
         :param pause_time: pause-time object, which is to be deleted.
         """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM pause_times WHERE id='{}'".format(str(pause_time._get_id())))

        self._connection.commit()
        cursor.close()
