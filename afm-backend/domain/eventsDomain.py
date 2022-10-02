from repository import eventsRepository as eventsRepo


def createFutureEvent(imageId, eventName, eventType, longitude, latitude, address, eventDate, zipCode, message, eventTimeSlot):
    eventTypeId = eventsRepo.getEventTypeId(eventType)
    createdEventId = eventsRepo.createFutureEvent(
        imageId, eventTypeId, eventName, longitude, latitude, address, eventDate, zipCode, message, eventTimeSlot)

    return createdEventId


def getAllFutureEvents():
    events = eventsRepo.getAllFutureEvents()
    return events


def getEventById(event_id):
    event = eventsRepo.getEventById(event_id)
    return event


def getCurrentEvent():
    event = eventsRepo.getCurrentEvent()
    return event


def createCurrentEvent(imageId, eventName, eventType, longitude, latitude, address, eventDate, eventTimeSlot, zipCode, message):
    eventId = createFutureEvent(imageId, eventName, eventType, longitude,
                                latitude, address, eventDate, zipCode, message, eventTimeSlot)

    currentEventId = eventsRepo.addCurrentEvent(eventId)

    return currentEventId


def getAllPastEvents():
    events = eventsRepo.getAllPastEvents()
    return events
