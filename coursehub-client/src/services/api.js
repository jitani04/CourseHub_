import supabase from '../utils/supabaseClient';

export const fetchProtectedData = async () => {
  const session = supabase.auth.session();

  const response = await fetch('http://localhost:8000/api/protected', {
    headers: new Headers({
      'Authorization': `Bearer ${session?.access_token}`,
      'Content-Type': 'application/json'
    })
  });

  const data = await response.json();
  return data;
}