from flask_jwt_extended import get_jwt


def getUserId():
    jwt = get_jwt()

    return jwt['userId']
