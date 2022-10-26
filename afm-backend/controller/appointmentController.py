from flask import request
from flask import Blueprint
from domain import appointmentDomain
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from utils.authUtil import getUserId

appointment_blueprint = Blueprint('appointment_blueprint', __name__)


@appointment_blueprint.route("/appointments", methods=['POST'])
@cross_origin()
def addAppointmentRequest():
    data = request.get_json()
    firstName = data.get('firstName', '')
    lastName = data.get('lastName', '')
    eventId = data.get('eventId', 0)
    bookingTimeSlot = data.get('bookingTimeSlot', '')
    emailId = data.get('emailId', '')
    mobileNumber = data.get('mobileNumber', '')

    appointmentId = appointmentDomain.addAppointmentRequest(
        firstName, lastName, eventId, bookingTimeSlot, emailId, mobileNumber)

    return {'id': appointmentId}, 201


@appointment_blueprint.route("/appointments", methods=['GET'])
@jwt_required()
@cross_origin()
def getAllAppointments():
    appointments = appointmentDomain.getAllAppointments()
    return {'appointments': appointments}, 200


@appointment_blueprint.route("/appointments/requested", methods=['GET'])
@jwt_required()
@cross_origin()
def getAllRequestedBookings():
    bookings = appointmentDomain.getAllRequestedAppointments()
    return {'bookings': bookings}, 200


@appointment_blueprint.route("/appointments/decline", methods=['PUT'])
@jwt_required()
@cross_origin()
def declineBooking():
    data = request.get_json()
    appointmentId = data.get('appointmentId', 0)

    userId = getUserId()

    updated = appointmentDomain.declineAppointment(appointmentId, userId)

    if updated:
        return 'Successfully updated the Appointment', 204
    return 'Error encountered during Appointment update', 500


@appointment_blueprint.route("/appointments/approve", methods=['PUT'])
@jwt_required()
@cross_origin()
def acceptBooking():
    data = request.get_json()
    appointmentId = data.get('appointmentId', 0)
    userId = getUserId()

    updated = appointmentDomain.acceptAppointment(appointmentId, userId)

    if updated:
        return 'Successfully updated the Appointment', 204
    return 'Error encountered during Appointment update', 500
