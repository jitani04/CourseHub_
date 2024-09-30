import axios from './api';

export const signup = async (userData) => {
  try {
    const response = await axios.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: 'Network Error' };
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