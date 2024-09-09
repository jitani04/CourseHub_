import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CompleteProfile from './components/CompleteProfile';
import supabase from './utils/supabaseClient';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Start listening for auth state changes
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email_confirmed_at) {
        // Navigate to the complete profile page after email verification
        navigate('/complete-profile');
      }
    });

    // Properly handle cleanup by accessing the `unsubscribe` function from the returned object
    return () => {
      if (authListener?.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
    </Routes>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
