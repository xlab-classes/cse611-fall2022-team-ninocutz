import datetime
from flask import request, jsonify
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask import request
from flask import Blueprint
from importlib_metadata import method_cache
from app import Database
user_blueprint = Blueprint('user_blueprint', __name__)


@user_blueprint.route("/auth", methods=["POST"])
def login():
    db = Database()
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    sql = "select * from RV_User where EmailID = '" + username + "' and Password = '"+ password + "'"
    cursor = db.cursor()
    cursor.execute(sql)
    res = cursor.fetchall()
    if len(res) != 1:
        return "Invalid username or password", 401
    cursor.close()
    db.commit()    
    access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(minutes=60))
    db = None
    return jsonify(access_token=access_token)

@user_blueprint.route("/reset_password", methods=["PUT"])
@jwt_required()
def reset_password():
    db = Database()
    cursor = db.cursor()
    username = get_jwt_identity()
    password = request.json.get("password", None)
    confirm_password = request.json.get("confirm_password", None)
    if password != confirm_password:
        return "Passwords do not match", 401
    sql = "SELECT * from RV_User where EmailId = %s"
    cursor.execute(sql, (username))
    res = cursor.fetchall()
    if len(res) != 1:
        return 'User does not exist', 401
    else:
        sql = "update RV_User set Password = %s where EmailID = %s"
        cursor.execute(sql, (password, username))
        db.commit()
    return 'Password changed succesfully', 200