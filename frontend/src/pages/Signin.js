import React, { useState } from 'react';
import { signin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const data = await signin(email, password);
      localStorage.setItem('jwt_token', data.jwt_token);
      localStorage.setItem('user', JSON.stringify({
        user_id: data.user_id,
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name
      }));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.message || 'Signin failed');
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
          required
        /><br/>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
          required
        /><br/>
        <button type="submit">Signin</button>
      </form>
    </div>
  );
}

export default Signin;