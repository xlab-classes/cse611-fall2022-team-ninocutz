from flask import request
from flask import Blueprint
from domain import bookingsDomain

bookings_blueprint = Blueprint('bookings_blueprint', __name__)


@bookings_blueprint.route("/bookings", methods=['POST'])
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
def getAllBookings():
    bookings = bookingsDomain.getAllBooking()
    return {'bookings': bookings}, 200


@bookings_blueprint.route("/bookings/requested", methods=['GET'])
def getAllRequestedBookings():
    bookings = bookingsDomain.getAllRequestedBookings()
    return {'bookings': bookings}, 200


@bookings_blueprint.route("/bookings/decline", methods=['PUT'])
def declineBooking():
    data = request.get_json()
    bookingId = data.get('bookingId', 0)

    updated = bookingsDomain.declineBooking(bookingId)

    if updated:
        return 'Successfully updated the Booking', 204
    return 'Error encountered during Booking update', 500


@bookings_blueprint.route("/bookings/approve", methods=['PUT'])
def acceptBooking():
    data = request.get_json()
    bookingId = data.get('bookingId', 0)

    updated = bookingsDomain.acceptBooking(bookingId)

    if updated:
        return 'Successfully updated the Booking', 204
    return 'Error encountered during Booking update', 500
