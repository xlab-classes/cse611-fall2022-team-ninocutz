import datetime
from flask import jsonify
from flask_jwt_extended import create_access_token
from repository import userRepository
from utils import emailUtil
from passlib.hash import pbkdf2_sha256


def validate_login(username, password):
    res = userRepository.getUserByEmail(username)

    if len(res) == 0:
        return "Invalid username or password", 401

    hashedPassord = res[0]['Password']

    if not pbkdf2_sha256.verify(password, hashedPassord):
        return "Invalid username or password", 401

    access_token = create_access_token(
        identity=username, expires_delta=datetime.timedelta(minutes=60))

    return jsonify(access_token=access_token)


def validate_reset_password(username, password, confirmPassword):
    if password != confirmPassword:
        return "Passwords do not match", 401

    res = userRepository.getUserByEmail(username)

    if len(res) != 1:
        return 'User does not exist', 401
    else:
        hashedPassword = pbkdf2_sha256.hash(password)
        userRepository.reset_password(username, hashedPassword)
        return 'Password changed succesfully', 200


def validate_forgot_password(username):
    res = userRepository.getUserByEmail(username)

    if len(res) != 1:
        return 'User does not exist', 401

    access_token = create_access_token(
        identity=username, expires_delta=datetime.timedelta(minutes=15))

    res = emailUtil.send_email(username, access_token)

    if res:
        return 'Email succesfully sent', 200

    return 'Error during sending email', 500


def addUser(userName, password):
    hashedPassword = pbkdf2_sha256.hash(password)
    return userRepository.addUser(userName, hashedPassword)
