from businesslogic.interval import Interval
from datetime import datetime as dt
from uuid import UUID
from datetime import timedelta
from businesslogic.business_object import MYSQL_DATE_FORMAT


class Pause(Interval):
    """Class Pause, which implements a pause interval."""

    def __init__(self, start_time, end_time):
        super().__init__(start_time, end_time)

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a pause interval out of a dict.
        :return: returns a pause interval object
        """
        start = dt.strptime(dictionary["start_time"], MYSQL_DATE_FORMAT) + timedelta(hours=2)
        end = dt.strptime(dictionary["end_time"], MYSQL_DATE_FORMAT) + timedelta(hours=2)
        pause = Pause(start, end)

        if set_id == True:
            pause._set_id(UUID(dictionary["id"]))
        return pause
