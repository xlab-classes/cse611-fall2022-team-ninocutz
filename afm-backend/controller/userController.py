import datetime
from flask import request, jsonify
from flask_jwt_extended import create_access_token
from flask import request
from flask import Blueprint
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