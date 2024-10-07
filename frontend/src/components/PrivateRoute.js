import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    return <Navigate to="/signin" />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Token expired
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("user");
      return <Navigate to="/signin" />;
    }
    return children;
  } catch (error) {
    // Invalid token
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");
    return <Navigate to="/signin" />;
  }
}

export default PrivateRoute;
