import React from "react";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
    </div>
  );
}

export default Dashboard;
