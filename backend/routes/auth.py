import random
import string
import datetime

from flask import Blueprint, request, jsonify, current_app
from flask_bcrypt import generate_password_hash, check_password_hash
import boto3
from botocore.exceptions import ClientError
import requests
from pymongo.errors import PyMongoError

from models.user import UserModel

auth_bp = Blueprint("auth_bp", __name__)


@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    first_name = data.get("first_name")
    last_name = data.get("last_name")

    if not all([username, email, password]):
        return jsonify({"message": "Username, email, and password are required"}), 400

    user_model = UserModel(current_app.db, current_app.supabase)

    # Check if user already exists in MongoDB
    if user_model.find_by_email(email):
        return jsonify({"message": "User already exists"}), 409

    # Hash the password
    hashed_password = generate_password_hash(password).decode("utf-8")

    # Generate a verification code
    verification_code = "".join(random.choices(string.digits, k=6))
    verification_code_expiry = datetime.datetime.utcnow() + datetime.timedelta(
        minutes=10
    )

    # Send verification code via Amazon SES
    if not send_verification_email(email, verification_code):
        return jsonify({"message": "Failed to send verification email"}), 500

    # Create user in Supabase using Admin API
    try:
        supabase_url = current_app.config["SUPABASE_URL"]
        supabase_key = current_app.config["SUPABASE_KEY"]

        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "email": email,
            "password": password,
            "email_confirm": False,
            "user_metadata": {
                "username": username,
                "first_name": first_name,
                "last_name": last_name,
            },
        }
        response = requests.post(
            f"{supabase_url}/auth/v1/admin/users",
            headers=headers,
            json=payload,
            timeout=10,
        )
        if response.status_code != 200:
            return (
                jsonify(
                    {
                        "message": "Error creating user in Supabase",
                        "details": response.text,
                    }
                ),
                400,
            )

        supabase_user = response.json()
        supabase_user_id = supabase_user["id"]
    except Exception as e:
        return (
            jsonify(
                {"message": "Error creating user in Supabase", "details": str(e)}
            ),
            500,
        )

    # Store user data in MongoDB
    user_data = {
        "username": username,
        "email": email,
        "password": hashed_password,
        "first_name": first_name,
        "last_name": last_name,
        "supabase_id": supabase_user_id,
        "verified": False,
        "verification_code": verification_code,
        "verification_code_expiry": verification_code_expiry,
    }
    user_model.collection.insert_one(user_data)

    return jsonify({"message": "User created, verification code sent to email"}), 201


def send_verification_email(email, code):
    SENDER = f"CourseHub <{current_app.config['EMAIL_FROM']}>"
    RECIPIENT = email
    AWS_REGION = current_app.config["AWS_REGION_NAME"]
    SUBJECT = "Your Verification Code"
    BODY_TEXT = f"Your verification code is: {code}"
    BODY_HTML = (
        f"<html><body><p>Your verification code is: <strong>{code}</strong></p></body></html>"
    )
    CHARSET = "UTF-8"

    client = boto3.client(
        "ses",
        aws_access_key_id=current_app.config["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=current_app.config["AWS_SECRET_ACCESS_KEY"],
        region_name=AWS_REGION,
    )

    try:
        _response = client.send_email(
            Destination={"ToAddresses": [RECIPIENT]},
            Message={
                "Body": {
                    "Html": {"Charset": CHARSET, "Data": BODY_HTML},
                    "Text": {"Charset": CHARSET, "Data": BODY_TEXT},
                },
                "Subject": {"Charset": CHARSET, "Data": SUBJECT},
            },
            Source=SENDER,
        )
        return True
    except ClientError as e:
        print(f"Error sending email: {e.response['Error']['Message']}")
        return False


@auth_bp.route("/verify-email", methods=["POST"])
def verify_email():
    data = request.get_json()
    email = data.get("email")
    code = data.get("code")

    if not all([email, code]):
        return jsonify({"message": "Email and verification code are required"}), 400

    user_collection = current_app.db["users"]

    try:
        # Find the user in MongoDB
        user = user_collection.find_one({"email": email})
    except PyMongoError as e:
        print("Error querying MongoDB:", str(e))
        return jsonify({"message": "Database error", "details": str(e)}), 500

    if not user:
        return jsonify({"message": "User not found"}), 404

    if user.get("verified"):
        return jsonify({"message": "Email already verified"}), 400

    # Check if the verification code matches
    if user.get("verification_code") != code:
        print("Invalid verification code. Expected:", user.get("verification_code"))
        return jsonify({"message": "Invalid verification code"}), 400

    # Check if the verification code has expired
    if datetime.datetime.utcnow() > user.get("verification_code_expiry"):
        print("Verification code expired.")
        return jsonify({"message": "Verification code expired"}), 400

    # Update user's email confirmation in Supabase
    try:
        supabase_url = current_app.config["SUPABASE_URL"]
        supabase_key = current_app.config["SUPABASE_KEY"]
        supabase_user_id = user.get("supabase_id")

        headers = {
            "apikey": supabase_key,
            "Authorization": f"Bearer {supabase_key}",
            "Content-Type": "application/json",
        }

        payload = {"email_confirm": True}

        # Update the email confirmation status in Supabase
        response = requests.put(
            f"{supabase_url}/auth/v1/admin/users/{supabase_user_id}",
            headers=headers,
            json=payload,
            timeout=10,
        )

        if response.status_code != 200:
            return (
                jsonify(
                    {
                        "message": "Error updating user in Supabase",
                        "details": response.text,
                    }
                ),
                400,
            )

    except Exception as e:
        print("Error updating Supabase:", str(e))
        return (
            jsonify(
                {"message": "Error updating user in Supabase", "details": str(e)}
            ),
            500,
        )

    # Update user in MongoDB
    try:
        _result = user_collection.update_one(
            {"email": email},
            {
                "$set": {"verified": True},
                "$unset": {
                    "verification_code": "",
                    "verification_code_expiry": "",
                },
            },
        )
    except PyMongoError as e:
        print("Error updating MongoDB:", str(e))
        return jsonify({"message": "Database error", "details": str(e)}), 500

    return jsonify({"message": "Email verified successfully"}), 200


@auth_bp.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"message": "Email and password are required"}), 400

    # Find user in MongoDB
    user_model = UserModel(current_app.db, current_app.supabase)
    user = user_model.find_by_email(email)

    if not user:
        return jsonify({"message": "User not found"}), 404

    # Check hashed password
    if not check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    # Authenticate with Supabase
    try:
        response = current_app.supabase.auth.sign_in_with_password(
            {"email": email, "password": password}
        )

        # Check if there was an error in the response
        if response.user is None:
            return jsonify({"message": response.error.message}), 401

        jwt_token = response.session.access_token

        return (
            jsonify(
                {
                    "jwt_token": jwt_token,
                    "user_id": str(user["_id"]),
                    "username": user["username"],
                    "email": user["email"],
                    "first_name": user.get("first_name"),
                    "last_name": user.get("last_name"),
                }
            ),
            200,
        )

    except Exception as e:
        print(f"Error in sign-in process: {e}")
        return jsonify({"message": str(e)}), 500
