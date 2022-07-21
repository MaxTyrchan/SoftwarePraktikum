from businesslogic.project_time import ProjectTime
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class ProjectTimeMapper(Mapper):
    """
    Class ProjectTimeMapper, which maps the project_time objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as object.
        :return: all project-time objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM project_times;")
        tuples = cursor.fetchall()

        for (id, last_change, start_time, end_time) in tuples:
            project_time = ProjectTime(start_time, end_time)
            project_time._set_id(UUID(id))
            project_time._set_last_change(last_change)
            result.append(project_time)

        self._connection.commit()

        return result

    def find_by_key(self, key):
        """
        Get data set of the project-time with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: project-time object, which matches the key; returns None if no match is found.
        """
        result = None

        cursor = self._connection.cursor()
        cursor.execute("SELECT * from project_times WHERE id='{}'".format(key))
        tuples = cursor.fetchall()

        try:
            (id, last_change, start_time, end_time) = tuples[0]
            project_time = ProjectTime(start_time, end_time)
            project_time._set_id(UUID(id))
            project_time._set_last_change(last_change)
            result = project_time
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, project_time: ProjectTime):
        """
        Inserts new project-time object into database.
        :param project_time: project-time object, which is to be added to the database.
        :return: project-time object, which is to be added.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO project_times (id, last_change, start_time, end_time) VALUES (%s, %s, %s, %s)"
        data = (
            str(project_time._get_id()),
            project_time._get_last_change(),
            project_time.get_start_time(),
            project_time.get_end_time(),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return project_time

    def update(self, project_time: ProjectTime):
        """
        Updates an already existing project_time in database.
        :param project_time: project-time object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()

        query = "UPDATE project_times SET last_change=%s, start_time=%s, end_time=%s WHERE id=%s"
        data = (
                project_time._get_last_change(),
                project_time.get_start_time(),
                project_time.get_end_time(),
                str(project_time._get_id())
                )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, id):
        """
        Deletes project_time object from database.
        :param id: primary key attribute of the project-time object.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM project_times WHERE id='{}'".format(id))

        self._connection.commit()
        cursor.close()
