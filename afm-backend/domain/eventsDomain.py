from repository import eventsRepository as eventsRepo

def createFutureEvent(image_id, event_type, longitude, latitude, address, event_date,zip_code,message):
    event_type_id = eventsRepo.getEventTypeId(event_type)
    created_id = eventsRepo.createFutureEvent(image_id, event_type_id, longitude, latitude, address, event_date, zip_code, message)
    return created_id

def getAllFutureEvents():
    events = eventsRepo.getAllFutureEvents()
    return events

def getEventById(event_id):
    event = eventsRepo.getEventById(event_id)
    return event

def getCurrentEvent():
    event = eventsRepo.getCurrentEvent()
    return event

def createCurrentEvent(imageId, eventType, longitude, latitude, address, eventDate, zipCode, message):
    eventTypeId = eventsRepo.getEventTypeId(eventType)
    eventId = eventsRepo.createFutureEvent(imageId, eventTypeId, longitude, latitude, address, eventDate, zipCode, message)
    currentEventId = eventsRepo.addCurrentEvent(eventId)

    return currentEventId

def getAllPastEvents():
    events = eventsRepo.getAllPastEvents()
    return events