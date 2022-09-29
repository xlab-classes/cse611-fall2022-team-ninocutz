from datetime import datetime
from flask import Flask, request
from domain import events_domain as eventsDomain
from repository import eventsRepository as eventsRepo

app = Flask(__name__)

@app.route("/event/future/create", methods=['POST'])
def future_event():
    content = request.json
    image_id = request.args.get('image_id', None)
    event_type = content['event_type']
    longitude = content['longitude']
    latitude = content['latitude']
    email_id = content['email_id']
    address = content['address']
    event_date = content['event_date']
    zip_code = content['zip_code']
    message = content['message']

    # take the data
    # upload the image 
    # fetch the image id
    # fetch the event id
    
    created_id = eventsDomain.createFutureEvent()
    return {'id': created_id}, 201



@app.route("/event/future/getAll", methods=['GET'])
def getAllFutureEvents():
    
    events = eventsRepo.get_all_future_events()
    return {'events': events}, 201

@app.route("/event/future/getEventById", methods=['GET'])
def getEventById(ID):
    
    event = eventsRepo.get_event_by_id()
    return {'events': event}, 201