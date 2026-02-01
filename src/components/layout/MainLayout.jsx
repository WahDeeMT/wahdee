import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

const MainLayout = ({ children, currentView, onNavigate, userData, onLogout, notifications, setNotifications, theme, toggleTheme, selectedDate, onDateChange }) => {
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
    <div className="flex h-screen overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-page)' }}>
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
        <Header
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
          onNavigate={onNavigate}
          notifications={notifications}
          setNotifications={setNotifications}
          userData={userData}
          theme={theme}
          toggleTheme={toggleTheme}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {(['calculator', 'protein-calculator', 'one-rep-max', 'body-fat-calculator'].includes(currentView)) && (
            <button
              onClick={() => onNavigate('calculator-hub')}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-white/10 dark:bg-white/5 border border-white/20 text-gray-600 dark:text-gray-300 rounded-full font-bold shadow-sm hover:shadow-md hover:bg-gray-50/20 dark:hover:bg-white/10 hover:text-primary-600 transition-all group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Geri Dön
            </button>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;