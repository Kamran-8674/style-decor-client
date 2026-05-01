import React from 'react';
import useAuth from '../../../hooks/useAuth';

const DashBoardHome = () => {
    const {user}= useAuth()
    return (
        <div className="flex items-center justify-center h-[70vh]">
      <h1 className="text-3xl font-bold">
        Welcome, {user?.displayName || "User"} 👋
      </h1>
    </div>
    );
};

export default DashBoardHome;