from flask import request
from flask import Blueprint
from flask_cors import cross_origin
from domain import customerDomain

customer_blueprint = Blueprint('customer_blueprint', __name__)


@customer_blueprint.route("/customer", methods=['POST'])
@cross_origin()
def addCustomer():
    data = request.get_json()
    firstName = data.get('firstName', '')
    lastName = data.get('lastName', '')
    address = data.get('address', '')
    zipCode = data.get('zipCode', '')
    emailId = data.get('emailId', '')
    mobileNumber = data.get('mobileNumber', '')

    customerId = customerDomain.addCustomer(
        firstName, lastName, address, zipCode, emailId, mobileNumber)

    return {'id': customerId}, 201
