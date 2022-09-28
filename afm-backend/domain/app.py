import os
import string
import random
from datetime import datetime
# from flask_jwt import jwt_required, JWT
from flask import Flask, request
import pymysql

username = os.environ.get("USER")
password = os.environ.get("PASSWORD")

db = pymysql.connect(host='54.172.170.239',user=username,password=password,database='AFM')

app = Flask(__name__)

@app.route("/event/future/create", methods=['POST'])
def future_event_create():
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
    
    event_id = get_event_id(event_type)
    event_date = event_date.split('/')
    now = datetime(int(event_date[2]), int(event_date[1]), int(event_date[0]))
    str_now = now.date().isoformat()

    sql = "INSERT INTO Event (imageId, \
        eventTypeId, \
            longitude, \
                latitude, \
                    EmailID, \
                        Address, \
                            EventDate, \
                                Zipcode, \
                                    Message) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"


    cursor = db.cursor()
    cursor.execute(sql, (image_id, event_id, longitude, latitude, email_id, address, str_now, zip_code, message))
    cursor.close()
    db.commit()
    return {'id': cursor.lastrowid}, 201

def get_event_id(event_type):
    cursor = db.cursor()
    sql = "SELECT id from EventType where name = '" + str(event_type) + "'"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

def get_user_id():
    cursor = db.cursor()
    sql = "SELECT id FROM RV_User"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

def get_events():
    cursor = db.cursor()
    sql = "SELECT id FROM RV_User"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

if __name__ == "__main__":
    app.run(debug=True)
