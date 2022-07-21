from uuid import UUID
from businesslogic.transaction import Transaction


class IntervalTransaction(Transaction):
    """
    Class IntervalTransaction, which implements a simple transaction, containing an interval and account.
    """

    def __init__(self, account_id, task_id, interval_id):
        super().__init__(account_id, interval_id)
        self._task_id = task_id

    def set_interval(self, id):
        """
        Defines interval of the interval-transaction.
        :param id: id of an interval.
        """
        self._time_id = id
        super()._update_change_timestamp()

    def get_interval(self):
        """
        Returns the id of interval, belonging to the interval-transaction.
        :return: id of a specific interval.
        """
        return self._time_id

    def set_account_id(self, id):
        """
        Defines account, belonging to the interval-transaction.
        :param id: id of an account.
        """
        self._account_id = id
        super()._update_change_timestamp()

    def get_account_id(self):
        """
        Returns the id of account, belonging to the interval-transaction.
        :return: id of a specific account.
        """
        return self._account_id

    def set_task_id(self, id):
        """
        Defines the task, belonging to the interval_transaction.
        :param id: id of a specific task.
        """
        self._task_id = id
        super()._update_change_timestamp()

    def get_task_id(self):
        """
        Returns id of the task, belonging to the interval-transaction.
        :return: id of a specific task.
        """
        return self._task_id

    @staticmethod
    def from_dict(account_id, dictionary=dict(), set_id=False):
        """
        Creates a project object out of a dict.
        :return: a project object.
        """
        if dictionary["task_id"] == None:
            interval_transaction = IntervalTransaction(
                account_id,
                None,
                UUID(dictionary["time_id"]))
        else:
            interval_transaction = IntervalTransaction(
                account_id,
                UUID(dictionary["task_id"]),
                UUID(dictionary["time_id"]))

        if set_id == True:
            interval_transaction._set_id(UUID(dictionary["id"]))
        return interval_transaction
