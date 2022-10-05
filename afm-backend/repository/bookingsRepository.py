from app import Database

db = Database()


def addBooking(customerId, numberOfPeople, bookingDate, bookingTimeSlot):
    cursor = db.cursor()
    sql = "INSERT INTO Booking(CustomerId, NumberOfPeople, BookingDate, BookingTimeSlot, BookingStatus) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (customerId, numberOfPeople,
                   bookingDate, bookingTimeSlot, 'REQUESTED'))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllBookings():
    cursor = db.cursor()
    sql = "SELECT C.FirstName, C.LastName, B.NumberOfPeople, B.BookingDate, B.BookingTimeSlot, C.Address, C.EmailId, C.MobileNumber, B.BookingStatus \
        FROM AFM.Booking AS B LEFT JOIN AFM.Customer AS C ON B.CustomerId = C.Id"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getAllRequestedBookings():
    cursor = db.cursor()
    sql = "SELECT C.FirstName, C.LastName, B.NumberOfPeople, B.BookingDate, B.BookingTimeSlot, C.Address, C.EmailId, C.MobileNumber \
        FROM AFM.Booking AS B LEFT JOIN AFM.Customer AS C ON B.CustomerId = C.Id WHERE BookingStatus = 'REQUESTED'"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def declineBooking(bookingId):
    cursor = db.cursor()
    sql = "UPDATE AFM.Booking SET BookingStatus = 'DECLINED' WHERE Id = %s;"
    val = cursor.execute(sql, (bookingId))
    cursor.close()
    db.commit()
    return val == 1


def acceptBooking(bookingId):
    cursor = db.cursor()
    sql = "UPDATE AFM.Booking SET BookingStatus = 'ACCEPTED' WHERE Id = %s;"
    val = cursor.execute(sql, (bookingId))
    cursor.close()
    db.commit()
    return val == 1
