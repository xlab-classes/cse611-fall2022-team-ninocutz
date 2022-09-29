import os
import string
import random
from datetime import datetime
from flask import Flask, request
import pymysql
from repository import eventsRepository as eventsRepo
from controller import event_controller as eventsController


def createFutureEvent(new_event):
    event_id = eventsRepo.get_event_id(new_event.event_type)
    event_date = event_date.split('/')
    now = datetime(int(event_date[2]), int(event_date[1]), int(event_date[0]))
    str_now = now.date().isoformat()
    created_id = eventsRepo.createFutureEvent(image_id, event_id, longitude, latitude, email_id, address, str_now, zip_code, message)
    return created_id