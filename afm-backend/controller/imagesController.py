import os
from flask import request
from flask import Blueprint
from domain import imagesDomain
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin

from utils.authUtil import getUserId

images_blueprint = Blueprint('images_blueprint', __name__)


@images_blueprint.route("/upload/image", methods=['POST'])
@jwt_required()
@cross_origin()
def upload_image():

    userId = getUserId()

    if 'file' not in request.files:
        return 'No file selected', 400
    file = request.files['file']
    image_type = request.args.get('image_type', None)

    urlResult = imagesDomain.saveImageAndUploadToAws(file)
    if not isinstance(urlResult, str):
        return urlResult

    image_id = imagesDomain.add_image(image_type, urlResult, userId)
    return {'id': image_id}, 201

# region Gallery


@images_blueprint.route("/images/gallery", methods=['GET'])
@cross_origin()
def getAllGalleryImages():
    events = imagesDomain.getAllGalleryImages()
    return {'images': events}, 200


@images_blueprint.route("/images/gallery", methods=['POST'])
@jwt_required()
@cross_origin()
def addNewGalleryImage():
    userId = getUserId()
    if 'file' in request.files:
        file = request.files['file']

        urlResult = imagesDomain.saveImageAndUploadToAws(file)
        if not isinstance(urlResult, str):
            return urlResult

        imageId = imagesDomain.addNewGalleryImage(urlResult, userId)

        return {'Created': imageId}, 201


@images_blueprint.route("/images/gallery/<imageId>", methods=['DELETE'])
@jwt_required()
@cross_origin()
def deleteGalleryImage(imageId):
    deleted = imagesDomain.deleteImage(imageId)

    if deleted:
        return 'Successfully deleted the iamge', 204
    return 'Error encountered during deletion of image', 500


# endregion Gallery
