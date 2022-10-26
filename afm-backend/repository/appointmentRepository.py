from app import Database


def addAppointmentRequest(firstName, lastName, eventId, bookingTimeSlot, emailId, mobileNumber):
    db = Database()
    cursor = db.cursor()
    sql = "INSERT INTO AFM.Appointment (FirstName, LastName, EventId, BookingTimeSlot, EmailId, MobileNumber, AppointmentStatus) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (firstName, lastName, eventId,
                   bookingTimeSlot, emailId, mobileNumber, 'REQUESTED'))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id


def getAllAppointments():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT A.Id, A.FirstName, A.LastName, A.BookingTimeSlot, A.EmailId, A.MobileNumber, A.AppointmentStatus, E.Name AS EventName, E.EventDate \
        FROM AFM.Appointment AS A LEFT JOIN AFM.Event AS E ON A.EventId = E.Id"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getAllRequestedAppointments():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT A.Id, A.FirstName, A.LastName, A.BookingTimeSlot, A.EmailId, A.MobileNumber, A.AppointmentStatus, E.Name AS EventName, E.EventDate \
        FROM AFM.Appointment AS A LEFT JOIN AFM.Event AS E ON A.EventId = E.Id WHERE A.AppointmentStatus = 'REQUESTED'"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def declineAppointment(appointmentId, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.Appointment SET AppointmentStatus = 'DECLINED', ModifiedBy = %s WHERE Id = %s;"
    val = cursor.execute(sql, (userId, appointmentId))
    cursor.close()
    db.commit()
    return val == 1


def acceptAppointment(appointmentId, userId):
    db = Database()
    cursor = db.cursor()
    sql = "UPDATE AFM.Appointment SET AppointmentStatus = 'ACCEPTED', ModifiedBy = %s WHERE Id = %s;"
    val = cursor.execute(sql, (userId, appointmentId))
    cursor.close()
    db.commit()
    return val == 1
