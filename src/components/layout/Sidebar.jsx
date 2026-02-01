import React from 'react';
import { LayoutDashboard, Dumbbell, FileText, User, X, LogOut, Calculator, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ isOpen, isMobile, onCloseMobile, currentView, onNavigate, userData, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Gösterge Paneli', icon: LayoutDashboard },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'reports', label: 'Raporlar', icon: FileText },
    { id: 'calculator-hub', label: 'Hesaplayıcılar', icon: Calculator },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col transition-all duration-300 ease-in-out border-r",
          isMobile
            ? (isOpen ? "translate-x-0 w-[260px]" : "-translate-x-full w-[260px]")
            : (isOpen ? "w-[260px]" : "w-[88px]")
        )}
        style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--border-color)' }}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-between h-24 px-6 mb-2">
          <div className={cn("text-2xl font-black tracking-tight bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent transition-opacity duration-200", !isOpen && !isMobile && "opacity-0 hidden")}>
            WahDeeFit
            <span className="text-gray-400 font-medium text-xs ml-1 tracking-normal">v1.2</span>
          </div>
          {!isOpen && !isMobile && (
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-violet-200 mx-auto">
              W
            </div>
          )}
          {isMobile && (
            <button onClick={onCloseMobile} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (isMobile) onCloseMobile();
                }}
                className={cn(
                  "flex items-center w-full p-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20 transform hover:scale-[1.02]"
                    : "text-gray-400 hover:text-violet-600 dark:hover:text-violet-400",
                  !isOpen && !isMobile && "justify-center px-0 w-12 h-12 mx-auto"
                )}
                style={!isActive ? { backgroundColor: 'transparent' } : {}}
              >
                {!isActive && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }} />
                )}
                <item.icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  className={cn(
                    "shrink-0 transition-colors z-10 relative",
                    isActive ? "text-white" : "text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400"
                  )}
                />
                <span className={cn(
                  "ml-3.5 text-sm font-semibold tracking-wide z-10 relative transition-all duration-300",
                  !isOpen && !isMobile && "hidden"
                )}>
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {!isOpen && !isMobile && (
                  <div className="absolute left-14 z-50 px-3 py-2 ml-2 text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
                    {item.label}
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 dark:bg-slate-700 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Simple Profile (Bottom) */}
        <div className="p-6 mt-auto">
          <div
            onClick={onLogout}
            className={cn(
              "relative flex items-center gap-4 p-4 rounded-[24px] border transition-all cursor-pointer group shadow-sm hover:shadow-md",
              !isOpen && !isMobile ? "justify-center p-2 bg-transparent border-none shadow-none" : "border-gray-100 dark:border-white/10"
            )}
            style={{ backgroundColor: (!isOpen && !isMobile) ? 'transparent' : 'rgba(var(--sidebar-active-rgba))' }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-200 to-pink-200 flex items-center justify-center text-violet-700 font-bold text-sm ring-2 ring-white/50 shadow-sm">
                {userData?.name ? userData.name.substring(0, 2).toUpperCase() : 'U'}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
            </div>

            <div className={cn("flex flex-col overflow-hidden", !isOpen && !isMobile && "hidden")}>
              <span className="text-sm font-bold truncate group-hover:text-red-600 transition-colors" style={{ color: 'var(--text-primary)' }}>{userData?.name || 'Kullanıcı'}</span>
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Çıkış Yap</span>
            </div>

            {!isOpen && !isMobile ? null : (
              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-red-400">
                <LogOut size={16} />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;