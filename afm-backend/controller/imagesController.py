from flask import request
from flask import Blueprint
from werkzeug.utils import secure_filename
from domain import imagesDomain

images_blueprint = Blueprint('images_blueprint', __name__)
# bucket = os.environ.get("bucket")
bucket = 'afm-image-store'
# IMAGE_LOCATION = os.environ.get("IMAGE_LOCATION")
IMAGE_LOCATION = '/tmp/images'

@images_blueprint.route("/upload/image", methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return 'No file selected', 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    if not imagesDomain.get_file(file, IMAGE_LOCATION, filename):
        return 'Invalid file', 400

    image_type = request.args.get('image_type', None)
    if not imagesDomain.upload_to_aws(IMAGE_LOCATION + "/" + filename, bucket, filename):
        return 'Image upload failed', 500
    url = f"https://{bucket}.s3.amazonaws.com/{filename}"
    
    image_id = imagesDomain.add_image(image_type, url)
    return {'id': image_id}, 201

