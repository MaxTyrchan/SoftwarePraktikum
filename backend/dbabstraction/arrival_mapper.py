from businesslogic.arrival import Arrival
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class ArrivalMapper(Mapper):
    """
    Class ArrivalMapper, which maps the arrival objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as object.
        :return: all arrival objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM arrivals")
        tuples = cursor.fetchall()

        for (id, last_change, occurrence) in tuples:
            arrival = Arrival(occurrence)
            arrival._set_id(UUID(id))
            arrival._set_last_change(last_change)
            result.append(arrival)

        self._connection.commit()

        return result

    def find_by_key(self, key):
        """
        Get data set of the arrival object with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: returns arrival object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM arrivals WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, occurrence) = tuples[0]
            arrival = Arrival(occurrence)
            arrival._set_id(UUID(id))
            arrival._set_last_change(last_change)
            result = arrival
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, arrival: Arrival):
        """
        Inserts new arrival object into database.
        :param arrival: object, which is to be added to the database.
        :return: returns the added arrival object.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO arrivals (id, last_change, occurence) VALUES (%s, %s, %s)"
        data = (
            str(arrival._get_id()),
            arrival._get_last_change(),
            arrival.get_occurrence(),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return arrival

    def update(self, arrival: Arrival):
        """
        Updates an already existing data set in database.
        :param arrival: arrival object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        query = "UPDATE arrivals SET last_change=%s, occurence=%s WHERE id=%s"
        data = (
            arrival._get_last_change(),
            arrival.get_occurrence(),
            str(arrival._get_id())
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, arrival: Arrival):
        """
        Deletes arrival object from database.
        :param arrival: arrival object, which is to be deleted
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM arrivals WHERE id = '{}'".format(str(arrival._get_id())))

        self._connection.commit()
        cursor.close()
