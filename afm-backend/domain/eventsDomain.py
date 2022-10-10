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

    eventId = createEvent(newEvent)

    currentEventId = eventsRepo.addCurrentEvent(eventId)
    return currentEventId


def getAllPastEvents():
    events = eventsRepo.getAllPastEvents()
    return events


def delete_event(id):
    return eventsRepo.delete_event(id)


def edit_event(newEvent: EventModel, event_id):
    if not newEvent.eventType:
        newEvent.eventTypeId = eventsRepo.getEventTypeId(newEvent.eventType)
    event_update = eventsRepo.edit_event(newEvent, event_id)
    return event_update


def getAllEventTypes():
    return eventsRepo.getAllEventTypes()
