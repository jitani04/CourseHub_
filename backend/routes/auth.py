from flask import Blueprint, request, jsonify, current_app
from models.user import UserModel
from flask_jwt_extended import create_access_token

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

    # Create user with Supabase and store in MongoDB
    try:
        response = current_app.supabase.auth.sign_up(
            {"email": email, "password": password}
        )

        # Access the user object from the response
        user = response.user

        if not user:
            return jsonify({"message": "Error creating user"}), 400

        # Store the user data in MongoDB
        supabase_user_id = user.id

        user_id, error = user_model.create_user(
            email, password, username, first_name, last_name, supabase_user_id
        )
        if error:
            return jsonify({"message": error}), 400

        return jsonify({"message": "User created", "user_id": str(user_id)}), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 500


@auth_bp.route("/signin", methods=["POST"])
def signin():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"message": "Email and password are required"}), 400

    # Authenticate with Supabase
    try:
        response = current_app.supabase.auth.sign_in(
            {"email": email, "password": password}
        )

        if "error" in response:
            return jsonify({"message": response["error"]["message"]}), 401

        supabase_user_id = response["user"]["id"]
        jwt_token = response["session"]["access_token"]

        # Get user profile from MongoDB
        user_model = UserModel(current_app.db, current_app.supabase)
        user = user_model.get_user_by_supabase_id(supabase_user_id)

        if not user:
            return jsonify({"message": "User profile not found"}), 404

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
        return jsonify({"message": str(e)}), 500
