from repository import eventsRepository as eventsRepo
from repository import customerRepository
from domain import notificationsDomain
from model.EventModel import EventModel
from utils import emailUtil, smsUtil


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


def createCurrentEvent(event: EventModel, userId, emailTrigger=False, smsTrigger=False):

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
    if emailTrigger:
        notification = notificationsDomain.getNotificationByType('Email')
        template = notification[0]['NotificationTemplate']

        customers = customerRepository.getCustomersByZipCode(
            event.zipCode, True)
        emailIds = [p['EmailId'] for p in customers]
        emailUtil.triggerNotificationEmail(template, emailIds)
        return currentEventId
    
    if smsTrigger:
        customers = customerRepository.getCustomersByZipCode(
            event.zipCode, True)
        numbers = []
        for rec in customers:
            if len(rec) == 10:
                mobile = "+1"+rec['MobileNumber']
                numbers.append(mobile)
            else:
                pass
        smsUtil.send_promotional_sms(numbers, smsUtil.DEFAULT_SMS_SERVICE)
        return currentEventId
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
