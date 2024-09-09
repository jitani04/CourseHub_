import React, { useState } from 'react';
import { updateUserProfile } from '../utils/user';
import { TextField, Button, Typography, Box, CircularProgress, Stepper, Step, StepLabel } from '@mui/material';

const CompleteProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await updateUserProfile({ firstName, lastName, bio, profilePic });
    if (error) setMessage(error.message);
    else setMessage('Profile updated successfully!');
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Complete Your Profile
      </Typography>
      <Stepper activeStep={1} alternativeLabel>
        <Step>
          <StepLabel>Register</StepLabel>
        </Step>
        <Step>
          <StepLabel>Complete Profile</StepLabel>
        </Step>
      </Stepper>
      <form onSubmit={handleProfileUpdate} style={{ marginTop: '20px' }}>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          margin="normal"
          required
          multiline
          rows={4}
        />
        <Button variant="contained" component="label" sx={{ mt: 2 }}>
          Upload Profile Picture
          <input type="file" hidden onChange={(e) => setProfilePic(e.target.files[0])} />
        </Button>
        <Box mt={3} display="flex" justifyContent="center">
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Update Profile'}
          </Button>
        </Box>
        {message && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default CompleteProfile;