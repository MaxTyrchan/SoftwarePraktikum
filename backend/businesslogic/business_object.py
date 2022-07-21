from datetime import datetime as dt
from uuid import UUID, uuid4
from abc import ABC


"""Created a variable to make it easier to format the date string in all business objects."""
MYSQL_DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


class BusinessObject(ABC):
    """Abstract BusinessObject class, which implements methods for id and last change."""

    def __init__(self, last_change=dt.now()):
        self._last_change = last_change
        self._id: UUID = uuid4()

    def _set_uuid(self):
        """Defines id as uuid4()."""
        self._id = uuid4()

    def _set_id(self, value: UUID):
        """
        Defines id of business objects.
        :param value: id of the business object.
        """
        self._id = value

    def _get_id(self) -> UUID:
        """
        Returns the id of business objects.
        :return: if of object.
        """
        return self._id

    def _update_change_timestamp(self):
        """Updates timestamp of last change to now."""
        self._last_change = dt.now()

    def _set_last_change(self, last_change: dt):
        """
        Defines last change of an object.
        :param last_change: datetime of the last change.
        """
        self._last_change = last_change

    def _get_last_change(self) -> dt:
        """
        Returns timestamp of the last change.
        :return: datetime with last change.
        """
        return self._last_change
