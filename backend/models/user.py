class UserModel:
    def __init__(self, db, supabase):
        self.collection = db["users"]
        self.supabase = supabase

    def create_user(
        self,
        email,
        username,
        supabase_user_id=None,
        verified=False,
        verification_code=None,
        verification_code_expiry=None,
    ):
        try:
            user_data = {
                "_id": supabase_user_id,
                "email": email,
                "username": username,
                "verified": verified,
                "verification_code": verification_code,
                "verification_code_expiry": verification_code_expiry,
            }
            result = self.collection.insert_one(user_data)
            return result.inserted_id, None
        except Exception as e:
            return None, str(e)

    def find_by_email(self, email):
        return self.collection.find_one({"email": email})

    def get_user_by_supabase_id(self, supabase_id):
        return self.collection.find_one({"supabase_id": supabase_id})
