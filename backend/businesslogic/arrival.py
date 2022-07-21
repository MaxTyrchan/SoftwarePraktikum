from businesslogic.event import Event
from datetime import datetime as dt
from uuid import UUID
from datetime import timedelta
from businesslogic.business_object import MYSQL_DATE_FORMAT


class Arrival(Event):
    """Class Arrival, which implements a simple arrival event"""

    def __init__(self, occurrence):
        super().__init__(occurrence)

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates arrival event out of a dict.
        :return: returns arrival event object.
        """
        occurrence = dt.strptime(dictionary["occurrence"], MYSQL_DATE_FORMAT) + timedelta(hours=2)
        arrival = Arrival(occurrence)

        if set_id == True:
            arrival._set_id(UUID(dictionary["id"]))
        return arrival
