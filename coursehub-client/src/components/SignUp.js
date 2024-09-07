import React, { useState } from 'react';
import { signUp } from '../utils/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error } = await signUp(email, password);
    if (error) setMessage(error.message);
    else setMessage('Sign-up successful!');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignUp}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignUp;