from app import Database
from model.EventModel import EventModel
from repository import imagesRepository

# Future Events


def createEvent(newEvent: EventModel, userId):
    db = Database()

    sql = "INSERT INTO AFM.Event \
        (ImageId, EventTypeId, Name, Longitude, Latitude, \
        Address, EventDate, EventTimeSlot, Zipcode, \
        Message, CreatedBy) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

    cursor = db.cursor()
    cursor.execute(sql, (newEvent.imageId, newEvent.eventTypeId, newEvent.name, newEvent.longitude,
                   newEvent.latitude, newEvent.address, newEvent.eventDate, newEvent.eventTimeSlot,
                         newEvent.zipCode, newEvent.message, userId))
    cursor.close()
    db.commit()
    return cursor.lastrowid


def getEventTypeId(event_type):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id from AFM.EventType WHERE name = '" + \
        str(event_type).strip() + "'"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]


def getAllEvents():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url \
        FROM AFM.Event AS E INNER JOIN AFM.Image AS I ON E.ImageId = I.Id"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]


def getEventById(id):
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url \
        FROM AFM.Event AS E INNER JOIN AFM.Image AS I ON E.ImageId = I.Id WHERE E.Id= %s"
    cursor.execute(sql, (id))
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return results


def getAllFutureEvents():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Name, ET.Name AS EventType, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url \
        FROM AFM.Event AS E LEFT JOIN Image AS I ON E.ImageId = I.Id LEFT JOIN AFM.EventType AS ET ON E.EventTypeId = ET.Id WHERE E.EventDate > CURDATE();"
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
    sql = "SELECT E.Id, E.Name, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message \
        FROM AFM.CurrentEvent AS C LEFT JOIN AFM.Event AS E ON C.EventId = E.Id ORDER BY ID DESC LIMIT 1"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def truncateCurrentEvent():
    db = Database()

    sql = "TRUNCATE AFM.CurrentEvent"

    cursor = db.cursor()
    cursor.execute(sql)
    cursor.close()
    db.commit()
    return cursor.lastrowid


def getAllPastEvents():
    db = Database()
    cursor = db.cursor()

    sql = "SELECT E.Id, E.Name, ET.Name AS EventType, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTimeSlot, E.Zipcode, E.Message, I.Url \
        FROM AFM.Event AS E LEFT JOIN Image AS I ON E.ImageId = I.Id LEFT JOIN AFM.EventType AS ET ON E.EventTypeId = ET.Id WHERE E.EventDate < CURDATE();"

    cursor.execute(sql)
    # results = cursor.fetchall()
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results


def deleteAllCurrentEvents():
    db = Database()

    currentEventsSql = "SELECT EventId FROM AFM.CurrentEvent"
    cursor = db.cursor()
    cursor.execute(currentEventsSql)
    results = cursor.fetchall()

    eventIds = []

    for res in results:
        if res[0] is not None:
            eventIds.append(res[0])

    deleteAllCurrentEventsSql = "TRUNCATE TABLE AFM.CurrentEvent"
    cursor = db.cursor()
    cursor.execute(deleteAllCurrentEventsSql)
    cursor.close()
    db.commit()

    if eventIds:
        deleteMultipleEvents(eventIds)

    return True


def addCurrentEvent(eventId, userId):

    deleteAllCurrentEvents()

    db = Database()

    sql = "INSERT INTO AFM.CurrentEvent (EventId, CreatedBy) VALUES (%s, %s)"

    cursor = db.cursor()
    cursor.execute(sql, (eventId, userId))
    cursor.close()
    db.commit()
    return cursor.lastrowid


def deleteMultipleEvents(eventIds):
    db = Database()
    cursor = db.cursor()

    eventIdsList = list(map(str, eventIds))

    eventIdsString = '(' + ','.join(eventIdsList) + ')'
    # Get image id
    image_sql = "SELECT ImageId from AFM.Event WHERE Id IN " + \
        str(eventIdsString)
    cursor.execute(image_sql)
    results = cursor.fetchall()

    imageIds = []
    for res in results:
        if res[0] is not None:
            imageIds.append(res[0])

    # Delete from events table
    sql = "DELETE FROM AFM.Event WHERE Id IN " + str(eventIdsString)
    val = cursor.execute(sql)
    cursor.close()
    db.commit()

    if imageIds:
        imagesRepository.deleteMultipleImages(imageIds)

    return val >= 1


def delete_linked_current_event(eventId):
    db = Database()
    cursor = db.cursor()

    # Delete from current Events table
    sql = "DELETE FROM AFM.CurrentEvent WHERE EventId=" + str(eventId)
    val = cursor.execute(sql)
    cursor.close()
    db.commit()

    return val <= 1


def delete_event(id):
    db = Database()
    cursor = db.cursor()
    # Get image id
    image_sql = "SELECT ImageId from AFM.Event WHERE id=" + str(id)
    cursor.execute(image_sql)
    image_id = cursor.fetchall()[0]

    # Delete from current Event if exists
    delete_linked_current_event(id)

    # Delete from events table
    sql = "DELETE FROM AFM.Event WHERE Id=" + str(id)
    val = cursor.execute(sql)
    cursor.close()
    db.commit()

    if image_id:
        imagesRepository.deleteImage(imageId=image_id)

    return val == 1


def edit_event(newEvent: EventModel, event_id, userId):
    db = Database()
    update_string = newEvent.get_update_string()
    current_table_sql = "UPDATE AFM.Event SET " + \
        update_string + ", ModifiedBy = %s WHERE Id = %s"
    cursor = db.cursor()
    val = cursor.execute(current_table_sql, (userId, event_id))
    cursor.close()
    db.commit()
    return val == 1


def getAllEventTypes():
    db = Database()
    cursor = db.cursor()
    sql = "SELECT Id, Name FROM AFM.EventType"
    cursor.execute(sql)
    columns = cursor.description
    results = [{columns[index][0]:column for index,
                column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return results
