import os
from werkzeug.utils import secure_filename
from flask import Blueprint
from flask_cors import cross_origin
from flask import request
from domain import eventsDomain
from domain import imagesDomain


events_blueprint = Blueprint('events_blueprint', __name__)
bucket = os.environ.get("S3_BUCKET")
IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")

#region Future Events

@events_blueprint.route("/event/future", methods=['POST'])
@cross_origin(origin='*')
# @jwt_required() TODO: Check authentication failure from client
def future_event():
    # TODO: Add all the required fields
    image_id = None
    event_type = request.form.get('event_type')
    longitude = request.form.get('longitude')
    latitude = request.form.get('latitude')
    address = request.form.get('address')
    event_date = request.form.get('event_date')
    zip_code = request.form.get('zip_code')
    message = request.form.get('message')
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
    
    created_id = eventsDomain.createFutureEvent(image_id, \
        event_type, longitude, latitude, \
            address, event_date, zip_code, message)
    return {'id': created_id}, 201

@events_blueprint.route("/event/future", methods=['GET'])
def getAllFutureEvents():
    events = eventsDomain.getAllFutureEvents()
    return {'events': events}, 200

@events_blueprint.route("/event/future/getEventById", methods=['GET'])
def getEventById(ID):
    event = eventsDomain.getEventById(ID)
    return {'events': event}, 200

#endregion Future Events

#region Current Events

@events_blueprint.route("/event/current", methods=['GET'])
def getCurrentEvent():
    events = eventsDomain.getCurrentEvent()
    return {'events': events}, 200

@events_blueprint.route("/event/current", methods=['POST'])
@cross_origin(origin='*')
# @jwt_required() TODO: Check authentication failure from client
def addCurrentEvent():
    image_id = None
    event_type = request.form.get('event_type')
    longitude = request.form.get('longitude')
    latitude = request.form.get('latitude')
    address = request.form.get('address')
    event_date = request.form.get('event_date')
    zip_code = request.form.get('zip_code')
    message = request.form.get('message')

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
    
    created_id = eventsDomain.createCurrentEvent(image_id, event_type, longitude, latitude, address, event_date, zip_code, message)
    return {'id': created_id}, 201

#endregion Current Events


#region Past Events
@events_blueprint.route("/event/past", methods=['GET'])
def getAllPastEvents():
    events = eventsDomain.getAllPastEvents()
    return {'events': events}, 200
#endregion Past Events