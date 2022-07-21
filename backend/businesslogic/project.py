from businesslogic.business_object import BusinessObject
from uuid import UUID


class Project(BusinessObject):
    """Class Project, which implements a project with attributes for project name, customer and project-time."""

    def __init__(self, project_name, customer, project_time_id):
        super().__init__()
        self._project_name = project_name
        self._customer = customer
        self._project_time_id = project_time_id

    def set_project_name(self, project_name: str):
        """
        Defines the name of the project.
        :param project_name: string containing the name
        """
        self._project_name = project_name
        super()._update_change_timestamp()

    def get_project_name(self) -> str:
        """
        Returns the name of the project.
        :return: string containing the name.
        """
        return self._project_name

    def set_customer(self, customer: str):
        """
        Defines the customer of the project.
        :param customer: string containing the customer name.
        """
        self._customer = customer
        super()._update_change_timestamp()

    def get_customer(self) -> str:
        """
        Returns the customer of the project.
        :return: string containing the customer.
        """
        return self._customer

    def set_project_time_id(self, id):
        """
        Defines the duration of a project.
        :param id: id of a specific project-time interval.
        """
        self._project_time_id = id
        super()._update_change_timestamp()

    def get_project_time_id(self):
        """
        Returns the duration of a project.
        :return: id of a specific project-time interval.
        """
        return self._project_time_id

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a project object out of a dict.
        :return: a project object
        """
        project = Project(dictionary["project_name"], dictionary["customer"], UUID(dictionary["project_time_id"]))

        if set_id == True:
            project._set_id(UUID(dictionary["id"]))
        return project
