import os
import pymysql

username = os.environ.get("USER")
password = os.environ.get("PASSWORD")

db = pymysql.connect(host='54.172.170.239',user=username,password=password,database='AFM')

#Future Events

def createFutureEvent(image_id, event_id, longitude, latitude, email_id, address, str_now,zip_code,message):

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
    return cursor.lastrowid

def get_event_id(event_type):
    cursor = db.cursor()
    sql = "SELECT id from EventType where name = '" + str(event_type).strip() + "'"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

def get_all_events():
    cursor = db.cursor()
    sql = "SELECT *  FROM Event"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

def get_event_by_id(id):
    cursor = db.cursor()
    sql = "SELECT * FROM Event where id='"+str(id).strip() + "'"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

def get_all_future_events():
    cursor = db.cursor()
    sql = "SELECT * FROM Event where EventDate > CURDATE()"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]