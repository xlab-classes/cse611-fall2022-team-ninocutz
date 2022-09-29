from datetime import datetime
from unicodedata import name
from flask import Flask, request
from domain import events_domain as eventsDomain
from repository import eventsRepository as eventsRepo
from domain import images_domain as image_domain
from werkzeug.utils import secure_filename
from flask import Blueprint
import json, os

events_blueprint = Blueprint('events_blueprint', __name__)
# bucket = os.environ.get("BUCKET")
bucket = 'afm-image-store'
# IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")
IMAGE_LOCATION = '/tmp/images'

@events_blueprint.route("/event/future", methods=['POST'])
def future_event():
    content = request.json
    new_event = event(name = content['event_name'],\
        event_type = content['event_type'],\
            latitude =content['latitude'],\
        longitude = content['longitude'],\
            address = content['address'],\
                zip_code = content['zip_code'],\
                    event_time_slot = content['event_time_slot'],\
                        event_date = content['event_date'],\
                            message = content['message'],\
                                image = content['image']



    )
  
    
    
    
    
    

        image_type = request.args.get('image_type', None)
        if not image_domain.upload_to_aws(IMAGE_LOCATION + "/" + filename, bucket, filename):
            return 'Image upload failed', 500
        url = f"https://{bucket}.s3.amazonaws.com/{filename}"        
        image_id = image_domain.add_image(image_type, url)
    
    created_id = eventsDomain.createFutureEvent(image_id, \
        event_type, longitude, latitude, email_id, \
            address, event_date, zip_code, message)
    return {'id': created_id}, 201

@events_blueprint.route("/event/future/getAll", methods=['GET'])
def getAllFutureEvents():
    
    events = eventsRepo.get_all_future_events()
    return {'events': events}, 201

@events_blueprint.route("/event/future/getEventById", methods=['GET'])
def getEventById(ID):
    event = eventsRepo.get_event_by_id()
    return {'events': event}, 201