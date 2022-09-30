import os
import string
import random
from datetime import datetime
from flask import Flask, request
import pymysql
from repository import eventsRepository as eventsRepo
from controller import event_controller as eventsController

def createFutureEvent(image_id, event_type, longitude, latitude, address, event_date,zip_code,message):
    event_id = eventsRepo.get_event_id(event_type)
    created_id = eventsRepo.createFutureEvent(image_id, event_id, longitude, latitude, address, event_date, zip_code, message)
    return created_id