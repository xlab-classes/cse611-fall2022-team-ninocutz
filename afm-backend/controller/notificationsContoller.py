from flask import request
from flask import Blueprint
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from domain import notificationsDomain
from utils.authUtil import getUserId

notifications_blueprint = Blueprint('notifications_blueprint', __name__)


@notifications_blueprint.route("/notifications", methods=['POST'])
@jwt_required()
@cross_origin()
def addNotification():
    userId = getUserId()
    data = request.get_json()
    notificationType = data.get('notificationType', '')
    template = data.get('notificationTemplate', '')

    notificationId = notificationsDomain.insertNotification(
        notificationType, template, userId)

    return {'id': notificationId}, 201


@notifications_blueprint.route("/notifications", methods=['GET'])
@jwt_required()
@cross_origin()
def getAllNotifications():
    notifications = notificationsDomain.getAllNotifications()
    return {'notifications': notifications}, 200


@notifications_blueprint.route("/notifications", methods=['PUT'])
@jwt_required()
@cross_origin()
def updateNotification():
    data = request.get_json()
    id = data.get('id', '')
    userId = getUserId()
    notificationType = data.get('notificationType', '')
    template = data.get('notificationTemplate', '')
    updated = notificationsDomain.updateNotification(
        id, notificationType, template, userId)

    if updated:
        return 'Successfully updated the Notification', 204
    return 'Error encountered during Notification update', 500


@notifications_blueprint.route("/notifications/<id>", methods=['DELETE'])
@jwt_required()
@cross_origin()
def deleteNotification(id):
    deleted = notificationsDomain.deleteNotification(id)

    if deleted:
        return 'Successfully deleted the Notification', 204
    return 'Error encountered during deletion of Notification', 500
