from flask import Flask
from flask_restx import Resource, Api, fields
from flask_cors import CORS

from businesslogic.event_transaction import EventTransaction
from businesslogic.interval_transaction import IntervalTransaction
from businesslogic.leave import Leave
from businesslogic.project_time import ProjectTime
from businesslogic.task_time import TaskTime
from service.security_decorator import secured

import businesslogic.bo_administration as bo
from businesslogic.person import Person
from businesslogic.account import Account
from businesslogic.project import Project
from businesslogic.task import Task
from businesslogic.pause_time import Pause
from businesslogic.arrival import Arrival
from flask import request

"""
Code copied and modified from module main.py which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""

app = Flask("TimeTrackingApp")

"""Enable all resources of timetrackingapp for cross origin resource sharing"""
CORS(app, resources=r'*')

api = Api(app, version='1.0', title='API of the time tracking system', description='An API for the time tracking app.')

timetracking = api.namespace('timetrackingapp', description='function of the time tracking app')

#######################################################################################################################
# Model declaration for serialization
#######################################################################################################################
businessobject = api.model('BusinessObject', {
    'id': fields.String(attribute='_id', description='unique identifier for a business object'),
})

person = api.inherit('Person', businessobject, {
    'first_name': fields.String(attribute='_first_name', description='first name of a person'),
    'last_name': fields.String(attribute='_last_name', description='last name of a person'),
    'email': fields.String(attribute='_email', description='email address of a person'),
    'user_name': fields.String(attribute='_user_name', descrption='user name of a person'),
    'role': fields.String(attribute='_role', description='role of a person'),
    'google_id': fields.String(attribute='_google_id', description='google_id of a person')

})

project = api.inherit('Project', businessobject, {
    'project_name': fields.String(attribute='_project_name', description='name of the project'),
    'customer': fields.String(attribute='_customer', description='unique identifier for a customer'),
    'project_time_id': fields.String(attribute='_project_time_id',
                                     description='id of the runtime interval of the project'),
})

task = api.inherit('Task', businessobject, {
    'task_name': fields.String(attribute='_task_name', description='name of a task'),
    'est_working_time': fields.Float(attribute='_est_working_time',
                                     description='estimated working time in person days'),
    'project_id': fields.String(attribute='_project_id', description='project id for the task')
})

account = api.inherit('Account', businessobject, {
    'owner_id': fields.String(attribute='_owner_id', description='unique id of the account owner'),
})

transaction = api.inherit('Transaction', businessobject, {
    'account_id': fields.String(attribute='_account_id', description='unique account id related to the transaction'),
    'time_id': fields.String(attribute='_time_id', description='unique time id related to the transaction')
})

event_transaction = api.inherit('EventTransaction', transaction, {
})

interval_transaction = api.inherit('IntervalTransaction', transaction, {
    'task_id': fields.String(attribute='_task_id', description='unique task id related to the transaction'),
})

event = api.inherit('Event', businessobject, {
    'occurrence': fields.DateTime(attribute='_occurrence', description='timestamp of an event')
})

arrival = api.inherit('Arrival', event, {
})

leave = api.inherit('Leave', event, {
})

interval = api.inherit('Interval', businessobject, {
    'start_time': fields.DateTime(attribute='_start_time', description='timestamp of the event start'),
    'end_time': fields.DateTime(attribute='_end_time', description='timestamp of the event end'),
})

task_time = api.inherit('TaskTime', interval, {
})

project_time = api.inherit('ProjectTime', interval, {
})

pause = api.inherit('Pause', interval, {
})


#######################################################################################################################
# PERSON API
#######################################################################################################################
@timetracking.route('/api/persons')
@timetracking.response(500, 'If there is an error from the server.')
class PersonListOps(Resource):
    @secured
    @timetracking.marshal_list_with(person)
    def get(self):
        """
        Gets all person objects.
        :return: person objects, if there are no person objects, an empty sequence will be returned
        """
        person_list = bo.get_all_persons()

        return person_list

    @secured
    @timetracking.marshal_with(person, code=201)
    @timetracking.expect(person, validate=True)
    def post(self):
        """
        Creates and inserts a new person object into the database.
        :return: the new person object
        """
        person = Person.from_dict(api.payload, set_id=False)

        if person is not None:
            bo.create_person_with_account(
                person.get_first_name(),
                person.get_last_name(),
                person.get_email(),
                person.get_user_name(),
                person.get_google_id(),
                person.get_role()
            )
            return person, 200
        else:
            return '', 500


@timetracking.route('/api/persons/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the person object')
class PersonOps(Resource):
    @secured
    @timetracking.marshal_with(person)
    def get(self, id):
        """
        Gets a specific person object.
        :param id: identifies the data set
        :return: person object
        """
        person = bo.get_person_by_id(id)

        return person

    @secured
    @timetracking.marshal_with(person)
    @timetracking.expect(person, validate=True)
    def put(self, id):
        """
        Updates an existing person object.
        :param id: identifies the data set
        :return: the updated person object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        person = Person.from_dict(api.payload, set_id=True)

        if person is not None:
            person._set_id(id)
            bo.update_person(person)
            return person, 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """
        Deletes a specific person object.
        :param id: identifies the data set
        """
        bo.delete_person(id)

        return '', 200


