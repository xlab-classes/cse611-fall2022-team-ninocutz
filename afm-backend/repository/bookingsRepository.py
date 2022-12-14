from collections import defaultdict
from app import Database

def addBooking(customerId, numberOfPeople, bookingDate, bookingTimeSlot):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO AFM.Booking (CustomerId, NumberOfPeople, BookingDate, BookingTimeSlot, BookingStatus) VALUES (%s, %s, %s, %s, %s)"
    cursor.execute(sql, (customerId, numberOfPeople,
                   bookingDate, bookingTimeSlot, 'REQUESTED'))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllBookings():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT B.Id, C.FirstName, C.LastName, B.NumberOfPeople, B.BookingDate, B.BookingTimeSlot, C.Address, C.EmailId, C.MobileNumber, B.BookingStatus \
        FROM AFM.Booking AS B LEFT JOIN AFM.Customer AS C ON B.CustomerId = C.Id"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getAllRequestedBookings():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT B.Id, C.FirstName, C.LastName, B.NumberOfPeople, B.BookingDate, B.BookingTimeSlot, C.Address, C.EmailId, C.MobileNumber \
        FROM AFM.Booking AS B LEFT JOIN AFM.Customer AS C ON B.CustomerId = C.Id WHERE B.BookingStatus = 'REQUESTED'"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def declineBooking(bookingId, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.Booking SET BookingStatus = 'DECLINED', ModifiedBy = %s WHERE Id = %s;"
    val = cursor.execute(sql, (userId, bookingId))
    cursor.close()
    db.commit()
    return val == 1


def acceptBooking(bookingId, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.Booking SET BookingStatus = 'ACCEPTED', ModifiedBy = %s WHERE Id = %s;"
    val = cursor.execute(sql, (userId, bookingId))
    cursor.close()
    db.commit()
    return val == 1


def getBookingSlots():
    db = Database()
    booking_slots = defaultdict(list)
    cursor = db.cursor()
    sql = "SELECT BookingDate, BookingTimeSlot FROM AFM.Booking where BookingStatus = 'ACCEPTED' and BookingDate >= CURDATE();"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    if not results:
        return results
    for result in results:
        year = result['BookingDate'].strftime("%Y-%m-%d")
        booking_slots[year].append(result['BookingTimeSlot'])
    results = []
    for k, v in booking_slots.items():
        results.append({'BookingDate':k, 'BookingSlots':v})
    return results
