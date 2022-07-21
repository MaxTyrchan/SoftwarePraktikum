from businesslogic.interval_transaction import IntervalTransaction
from dbabstraction.mapper import Mapper
from uuid import UUID

"""
Code copied and modified from class CustomerMapper which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


class IntervalTransactionMapper(Mapper):
    """
    Class IntervalTransactionMapper, which maps the transaction objects to the database and vice versa.
    To achieve this, there are several methods for creating, searching, updating and deleting objects.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """
        Get all datasets and return them as objects.
        :return: all interval-transaction objects.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM interval_transactions")
        tuples = cursor.fetchall()
        for (id, last_change, account_id, task_id, interval_id) in tuples:
            transaction = IntervalTransaction(UUID(account_id), UUID(task_id), UUID(interval_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_all_without_tasks(self):
        """
        Get all datasets without a task and return them as objects.
        :return: all interval-transaction objects without tasks.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM interval_transactions WHERE task_id IS NULL")
        tuples = cursor.fetchall()
        for (id, last_change, account_id, task_id, interval_id) in tuples:
            transaction = IntervalTransaction(UUID(account_id), UUID(task_id), UUID(interval_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_key(self, key):
        """
        Get data set of the interval-transaction with the given id (key).
        :param key: primary key attribute of data set searched for.
        :return: interval-transaction object, which matches the key; returns None if no match is found.
        """
        result = None
        cursor = self._connection.cursor()
        cursor.execute("SELECT * FROM interval_transactions WHERE id='{}'".format(key))
        tuples = cursor.fetchall()
        try:
            (id, last_change, account) = tuples[0]
            transaction = IntervalTransaction()
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            transaction.set_account(account)
            result.append(transaction)
        except IndexError:
            result = None

        self._connection.commit()
        cursor.close()
        return result

    def find_by_account_task_times_from_to(self, account_id, from_when, to_when):
        """
        Get all interval-transactions datasets containing task-times of a specific period and account.
        :param account_id: a specific account id.
        :param from_when: a specific start-time of a task-time, which represents the start-point of the period.
        :param to_when: a specific start-time of a task-time, which represents the end-point of the period.
        :return: all interval-transaction objects of the period.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT interval_transactions.id, interval_transactions.last_change, "
                       "interval_transactions.account_id, "
                       "interval_transactions.task_id, interval_transactions.interval_id FROM "
                       "interval_transactions INNER JOIN "
                       "task_times ON interval_transactions.interval_id = task_times.id AND "
                       "interval_transactions.task_id IS NOT NULL AND "
                       "interval_transactions.account_id = '{}' AND "
                       "task_times.start_time >= '{}' AND "
                       "task_times.start_time < '{}'".format(account_id, from_when, to_when))
        tuples = cursor.fetchall()
        for (id, last_change, account_id, task_id, interval_id) in tuples:
            transaction = IntervalTransaction(UUID(account_id), UUID(task_id), UUID(interval_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_account_pause_times_from_to(self, account_id, from_when, to_when):
        """
        Get all interval-transactions datasets containing pause-times of a specific period and account.
        :param account_id: a specific account id.
        :param from_when: a specific start-time of a pause-time, which represents the start-point of the period.
        :param to_when: a specific start-time of a pause-time, which represents the end-point of the period.
        :return: all interval-transaction objects of the period.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT interval_transactions.id, interval_transactions.last_change, "
                       "interval_transactions.account_id, "
                       "interval_transactions.task_id, interval_transactions.interval_id FROM "
                       "interval_transactions INNER JOIN "
                       "pause_times ON interval_transactions.interval_id = pause_times.id AND "
                       "interval_transactions.task_id IS NULL AND "
                       "interval_transactions.account_id = '{}' AND "
                       "pause_times.start_time >= '{}' AND "
                       "pause_times.start_time < '{}'".format(account_id, from_when, to_when))
        tuples = cursor.fetchall()
        for (id, last_change, account_id, task_id, interval_id) in tuples:
            transaction = IntervalTransaction(UUID(account_id), None, UUID(interval_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_task_times_from_to(self, person_id, from_when, to_when):
        """
        Get all interval-transactions datasets containing task-times of a specific period and person.
        :param person_id: a specific person id.
        :param from_when: a specific start-time of a task-time, which represents the start-point of the period.
        :param to_when: a specific start-time of a task-time, which represents the end-point of the period.
        :return: all interval-transaction objects of the period.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT interval_transactions.id, interval_transactions.last_change, "
                       "interval_transactions.account_id, "
                       "interval_transactions.task_id, interval_transactions.interval_id FROM "
                       "interval_transactions INNER JOIN "
                       "task_times ON interval_transactions.interval_id = task_times.id AND "
                       "interval_transactions.task_id IS NOT NULL AND "
                       "task_times.start_time >= '{}' AND "
                       "task_times.start_time < '{}' INNER JOIN "
                       "accounts ON interval_transactions.account_id = accounts.id AND "
                       "accounts.person_id = '{}'".format(from_when, to_when, person_id))
        tuples = cursor.fetchall()
        for (id, last_change, account_id, task_id, interval_id) in tuples:
            transaction = IntervalTransaction(UUID(account_id), UUID(task_id), UUID(interval_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_project_task_times_from_to(self, project_id, from_when, to_when):
        """
        Get all interval-transactions datasets containing task-times of a specific period and project.
        :param project_id: a specific project id.
        :param from_when: a specific start-time of a task-time, which represents the start-point of the period.
        :param to_when: a specific start-time of a task-time, which represents the end-point of the period.
        :return: all interval-transaction objects of the period.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT interval_transactions.id, interval_transactions.last_change, "
                       "interval_transactions.account_id, interval_transactions.task_id, "
                       "interval_transactions.interval_id FROM interval_transactions "
                       "INNER JOIN task_times ON interval_transactions.interval_id = task_times.id "
                       "AND interval_transactions.task_id IS NOT NULL "
                       "AND task_times.start_time >= '{}' "
                       "AND task_times.start_time < '{}' "
                       "INNER JOIN tasks ON tasks.id = interval_transactions.task_id "
                       "INNER JOIN projects ON projects.id = tasks.project_id "
                       "AND projects.id = '{}'".format(from_when, to_when, project_id))
        tuples = cursor.fetchall()
        for (id, last_change, account_id, task_id, interval_id) in tuples:
            transaction = IntervalTransaction(UUID(account_id), UUID(task_id), UUID(interval_id))
            transaction._set_id(UUID(id))
            transaction._set_last_change(last_change)
            result.append(transaction)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, transaction: IntervalTransaction):
        """
        Inserts new  interval-transaction object into database.
        :param transaction: transaction object, which is to be added to the database.
        :return: transaction object, added to the DB.
        """
        cursor = self._connection.cursor()
        if transaction.get_task_id() == None:
            query = "INSERT INTO interval_transactions (id, last_change, account_id, interval_id)" \
                    "VALUES (%s, %s, %s, %s)"
            data = (str(transaction._get_id()), transaction._get_last_change(), str(transaction.get_account_id()),
                    str(transaction.get_interval()))
        else:
            query = "INSERT INTO interval_transactions " \
                    "VALUES (%s, %s, %s, %s, %s)"
            data = (str(transaction._get_id()), transaction._get_last_change(), str(transaction.get_account_id()),
                    str(transaction.get_task_id()), str(transaction.get_interval()))

        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()
        return transaction

    def update(self, transaction: IntervalTransaction):
        """
        Updates an already existing data set in database.
        :param transaction: transaction object, which is to be written on the existing data set.
        """
        cursor = self._connection.cursor()
        if transaction.get_task_id() == None:
            query = "UPDATE interval_transactions SET last_change=%s, account_id=%s, interval_id=%s " \
                    "WHERE id='%s'"
            data = (transaction._get_last_change(), str(transaction.get_account_id()),
                    str(transaction.get_interval()), str(transaction._get_id()))
        else:
            query = "UPDATE interval_transactions SET last_change=%s, account_id=%s, task_id=%s, interval_id=%s " \
                    "WHERE id='%s'"
            data = (transaction._get_last_change(), str(transaction.get_account_id()), str(transaction.get_task_id()),
                    str(transaction.get_interval()), str(transaction._get_id()))

        cursor.execute(query, data)

        self._connection.commit()
        cursor.close()

    def delete(self, transaction_id):
        """
        Deletes interval-transaction object from database.
        :param transaction_id: primary key attribute of data set, which is to be deleted.
        """
        cursor = self._connection.cursor()
        cursor.execute("DELETE FROM interval_transactions WHERE id='{}'".format(transaction_id))

        self._connection.commit()
        cursor.close()
