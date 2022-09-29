from datetime import datetime
from unicodedata import name
from flask import Flask, request
from domain import events_domain as eventsDomain
from repository import eventsRepository as eventsRepo
from domain import images_domain as image_domain
from werkzeug.utils import secure_filename
from flask import Blueprint
import json
import os
from model import event_model as event

events_blueprint = Blueprint('events_blueprint', __name__)
# bucket = os.environ.get("BUCKET")
bucket = 'afm-image-store'
# IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")
IMAGE_LOCATION = '/tmp/images'


@events_blueprint.route("/event/future", methods=['POST'])
def future_event():
    content = request.json
    new_event = event(name=content['event_name'],
                      event_type=content['event_type'],
                      latitude=content['latitude'],
                      longitude=content['longitude'],
                      address=content['address'],
                      zip_code=content['zip_code'],
                      event_time_slot=content['event_time_slot'],
                      event_timeline = "Future",
                      event_date=content['event_date'],
                      message=content['message'],
                      image=content['image'])
                      
    image_type = content['image_type']
    status, url = image_domain.upload_image_to_aws(request.files,image_type)

    if status:
            image_id  = image_domain.add_image(image_type, url)
    else:
            return f'Image upload failed '+url , 500
   
    new_event.image_id = image_id
    event_id = eventsDomain.createFutureEvent(new_event)
    return {'id': event_id}, 201

@events_blueprint.route("/event/future", methods=['GET'])
def getAllFutureEvents():
    events = eventsRepo.get_all_future_events()
    return {'events': events}, 201

@events_blueprint.route("/event/future&id", methods=['GET'])
def getEventById(ID):
    event = eventsRepo.get_event_by_id()
    return {'events': event}, 201