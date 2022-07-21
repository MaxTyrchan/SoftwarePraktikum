from businesslogic.business_object import BusinessObject


class Transaction(BusinessObject):
    """Class Transaction, which implements a simple transaction with an attribute for account and time interval."""

    def __init__(self, account_id, time_id):
        super().__init__()
        self._account_id = account_id
        self._time_id = time_id

    def set_account(self, account):
        """
        Defines the account, which belongs to the transaction.
        :param account: id of a specific account.
        :return:
        """
        self._account_id = account
        super()._update_change_timestamp()

    def get_account(self):
        """
        Returns account, which executed the transaction.
        :return: id of a specific account.
        """
        return self._account_id

    def set_time_id(self, time_id):
        """
        Defines the time interval the transaction took place in.
        :param time_id: id of a specific interval.
        """
        self._time_id = time_id
        super()._update_change_timestamp()

    def get_interval_id(self):
        """
        Returns the time interval the transaction took place in.
        :return: id of a specific interval.
        """
        return self._time_id
