from flask import request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask import request
from flask import Blueprint
from importlib_metadata import method_cache
from domain import userDomain
user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/auth", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    return userDomain.validate_login(username, password)

@user_blueprint.route("/reset-password", methods=["PUT"])
@jwt_required()
def reset_password():
    # Assumption - right token is passed to this method
    username = get_jwt_identity()
    password = request.json.get("password", None)
    confirmPassword = request.json.get("confirmPassword", None)
    return userDomain.validate_reset_password(username, password, confirmPassword)