import React, { useState, useRef, useEffect } from "react";
import { Menu, Calendar, Bell, User, LogOut, Settings, ChevronDown, Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";

const Header = ({ onToggleSidebar, isMobile, onNavigate, notifications, setNotifications, userData, theme, toggleTheme, selectedDate, onDateChange }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const dateInputRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatDate = (date) => {
    const today = new Date();
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      return "Bugün";
    }
    return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long" }).format(date);
  };

  const handleDateChange = (e) => {
    if (e.target.value) {
      onDateChange(new Date(e.target.value));
    }
  };

  const handleMarkAllRead = () => {
    if (setNotifications) {
      setNotifications(prev => prev.map(n => ({ ...prev, read: true })));
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 transition-all duration-300 border-b" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg transition-colors focus:outline-none"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            Tekrar hoşgeldin, <span className="text-primary-600 dark:text-primary-400">{userData?.name || 'Kullanıcı'}</span>!
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-400 hover:text-primary-600 transition-colors relative rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
          title={theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        {/* Date Picker */}
        <div className="relative">
          <button
            onClick={() => dateInputRef.current?.showPicker()}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 transition-colors cursor-pointer"
          >
            <Calendar size={16} className="text-gray-400" />
            <span>{formatDate(selectedDate)}</span>
          </button>
          <input
            type="date"
            ref={dateInputRef}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer md:hidden"
            onChange={handleDateChange}
          />
          <input
            type="date"
            ref={dateInputRef}
            className="absolute top-full left-0 opacity-0 w-0 h-0" // Hidden input for desktop trigger
            onChange={handleDateChange}
          />
        </div>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className={cn(
              "p-2 text-gray-400 hover:text-primary-600 transition-colors relative rounded-full hover:bg-gray-50",
              isNotificationsOpen && "bg-gray-50 text-primary-600"
            )}
          >
            <Bell size={20} />
            {notifications?.some(n => !n.read) && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white shadow-sm ring-1 ring-red-100 animate-pulse"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div
              className="absolute right-0 top-full mt-4 w-85 backdrop-blur-xl rounded-[28px] shadow-2xl border py-2 animate-in fade-in slide-in-from-top-4 duration-300 z-50 overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="px-4 py-2 flex justify-between items-center border-b" style={{ borderColor: 'var(--border-color)' }}>
                <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Bildirimler</h3>
                <button
                  onClick={handleMarkAllRead}
                  className="text-xs text-primary-600 dark:text-primary-400 font-medium cursor-pointer hover:underline bg-transparent border-none p-0"
                >
                  Tümünü Oku
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications && notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className={cn("px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0", !notification.read && "bg-blue-50/30")}>
                      <p className="text-sm text-gray-700 font-medium">{notification.text}</p>
                      <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-400 text-sm">
                    Bildiriminiz bulunmuyor
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 p-[2px] ring-2 ring-transparent group-hover:ring-primary-200 transition-all">
              <div className="w-full h-full rounded-full flex items-center justify-center text-primary-700 font-bold text-xs select-none" style={{ backgroundColor: 'var(--bg-card)' }}>
                {(userData?.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
              </div>
            </div>
            <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-200", isProfileOpen && "rotate-180")} />
          </div>

          {isProfileOpen && (
            <div
              className="absolute right-0 top-full mt-4 w-64 backdrop-blur-xl rounded-[28px] shadow-2xl border py-2 animate-in fade-in slide-in-from-top-4 duration-300 z-50 overflow-hidden"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-indigo-500" />
              <div className="px-4 py-3 border-b mb-1" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{userData?.name || 'Kullanıcı'}</p>
                {userData?.email && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{userData.email}</p>}
              </div>

              <button
                onClick={() => { onNavigate('profile'); setIsProfileOpen(false); }}
                className="flex w-full items-center gap-3 px-5 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group/item"
              >
                <div className="p-2 rounded-xl bg-gray-50 group-hover/item:bg-white transition-colors">
                  <User size={16} />
                </div>
                <span>Profilim</span>
              </button>
              <button
                onClick={() => { onNavigate('profile'); setIsProfileOpen(false); }}
                className="flex w-full items-center gap-3 px-5 py-3 text-sm font-bold text-gray-600 hover:text-violet-600 hover:bg-violet-50/50 transition-all group/item"
              >
                <div className="p-2 rounded-xl bg-gray-50 group-hover/item:bg-white transition-colors">
                  <Settings size={16} />
                </div>
                <span>Ayarlar</span>
              </button>
              <div className="h-px bg-gray-100/50 mx-4 my-2"></div>
              <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-all group/item">
                <div className="p-2 rounded-xl bg-red-50/50 group-hover/item:bg-white transition-colors">
                  <LogOut size={16} />
                </div>
                <span>Çıkış Yap</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;