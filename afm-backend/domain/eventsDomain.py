from repository import eventsRepository as eventsRepo
from model.EventModel import EventModel


def createEvent(newEvent: EventModel, userId):
    newEvent.eventTypeId = eventsRepo.getEventTypeId(newEvent.eventType)
    createdEventId = eventsRepo.createEvent(newEvent, userId)
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


def createCurrentEvent(event: EventModel, userId):

    newEvent = EventModel(name=event.name,
                          eventType=event.eventType,
                          longitude=event.longitude,
                          latitude=event.latitude,
                          zipCode=event.zipCode,
                          address=event.address,
                          message=event.message,
                          eventTimeSlot=event.eventTimeSlot,
                          eventDate=event.eventDate,
                          imageId=event.imageId
                          )

    eventId = createEvent(newEvent, userId)

    currentEventId = eventsRepo.addCurrentEvent(eventId, userId)
    return currentEventId


def getAllPastEvents():
    events = eventsRepo.getAllPastEvents()
    return events


def delete_event(id):
    return eventsRepo.delete_event(id)


def edit_event(newEvent: EventModel, event_id, userId):
    if not newEvent.eventType:
        newEvent.eventTypeId = eventsRepo.getEventTypeId(newEvent.eventType)
    event_update = eventsRepo.edit_event(newEvent, event_id, userId)
    return event_update


def getAllEventTypes():
    return eventsRepo.getAllEventTypes()
