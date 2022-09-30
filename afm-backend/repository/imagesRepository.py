import os
import pymysql
from app import Database

db = Database()

def insert_image(image_type, url):
    cursor = db.cursor()
    sql = "INSERT INTO Image(image_type, url) VALUES (%s, %s)"
    cursor.execute(sql, (image_type, url))
    id = cursor.lastrowid
    cursor.close()
    db.commit()
    return id