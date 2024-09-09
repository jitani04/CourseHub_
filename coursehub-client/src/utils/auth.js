import supabase from './supabaseClient';

export const signUp = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
}

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