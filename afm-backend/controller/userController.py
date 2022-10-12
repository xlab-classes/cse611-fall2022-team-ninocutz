from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_cors import cross_origin
from flask import request
from flask import Blueprint
from domain import userDomain
from utils.authUtil import getUserId
user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/auth", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    return userDomain.validate_login(username, password)


@user_blueprint.route("/reset-password", methods=["PUT"])
@jwt_required()
@cross_origin()
def reset_password():
    # Assumption - right token is passed to this method
    username = get_jwt_identity()
    userId = getUserId()
    password = request.json.get("password", None)
    confirmPassword = request.json.get("confirmPassword", None)
    return userDomain.validate_reset_password(
        username, password, confirmPassword, userId)


@user_blueprint.route("/forgot-password", methods=['POST'])
def forgot_password():
    username = request.json.get("username", None)
    return userDomain.validate_forgot_password(username)


@user_blueprint.route("/add-user", methods=['POST'])
def addUser():
    userName = request.json.get("username", None)
    password = request.json.get("password", None)
    id = userDomain.addUser(userName, password)

    return {'userId': id}, 200
