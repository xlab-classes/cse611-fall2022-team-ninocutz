from flask import request
from flask import Blueprint
from domain import bookingsDomain
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from utils.authUtil import getUserId

bookings_blueprint = Blueprint('bookings_blueprint', __name__)


@bookings_blueprint.route("/bookings", methods=['POST'])
@cross_origin()
def addBooking():
    data = request.get_json()
    firstName = data.get('firstName', '')
    lastName = data.get('lastName', '')
    numberOfPeople = data.get('numberOfPeople', 0)
    bookingDate = data.get('bookingDate', '')
    bookingTimeSlot = data.get('bookingTimeSlot', '')
    address = data.get('address', '')
    zipCode = data.get('zipCode', '')
    emailId = data.get('emailId', '')
    mobileNumber = data.get('mobileNumber', '')

    bookingId = bookingsDomain.addBooking(
        firstName, lastName, numberOfPeople, bookingDate, bookingTimeSlot, address, zipCode, emailId, mobileNumber)
    return {'id': bookingId}, 201


@bookings_blueprint.route("/bookings", methods=['GET'])
@jwt_required()
@cross_origin()
def getAllBookings():
    bookings = bookingsDomain.getAllBooking()
    return {'bookings': bookings}, 200


@bookings_blueprint.route("/bookings/requested", methods=['GET'])
@jwt_required()
@cross_origin()
def getAllRequestedBookings():
    bookings = bookingsDomain.getAllRequestedBookings()
    return {'bookings': bookings}, 200


@bookings_blueprint.route("/bookings/decline", methods=['PUT'])
@jwt_required()
@cross_origin()
def declineBooking():
    data = request.get_json()
    bookingId = data.get('bookingId', 0)

    userId = getUserId()

    updated = bookingsDomain.declineBooking(bookingId, userId)

    if updated:
        return 'Successfully updated the Booking', 204
    return 'Error encountered during Booking update', 500


@bookings_blueprint.route("/bookings/approve", methods=['PUT'])
@jwt_required()
@cross_origin()
def acceptBooking():
    data = request.get_json()
    bookingId = data.get('bookingId', 0)
    userId = getUserId()

    updated = bookingsDomain.acceptBooking(bookingId, userId)

    if updated:
        return 'Successfully updated the Booking', 204
    return 'Error encountered during Booking update', 500
