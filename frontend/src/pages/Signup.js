import React, { useState } from 'react';
import { signup } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, email, password, first_name, last_name } = formData;

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
      e.preventDefault();
      try {
          await signup({ username, email, password, first_name, last_name });
          navigate('/signin');
      } catch (err) {
          console.error('Signup error:', err.response ? err.response.data : err);
          if (err.response && err.response.data) {
              setError(err.response.data.message || 'Signup failed');
          } else {
              setError('Signup failed');
          }
      }
  };



  return (
    <div>
      <h2>Signup</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Username"
          required
        /><br/>
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
        <input
          name="first_name"
          value={first_name}
          onChange={handleChange}
          placeholder="First Name"
        /><br/>
        <input
          name="last_name"
          value={last_name}
          onChange={handleChange}
          placeholder="Last Name"
        /><br/>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
