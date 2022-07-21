from businesslogic.interval import Interval
from datetime import datetime as dt
from uuid import UUID
from datetime import timedelta
from businesslogic.business_object import MYSQL_DATE_FORMAT


class ProjectTime(Interval):
    """Class ProjectTime, which implements a project_time interval."""

    def __int__(self):
        super().__init__()

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a project_time interval out of a dict.
        :return: returns a project_time interval object
        """

        project_time = ProjectTime(
            dt.strptime(dictionary["start_time"], MYSQL_DATE_FORMAT) + timedelta(hours=2),
            dt.strptime(dictionary["end_time"], MYSQL_DATE_FORMAT) + timedelta(hours=2),
        )

        if set_id == True:
            project_time._set_id(UUID(dictionary["id"]))
        return project_time
