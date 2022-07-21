from businesslogic.person import Person
from businesslogic.account import Account
from businesslogic.pause_time import Pause
from businesslogic.arrival import Arrival
from businesslogic.leave import Leave
from businesslogic.interval_transaction import IntervalTransaction

from dbabstraction.person_mapper import PersonMapper
from dbabstraction.project_mapper import ProjectMapper
from dbabstraction.project_time_mapper import ProjectTimeMapper
from dbabstraction.task_mapper import TaskMapper
from dbabstraction.account_mapper import AccountMapper
from dbabstraction.task_time_mapper import TaskTimeMapper
from dbabstraction.pause_time_mapper import PauseMapper
from dbabstraction.arrival_mapper import ArrivalMapper
from dbabstraction.leave_mapper import LeaveMapper
from dbabstraction.event_transaction_mapper import EventTransactionMapper
from dbabstraction.interval_transaction_mapper import IntervalTransactionMapper

"""
Code copied and modified from module BankAdministration.py which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


#######################################################################################################################
# Specific methods for person
#######################################################################################################################

def create_person_with_account(first_name, last_name, email, user_name, google_id, role):
    """
    Creates a person object and passes the object to the person-mapper.
    An account object gets created in the create_account_for_person function with the id of the created person.
    :param first_name: firstname of the person
    :param last_name: lastname of the person
    :param email: email of the person
    :param user_name: username of the person
    :param google_id: google-id of the person
    :param role: role of the person
    """
    person = Person(first_name, last_name, email, user_name, google_id, role)
    person._set_uuid()

    create_account_for_person(person)

    with PersonMapper() as mapper:
        return mapper.insert(person)


def get_all_persons():
    """
    Requests the person-mapper to return all the persons from the DB.
    :return: all person objects from the DB.
    """
    with PersonMapper() as mapper:
        return mapper.find_all()


def get_person_by_id(key):
    """
    Requests the person-mapper to return a specific person-object by its id.
    :param key: id of a specific person.
    :return: a specific person object.
    """
    with PersonMapper() as mapper:
        return mapper.find_by_key(key)


def get_person_by_last_name(name):
    """
    Requests the person-mapper to return a specific person-object by its lastname.
    :param name: lastname of a specific person.
    :return: a specific person object.
    """
    with PersonMapper() as mapper:
        return mapper.find_by_last_name(name)


def get_person_by_email(email):
    """
    Requests the person-mapper to return a specific person-object by its email.
    :param email: email of a specific person.
    :return: a specific person object.
    """
    with PersonMapper() as mapper:
        return mapper.find_by_email(email)


def get_person_by_google_id(g_id):
    """
    Requests the person-mapper to return a specific person-object by its google-id.
    :param g_id: google-id of a specific person.
    :return: a specific person object.
    """
    with PersonMapper() as mapper:
        return mapper.find_by_google_id(g_id)


def insert_person(person):
    """
    Requests the person-mapper to insert a specific person-object.
    :param person: person object.
    """
    with PersonMapper() as mapper:
        return mapper.insert(person)


def update_person(person):
    """
    Requests the person-mapper to update a specific person-object.
    :param person: person object.
    """
    with PersonMapper() as mapper:
        return mapper.update(person)


def delete_person(id):
    """
    Requests the person-mapper to update a specific person-object.
    :param id: id of a specific person object.
    """
    with PersonMapper() as mapper:
        return mapper.delete(id)


def get_persons_by_project_id(project_id):
    """
    Requests the person-mapper to return a specific person-object by its project_id.
    :param project_id: project_id of a specific person.
    :return: a specific person object.
    """
    with PersonMapper() as mapper:
        return mapper.find_persons_by_project_id(project_id)


def insert_persons_by_project_id(project_id, person):
    """
    Requests the person-mapper to insert a person by its project.
    :param project_id: id of a specific project.
    :param person: id of a specific person.
    """
    with PersonMapper() as mapper:
        return mapper.insert_person_by_project_id(project_id, person)


def delete_persons_by_project_id(project_id, person_id):
    """
    Requests the person-mapper to delete a person by its project.
    :param project_id: id of a specific project.
    :param person_id: id of a specific person.
    """
    with PersonMapper() as mapper:
        return mapper.delete_person_by_project_id(project_id, person_id)


#######################################################################################################################
# Specific methods for account
#######################################################################################################################

def create_account_for_person(person):
    """
    Creates a account object with reverence to a person and requests account-mapper to insert it into the DB.
    :param person: a specific person object.
    """
    with AccountMapper() as mapper:
        if person is not None:
            account = Account(person._get_id())
            return mapper.insert(account)
        else:
            return None


def get_all_accounts():
    """
    Requests the account-mapper to return all the person objects from DB.
    :return: all person objects.
    """
    with AccountMapper() as mapper:
        return mapper.find_all()


def get_account_by_id(id):
    """
    Requests the account-mapper to return a account by its id.
    :param id: id of a specific account.
    :return: account object.
    """
    with AccountMapper() as mapper:
        return mapper.find_by_key(id)


def update_account(account):
    """
    Requests the account-mapper to update a account.
    :param account: account object.
    """
    with AccountMapper() as mapper:
        return mapper.update(account)


def delete_account(account):
    """
    Requests the account-mapper to delete a account.
    :param account: account object.
    """
    with AccountMapper() as mapper:
        return mapper.delete(account)


def get_account_by_person_id(person_id):
    """
    Requests the account-mapper to return a account by the id of the person.
    :param person_id: id of a specific person.
    :return:
    """
    with AccountMapper() as mapper:
        return mapper.find_by_owner(person_id)


#######################################################################################################################
# Specific methods for project
#######################################################################################################################


def get_all_projects():
    """
    Requests the project-mapper to return all projects from the DB.
    :return: all project objects.
    """
    with ProjectMapper() as mapper:
        return mapper.find_all()


def get_project_by_id(id):
    """
    Requests the project-mapper to return a project by its id.
    :param id: id of a specific project.
    :return: a project object.
    """
    with ProjectMapper() as mapper:
        return mapper.find_by_key(id)


def get_project_by_member(member_id):
    """
    Requests the project-mapper to return a project by its member-id.
    :param member_id: id of a specific member.
    :return: a project object.
    """
    with ProjectMapper() as mapper:
        return mapper.find_by_member(member_id)


def insert_project(project):
    """
    Requests the project-mapper to insert a project into the DB.
    :param project: a project object.
    """
    with ProjectMapper() as mapper:
        return mapper.insert(project)


def update_project(project):
    """
    Requests the prokject-mapper to update a project in the DB.
    :param project: a project object.
    """
    with ProjectMapper() as mapper:
        return mapper.update(project)


def delete_project(id):
    """
    Requests the project-mapper to delete a project from the DB.
    :param id: id of a specific project.
    """
    with ProjectMapper() as mapper:
        return mapper.delete(id)


#######################################################################################################################
# Specific methods for task
#######################################################################################################################


def get_all_tasks():
    """
    Requests the task-mapper to return all the tasks from the DB.
    :return: all task objects.
    """
    with TaskMapper() as mapper:
        return mapper.find_all()


def get_task_by_id(id):
    """
    Requests the task-mapper to return a task by its id.
    :param id: id of a specific task.
    :return: a task object.
    """
    with TaskMapper() as mapper:
        return mapper.find_by_key(id)


def get_task_by_project_id(project_id):
    """
    Requests the task-mapper to return a task by its project-id.
    :param project_id: id of a specific project.
    :return: a task object.
    """
    with TaskMapper() as mapper:
        return mapper.find_by_project(project_id)


def insert_task(task):
    """
    Requests the task-mapper to insert a specific task object.
    :param task: a task object.
    """
    with TaskMapper() as mapper:
        return mapper.insert(task)


def update_task(task):
    """
    Requests the task-mapper to update a specific task object.
    :param task: a task object.
    """
    with TaskMapper() as mapper:
        return mapper.update(task)


def delete_task(task):
    """
    Requests the task-mapper to delete a specific task object.
    :param task: a task object.
    """
    with TaskMapper() as mapper:
        return mapper.delete(task)


#######################################################################################################################
# Specific methods for event transactions
#######################################################################################################################


def get_all_event_transactions():
    """
    Requests the event-transaction-mapper to return all event-transactions from the DB.
    :return: all event transaction objects.
    """
    with EventTransactionMapper() as mapper:
        return mapper.find_all()


def get_event_transactions_by_arrivals_and_account_from_to(account_id, from_when, to_when):
    """
    Requests the event-transaction-mapper to return all event-transactions containing arrivals of a specific
    period and account.
    :param account_id: a specific account id.
    :param from_when:  a specific occurrence, which represents the start-point of the period.
    :param to_when: a specific occurrence, which represents the end-point of the period.
    :return: all event-transaction objects of the period.
    """
    with EventTransactionMapper() as mapper:
        return mapper.find_arrivals_by_account_from_to(account_id, from_when, to_when)


def get_event_transactions_by_leaves_and_account_from_to(account_id, from_when, to_when):
    """
    Requests the event-transaction-mapper to return all event-transactions containing leaves of a specific
    period and account.
    :param account_id: a specific account id
    :param from_when: a specific occurrence, which represents the start-point of the period.
    :param to_when: a specific occurrence, which represents the end-point of the period.
    :return: all event-transaction objects of the period.
    """
    with EventTransactionMapper() as mapper:
        return mapper.find_leaves_by_account_from_to(account_id, from_when, to_when)


def get_event_transaction_by_id(key):
    """
    Requests the event-transaction-mapper to return all event-transactions by their primary key.
    :param key: id of a specific event-transaction.
    :return: event-transaction object with the specific id.
    """
    with EventTransactionMapper() as mapper:
        return mapper.find_by_key(key)


def insert_event_transaction(transaction):
    """
    Requests the event-transaction-mapper to insert a new event-transaction into the DB.
    :param transaction: transaction object, which is to be added.
    """
    with EventTransactionMapper() as mapper:
        return mapper.insert(transaction)


def update_event_transaction(transaction):
    """
    Requests the event-transaction-mapper to update an object in the DB.
    :param transaction: task object to be upadted.
    """
    with EventTransactionMapper() as mapper:
        return mapper.update(transaction)


def delete_event_transaction(transaction):
    """
    Requests the event-transaction-mapper to delete an objects from the DB.
    :param transaction: transaction object, which is to be deleted.
    """
    with EventTransactionMapper() as mapper:
        return mapper.delete(transaction)


#######################################################################################################################
# Specific methods for interval transactions
#######################################################################################################################


def insert_worktime_transaction(work_time_transaction: IntervalTransaction):
    """
    Requests interval-transaction-mapper to insert a new object into the DB.
    :param work_time_transaction: work-time-transaction object, which is to be inserted.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.insert(work_time_transaction)


