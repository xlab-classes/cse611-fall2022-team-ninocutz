from app import Database
from model.EventModel import EventModel
# Future Events


def createEvent(newEvent: EventModel):
    db = Database()

    sql = "INSERT INTO Event \
        (ImageId, EventTypeId, Name, Longitude, Latitude, \
        Address, EventDate, EventTimeSlot, Zipcode, \
        Message) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

    cursor = db.cursor()
    cursor.execute(sql, (newEvent.imageId, newEvent.eventTypeId, newEvent.name, newEvent.longitude,
                   newEvent.latitude, newEvent.address, newEvent.eventDate, newEvent.eventTimeSlot,
                         newEvent.zipCode, newEvent.message))
    cursor.close()
    db.commit()
    return cursor.lastrowid


def getEventTypeId(event_type):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT id from EventType where name = '" + \
        str(event_type).strip() + "'"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]


def getAllEvents():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E INNER JOIN Image AS I ON E.ImageId = I.Id FROM Event"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]


def getEventById(id):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E INNER JOIN Image AS I ON E.ImageId = I.Id where E.Id=" + id
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return results


def getAllFutureEvents():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E LEFT JOIN Image AS I ON E.ImageId = I.Id where E.EventDate > CURDATE();"
    cursor.execute(sql)
    # results = cursor.fetchall()
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getCurrentEvent():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM CurrentEvent AS C LEFT JOIN Event AS E ON C.EventId = E.Id"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def getAllPastEvents():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E LEFT JOIN Image AS I ON E.ImageId = I.Id where E.EventDate < CURDATE();"
    cursor.execute(sql)
    # results = cursor.fetchall()
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def addCurrentEvent(eventId):
    db = Database()
    # TODO: Truncate Table and add the new current event, to support only one current event at a time
    sql = "INSERT INTO CurrentEvent (eventId) VALUES (%s)"

    cursor = db.cursor()
    cursor.execute(sql, (eventId))
    cursor.close()
    db.commit()
    return cursor.lastrowid
