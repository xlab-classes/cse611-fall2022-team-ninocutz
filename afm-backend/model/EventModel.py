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
