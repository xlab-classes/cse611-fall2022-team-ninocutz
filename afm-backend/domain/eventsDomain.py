from repository import eventsRepository as eventsRepo
from model import EventModel

def createFutureEvent(newEvent: EventModel):
    newEvent.eventTypeId = eventsRepo.getEventTypeId(newEvent.eventType)

    createdEventId = eventsRepo.createFutureEvent(newEvent)

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


def createCurrentEvent(event: EventModel):
    eventId = createFutureEvent(event.imageId, event.name, event.eventType, event.longitude,
                                event.latitude, event.address, event.eventDate, event.zipCode, event.message, event.eventTimeSlot)

    currentEventId = eventsRepo.addCurrentEvent(eventId)

    return currentEventId


def getAllPastEvents():
    events = eventsRepo.getAllPastEvents()
    return events
