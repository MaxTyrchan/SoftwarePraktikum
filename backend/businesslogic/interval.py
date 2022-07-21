from businesslogic.business_object import BusinessObject
from abc import ABC
from datetime import datetime as dt
from datetime import timedelta


class Interval(BusinessObject, ABC):
    """
    Class Interval, which implements a simple interval with attributes for start time, end time and a method for
    getting the timedelta between start and end.
    """

    def __init__(self, start_time, end_time):
        super().__init__()
        self._start_time = start_time
        self._end_time = end_time

    def set_start_time(self, start_time: dt):
        """
        Defines start-start time of an interval.
        :param start_time: datetime of start-time.
        """
        self._start_time = start_time
        super()._update_change_timestamp()

    def get_start_time(self) -> dt:
        """
        Returns the start-time of an interval.
        :return: datetime of start-time.
        """
        return self._start_time
    
    def set_end_time(self, end_time):
        """
        Defines end-start time of an interval.
        :param end_time: datetime of end-time.
        """
        self._end_time = end_time
        super()._update_change_timestamp()

    def get_end_time(self) -> dt:
        """
        Returns the end-time of an interval.
        :return: datetime of end-time.
        """
        return self._end_time

    def get_time_delta(self) -> timedelta:
        """
        Returns the difference between end and start.
        :return: timedelta of end-time and start-time.
        """
        return self._end_time-self._start_time
