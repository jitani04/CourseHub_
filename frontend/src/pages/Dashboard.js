import React from "react";
import Header from "../components/layout/Header";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      <div className="dashboard-content p-4">
        <h2 className="text-2xl font-bold">Welcome to CourseHub</h2>
        {/* You can add the rest of the contents here */}
      </div>
    </div>
  );
}

export default Dashboard;
