from repository import eventsRepository as eventsRepo
from model.EventModel import EventModel


def createEvent(newEvent: EventModel):
    newEvent.eventTypeId = eventsRepo.getEventTypeId(newEvent.eventType)

    createdEventId = eventsRepo.createEvent(newEvent)

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
    eventId = createEvent(event.imageId, event.name, event.eventType, event.longitude,
                          event.latitude, event.address, event.eventDate, event.zipCode, event.message, event.eventTimeSlot)

    currentEventId = eventsRepo.addCurrentEvent(eventId)

    return currentEventId


def getAllPastEvents():
    events = eventsRepo.getAllPastEvents()
    return events

def delete_event(id):
    return eventsRepo.delete_event(id)