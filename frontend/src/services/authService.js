import axios from './api';

export const signup = async (userData) => {
  try {
    const response = await axios.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};

export const verifyEmailCode = async (email, code) => {
  try {
    const response = await axios.post('/auth/verify-email', {
      email: email,
      code: code
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};


export const signin = async (email, password) => {
  try {
    const response = await axios.post('/auth/signin', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
  }
};