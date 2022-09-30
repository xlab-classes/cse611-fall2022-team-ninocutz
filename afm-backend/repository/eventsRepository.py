from app import Database

db = Database()
#Future Events

def createFutureEvent(image_id, event_id, longitude, latitude, address, str_now,zip_code,message):

    sql = "INSERT INTO Event (imageId, \
        eventTypeId, \
            longitude, \
                latitude, \
                        Address, \
                            EventDate, \
                                Zipcode, \
                                    Message) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"


    cursor = db.cursor()
    cursor.execute(sql, (image_id, event_id, longitude, latitude, address, str_now, zip_code, message))
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
    sql = "SELECT E.Id, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTImeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E INNER JOIN Image AS I ON E.ImageId = I.Id FROM Event"
    cursor.execute(sql)
    results = cursor.fetchall()
    cursor.close()
    return results[0][0]

def get_event_by_id(id):
    cursor = db.cursor()
    sql = "SELECT E.Id, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTImeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E INNER JOIN Image AS I ON E.ImageId = I.Id where Id=" + id
    cursor.execute(sql)
    columns = cursor.description 
    results = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]
    cursor.close()
    return results

def get_all_future_events():
    cursor = db.cursor()
    sql = "SELECT  E.Id, E.Longitude, E.Latitude, E.Address, E.EventDate, E.EventTImeSlot, E.Zipcode, E.Message, I.Url " + \
        "FROM Event AS E INNER JOIN Image AS I ON E.ImageId = I.Id where E.EventDate > CURDATE();"
    cursor.execute(sql)
    # results = cursor.fetchall()
    columns = cursor.description 
    results = [{columns[index][0]:column for index, column in enumerate(value)} for value in cursor.fetchall()]

    cursor.close()
    return results