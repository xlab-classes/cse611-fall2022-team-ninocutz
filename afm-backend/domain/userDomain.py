import datetime
from flask import jsonify
from flask_jwt_extended import create_access_token
from repository import userRepository
from utils import emailUtil
from passlib.hash import pbkdf2_sha256
from model.UserModel import UserModel


def validate_login(username, password):
    res = userRepository.getUserByEmail(username)

    if len(res) == 0:
        return "Invalid username or password", 401

    hashedPassord = res[0]['Password']

    userId = res[0]["Id"]

    if not pbkdf2_sha256.verify(password, hashedPassord):
        return "Invalid username or password", 401

    access_token = create_access_token(
        identity=username, expires_delta=datetime.timedelta(minutes=60),
        additional_claims={"userId": userId})

    return jsonify(access_token=access_token)


def validate_reset_password(username, password, confirmPassword, userId):
    if password != confirmPassword:
        return "Passwords do not match", 401

    res = userRepository.getUserByEmail(username)

    if len(res) != 1:
        return 'User does not exist', 401
    else:
        hashedPassword = pbkdf2_sha256.hash(password)
        userRepository.reset_password(username, hashedPassword, userId)
        return 'Password changed succesfully', 200


def validate_forgot_password(username):
    res = userRepository.getUserByEmail(username)

    if len(res) != 1:
        return 'User does not exist', 401

    access_token = create_access_token(
        identity=username, expires_delta=datetime.timedelta(minutes=15),
        additional_claims={"userId": res[0]['Id']})

    res = emailUtil.resetPasswordEmail(username, access_token)

    if res:
        return 'Email succesfully sent', 200

    return 'Error during sending email', 500


def addUser(newUser: UserModel):
    newUser.hashedPassword = pbkdf2_sha256.hash(newUser.password)
    newUserId = userRepository.addUser(newUser)

    access_token = create_access_token(
        identity=newUser.emailId, expires_delta=datetime.timedelta(minutes=15),
        additional_claims={"userId": newUserId})

    res = emailUtil.resetPasswordEmail(newUser.emailId, access_token)

    if res:
        return newUserId

    return 'Error during sending email', 500


def getAllUsers():
    return userRepository.getAllUsers()
