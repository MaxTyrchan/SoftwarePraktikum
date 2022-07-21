

class ProjectsHasPersons:
    """
    ProjectHasPersons class, showing which person is a member of which project with attributes for
    the person and the project.
    """

    def __init__(self):
        self._person_id = ""
        self._project_id = ""

    def get_person_id(self) -> str:
        """
        Returns the id of the person.
        :return: id of a specific person.
        """
        return self._person_id

    def set_person_id(self, person_id: str):
        """
        Defines the person.
        :param person_id: id of a specific person.
        """
        self._person_id = person_id

    def get_project_id(self) -> str:
        """
        Returns the id of the project.
        :return: id of a specific project.
        """
        return self._project_id

    def set_project_id(self, project_id: str):
        """
        Defines the project.
        :param project_id: id of a specific project.
        :return:
        """
        self._project_id = project_id

    @staticmethod
    def from_dict(dictionary=dict()):
        """
        Creates a projects-has-persons object out of a dict.
        :return: projects-has-persons object.
        """
        projects_has_persons = ProjectsHasPersons()
        projects_has_persons.set_person_id(dictionary["person_id"])
        projects_has_persons.set_project_id(dictionary["project_id"])
        return projects_has_persons
