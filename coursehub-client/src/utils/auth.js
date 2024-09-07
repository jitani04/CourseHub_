// Functions for authentication
export const signUp = async (email, password) => {
  return await supabase.auth.signUp({ email, password });
}

export const signIn = async (email, password) => {
  return await supabase.auth.signIn({ email, password });
}

export const signOut = async () => {
  return await supabase.auth.signOut();
}