@timetracking.route('/api/persons-by-name/<string:last_name>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('last_name', 'Last name of the person object')
class PersonByNameOps(Resource):
    @secured
    @timetracking.marshal_with(person)
    def get(self, last_name):
        """
        Gets person object by their last name.
        :param last_name: identifies the data set
        :return: person object
        """
        person = bo.get_person_by_last_name(last_name)

        return person


@timetracking.route('/api/persons-by-mail/<string:email>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('email', 'Email address of the person object')
class PersonByMailOps(Resource):
    @secured
    @timetracking.marshal_with(person)
    def get(self, email):
        """
        Gets a person object by their email address.
        :param email: identifies the data set
        :return: person object
        """
        person = bo.get_person_by_email(email)

        return person


@timetracking.route('/api/persons-by-google-id/<string:g_id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('g_id', 'Google-id of the person object')
class PersonByGoogleIDOps(Resource):
    @secured
    @timetracking.marshal_with(person)
    def get(self, g_id):
        """
        Gets person object by their Google id.
        :param g_id: identifies the data set
        :return: person object
        """
        person = bo.get_person_by_google_id(g_id)

        return person


#######################################################################################################################
# ACCOUNT API
#######################################################################################################################
@timetracking.route('/api/accounts')
@timetracking.response(500, 'If there is an error from the server.')
class AccountListOps(Resource):
    @secured
    @timetracking.marshal_list_with(account)
    def get(self):
        """
        Gets all account objects.
        :return: account objects
        """
        account_list = bo.get_all_accounts()

        return account_list


@timetracking.route('/api/accounts/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the account object')
class AccountOps(Resource):
    @secured
    @timetracking.marshal_with(account)
    def get(self, id):
        """
        Gets a specific account object.
        :param id: identifies the data set
        :return: account object
        """
        account = bo.get_account_by_id(id)

        return account

    @secured
    def delete(self, id):
        """
        Deletes a specific account object.
        :param id: identifies the data set
        """
        account = bo.get_account_by_id(id)
        bo.delete_account(account)
        return '', 200

    @secured
    @timetracking.marshal_with(account)
    def put(self, id):
        """
        Updates an existing account object.
        :param id: identifies the data set
        :return: the updated account object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        account = Account.from_dict(api.payload, set_id=True)

        if account is not None:
            account._set_id(id)
            bo.update_account(account)
            return '', 200
        else:
            return '', 500


@timetracking.route('/api/accounts/person/<uuid:person_id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('person_id', 'ID of the account object')
class PersonRelatedAccountOperations(Resource):
    @secured
    @timetracking.marshal_with(account)
    def get(self, person_id):
        """
        Gets the account object of a specific person.
        :param person_id: identifies the data set
        :return: account object
        """
        if person is not None:
            account_list = bo.get_account_by_person_id(person_id)
            return account_list
        else:
            return "Person not found", 500

    @secured
    @timetracking.marshal_with(account, code=201)
    def post(self, id):
        """
        Creates and inserts a new account of a specific person into the database.
        :param id: identifies the data set of the person
        :return: the new account object
        """
        person = bo.get_person_by_id(id)

        if person is not None:
            result = bo.create_account_for_person(person)
            return result
        else:
            return "Unknown person", 500


#######################################################################################################################
# INTERVAL TRANSACTION API
#######################################################################################################################
@timetracking.route('/api/transactions/intervals')
@timetracking.response(500, 'If there is an error from the server.')
class IntervalTransactionListOps(Resource):
    @secured
    @timetracking.marshal_list_with(interval_transaction)
    def get(self):
        """
        Gets all transaction objects.
        :return: all transaction objects, if there are no transaction objects, an empty sequence will be returned
        """
        transaction_list = bo.get_all_interval_transactions()

        return transaction_list

    @secured
    @timetracking.marshal_list_with(interval_transaction)
    def post(self):
        """
        Creates and inserts a new interval transaction into the database.
        :return: interval transaction object
        """
        account = getattr(request, 'account')
        interval_transaction = IntervalTransaction.from_dict(account._get_id(), api.payload, set_id=False)
        interval_transaction = bo.insert_interval_transaction(interval_transaction)

        return interval_transaction


@timetracking.route('/api/transactions/intervals-task-times/<uuid:account_id>/<string:from_when>/<string:to_when>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('account_id', 'for which account to get the transactions')
@timetracking.param('from_when', 'from when to get the transactions')
@timetracking.param('to_when', 'until when to get the transactions')
class IntervalTransactionListTaskOps(Resource):
    @secured
    @timetracking.marshal_list_with(interval_transaction)
    def get(self, account_id, from_when, to_when):
        """
        Gets all task time interval transaction objects of a specific account within two given times.
        :param account_id: identifies the data set of the account
        :param from_when: gives the start time of the first task time interval transaction needed
        :param to_when: gives the start time of the last task time interval transaction needed
        :return: task time interval transaction objects
        """
        transaction_list = bo.get_interval_transactions_by_account_task_times_from_to(account_id, from_when, to_when)

        return transaction_list


@timetracking.route('/api/transactions/intervals-pause-times/<uuid:account_id>/<string:from_when>/<string:to_when>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('account_id', 'for which account to get the transactions')
@timetracking.param('from_when', 'from when to get the transactions')
@timetracking.param('to_when', 'until when to get the transactions')
class IntervalTransactionListPauseOps(Resource):
    @secured
    @timetracking.marshal_list_with(interval_transaction)
    def get(self, account_id, from_when, to_when):
        """
        Gets all pause time interval transaction objects of a specific account within two given times.
        :param account_id: identifies the data set of the account
        :param from_when: gives the start time of the first pause time interval transaction needed
        :param to_when: gives the start time of the last pause time interval transaction needed
        :return: pause time interval transaction objects
        """
        transaction_list = bo.get_interval_transactions_by_account_pause_times_from_to(account_id, from_when, to_when)

        return transaction_list


@timetracking.route('/api/transactions/intervals-by-person/<uuid:person_id>/<string:from_when>/<string:to_when>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('person_id', 'for which person to get the transactions')
@timetracking.param('from_when', 'from when to get the transactions')
@timetracking.param('to_when', 'until when to get the transactions')
class IntervalTransactionListByPersonOps(Resource):
    @secured
    @timetracking.marshal_list_with(interval_transaction)
    def get(self, person_id, from_when, to_when):
        """
        Gets all interval transaction objects of a specific account within two given times.
        :param person_id: identifies the data set of the person
        :param from_when: gives the start time of the first interval transaction needed
        :param to_when: gives the start time of the last interval transaction needed
        :return: interval transaction objects
        """
        transaction_list = bo.get_interval_transactions_by_person_task_times_from_to(person_id, from_when, to_when)

        return transaction_list


@timetracking.route('/api/transactions/intervals-by-project/<uuid:project_id>/<string:from_when>/<string:to_when>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('project_id', 'for which project to get the transactions')
@timetracking.param('from_when', 'from when to get the transactions')
@timetracking.param('to_when', 'until when to get the transactions')
class IntervalTransactionListOps(Resource):
    @secured
    @timetracking.marshal_list_with(interval_transaction)
    def get(self, project_id, from_when, to_when):
        """
        Gets all interval transaction objects of a specific account within two given times.
        :param project_id: identifies the data set of the project
        :param from_when: gives the start time of the first interval transaction needed
        :param to_when: gives the start time of the last interval transaction needed
        :return: interval transaction objects
        """
        transaction_list = bo.get_interval_transactions_by_project_task_times_from_to(project_id, from_when, to_when)

        return transaction_list


@timetracking.route('/api/transactions/intervals/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the transaction object')
class IntervalTransactionOps(Resource):
    @secured
    @timetracking.marshal_with(interval_transaction)
    def get(self, id):
        """
        Gets a specific interval transaction object.
        :param id: identifies the data set
        :return: interval transaction object
        """
        transaction = bo.get_interval_transaction_by_id(id)

        return transaction

    @secured
    def delete(self, id):
        """
        Deletes a specific interval transaction object.
        :param id: identifies the data set
        """
        bo.delete_interval_transaction(id)

        return '', 200

    @secured
    @timetracking.marshal_with(interval_transaction)
    def put(self, id):
        """
        Updates an existing interval transaction object.
        :param id: identifies the data set
        :return: the updated interval transaction object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        interval_transaction = IntervalTransaction.from_dict(api.payload, set_id=True)

        if interval_transaction is not None:
            bo.update_interval_transaction(interval_transaction)
            return '', 200
        else:
            return '', 500


#######################################################################################################################
# EVENT TRANSACTION API
#######################################################################################################################
@timetracking.route('/api/transactions/events')
@timetracking.response(500, 'If there is an error from the server.')
class EventTransactionListOps(Resource):
    @secured
    @timetracking.marshal_list_with(event_transaction)
    def get(self):
        """
        Gets all event transaction objects.
        :return: all event transaction objects, if there are no event transaction objects,
        an empty sequence will be returned
        """
        transaction_list = bo.get_all_event_transactions()

        return transaction_list

    @secured
    @timetracking.marshal_list_with(event_transaction)
    def post(self):
        """
        Creates and inserts a new event transaction into the database.
        :return: event transaction object
        """
        account = getattr(request, 'account')
        event_transaction = EventTransaction.from_dict(account._get_id(), api.payload, set_id=False)
        event_transaction = bo.insert_event_transaction(event_transaction)

        return event_transaction


@timetracking.route('/api/transactions/events-by-account-arrivals-from-to/<uuid:account_id>/<string:from_when>/'
                    '<string:to_when>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('account_id', 'for which account to get the transactions')
@timetracking.param('from_when', 'from when to get the transactions')
@timetracking.param('to_when', 'until when to get the transactions')
class EventTransactionArrivalListOps(Resource):
    @secured
    @timetracking.marshal_list_with(event_transaction)
    def get(self, account_id, from_when, to_when):
        """
        Gets all arrival event transaction objects of a specific account within two given times.
        :param account_id: identifies the data set of the account
        :param from_when: gives the start time of the first arrival event transaction needed
        :param to_when: gives the start time of the last arrival event transaction needed
        :return: arrival event transaction objects
        """
        transaction_list = bo.get_event_transactions_by_arrivals_and_account_from_to(account_id, from_when, to_when)

        return transaction_list


@timetracking.route('/api/transactions/events-by-account-leaves-from-to/<uuid:account_id>/<string:from_when>/'
                    '<string:to_when>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('account_id', 'for which account to get the transactions')
@timetracking.param('from_when', 'from when to get the transactions')
@timetracking.param('to_when', 'until when to get the transactions')
class EventTransactionLeaveListOps(Resource):
    @secured
    @timetracking.marshal_list_with(event_transaction)
    def get(self, account_id, from_when, to_when):
        """
        Gets all leave event transaction objects of a specific account within two given times.
        :param account_id: identifies the data set of the account
        :param from_when: gives the start time of the first leave event transaction needed
        :param to_when: gives the start time of the last leave event transaction needed
        :return: leave event transaction objects
        """
        transaction_list = bo.get_event_transactions_by_leaves_and_account_from_to(account_id, from_when, to_when)

        return transaction_list


@timetracking.route('/api/transactions/events/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the transaction object')
class EventTransactionOps(Resource):
    @secured
    @timetracking.marshal_with(event_transaction)
    def get(self, id):
        """
        Gets a specific event transaction object.
        :param id: identifies the data set
        :return: event transaction object
        """
        transaction = bo.get_event_transaction_by_id(id)

        return transaction

    @secured
    def delete(self, id):
        """
        Deletes a specific event transaction object.
        :param id: identifies the data set
        """
        bo.delete_event_transaction(id)

        return '', 200

    @secured
    @timetracking.marshal_with(event_transaction)
    def put(self, id):
        """
        Updates an existing event transaction object.
        :param id: identifies the data set
        :return: the updated event transaction object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        event_transaction = IntervalTransaction.from_dict(api.payload, set_id=True)

        if event_transaction is not None:
            bo.update_event_transaction(event_transaction)
            return '', 200
        else:
            return '', 500
        

#######################################################################################################################
# TASKTIME INTERVAL API
#######################################################################################################################
@timetracking.route('/api/tasktimes')
@timetracking.response(500, 'If there is an error from the server.')
class TaskTimeListOps(Resource):
    @secured
    @timetracking.marshal_list_with(task_time)
    def get(self):
        """
        Gets all task time objects.
        :return: all task time objects, if there are no task time objects, an empty sequence will be returned
        """
        task_times = bo.get_all_task_times()

        return task_times

    @secured
    @timetracking.marshal_with(task_time, code=201)
    @timetracking.expect(task_time, validate=True)
    def post(self):
        """
        Creates and inserts a new task time object into the database.
        :return: the new task time object
        """
        task_time = TaskTime.from_dict(api.payload, set_id=False)

        if task_time is not None:
            bo.create_task_time(task_time)
            return task_time, 200
        else:
            return '', 500


@timetracking.route('/api/tasktimes/<uuid:tasktime_id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('tasktime_id', 'ID of the tasktime object')
class TaskTimeOps(Resource):
    @secured
    @timetracking.marshal_list_with(task_time)
    def get(self, tasktime_id):
        """
        Gets a specific task time interval object.
        :param tasktime_id: identifies the data set
        :return: task time interval object
        """
        task_times = bo.get_task_time(tasktime_id)

        return task_times

    @secured
    def delete(self, tasktime_id):
        """
        Deletes a specific task time interval object.
        :param tasktime_id: identifies the data set
        """

        bo.delete_task_time(tasktime_id)
        return '', 200

    @secured
    @timetracking.marshal_with(task_time)
    def put(self, tasktime_id):
        """
        Updates a task time interval object.
        :param tasktime_id: identifies the data set
        :return: the updated task time interval object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        task_time = TaskTime.from_dict(api.payload, set_id=True)

        if interval_transaction is not None:
            bo.update_task_time(task_time)
            return '', 200
        else:
            return '', 500


#######################################################################################################################
# PAUSE INTERVAL API
#######################################################################################################################
@timetracking.route('/api/pauses')
@timetracking.response(500, 'If there is an error from the server.')
class PausesListOps(Resource):
    @secured
    @timetracking.marshal_list_with(pause)
    def get(self):
        """
        Gets all pause interval objects.
        :return: pause interval objects, if there are no pause interval objects, an empty sequence will be returned
        """
        pauses = bo.get_all_pauses()

        return pauses

    @secured
    @timetracking.marshal_with(pause, code=201)
    @timetracking.expect(pause, validate=True)
    def post(self):
        """
        Creates and inserts a new pause interval object into the database.
        :return: the new pause object
        """
        pause = Pause.from_dict(api.payload, set_id=False)

        if pause is not None:
            bo.insert_pause(
                pause
            )
            return pause, 200
        else:
            return '', 500


@timetracking.route('/api/pauses/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the pause object')
class PausesOps(Resource):
    @secured
    @timetracking.marshal_list_with(pause)
    def get(self, id):
        """
        Gets a specific pause interval object.
        :param id: identifies the data set
        :return: pause interval object
        """
        pause = bo.get_pause(id)

        return pause

    @secured
    def delete(self, id):
        """
        Deletes a specific pause interval object.
        :param id: identifies the data set
        """

        bo.delete_pause(id)
        return '', 200

    @secured
    @timetracking.marshal_with(pause)
    def put(self, id):
        """
        Updates a pause interval object.
        :param id: identifies the data set
        :return: the updated pause interval object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        pause = Pause.from_dict(api.payload, set_id=True)

        if interval_transaction is not None:
            bo.update_pause(pause)
            return '', 200
        else:
            return '', 500


#######################################################################################################################
# PROJECT TIME API
#######################################################################################################################
@timetracking.route('/api/projecttimes')
@timetracking.response(500, 'If there is an error from the server.')
class ProjectTimeListOps(Resource):
    @secured
    @timetracking.marshal_with(project_time)
    @timetracking.expect(project_time, validate=True)
    def post(self):
        """
        Creates and inserts a new project time interval object into the database.
        :return: the new project time interval object
        """
        project_time = ProjectTime.from_dict(api.payload, set_id=False)

        if project_time is not None:
            bo.insert_project_time(project_time)
            return project_time, 200
        else:
            return '', 500


@timetracking.route('/api/projecttimes/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the interval object')
class ProjectTimeOps(Resource):
    @secured
    @timetracking.marshal_with(project_time)
    def get(self, id):
        """
        Gets a specific project time interval object.
        :param id: identifies the data set
        :return: project time interval object
        """
        project_time = bo.get_project_time_by_id(id)

        return project_time

    @secured
    @timetracking.marshal_with(project_time)
    @timetracking.expect(project_time, validate=True)
    def put(self, id):
        """
        Updates an existing project time interval object.
        :param id: identifies the data set
        :return: the updated project time interval object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        project_time = ProjectTime.from_dict(api.payload, set_id=True)

        if project_time is not None:
            bo.update_project_time(project_time)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """
        Deletes a specific project time interval object.
        :param id: identifies the data set
        """
        bo.delete_project_time(id)

        return '', 200


#######################################################################################################################
# ARRIVAL EVENT API
#######################################################################################################################
@timetracking.route('/api/arrivals')
@timetracking.response(500, 'If there is an error from the server.')
class ArrivalListOps(Resource):
    @secured
    @timetracking.marshal_list_with(arrival)
    def get(self):
        """
        Gets all arrival objects.
        :return: arrival objects, if there are no arrival objects, an empty sequence will be returned
        """
        arrivals = bo.get_all_arrivals()

        return arrivals

    @secured
    @timetracking.marshal_with(arrival, code=201)
    @timetracking.expect(arrival, validate=True)
    def post(self):
        """
        Creates and inserts a new arrival object into the database.
        :return: the new pause object
        """
        arrival = Arrival.from_dict(api.payload, set_id=False)

        if arrival is not None:
            bo.insert_arrival(arrival)
            return arrival, 200
        else:
            return '', 500


@timetracking.route('/api/arrivals/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the arrival object')
class ArrivalOps(Resource):
    @secured
    @timetracking.marshal_with(arrival)
    def get(self, id):
        """
        Gets a specific arrival object.
        :param id: identifies the data set
        :return: arrival object
        """
        arrival = bo.get_arrival_by_id(id)

        return arrival

    @secured
    @timetracking.marshal_with(arrival)
    @timetracking.expect(arrival, validate=True)
    def put(self, id):
        """
        Updates an existing arrival object.
        :param id: identifies the data set
        :return: the updated arrival object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        arrival = Arrival.from_dict(api.payload, set_id=True)

        if arrival is not None:
            bo.update_arrival(arrival)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """
        Deletes a specific arrival object.
        :param id: identifies the data set
        """
        bo.delete_arrival(id)

        return '', 200


#######################################################################################################################
# LEAVE EVENT API
#######################################################################################################################
@timetracking.route('/api/leaves')
@timetracking.response(500, 'If there is an error from the server.')
class LeaveListOps(Resource):
    @secured
    @timetracking.marshal_list_with(leave)
    def get(self):
        """
        Gets all leave objects.
        :return: leave objects, if there are no leave objects, an empty sequence will be returned
        """

        leaves = bo.get_all_leaves()
        return leaves

    @secured
    @timetracking.marshal_with(leave, code=201)
    @timetracking.expect(leave, validate=True)
    def post(self):
        """
        Creates and inserts a new leave object into the database.
        :return: the new leave object
        """
        leave = Leave.from_dict(api.payload, set_id=False)

        if leave is not None:
            bo.insert_leave(leave)
            return leave, 200
        else:
            return '', 500


@timetracking.route('/api/leaves/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the leave object')
class LeaveOps(Resource):
    @secured
    @timetracking.marshal_with(leave)
    def get(self, id):
        """
        Gets a specific leave object.
        :param id: identifies the data set
        :return: leave object
        """
        leave = bo.get_leave_by_id(id)

        return leave

    @secured
    @timetracking.marshal_with(leave)
    @timetracking.expect(leave, validate=True)
    def put(self, id):
        """
        Updates an existing leave object.
        :param id: identifies the data set
        :return: the updated leave object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        leave = Leave.from_dict(api.payload, set_id=True)

        if arrival is not None:
            bo.update_leave(leave)
            return '', 200
        else:
            return '', 500

    @secured
    def delete(self, id):
        """
        Deletes a specific leave object.
        :param id: identifies the data set
        """
        bo.delete_leave(id)

        return '', 200


#######################################################################################################################
# PROJECT API
#######################################################################################################################
@timetracking.route('/api/projects')
@timetracking.response(500, 'If there is an error from the server.')
class ProjectListOps(Resource):
    @secured
    @timetracking.marshal_list_with(project)
    def get(self):
        """
        Gets all project objects.
        :return: project objects, if there are no project objects, an empty sequence will be returned
        """
        projects = bo.get_all_projects()

        return projects

    @secured
    @timetracking.marshal_with(project, code=201)
    @timetracking.expect(project, validate=True)
    def post(self):
        """
        Creates and inserts a new project object.
        :return: the new project object
        """
        project = Project.from_dict(api.payload, set_id=False)

        if project is not None:
            bo.insert_project(project)
            return project, 200
        else:
            return '', 500


@timetracking.route('/api/projects/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the project object')
class ProjectOps(Resource):
    @secured
    @timetracking.marshal_with(project)
    def get(self, id):
        """
        Gets a specific project object.
        :param id: identifies the data set
        :return: project object
        """
        project = bo.get_project_by_id(id)

        return project

    @secured
    def delete(self, id):
        """
        Deletes a specific project object.
        :param id: identifies the data set
        """
        bo.delete_project(id)

        return '', 200

    @secured
    @timetracking.marshal_with(project)
    @timetracking.expect(project, validate=True)
    def put(self, id):
        """
        Updates an existing project object.
        :param id: identifies the data set
        :return: the updated project object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        project = Project.from_dict(api.payload, set_id=True)

        if project is not None:
            bo.update_project(project)
            return '', 200
        else:
            return '', 500


@timetracking.route('/api/projects-by-current-user')
@timetracking.response(500, 'If there is an error from the server.')
class ProjectOps(Resource):
    @secured
    @timetracking.marshal_with(project)
    def get(self):
        """
        Gets project objects of a specific person.
        :return: project objects
        """
        person = getattr(request, 'person')
        project = bo.get_project_by_member(person._get_id())

        return project


@timetracking.route('/api/projects/<uuid:id>/members')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the project object')
class ProjectRelatedPersonListOps(Resource):
    @secured
    @timetracking.marshal_with(person)
    def get(self, id):
        """
        Gets all person objects which are related to the given project id.
        :param id: identifies the data sets
        :return: person objects
        """
        members = bo.get_persons_by_project_id(id)
        if members is not None:
            return members
        else:
            return "Project not found.", 500

    @secured
    def post(self, id):
        """
        Adds a person to the project with the given id.
        :param id: identifies the data set
        """
        person = Person.from_dict(api.payload, set_id=True)
        member = bo.insert_persons_by_project_id(id, person)

        if member is not None:
            return '', 200
        else:
            return "Project not found", 500


@timetracking.route('/api/projects/<uuid:project_id>/members/<uuid:person_id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('project_id', 'ID of the project object')
@timetracking.param('person_id', 'ID of the person object')
class ProjectRelatedPersonOps(Resource):
    @secured
    def delete(self, project_id, person_id):
        """
        Deletes a project member (person) from the project object with the given id
        :param project_id: identifies the project data set
        :param person_id: identifies the person data set
        """
        bo.delete_persons_by_project_id(project_id, person_id)

        return '', 200


#######################################################################################################################
# TASK API
#######################################################################################################################
@timetracking.route('/api/tasks')
@timetracking.response(500, 'If there is an error from the server.')
class TaskListOps(Resource):
    @secured
    @timetracking.marshal_list_with(task)
    def get(self):
        """
        Gets all task objects.
        :return: task objects, if there are no task objects, an empty sequence will be returned
        """
        tasks = bo.get_all_tasks()

        return tasks

    @secured
    @timetracking.marshal_with(task, code=201)
    @timetracking.expect(task, validate=True)
    def post(self):
        """
        Creates and inserts a new task object.
        :return: the new task object
        """
        task = Task.from_dict(api.payload, set_id=False)

        if task is not None:
            bo.insert_task(task)
            return task, 200
        else:
            return '', 500


@timetracking.route('/api/tasks-by-project/<uuid:project_id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('project_id', 'ID of the project')
class TaskListOps(Resource):
    @secured
    @timetracking.marshal_list_with(task)
    def get(self, project_id):
        """
        Gets all task objects related to the given project id.
        :param project_id: identifies the project data set
        :return: task objects belonging to the given project
        """
        tasks = bo.get_task_by_project_id(project_id)

        return tasks


@timetracking.route('/api/tasks/<uuid:id>')
@timetracking.response(500, 'If there is an error from the server.')
@timetracking.param('id', 'ID of the task object')
class TaskOps(Resource):
    @secured
    @timetracking.marshal_list_with(task)
    def get(self, id):
        """
        Gets a specific task object.
        :param id: identifies the data set
        :return: task object
        """
        task = bo.get_task_by_id(id)

        return task

    @secured
    def delete(self, id):
        """
        Deletes a specific task object.
        :param id: identifies the data set
        """
        task = bo.delete_task(id)

        return '', 200

    @secured
    @timetracking.marshal_with(task)
    @timetracking.expect(task, validate=True)
    def put(self, id):
        """
        Updates an existing task object.
        :param id: identifies the data set
        :return: the updated task object
        """
        # use set_id = True for put method so that from_dict does set the id based on the json data
        task = Task.from_dict(api.payload, set_id=True)

        if task is not None:
            bo.update_task(task)
            return '', 200
        else:
            return '', 500


# The two following lines are only executed in local environment. They have no effect in the cloud.
if __name__ == '__main__':
    app.run(debug=True)
