class EventModel:
    def __init__(self, name, eventType, longitude, latitude, address, eventDate, eventTimeSlot, zipCode, message, imageId=None, eventTypeId=None):
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.address = address
        self.zipCode = zipCode
        self.eventDate = eventDate
        self.eventTimeSlot = eventTimeSlot
        self.eventType = eventType
        self.eventTypeId = eventTypeId
        self.message = message
        self.imageId = imageId
        self.col_dict = {}


    def _get_dict(self):
        self.col_dict = {'ImageId': self.imageId, 'EventTypeId':self.eventTypeId, 
        'Name': self.name, 'Longitude':self.longitude, 'Latitude':self.latitude, 'Address':self.address, 
        'EventDate':self.eventDate, 'EventTimeSlot':self.eventTimeSlot, 'EventTimeLine':None, 'Zipcode':self.zipCode, 
        'Message':self.message}
        return self.col_dict

    
    def get_update_string(self):
        val_dict = self._get_dict()
        update_string = ''
        for k,v in val_dict.items():
            if v and not isinstance(v, str) :
                update_string = update_string + ' ' + k + ' = ' + str(v) + ' ,'
            elif v and isinstance(v, str) :
                update_string = update_string + ' ' + k + ' = \'' + str(v) + '\' ,'
        update_string = update_string.strip()
        return update_string[0:len(update_string)-1]
