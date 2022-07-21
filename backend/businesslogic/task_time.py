from businesslogic.interval import Interval
from datetime import datetime as dt
from datetime import timedelta
from businesslogic.business_object import MYSQL_DATE_FORMAT


class TaskTime(Interval):
    """Class TaskTime, which implements a task_time interval."""

    def __init__(self, start_time, end_time):
        super().__init__(start_time, end_time)

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a task_time interval out of a dict.
        :return: returns a task_time interval object
        """
        start = dt.strptime(dictionary["start_time"], MYSQL_DATE_FORMAT) + timedelta(hours=2)
        end = dt.strptime(dictionary["end_time"], MYSQL_DATE_FORMAT) + timedelta(hours=2)
        task_time = TaskTime(start, end)

        if set_id:
            task_time._set_id(dictionary["id"])
        return task_time
