from businesslogic.business_object import BusinessObject
from uuid import UUID


class Person(BusinessObject):
    """
    Class Person, which implements a simple person with attributes for firstname, lastname, email, username,
    google-id and role.
    """

    def __init__(self, first_name, last_name, email, user_name, google_id, role):
        super().__init__()
        self._first_name = first_name
        self._last_name = last_name
        self._email = email
        self._user_name = user_name
        self._google_id = google_id
        self._role = role

    def set_first_name(self, first_name: str):
        """
        Defines the firstname of a person.
        :param first_name: string containing firstname.
        """
        self._first_name = first_name
        super()._update_change_timestamp()

    def get_first_name(self) -> str:
        """
        Returns the firstname of a person.
        :return: string containing the firstname.
        """
        return self._first_name

    def set_last_name(self, last_name: str):
        """
        Defines the lastname of a person.
        :param last_name: string containing the lastname.
        """
        self._last_name = last_name
        super()._update_change_timestamp()

    def get_last_name(self) -> str:
        """
        Returns the lastname of a person.
        :return: string containing the lastname.
        """
        return self._last_name

    def set_email(self, email: str):
        """
        Defines the email of a person.
        :param email: string containing the email.
        """
        self._email = email
        super()._update_change_timestamp()

    def get_email(self) -> str:
        """
        Returns the email of a person.
        :return: string containing the email.
        """
        return self._email

    def set_user_name(self, user_name: str):
        """
        Defines the username of a person.
        :param user_name: string containing the username.
        """
        self._user_name = user_name
        super()._update_change_timestamp()

    def get_user_name(self) -> str:
        """
        Returns the email of a person.
        :return: string containing the email.
        """
        return self._user_name

    def set_google_id(self, google_id: str):
        """
        Defines the google-id of a person.
        :param google_id: string containing the google-id.
        :return:
        """
        self._google_id = google_id
        super()._update_change_timestamp()

    def get_google_id(self) -> str:
        """
        Returns the google-id of a person.
        :return: string containing the google-id.
        """
        return self._google_id

    def set_role(self, role: str):
        """
        Defines the role of a person.
        :param role: string containing the role.
        """
        self._role = role
        super()._update_change_timestamp()

    def get_role(self) -> str:
        """
        Returns the role of a person.
        :return: string containing the role.
        """
        return self._role

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a person out of a dict.
        :return: person object
        """
        person = Person(dictionary["first_name"],
                        dictionary["last_name"],
                        dictionary["email"],
                        dictionary["user_name"],
                        dictionary["google_id"],
                        dictionary["role"]
                        )

        if set_id == True:
            person._set_id(UUID(dictionary["id"]))
        return person
