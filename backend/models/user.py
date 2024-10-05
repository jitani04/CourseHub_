class UserModel:
    def __init__(self, db, supabase):
        self.collection = db["users"]
        self.supabase = supabase

    def create_user(
        self,
        email,
        password,
        username,
        first_name=None,
        last_name=None,
        supabase_user_id=None,
    ):
        try:
            user_data = {
                "_id": supabase_user_id,
                "email": email,
                "username": username,
                "first_name": first_name,
                "last_name": last_name,
            }
            result = self.collection.insert_one(user_data)
            return result.inserted_id, None
        except Exception as e:
            return None, str(e)

    def find_by_email(self, email):
        # Search for a user by email in MongoDB
        return self.collection.find_one({"email": email})

    def get_user_by_supabase_id(self, supabase_id):
        # Search for a user by Supabase ID in MongoDB
        return self.collection.find_one({"supabase_id": supabase_id})
