import time
from datetime import date, datetime
from repository import eventsRepository, customerRepository
from domain import notificationsDomain
from model.EventModel import EventModel
from utils import emailUtil, smsUtil


def createEvent(newEvent: EventModel, userId):
    newEvent.eventTypeId = eventsRepository.getEventTypeId(newEvent.eventType)
    createdEventId = eventsRepository.createEvent(newEvent, userId)
    return createdEventId


def getAllFutureEvents():
    events = eventsRepository.getAllFutureEvents()
    return events


def getEventById(event_id):
    event = eventsRepository.getEventById(event_id)
    return event


def getCurrentEvent():
    event = eventsRepository.getCurrentEvent()
    if event:
        today = str(date.today())
        currentEventData = datetime.strftime(
            event[0]['EventDate'], '%Y-%m-%d')
        if today == currentEventData:
            timeSlot = event[0]['EventTimeSlot'].split('-')
            print(timeSlot)
            cur = time.strftime('%H:%M')
            if cur >= timeSlot[0] and cur <= timeSlot[1]:
                return event
            elif cur > timeSlot[1]:
                eventsRepository.truncateCurrentEvent()

    return []


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

    customers = customerRepository.getCustomersByZipCode(
        event.zipCode, True)

    currentEventId = eventsRepository.addCurrentEvent(eventId, userId)
    if emailTrigger:
        notification = notificationsDomain.getNotificationByType('Email')
        template = notification[0]['NotificationTemplate']

        emailIds = [p['EmailId'] for p in customers]
        emailUtil.triggerNotificationEmail(template, emailIds)

    if smsTrigger:
        notification = notificationsDomain.getNotificationByType('SMS')
        template = notification[0]['NotificationTemplate']

        numbers = []
        for rec in customers:
            if len(rec['MobileNumber']) == 10:
                mobile = "+1"+rec['MobileNumber']
                numbers.append(mobile)
            else:
                pass

        smsUtil.send_promotional_sms(
            numbers, template, smsUtil.DEFAULT_SMS_SERVICE)
    return currentEventId


def getAllPastEvents():
    events = eventsRepository.getAllPastEvents()
    return events


def delete_event(id):
    return eventsRepository.delete_event(id)


def edit_event(newEvent: EventModel, event_id, userId):
    if not newEvent.eventType:
        newEvent.eventTypeId = eventsRepository.getEventTypeId(
            newEvent.eventType)
    event_update = eventsRepository.edit_event(newEvent, event_id, userId)
    return event_update


def getAllEventTypes():
    return eventsRepository.getAllEventTypes()
