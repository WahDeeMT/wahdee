import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '../../lib/utils';

const MainLayout = ({ children, currentView, onNavigate, userData, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarOpen = isSidebarOpen;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onCloseMobile={() => setIsSidebarOpen(false)}
        currentView={currentView}
        onNavigate={onNavigate}
        userData={userData}
        onLogout={onLogout}
      />

      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-[260px]" : "lg:ml-[88px]"
        )}
      >
        <Header onToggleSidebar={toggleSidebar} isMobile={isMobile} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;