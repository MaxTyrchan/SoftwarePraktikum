from businesslogic.person import Person
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class PersonMapper(Mapper):
    """
    Class PersonMapper, which maps the person objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as objects.
        :return: all person objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM persons")
        tuples = cursor.fetchall()
        for (id, last_change, first_name, last_name, email, user_name, google_id, role) in tuples:
            person = Person(first_name, last_name, email, user_name, google_id, role)
            person._set_id(UUID(id))
            person._set_last_change(last_change)
            result.append(person)
        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get data set of the person with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: person object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM persons WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, first_name, last_name, email, user_name, google_id, role) = tuples[0]
            person = Person(first_name, last_name, email, user_name, google_id, role)
            person._set_id(UUID(id))
            person._set_last_change(last_change)
            result = person
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_last_name(self, last_name):
        """
        Get data set of the person with the given id (key).
        :param last_name: lastname of person searched for.
        :return: person object, which matches the key; returns None if no match is found.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM persons WHERE last_name='{}'".format(last_name))
        tuples = cursor.fetchall()
        try:
            (id, last_change, first_name, last_name, email, user_name, google_id, role) = tuples[0]
            person = Person(first_name, last_name, email, user_name, google_id, role)
            person._set_id(UUID(id))
            person._set_last_change(last_change)
            result = person
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_google_id(self, g_id):
        """
        Get data set of the person with the given google_id (g_id).
        :param g_id: google-id of person searched for.
        :return: person object, which matches the key; returns None if no match is found.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM persons WHERE google_id='{}'".format(g_id))
        tuples = cursor.fetchall()
        try:
            (id, last_change, first_name, last_name, email, user_name, google_id, role) = tuples[0]
            person = Person(first_name, last_name, email, user_name, google_id, role)
            person._set_id(UUID(id))
            person._set_last_change(last_change)
            result = person
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_email(self, email):
        """
        Get data set of the person with the given email (email).
        :param email: email of person searched for.
        :return: person object, which matches the key; returns None if no match is found.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM persons WHERE email='{}'".format(email))
        tuples = cursor.fetchall()
        try:
            (id, last_change, first_name, last_name, email, user_name, google_id, role) = tuples[0]
            person = Person(first_name, last_name, email, user_name, google_id, role)
            person._set_id(UUID(id))
            person._last_change = last_change
            result = person
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, person: Person):
        """
        Inserts new person object into database.
        :param person: person object, which is to be added to the database.
        :return: person object, which is to be added.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO persons (id, last_change, first_name, last_name, email, user_name, google_id, role ) " \
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        data = (
                str(person._get_id()),
                person._get_last_change(),
                person.get_first_name(),
                person.get_last_name(),
                person.get_email(),
                person.get_user_name(),
                person.get_google_id(),
                person.get_role(),
                )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return person

    def update(self, person: Person):
        """
        Updates an already existing data set in database.
        :param person: person object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        query = "UPDATE persons SET first_name=%s, last_name=%s, email=%s, user_name=%s, google_id=%s, role=%s, " \
                "last_change=%s WHERE id=%s"
        data = (
            person.get_first_name(),
            person.get_last_name(),
            person.get_email(),
            person.get_user_name(),
            person.get_google_id(),
            person.get_role(),
            person._get_last_change(),
            str(person._get_id()),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, person_id):
        """
        Deletes person object from database.
        :param person_id: id of a specific person, which is to be deleted
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM persons WHERE id='{}'".format(person_id))

        self._connection.commit()
        cursor.close()

    def find_persons_by_project_id(self, project_id):
        """
        Get a person object by its membership in a project.
        :param project_id: id of a specific project.
        :return: person object.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id, last_change, first_name, last_name, email, user_name, google_id, role "
                       "FROM projects_has_persons INNER JOIN persons ON "
                       "projects_has_persons.person_id = persons.id AND "
                       "projects_has_persons.project_id=\"{}\";".format(project_id))
        tuples = cursor.fetchall()

        for (id, last_change, first_name, last_name, email, user_name, google_id, role) in tuples:
            person = Person(first_name, last_name, email, user_name, google_id, role)
            person._set_id(UUID(id))
            person._set_last_change(last_change)

            result.append(person)

        self._connection.commit()
        cursor.close()
        return result

    def insert_person_by_project_id(self, project_id, person):
        """
        Inserts a person into a project and creates membership between them.
        :param project_id: id of a specific project.
        :param person: person object
        :return: person object, which is to be added.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO projects_has_persons (person_id, project_id) " \
                "VALUES (%s, %s)"
        data = (
            str(person._get_id()),
            str(project_id),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return person

    def delete_person_by_project_id(self, project_id, person_id):
        """
        Deletes a person out of a project and dissolves relationship.
        :param project_id: id of a specific project.
        :param person_id: id of a specific person.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM projects_has_persons WHERE person_id='{}' "
                       "AND project_id='{}'".format(str(person_id), str(project_id)))

        self._connection.commit()
        cursor.close()