def insert_pause_transaction(pause_time: Pause):
    """
    Requests pause-mapper to insert a new object into the DB.
    :param pause_time: pause-time object, which is to be inserted.
    """
    with PauseMapper() as mapper:
        return mapper.insert(pause_time)


def insert_pause_transaction(pause_time_transaction: IntervalTransaction):
    """
    Requests the interval-transaction-mapper to insert a new pause-time-transaction object into the DB.
    :param pause_time_transaction: pause-time-transaction object, which is to be inserted.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.insert(pause_time_transaction)


def get_all_interval_transactions():
    """
    Requests the interval-transaction-mapper to return all interval-transaction from the DB.
    :return: all interval-transaction objects.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_all()


def get_all_interval_transactions_without_tasks():
    """
    Requests interval-transaction-mapper to return all interval-transaction, which don´t contain a task.
    :return: all interval-transaction, which don´t contain a task.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_all_without_tasks()


def get_interval_transactions_from_to(from_when, to_when):
    """
    Requests interval-transaction-mapper to return interval-transactions of a specific start- and end-date.
    :param from_when: a specific occurrence, which represents the start-date.
    :param to_when: a specific occurrence, which represents the end-date.
    :return: interval-transaction object, with the specific start- and end-date.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_from_to(from_when, to_when)


