import supabase from './supabaseClient';

export const updateUserProfile = async (profileData) => {
  const user = supabase.auth.user();  

  const { data, error } = await supabase
    .from('profiles') 
    .insert([
      {
        user_id: user.id,  
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        bio: profileData.bio,
        profile_pic: profileData.profilePic,  
      },
    ]);

  return { data, error };
};