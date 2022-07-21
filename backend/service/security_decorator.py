from flask import request
from google.auth.transport import requests
import google.oauth2.id_token
from businesslogic.person import Person
import businesslogic.bo_administration as bo


"""
@secured is a decorator function.
A decorator is a function which performs its own logic, and then calls the next decorator in the chain.

Credits:
Code copied and modified from module SecurityDecorator which was obtained from the authors
of 'Bankbeispiel' Peter Thies and Christoph Kunz, Hochschule der Medien, Stuttgart.
"""


def secured(function):

    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):

        id_token = request.headers.get("token")
        claims = None
        objects = None

        if id_token:
            try:
                claims = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)

                if claims is not None:

                    person = bo.get_person_by_google_id(claims.get("user_id"))

                    if person is not None:
                        """
                        The person was found in the DB.
                        """
                        account = bo.get_account_by_person_id(person._get_id())

                    else:
                        """
                        Was authenticated by google auth, but not in DB.
                        A new Person will be created an inserted into the DB.
                        """
                        name = claims.get("name").split(" ", 1)
                        last_name = ""
                        if len(name) > 1:
                            last_name = name[1]
                        person = Person(
                            name[0],
                            last_name,
                            claims.get("email"),
                            name[0] + last_name,
                            claims.get("user_id"),
                            "EMPLOYEE"
                        )
                        bo.insert_person(person)
                        account = bo.create_account_for_person(person)

                    # allow the routes to access the person and the account
                    setattr(request, 'person', person)
                    setattr(request, 'account', account)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED
            except ValueError as exc:
                return exc, 401  # UNAUTHORIZED

        return '', 401  # UNAUTHORIZED

    return wrapper
