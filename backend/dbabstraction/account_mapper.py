from dbabstraction.mapper import Mapper
from businesslogic.account import Account
from businesslogic.transaction import Transaction
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class AccountMapper(Mapper):
    """
    Class AccountMapper, which maps the account objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as object.
        :return: all account objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM accounts")
        tuples = cursor.fetchall()

        for (id, last_change, owner) in tuples:
            account = Account()
            account._set_id(id)
            account._last_change = last_change
            account.set_owner_id(owner)

            result.append(account)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get data set of the account with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM accounts WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, owner_id) = tuples[0]
            account = Account(UUID(owner_id))
            account._set_id(UUID(id))
            account._last_change = last_change
            result = account
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_owner(self, owner_id):
        """
        Get data set of the account of the given owner.
        :param owner_id: id of a specific person.
        :return: object, which matches the owner_id, returns None if no match is found.
        """

        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM accounts WHERE person_id='{}'".format(str(owner_id)))
        tuples = cursor.fetchall()
        try:
            (id, last_change, owner_id) = tuples[0]
            account = Account(owner_id)
            account._id = UUID(id)
            account._last_change = last_change
            result = account
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def insert(self, account: Account):
        """
        Inserts new account object into database.
        :param account: account object, which is to be added to the database
        :return: returns the added account object
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO accounts (id, last_change, person_id) VALUES (%s, %s, %s)"
        data = (
            str(account._get_id()),
            account._get_last_change(),
            str(account.get_owner_id()),
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return account

    def update(self, account: Account):
        """
        Updates an already existing data set in database.
        :param account: account object, which is to be written on the existing data set
        """
        cursor = self._connection.cursor()
        query = "UPDATE accounts SET person_id=%s, last_change=%s WHERE id=%s"
        data = (
            str(account.set_owner_id()),
            account._get_last_change(),
            str(account._get_id())
        )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, account: Account):
        """
        Deletes account object from database.
        :param account: account object, which is to be deleted
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM accounts WHERE id='{}'".format(account._get_id()))

        self._connection.commit()
        cursor.close()
