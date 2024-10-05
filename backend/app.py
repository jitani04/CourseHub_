from flask import Flask
from flask_cors import CORS
# from flask_jwt_extended import JWTManager
from pymongo import MongoClient
from config import Config
from supabase import create_client, Client
from routes.auth import auth_bp



def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    # jwt = JWTManager(app)

    client = MongoClient(
        app.config["MONGO_URI"], tls=True, tlsAllowInvalidCertificates=True
    )
    db = client.get_default_database()
    app.db = db

    supabase_url = app.config["SUPABASE_URL"]
    supabase_key = app.config["SUPABASE_KEY"]
    supabase: Client = create_client(supabase_url, supabase_key)
    app.supabase = supabase

    app.register_blueprint(auth_bp, url_prefix="/auth")
    print("Blueprint registered: auth_bp")

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=app.config["DEBUG"])
