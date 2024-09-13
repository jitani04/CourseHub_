import React, { useState } from 'react';
import { signUp } from '../utils/auth';
import { TextField, Button, Typography, Box, CircularProgress, Stepper, Step, StepLabel } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, username);
    if (error) setMessage(error.message);
    else setMessage('Please check your email to confirm your account.');
    setLoading(false);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Create your account to get started
        </Typography>
        <Stepper activeStep={0} alternativeLabel>
          <Step>
            <StepLabel>Register</StepLabel>
          </Step>
          <Step>
            <StepLabel>Complete Profile</StepLabel>
          </Step>
        </Stepper>
        <Box component="form" onSubmit={handleSignUp} mt={3}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Sign Up'}
            </Button>
          </Box>
          {message && (
            <Typography color="error" align="center" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </Box>
        <Typography align="center" sx={{ mt: 2, color: 'gray' }}>
          Already have an account? <a href="#" style={{ color: '#3f51b5' }}>Log in</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
