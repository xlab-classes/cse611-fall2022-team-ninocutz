from repository import bookingsRepository


def addBooking(firstName, lastName, numberOfPeople, bookingDate, bookingTimeSlot, address, emailId, mobileNumber):
    bookingId = bookingsRepository.addBooking(
        firstName, lastName, numberOfPeople, bookingDate, bookingTimeSlot, address, emailId, mobileNumber)
    return bookingId


def getAllBooking():
    bookings = bookingsRepository.getAllBookings()
    return bookings


def getAllRequestedBookings():
    bookings = bookingsRepository.getAllRequestedBookings()
    return bookings


def declineBooking(bookingId):
    return bookingsRepository.declineBooking(bookingId)


def acceptBooking(bookingId):
    return bookingsRepository.acceptBooking(bookingId)
