from businesslogic.transaction import Transaction
from businesslogic.event_transaction import EventTransaction
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class EventTransactionMapper(Mapper):
    """
    Class EventTransactionMapper, which maps the event transaction objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as objects.
        :return: all event-transaction objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM event_transactions")
        tuples = cursor.fetchall()
        for (id, last_change, account_id, event_id) in tuples:
            transaction = EventTransaction(UUID(account_id), UUID(event_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get data set of the event-transaction with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: event-transaction object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM event_transactions WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, account_id, event_id) = tuples[0]
            transaction = EventTransaction(UUID(account_id), UUID(event_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_arrivals_by_account_from_to(self, account_id, from_when, to_when):
        """
        Get all event-transaction datasets containing arrivals of a specific period and account.
        :param account_id: a specific account id.
        :param from_when: a specific occurrence, which represents the start-point of the period.
        :param to_when: a specific occurrence, which represents the end-point of the period.
        :return: all event-transaction objects of the period.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT event_transactions.id, event_transactions.last_change, "
                       "event_transactions.account_id, "
                       "event_transactions.event_id FROM "
                       "event_transactions INNER JOIN "
                       "arrivals ON event_transactions.event_id = arrivals.id AND "
                       "event_transactions.account_id = '{}' AND "
                       "arrivals.occurence >= '{}' AND "
                       "arrivals.occurence < '{}'".format(account_id, from_when, to_when))
        tuples = cursor.fetchall()
        for (id, last_change, account_id, event_id) in tuples:
            transaction = EventTransaction(UUID(account_id), UUID(event_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_leaves_by_account_from_to(self, account_id, from_when, to_when):
        """
        Get all event-transaction datasets containing leavings of a specific period and account.
        :param account_id: a specific account id
        :param from_when: a specific occurrence, which represents the start-point of the period.
        :param to_when: a specific occurrence, which represents the end-point of the period.
        :return: all event-transaction objects of the period.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT event_transactions.id, event_transactions.last_change, "
                       "event_transactions.account_id, "
                       "event_transactions.event_id FROM "
                       "event_transactions INNER JOIN "
                       "leaves ON event_transactions.event_id = leaves.id AND "
                       "event_transactions.account_id = '{}' AND "
                       "leaves.occurence >= '{}' AND "
                       "leaves.occurence < '{}'".format(account_id, from_when, to_when))
        tuples = cursor.fetchall()
        for (id, last_change, account_id, event_id) in tuples:
            transaction = EventTransaction(UUID(account_id), UUID(event_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, transaction: EventTransaction):
        """
        Inserts new  event-transaction object into database.
        :param transaction: transaction object, which is to be added to the database.
        :return: transaction object.
        """
        cursor = self._connection.cursor()
        query = "INSERT INTO event_transactions " \
                "VALUES (%s, %s, %s, %s)"

        data = (str(transaction._get_id()),
                transaction._get_last_change(),
                str(transaction.get_account()),
                str(transaction.get_event_id())
                )
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return transaction

    def update(self, transaction: Transaction):
        """
        Updates an already existing data set in database.
        :param transaction:  transaction object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        query = "UPDATE event_transactions " + "SET last_change=%s, account_id=%s, event_id=%s " \
                                        "WHERE id = %s"
        data = (transaction._get_last_change(), transaction.get_account(), transaction.get_event_id(),
                transaction._get_id())
        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, transaction: Transaction):
        """
        Deletes event-transaction object from database.
        :param transaction: transaction object, which is to be deleted.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM event_transactions WHERE id = '{}'".format(transaction._get_id()))

        self._connection.commit()
        cursor.close()
