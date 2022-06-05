import React from 'react';
import { Outlet } from 'react-router-dom';
import { HomeNavbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <HomeNavbar />
      </div>
      <div className="flex-1 max-w-7xl w-full m-auto">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
