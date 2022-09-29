class Event:
    def __init__(self, name, event_type, longitude, latitude, address, event_date, event_time_slot, zip_code, message, image):
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.address = address
        self.zip_code = zip_code
        self.event_date = event_date 
        self.event_time_slot = event_time_slot
        self.message = message
        self.image = image
        self.event_type = event_type
        
    
