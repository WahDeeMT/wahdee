import React, { useState, useRef, useEffect } from "react";
import { Menu, Calendar, Bell, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const Header = ({ onToggleSidebar, isMobile }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      setSelectedDate(new Date(e.target.value));
    }
  };

  const dummyNotifications = [
    { id: 1, text: "Su içme hedefinize yaklaştınız!", time: "10 dk önce", read: false },
    { id: 2, text: "Bugünkü egzersiz planı hazır.", time: "1 sa önce", read: false },
    { id: 3, text: "Haftalık raporunuz incelendi.", time: "Dün", read: true },
  ];

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-100"
        >
          <Menu size={20} />
        </button>

        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-800 leading-tight">Gösterge Paneli</h1>
          <span className="text-xs text-gray-500 hidden md:block">Tekrar hoşgeldin, Mert!</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
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
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-4 py-2 border-b border-gray-50 flex justify-between items-center">
                <h3 className="font-semibold text-gray-800">Bildirimler</h3>
                <span className="text-xs text-primary-600 font-medium cursor-pointer hover:underline">Tümünü Oku</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {dummyNotifications.map((notification) => (
                  <div key={notification.id} className={cn("px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0", !notification.read && "bg-blue-50/30")}>
                    <p className="text-sm text-gray-700 font-medium">{notification.text}</p>
                    <span className="text-xs text-gray-400 mt-1 block">{notification.time}</span>
                  </div>
                ))}
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
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-primary-700 font-bold text-xs select-none">
                MK
              </div>
            </div>
            <ChevronDown size={14} className={cn("text-gray-400 transition-transform duration-200", isProfileOpen && "rotate-180")} />
          </div>

          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              <div className="px-4 py-3 border-b border-gray-50 mb-1">
                <p className="text-sm font-semibold text-gray-800">Mert K.</p>
                <p className="text-xs text-gray-500">mert@example.com</p>
              </div>

              <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
                <User size={16} />
                <span>Profilim</span>
              </a>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors">
                <Settings size={16} />
                <span>Ayarlar</span>
              </button>
              <div className="h-px bg-gray-50 my-1"></div>
              <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                <LogOut size={16} />
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