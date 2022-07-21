from businesslogic.business_object import BusinessObject
from uuid import UUID


class Account(BusinessObject):
    """Class Account, which implements a simple account with a attribute for owner"""

    def __init__(self, owner_id):
        super().__init__()
        self._owner_id = owner_id

    def set_owner_id(self, owner_id):
        """
        Defines owner of account.
        :param owner_id: id of a specific person.
        """
        self._owner_id = owner_id
        super()._update_change_timestamp()

    def get_owner_id(self) -> str:
        """
        Returns id of owner.
        :return: id of a specific person.
        """
        return self._owner_id

    @staticmethod
    def from_dict(dictionary=dict(), set_id=False):
        """
        Creates an account out of a dict.
        :return: account object.
        """
        account = Account(UUID(dictionary["owner_id"]))
        if set_id == True:
            account._set_id(UUID(dictionary["id"]))
        return account
