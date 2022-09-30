from distutils.command.upload import upload
import os
import boto3
from botocore.exceptions import NoCredentialsError
from datetime import datetime
# from flask_jwt import jwt_required, JWT
from flask import Flask, request
from repository import imagesRepository as images_repo
from werkzeug.utils import secure_filename

ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY")
SECRET_KEY = os.environ.get("AWS_SECRET_KEY")

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

def add_image(image_type, url):
    image_id = images_repo.insert_image(image_type, url)
    return image_id

def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    try:
        s3.upload_file(local_file, bucket, s3_file)
        url = f"https://{bucket}.s3.amazonaws.com/{s3_file}"
        print("Upload Successful",url)
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

def get_file(file, upload_folder, filename):
    if file.filename == '':
        return False
    if file and allowed_file(file.filename):
        file.save(os.path.join(upload_folder, filename))
        return True
    return False


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS