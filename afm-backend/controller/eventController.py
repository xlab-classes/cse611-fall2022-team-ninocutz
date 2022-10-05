from datetime import date
from email import message
import os
from unicodedata import name
from werkzeug.utils import secure_filename
from flask import Blueprint
from flask_cors import cross_origin
from flask import request
from domain import eventsDomain
from domain import imagesDomain
from model.EventModel import EventModel

events_blueprint = Blueprint('events_blueprint', __name__)
bucket = os.environ.get("S3_BUCKET")
IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")

# region Future Events


@events_blueprint.route("/event", methods=['POST'])
@cross_origin(origin='*')
# @jwt_required() TODO: Check authentication failure from client
def createEvent():
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

    if 'file' in request.files:
        file = request.files['file']
        filename = secure_filename(file.filename)
        image_type = request.args.get('image_type', None)
        if not imagesDomain.get_file(file, IMAGE_LOCATION, filename):
            return 'Invalid file', 400

        image_type = request.args.get('image_type', None)
        if not imagesDomain.upload_to_aws(IMAGE_LOCATION + "/" + filename, bucket, filename):
            return 'Image upload failed', 500
        url = f"https://{bucket}.s3.amazonaws.com/{filename}"
        imageId = imagesDomain.add_image(image_type, url)
        newEvent.imageId = imageId

    createEventId = eventsDomain.createEvent(newEvent)

    return {'id': createEventId}, 201


@events_blueprint.route("/event/future", methods=['GET'])
def getAllFutureEvents():
    events = eventsDomain.getAllFutureEvents()
    return {'events': events}, 200


@events_blueprint.route("/event/future/getEventById", methods=['GET'])
def getEventById(ID):
    event = eventsDomain.getEventById(ID)
    return {'events': event}, 200

# endregion Future Events

# region Current Events


@events_blueprint.route("/event/current", methods=['GET'])
def getCurrentEvent():
    events = eventsDomain.getCurrentEvent()
    return {'events': events}, 200


@events_blueprint.route("/event/current", methods=['POST'])
@cross_origin(origin='*')
# @jwt_required() TODO: Check authentication failure from client
def addCurrentEvent():

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

    # TODO: Check if image is needed
    # if 'file' in request.files:
    #     file = request.files['file']
    #     filename = secure_filename(file.filename)
    #     image_type = request.args.get('image_type', None)
    #     if not imagesDomain.get_file(file, IMAGE_LOCATION, filename):
    #         return 'Invalid file', 400

    #     image_type = request.args.get('image_type', None)
    #     if not imagesDomain.upload_to_aws(IMAGE_LOCATION + "/" + filename, bucket, filename):
    #         return 'Image upload failed', 500
    #     url = f"https://{bucket}.s3.amazonaws.com/{filename}"
    #     image_id = imagesDomain.add_image(image_type, url)

    createdCurrentEventId = eventsDomain.createCurrentEvent(newEvent)
    return {'id': createdCurrentEventId}, 201

# endregion Current Events


# region Past Events
@events_blueprint.route("/event/past", methods=['GET'])
def getAllPastEvents():
    events = eventsDomain.getAllPastEvents()
    return {'events': events}, 200
# endregion Past Events

@events_blueprint.route("/event", methods=['DELETE'])
def delete_event():
    id = request.json.get("id", None)
    if not id:
        return 'No event id provided', 400
    events = eventsDomain.delete_event(id)
    if events:
        return 'Successfully deleted the event', 200
    return 'Error encountered during event deletion', 500


@events_blueprint.route("/event", methods=['PUT'])
def edit_event():
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

    event_id=request.form.get('eventId', None)
    if not event_id:
        return 'Event id is required', 400

    if 'file' in request.files:
        file = request.files['file']
        filename = secure_filename(file.filename)
        image_type = request.args.get('image_type', None)
        if not imagesDomain.get_file(file, IMAGE_LOCATION, filename):
            return 'Invalid file', 400

        image_type = request.args.get('image_type', None)
        if not imagesDomain.upload_to_aws(IMAGE_LOCATION + "/" + filename, bucket, filename):
            return 'Image upload failed', 500
        url = f"https://{bucket}.s3.amazonaws.com/{filename}"
        image_id = imagesDomain.add_image(image_type, url)
        newEvent.imageId = image_id

    event_status = eventsDomain.edit_event(newEvent, event_id)
    if event_status:
        return 'Successfully updated the event', 204
    return 'Error encountered during event update', 500