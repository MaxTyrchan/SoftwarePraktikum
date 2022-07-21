from businesslogic.leave import Leave
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class LeaveMapper(Mapper):
    """
    Class LeaveMapper, which maps the leave objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as objects.
        :return: all leave objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM leaves")
        tuples = cursor.fetchall()

        for (id, last_change, occurrence) in tuples:
            leave = Leave(occurrence)
            leave._set_id(UUID(id))
            leave._set_last_change(last_change)
            result.append(leave)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get data set of the leave object with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: leave object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM leaves WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, occurrence) = tuples[0]
            leave = Leave(occurrence)
            leave._set_id(UUID(id))
            leave._set_last_change(last_change)
            result = leave
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, leave: Leave):
        """
        Inserts new leave object into database.
        :param leave: leave object, which is to be added to the database
        :return: leave objects, which is to be added to the DB.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO leaves (id, last_change, occurence) VALUES (%s, %s, %s)"
        data = (
            str(leave._get_id()),
            leave._get_last_change(),
            leave.get_occurrence(),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return leave

    def update(self, leave : Leave):
        """
        Updates an already existing data set in database.
        :param leave: leave object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        query = "UPDATE leaves SET last_change=%s, occurence=%s WHERE id=%s"
        data = (
            leave._get_last_change(),
            leave.get_occurrence(),
            str(leave._get_id())
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, leave: Leave):
        """
        Deletes leave object from database.
        :param leave: leave object, which is to be deleted.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM leaves WHERE id = {}".format(str(leave._get_id())))

        self._connection.commit()
        cursor.close()
