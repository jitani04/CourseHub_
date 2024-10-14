import axios from "./api";

export const signup = async (userData) => {
  try {
    const response = await axios.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const verifyEmailCode = async (email, code) => {
  try {
    const response = await axios.post("/auth/verify-email", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error verifying email:",
      error.response?.data || error.message,
    );
    const message = error.response?.data?.message || "An error occurred.";
    throw new Error(message);
  }
};

export const signin = async (email, password) => {
  try {
    const response = await axios.post("/auth/signin", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : "Network Error";
    throw new Error(message);
  }
};

export const requestResetPassword = async (email) => {
  try {
    const response = await axios.post("/auth/request-reset-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(`/auth/reset-password/${token}`, {
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Network Error" };
  }
};