def get_interval_transactions_by_account_pause_times_from_to(account_id, from_when, to_when):
    """
    Requests tje interval-transaction-mapper to return all datasets containing pause-times of a specific
    period and account.
    :param account_id: a specific account id.
    :param from_when: a specific start-time of a pause-time, which represents the start-point of the period.
    :param to_when: a specific start-time of a pause-time, which represents the end-point of the period.
    :return: all interval-transaction objects of the period.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_by_account_pause_times_from_to(account_id, from_when, to_when)


def get_interval_transactions_by_account_task_times_from_to(account_id, from_when, to_when):
    """
    Requests tje interval-transaction-mapper to return all datasets containing task-times of a specific
    period and account.
    :param account_id: a specific account id.
    :param from_when: a specific start-time of a task-time, which represents the start-point of the period.
    :param to_when: a specific start-time of a task-time, which represents the end-point of the period.
    :return: all interval-transaction objects of the period.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_by_account_task_times_from_to(account_id, from_when, to_when)


def get_interval_transactions_by_person_task_times_from_to(person_id, from_when, to_when):
    """
    Requests tje interval-transaction-mapper to return all datasets containing task-times of a specific
    period and person.
    :param person_id: a specific person id.
    :param from_when: a specific start-time of a task-time, which represents the start-point of the period.
    :param to_when: a specific start-time of a task-time, which represents the end-point of the period.
    :return: all interval-transaction objects of the period.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_by_person_task_times_from_to(person_id, from_when, to_when)


def get_interval_transactions_by_project_task_times_from_to(project_id, from_when, to_when):
    """
    Requests tje interval-transaction-mapper to return all datasets containing task-times of a specific
    period and project.
    :param project_id: a specific project id.
    :param from_when: a specific start-time of a task-time, which represents the start-point of the period.
    :param to_when: a specific start-time of a task-time, which represents the end-point of the period.
    :return: all interval-transaction objects of the period.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_by_project_task_times_from_to(project_id, from_when, to_when)


