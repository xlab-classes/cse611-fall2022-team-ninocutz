from flask import Flask
import pymysql
import os

def create_app():
    from controller.images_controller import images_blueprint
    from controller.event_controller import events_blueprint
    app = Flask(__name__)
    app.config['UPLOAD_FOLDER'] = '/tmp/images'
    app.register_blueprint(images_blueprint)
    app.register_blueprint(events_blueprint)
    return app

class Database:

    def __init__(self) -> None:
        self.username = os.environ.get("USER")
        self.password = os.environ.get("PASSWORD")
        self.db = None

    def create_connection(self):
        self.db = pymysql.connect(host='54.172.170.239',user=self.username,password=self.password,database='AFM')
    
    def cursor(self):
        if not self.db:
            self.create_connection()
        cur = self.db.cursor()
        return cur
    
    def commit(self):
        self.db.commit()
        self.db.close()


if __name__ == "__main__":
    app = create_app()
    app.run(host="localhost", port=5555, debug=True)
