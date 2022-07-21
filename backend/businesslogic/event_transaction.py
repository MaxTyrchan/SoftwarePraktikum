from uuid import UUID
from businesslogic.transaction import Transaction


class EventTransaction(Transaction):
    """Class EventTransaction, which implements a simple transaction, containing an account and event."""

    def __init__(self, account_id, event_id):
        super().__init__(account_id, event_id)

    def set_event_id(self, id):
        """
        Defines the event in the event-transaction.
        :param id: id of a specific event.
        """
        self._time_id = id
        super()._update_change_timestamp()

    def get_event_id(self):
        """
        Returns id of event.
        :return: id of a specific event.
        """
        return self._time_id

    @staticmethod
    def from_dict(account_id, dictionary=dict(), set_id=False):
        """
        Creates a project object out of a dict.
        :return: event-transaction object.
        """
        event_transaction = EventTransaction(account_id, UUID(dictionary["time_id"]))

        if set_id == True:
            event_transaction._set_id(UUID(dictionary["id"]))
        return event_transaction
