from businesslogic.project import Project
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class ProjectMapper(Mapper):
    """
    Class ProjectMapper, which maps the project objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as objects.
        :return: all project objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM projects")
        tuples = cursor.fetchall()

        for (id, last_change, project_name, customer, project_time_id) in tuples:
            project = Project(project_name, customer, UUID(project_time_id))
            project._set_id(UUID(id))
            project._set_last_change(last_change)

            result.append(project)

        self._connection.commit()
        cursor.close()

        return result

    def find_all_members(self, project_id: Project):
        """
        Get data sets of persons associated with the given project_id.
        :param project_id: primary key attribute of project searched for.
        :return: returns all members.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT person_id FROM projects_has_person WHERE project_id={}".format(project_id))
        tuples = cursor.fetchall()

        for (project_id, person_id) in tuples:
            project_member = Project(project_id)
            project_member._members = person_id

            result.append(project_member)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_member(self, member_id):
        """
        Get data sets of projects associated with the given member_id.
        :param member_id: primary key attribute of person searched for.
        :return: returns all members.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT projects.id, projects.last_change, projects.project_name, projects.customer, "
                       "projects.project_time_id FROM projects INNER JOIN projects_has_persons ON "
                       "projects.id = projects_has_persons.project_id AND "
                       "projects_has_persons.person_id='{}'".format(str(member_id)))
        tuples = cursor.fetchall()

        for (id, last_change, project_name, customer, project_time_id) in tuples:
            project = Project(project_name, customer, UUID(project_time_id))
            project._set_id(UUID(id))
            project._set_last_change(last_change)

            result.append(project)

        self._connection.commit()
        cursor.close()
        return result

    def find_by_key(self, key):
        """
        Get data set of the project with the given id (key).
        :param key: primary key attribute of project object.
        :return: project object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM projects WHERE id=\"{}\"".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, project_name, customer_id, project_time_id) = tuples[0]
            project = Project(project_name, customer_id, UUID(project_time_id))
            project._set_id(UUID(id))
            project._set_last_change(last_change)
            result = project
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, project: Project):
        """
        Inserts new project object into database.
        :param project: project object, which is to be added to the database.
        :return: project object, which is to be added.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO projects VALUES (%s, %s, %s, %s, %s)"
        data = (str(project._get_id()),
                project._get_last_change(),
                project.get_project_name(),
                project.get_customer(),
                str(project.get_project_time_id()),
                )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return project

    def update(self, project: Project):
        """
        Updates an already existing data set in database.
        :param project: project object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        query = "UPDATE projects SET last_change=%s, project_name=%s, customer=%s, project_time_id=%s " \
                "WHERE id=%s"
        data = (project._get_last_change(),
                project.get_project_name(),
                project.get_customer(),
                str(project.get_project_time_id()),
                str(project._get_id()))
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, key):
        """
        Deletes project object from database.
        :param key: primary key attribute of project object.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM projects WHERE id=\"{}\"".format(key))

        self._connection.commit()
        cursor.close()
