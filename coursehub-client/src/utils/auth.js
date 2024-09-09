import supabase from './supabaseClient';

export const signUp = async (email, password, username) => {
  const { user, error } = await supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      // user's metadata
      data: {
        username,
      },
    }
  );

  return { user, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (data.session) {
    localStorage.setItem('supabaseToken', data.session.access_token);
  }
  return { session: data.session, error };
}

export const signOut = async () => {
  return await supabase.auth.signOut();
}