from businesslogic.event import Event
from datetime import datetime as dt
from uuid import UUID
from datetime import timedelta
from businesslogic.business_object import MYSQL_DATE_FORMAT


class Leave(Event):
    """
    Class Leave, which implements a simple leaving event.
    """

    def __init__(self, occurrence):
        super().__init__(occurrence)

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates a arrival event out of a dict.
        :return: arrival event object.
        """
        leave = Leave(dt.strptime(dictionary["occurrence"], MYSQL_DATE_FORMAT) + timedelta(hours=2))

        if set_id == True:
            leave._set_id(UUID(dictionary["id"]))
        return leave
