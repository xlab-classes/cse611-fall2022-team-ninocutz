import os
import boto3
import time
from botocore.exceptions import NoCredentialsError
from werkzeug.utils import secure_filename
from repository import imagesRepository

ACCESS_KEY = os.environ.get("AWS_ACCESS_KEY")
SECRET_KEY = os.environ.get("AWS_SECRET_KEY")

ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")
S3_BUCKET = os.environ.get("S3_BUCKET")


def add_image(image_type, url, userId):
    image_id = imagesRepository.insert_image(image_type, url, userId)
    return image_id


def saveImageAndUploadToAws(file):
    fileName = secure_filename(file.filename)

    fileName = str(time.time_ns()) + fileName

    if not get_file(file, IMAGE_LOCATION, fileName):
        return 'Invalid file', 400

    if not upload_to_aws(IMAGE_LOCATION + "/" + fileName, fileName):
        return 'Image upload failed', 500

    return f"https://{S3_BUCKET}.s3.amazonaws.com/{fileName}"


def upload_to_aws(local_file, fileName):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
    try:
        s3.upload_file(local_file, S3_BUCKET, fileName)
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


def getAllGalleryImages():
    return imagesRepository.getAllGalleryImages()


def addNewGalleryImage(url, userId):
    return imagesRepository.insertNewGalleryImage(url, userId)


def deleteImage(imageId):
    return imagesRepository.deleteImage(imageId)
