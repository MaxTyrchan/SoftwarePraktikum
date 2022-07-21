from businesslogic.business_object import BusinessObject
from datetime import datetime as dt
from abc import ABC


class Event(BusinessObject, ABC):
    """Abstract Event class, which implements a simple event with a specific date and time."""

    def __init__(self, occurrence):
        super().__init__()
        self._occurrence = occurrence

    def set_occurrence(self, occurrence: dt):
        """
        Defines occurrence of event.
        :param occurrence: datetime of occurrence.
        :return:
        """
        self._occurrence = occurrence
        super()._update_change_timestamp()

    def get_occurrence(self) -> dt:
        """
        Returns the occurrence of the event.
        :return: datetime of occurrence.
        """
        return self._occurrence
