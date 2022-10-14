import datetime
from flask import jsonify
from flask_jwt_extended import create_access_token
from repository import userRepository
from utils import emailUtil
from passlib.hash import pbkdf2_sha256
from model.UserModel import UserModel
import itertools


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

def deleteUser(userId):
    res = userRepository.getUserById(userId)
    if len(res) != 1:
        return 'User does not exist', 401
    userRepository.deleteUser(userId)
    return "User deleted succesfully", 200

def updateUser(userId, updatedUser):
    res = userRepository.getUserById(userId)
    if len(res) != 1:
        return 'User does not exist', 401
    
    mutable_fields_dict = {'FirstName' : updatedUser.__dict__['firstName'], 'LastName' : updatedUser.__dict__['lastName'],
                           'EmailId' : updatedUser.__dict__['emailId'], 'MobileNumber' : updatedUser.__dict__['mobileNumber'], 
                           'Address' : updatedUser.__dict__['address'], 'ZipCode' :updatedUser.__dict__['zipcode']}
    update_statement = ""
    for x, y in zip(mutable_fields_dict.keys(), mutable_fields_dict.values()):
        if mutable_fields_dict[x] != None:
            update_statement += "{} = \"{}\" ,".format(x, y)
    
    update_statement += "ModifiedBy = {} ".format(updatedUser.modifiedBy)
    userRepository.updateUser(userId, update_statement)
    return "User updated succesfully", 200


def getAllUsers():
    return userRepository.getAllUsers()