def get_interval_transaction_by_id(key):
    """
    Requests the interval-transaction-mapper to return a interval-transaction object by its id.
    :param key: primary key attribute of data set searched for.
    :return: transaction-attribute with the id searched for.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.find_by_key(key)


def insert_interval_transaction(interval_transaction):
    """
    Requests the interval-transaction-mapper to insert a new interval-transaction object into the DB.
    :param interval_transaction: interval-transaction-object.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.insert(interval_transaction)


def delete_interval_transaction(interval_transaction_id):
    """
    Requests the interval-transaction-mapper to delete an interval-transaction object by its id.
    :param interval_transaction_id: id of a specific interval-transaction object.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.delete(interval_transaction_id)


def update_interval_transaction(interval_transaction):
    """
    Requests the interval-transaction-mapper to update an interval-transaction object.
    :param interval_transaction: interval-transaction object, which is to be updated.
    """
    with IntervalTransactionMapper() as mapper:
        return mapper.update(interval_transaction)


#######################################################################################################################
# Specific methods for arrival
#######################################################################################################################


def insert_arrival(arrival: Arrival):
    """
    Requests the arrival-mapper to insert a new arrival object into the DB.
    :param arrival: arrival object, which is to be inserted.
    :return:
    """
    with ArrivalMapper() as mapper:
        return mapper.insert(arrival)


def update_arrival(arrival: Arrival):
    """
    Requests the arrival-mapper to update a arrival object.
    :param arrival: arrival object, which is to be updated.
    """
    with ArrivalMapper() as mapper:
        return mapper.update(arrival)


def delete_arrival(arrival: Arrival):
    """
    Requests the arrival-mapper to delete a arrival object.
    :param arrival: arrival object, which is to be deleted.
    """
    with ArrivalMapper() as mapper:
        return mapper.delete(arrival)


def get_all_arrivals():
    """
    Requests the arrival-mapper to return all the arrival objects from DB.
    :return: all arrival objects.
    """
    with ArrivalMapper() as mapper:
        return mapper.find_all()


def get_arrival_by_id(id):
    """
    Requests the arrival-mapper to return a arrival object by its id.
    :param id: id of a specific arrival object.
    :return: specific arrival object.
    """
    with ArrivalMapper() as mapper:
        return mapper.find_by_key(id)


#######################################################################################################################
# Specific methods for leave
#######################################################################################################################


def insert_leave(leave: Leave):
    """
    Requests the leave-mapper to insert a new leave object into the DB.
    :param leave: leave object, which is to be inserted.
    """
    with LeaveMapper() as mapper:
        return mapper.insert(leave)


def update_leave(leave: Leave):
    with LeaveMapper() as mapper:
        return mapper.update(leave)


def delete_leave(leave: Leave):
    with LeaveMapper() as mapper:
        return mapper.delete(leave)


def get_all_leaves():
    """
    Requests the leave-mapper to return all leave objects from the DB.
    :return: all leave objects.
    """
    with LeaveMapper() as mapper:
        return mapper.find_all()


def get_leave_by_id(id):
    """
    Requests the leave-mapper to return a leave object by its id.
    :param id: id of a specific leave object.
    :return: a specific leave object.
    """
    with LeaveMapper() as mapper:
        return mapper.find_by_key(id)


#######################################################################################################################
# Specific methods for task time
#######################################################################################################################


def create_task_time(task_time):
    """
    Requests the task-time-mapper to insert a new task-time object into the DB.
    :param task_time: task-time object, which is to be inserted.
    """
    with TaskTimeMapper() as mapper:
        return mapper.insert(task_time)


def get_all_task_times():
    """
    Requests the task-time-mapper to return all task-time objects from the DB.
    :return: all task-time objects.
    """
    with TaskTimeMapper() as mapper:
        return mapper.find_all()


def get_task_time(id):
    """
    Requests the task-time-mapper to return a task-time object by its id.
    :param id: a specific task-time id.
    :return: a specific task-time object.
    """
    with TaskTimeMapper() as mapper:
        return mapper.find_by_key(id)


def delete_task_time(id):
    """
    Requests the task-time-mapper to delete a task-time object by its id.
    :param id: id of a specific task-time-object.
    """
    with TaskTimeMapper() as mapper:
        return mapper.delete(id)


def update_task_time(task_time):
    """
    Requests the task-time-mapper to update a task-time object from the DB.
    :param task_time: a specific task-time object, which is to be updated.
    """
    with TaskTimeMapper() as mapper:
        return mapper.update(task_time)


#######################################################################################################################
# Specific methods for pause
#######################################################################################################################


def insert_pause(pause):
    """
    Requests the pause-mapper to insert a new pause object into the DB.
    :param pause: pause object, which is to be inserted.
    """
    with PauseMapper() as mapper:
        return mapper.insert(pause)


def update_pause(pause):
    """
    Requests the pause-mapper to update a pause object from the DB.
    :param pause: specific pause object, which is to be updated.
    """
    with PauseMapper() as mapper:
        return mapper.update(pause)


def delete_pause(id):
    """
    Requests the pause-mapper to delete a pause object by its id.
    :param id: id of a specific pause object.
    """
    with PauseMapper() as mapper:
        return mapper.delete(id)


def get_all_pauses():
    """
    Requests the pause-mapper to return all the pause objects.
    :return: all pause objects.
    """
    with PauseMapper() as mapper:
        return mapper.find_all()


def get_pause(id):
    """
    Requests the pause-mapper to return a specific pause object by its id.
    :param id: id of a specific pause object.
    :return: a specific pause object.
    """
    with PauseMapper() as mapper:
        return mapper.find_by_key(id)


#######################################################################################################################
# Specific methods for project time
#######################################################################################################################


def get_project_time_by_id(id):
    """
    Requests the project-time-mapper to return a project-time object by its id.
    :param id: id of a specific project-time object.
    :return: a specific project-time object.
    """
    with ProjectTimeMapper() as mapper:
        return mapper.find_by_key(id)


def update_project_time(project_time):
    """
    Requests the project-time-mapper to update a project-time object fro mthe DB.
    :param project_time: a specific project-time object.
    """
    with ProjectTimeMapper() as mapper:
        return mapper.update(project_time)


def insert_project_time(project_time):
    """
    Requests the project-time-mapper to insert a new project-time object into the DB.
    :param project_time: a project-time object, which is to be inserted.
    """
    with ProjectTimeMapper() as mapper:
        return mapper.insert(project_time)


def delete_project_time(id):
    """
    Requests the project-time-mapper to delete a project-time object from the DB by its id.
    :param id: id of a specific project-time object.
    """
    with ProjectTimeMapper() as mapper:
        return mapper.delete(id)
