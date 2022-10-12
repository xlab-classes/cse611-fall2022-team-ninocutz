from repository import bookingsRepository
from repository import customerRepository


def addBooking(firstName, lastName, numberOfPeople, bookingDate, bookingTimeSlot, address, zipCode, emailId, mobileNumber):
    customer = customerRepository.getCustomerByMobileNumber(mobileNumber)

    if customer:
        customerId = customer[0]
    else:
        customerId = customerRepository.addNewCustomer(
            firstName, lastName, emailId, mobileNumber, address, zipCode)

    bookingId = bookingsRepository.addBooking(
        customerId, numberOfPeople, bookingDate, bookingTimeSlot)
    return bookingId


def getAllBooking():
    bookings = bookingsRepository.getAllBookings()
    return bookings


def getAllRequestedBookings():
    bookings = bookingsRepository.getAllRequestedBookings()
    return bookings


def declineBooking(bookingId, userId):
    return bookingsRepository.declineBooking(bookingId, userId)


def acceptBooking(bookingId, userId):
    return bookingsRepository.acceptBooking(bookingId, userId)
