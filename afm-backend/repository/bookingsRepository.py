from app import Database

db = Database()


def addBooking(firstName, lastName, numberOfPeople, bookingDate, bookingTimeSlot, address, emailId, mobileNumber):
    cursor = db.cursor()
    sql = "INSERT INTO Booking(FirstName, LastName, NumberOfPeople, BookingDate, BookingTimeSlot, Address, \
         EmailId, MobileNumber, BookingStatus) VALUES (%s, %s, %s, %s, %s, %s,%s, %s, %s)"
    cursor.execute(sql, (firstName, lastName, numberOfPeople, bookingDate,
                   bookingTimeSlot, address, emailId, mobileNumber, 'REQUESTED'))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllBookings():
    cursor = db.cursor()
    sql = "SELECT FirstName, LastName, NumberOfPeople, BookingDate, BookingTimeSlot, Address, EmailId, MobileNumber, BookingStatus FROM AFM.Booking"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getAllRequestedBookings():
    cursor = db.cursor()
    sql = "SELECT FirstName, LastName, NumberOfPeople, BookingDate, BookingTimeSlot, Address, EmailId, MobileNumber FROM AFM.Booking WHERE BookingStatus = 'REQUESTED'"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def declineBooking(bookingId):
    cursor = db.cursor()
    sql = "UPDATE AFM.Booking SET BookingStatus = 'DECLINED' WHERE Id = %s;"
    cursor.execute(sql, (bookingId))
    cursor.close()
    db.commit()
    return bookingId


def acceptBooking(bookingId):
    cursor = db.cursor()
    sql = "UPDATE AFM.Booking SET BookingStatus = 'ACCEPTED' WHERE Id = %s;"
    cursor.execute(sql, (bookingId))
    cursor.close()
    db.commit()
    return bookingId
