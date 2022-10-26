from repository import appointmentRepository


def addAppointmentRequest(firstName, lastName, eventId, bookingTimeSlot, emailId, mobileNumber):
    appointmentId = appointmentRepository.addAppointmentRequest(
        firstName, lastName, eventId, bookingTimeSlot, emailId, mobileNumber)
    return appointmentId


def getAllAppointments():
    return appointmentRepository.getAllAppointments()


def getAllRequestedAppointments():
    bookings = appointmentRepository.getAllRequestedAppointments()
    return bookings


def declineAppointment(appointmentId, userId):
    return appointmentRepository.declineAppointment(appointmentId, userId)


def acceptAppointment(appointmentId, userId):
    return appointmentRepository.acceptAppointment(appointmentId, userId)
