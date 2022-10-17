import os
from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from flask import request
from domain import eventsDomain
from domain import imagesDomain
from domain import socialmediaDomain
from model.EventModel import EventModel
from utils.authUtil import getUserId

events_blueprint = Blueprint('events_blueprint', __name__)
IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")

# region Future Events


@events_blueprint.route("/event", methods=['POST'])
@jwt_required()
@cross_origin()
def createEvent():
    userId = getUserId()
    newEvent = EventModel(name=request.form.get('eventName'),
                          eventType=request.form.get('eventType'),
                          longitude=request.form.get('longitude'),
                          latitude=request.form.get('latitude'),
                          zipCode=request.form.get('zipCode'),
                          address=request.form.get('address'),
                          message=request.form.get('message'),
                          eventTimeSlot=request.form.get('eventTimeSlot'),
                          eventDate=request.form.get('eventDate')
                          )
    postToInstagram = request.form.get('postToInstagram', False)
    postToFacebook = request.form.get('postToFacebook', False)
    postToTwitter = request.form.get('postToTwitter', False)

    if postToInstagram or postToFacebook:
        facebookToken = request.form.get('facebookToken', False)

    if 'file' in request.files:
        file = request.files['file']
        imageType = request.args.get('image_type', None)

        urlResult = imagesDomain.saveImageAndUploadToAws(file)
        if not isinstance(urlResult, str):
            return urlResult

        imageId = imagesDomain.add_image(imageType, urlResult, userId)
        newEvent.imageId = imageId

    createEventId = eventsDomain.createEvent(newEvent, userId)

    if postToInstagram and 'file' in request.files:
        socialmediaDomain.postToInstagram(
            facebookToken, urlResult, newEvent.message)
    if postToFacebook and 'file' in request.files:
        socialmediaDomain.postToFacebook(
            facebookToken, urlResult, newEvent.message)
    if postToTwitter and 'file' in request.files:
        savedFilePath = IMAGE_LOCATION + "/" + urlResult.split('/')[-1]
        socialmediaDomain.postToTwitter(savedFilePath, newEvent.message)

    return {'id': createEventId}, 201


@events_blueprint.route("/event/future", methods=['GET'])
@cross_origin()
def getAllFutureEvents():
    events = eventsDomain.getAllFutureEvents()
    return {'events': events}, 200


@events_blueprint.route("/event/future/<id>", methods=['GET'])
@cross_origin()
def getEventById(id):
    event = eventsDomain.getEventById(id)
    return {'events': event}, 200

# endregion Future Events

# region Current Events


@events_blueprint.route("/event/current", methods=['GET'])
@cross_origin()
def getCurrentEvent():
    events = eventsDomain.getCurrentEvent()
    return {'events': events}, 200


@events_blueprint.route("/event/current", methods=['POST'])
@jwt_required()
@cross_origin()
def addCurrentEvent():
    userId = getUserId()

    newEvent = EventModel(name=request.form.get('eventName'),
                          eventType=request.form.get('eventType'),
                          longitude=request.form.get('longitude'),
                          latitude=request.form.get('latitude'),
                          zipCode=request.form.get('zipCode'),
                          address=request.form.get('address'),
                          message=request.form.get('message'),
                          eventTimeSlot=request.form.get('eventTimeSlot'),
                          eventDate=request.form.get('eventDate')
                          )

    emailTrigger = request.form.get('emailTrigger', False)
    # TODO: Check if image is needed

    createdCurrentEventId = eventsDomain.createCurrentEvent(
        newEvent, userId, emailTrigger)
    return {'id': createdCurrentEventId}, 201

# endregion Current Events


# region Past Events
@events_blueprint.route("/event/past", methods=['GET'])
@cross_origin()
def getAllPastEvents():
    events = eventsDomain.getAllPastEvents()
    return {'events': events}, 200
# endregion Past Events


@events_blueprint.route("/event/<event_id>", methods=['DELETE'])
@jwt_required()
@cross_origin()
def delete_event(event_id):
    if not event_id:
        return 'No event id provided', 400
    events = eventsDomain.delete_event(event_id)
    if events:
        return 'Successfully deleted the event', 204
    return 'Error encountered during event deletion', 500


@events_blueprint.route("/event", methods=['PUT'])
@jwt_required()
@cross_origin()
def edit_event():
    userId = getUserId()
    newEvent = EventModel(name=request.form.get('eventName'),
                          eventType=request.form.get('eventType'),
                          longitude=request.form.get('longitude'),
                          latitude=request.form.get('latitude'),
                          zipCode=request.form.get('zipCode'),
                          address=request.form.get('address'),
                          message=request.form.get('message'),
                          eventTimeSlot=request.form.get('eventTimeSlot'),
                          eventDate=request.form.get('eventDate')
                          )
    event_id = request.form.get('eventId')
    if not event_id:
        return 'Event id is required', 400

    if 'file' in request.files:
        file = request.files['file']
        image_type = request.args.get('image_type', None)

        urlResult = imagesDomain.saveImageAndUploadToAws(file)
        if not isinstance(urlResult, str):
            return urlResult

        image_id = imagesDomain.add_image(image_type, urlResult, userId)
        newEvent.imageId = image_id

    event_status = eventsDomain.edit_event(newEvent, event_id, userId)
    if event_status:
        return 'Successfully updated the event', 204
    return 'Error encountered during event update', 500


@events_blueprint.route("/event-types", methods=['GET'])
@cross_origin()
def getAllEventTypes():
    eventTypes = eventsDomain.getAllEventTypes()

    return {'eventTypes': eventTypes}, 200
