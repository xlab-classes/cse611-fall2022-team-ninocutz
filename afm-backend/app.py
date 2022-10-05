from flask import Flask
import pymysql
import os
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
from uuid import uuid4

# Used to load .env file
load_dotenv()


def create_app():
    from controller.imagesController import images_blueprint
    from controller.eventController import events_blueprint
    from controller.userController import user_blueprint
    from controller.bookingsController import bookings_blueprint

    app = Flask(__name__)

    # JWT
    # Random Secret Key
    app.secret_key = uuid4().hex
    app.config['JWT_BLACKLIST_ENABLED'] = True
    app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access']
    app.config['DEBUG'] = True
    CORS(app, allow_headers=['Content-Type', 'Access-Control-Allow-Origin',
                             'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'])

    jwt = JWTManager()
    jwt.init_app(app)

    app.config['UPLOAD_FOLDER'] = '/tmp/images'
    app.register_blueprint(images_blueprint)
    app.register_blueprint(events_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(bookings_blueprint)

    return app


class Database:
    def __init__(self):
        self.username = os.environ.get("DB_USERNAME")
        self.password = os.environ.get("DB_PASSWORD")

        self.db = None

    def create_connection(self):
        self.db = pymysql.connect(
            host='54.172.170.239', user=self.username, password=self.password, database='AFM')

    def cursor(self):
        if not self.db:
            self.create_connection()
        cur = self.db.cursor()
        return cur

    def commit(self):
        self.db.commit()
        self.db.close()

    def close(self):
        self.db.close()


if __name__ == "__main__":
    app = create_app()
    app.run(host="localhost", port=5555, debug=True)

# Uncomment below to run in Mobile
# if __name__ == '__main__':
#     app = create_app()
#     app.run(host='<ipv4 address>', port=5555, debug=True)
