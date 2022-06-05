import { AuthNavbar } from '@/components/Navbar';
import React from 'react';
import { Outlet } from 'react-router-dom';
const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <AuthNavbar />
      </div>
      <div className="flex-1 max-w-7xl w-full mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
