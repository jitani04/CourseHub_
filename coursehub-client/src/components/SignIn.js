import React, { useState } from 'react';
import { signIn } from '../utils/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { user, error } = await signIn(email, password);
    if (error) setMessage(error.message);
    else setMessage('Login successful!');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSignIn}>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default SignIn;