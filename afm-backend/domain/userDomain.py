import datetime
from flask import jsonify
from flask_jwt_extended import create_access_token
from repository import userRepository

def validate_login(username, password):
    res = userRepository.login(username, password)
    if len(res) != 1:
        return "Invalid username or password", 401
    access_token = create_access_token(identity=username, expires_delta=datetime.timedelta(minutes=60))
    return jsonify(access_token=access_token)

def validate_reset_password(username, password, confirmPassword):
    if password != confirmPassword:
        return "Passwords do not match", 401
    res = userRepository.check_user_exists(username)
    if len(res) != 1:
        return 'User does not exist', 401
    else:
        userRepository.reset_password(username, password)
    return 'Password changed succesfully', 200