import React from 'react';
import useAuth from '../../../hooks/useAuth';
import AdminDashboard from '../adminDashboard/AdminDashboard';

const DashBoardHome = () => {
    const {user}= useAuth()
    return (
        <div className="">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.displayName || "User"} 👋
        
      </h1>
      <AdminDashboard></AdminDashboard>
    </div>
    );
};

export default DashBoardHome;