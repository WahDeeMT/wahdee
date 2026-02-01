import React, { useState, useEffect, useRef } from 'react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Fitness from './pages/Fitness';
import LandingPage from './pages/LandingPage';
import Reports from './pages/Reports';
import CalculatorHub from './pages/CalculatorHub';
import Calculator from './pages/Calculator';
import ProteinCalculator from './pages/ProteinCalculator';
import OneRepMaxCalculator from './pages/OneRepMaxCalculator';
import BodyFatCalculator from './pages/BodyFatCalculator';
import Placeholder from './pages/Placeholder';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [currentView, setCurrentView] = useState('landing');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Storage key helper
  const getDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const [allEntries, setAllEntries] = useState(() => {
    const saved = localStorage.getItem('kalori_entries');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    weight: 70,
    targetWeight: 65,
    height: 175,
    age: 25,
    gender: 'male',
    dailyGoal: 2000,
    waterGoal: 2000
  });

  // Global Stats State
  const [stats, setStats] = useState({
    calories: { taken: 0, burned: 0, totalBurned: 0 },
    water: { current: 0, goal: 2000 },
    steps: { current: 0, goal: 10000 }
  });

  const [meals, setMeals] = useState({
    breakfast: { title: 'Kahvaltı', color: 'bg-yellow-50', hoverBorder: 'hover:border-yellow-200', hoverShadow: 'hover:shadow-yellow-500/10', items: [] },
    lunch: { title: 'Öğle', color: 'bg-green-50', hoverBorder: 'hover:border-green-200', hoverShadow: 'hover:shadow-green-500/10', items: [] },
    snack: { title: 'Ara Öğün', color: 'bg-gray-50', hoverBorder: 'hover:border-slate-200', hoverShadow: 'hover:shadow-slate-500/10', items: [] },
    dinner: { title: 'Akşam', color: 'bg-pink-50', hoverBorder: 'hover:border-pink-200', hoverShadow: 'hover:shadow-pink-500/10', items: [] },
  });

  // Load entry for selected date
  useEffect(() => {
    const key = getDateKey(selectedDate);
    const entry = allEntries[key];
    if (entry) {
      setStats(entry.stats);
      setMeals(entry.meals);
    } else {
      // Default empty state for new dates
      setStats({
        calories: { taken: 0, burned: 0, totalBurned: 0 },
        water: { current: 0, goal: userData.waterGoal || 2000 },
        steps: { current: 0, goal: 10000 }
      });
      setMeals({
        breakfast: { title: 'Kahvaltı', color: 'bg-yellow-50', hoverBorder: 'hover:border-yellow-200', hoverShadow: 'hover:shadow-yellow-500/10', items: [] },
        lunch: { title: 'Öğle', color: 'bg-green-50', hoverBorder: 'hover:border-green-200', hoverShadow: 'hover:shadow-green-500/10', items: [] },
        snack: { title: 'Ara Öğün', color: 'bg-gray-50', hoverBorder: 'hover:border-slate-200', hoverShadow: 'hover:shadow-slate-500/10', items: [] },
        dinner: { title: 'Akşam', color: 'bg-pink-50', hoverBorder: 'hover:border-pink-200', hoverShadow: 'hover:shadow-pink-500/10', items: [] },
      });
    }
  }, [selectedDate, allEntries, userData.waterGoal]);

  // Save changes to allEntries
  const saveEntry = (newStats, newMeals) => {
    const key = getDateKey(selectedDate);
    setAllEntries(prev => {
      const updated = {
        ...prev,
        [key]: {
          stats: newStats || stats,
          meals: newMeals || meals,
          weight: userData.weight
        }
      };
      localStorage.setItem('kalori_entries', JSON.stringify(updated));
      return updated;
    });
  };

  const notifiedGoals = useRef({
    water: false,
    steps: false,
    calories: false
  });

  useEffect(() => {
    // Water goal
    if (stats.water.current >= stats.water.goal && !notifiedGoals.current.water) {
      addNotification("Tebrikler! Günlük su hedefine ulaştın. 💧");
      notifiedGoals.current.water = true;
    }
    // Steps goal
    if (stats.steps.current >= stats.steps.goal && !notifiedGoals.current.steps) {
      addNotification("Harika! Adım hedefine ulaştın, çok aktifsin! 🏃‍♂️");
      notifiedGoals.current.steps = true;
    }
    // Calorie goal (within 100 kcal or over)
    if (stats.calories.taken >= userData.dailyGoal && !notifiedGoals.current.calories) {
      addNotification("Günlük kalori hedefine ulaştın! Başarılı bir gün. 🎯");
      notifiedGoals.current.calories = true;
    }
  }, [stats, userData.dailyGoal]);

  const [notifications, setNotifications] = useState([
    { id: 1, text: "Su içme hedefinize yaklaştınız!", time: "10 dk önce", read: false },
    { id: 2, text: "Bugünkü egzersiz planı hazır.", time: "1 sa önce", read: false },
  ]);

  // History data derived from allEntries for Reports
  const getHistoryData = () => {
    // Return last 7 days of entries including today
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = getDateKey(d);
      const entry = allEntries[key];
      const dayName = i === 0 ? 'Bugün' : new Intl.DateTimeFormat('tr-TR', { weekday: 'short' }).format(d);

      data.push({
        date: dayName,
        fullDate: key,
        calories: entry ? entry.stats.calories.taken : 0,
        steps: entry ? entry.stats.steps.current : 0,
        water: entry ? entry.stats.water.current : 0,
        weight: entry ? entry.weight : (i === 0 ? userData.weight : null)
      });
    }
    return data;
  };

  const historyData = getHistoryData();

  const addNotification = (text) => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Şimdi",
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleUpdateProfile = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const handleUpdateStats = (newStats) => {
    const updated = { ...stats, ...newStats };
    setStats(updated);
    saveEntry(updated, meals);
  };

  const handleUpdateMeals = (newMeals) => {
    setMeals(newMeals);
    saveEntry(stats, newMeals);
  };

  const handleLogin = () => {
    setTheme('dark');
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard
          userData={userData}
          stats={stats}
          onUpdateStats={handleUpdateStats}
          meals={meals}
          onUpdateMeals={handleUpdateMeals}
        />;
      case 'profile':
        return <Profile
          userData={userData}
          stats={stats}
          onUpdate={handleUpdateProfile}
          onUpdateStats={handleUpdateStats}
        />;
      case 'fitness':
        return <Fitness
          userData={userData}
          stats={stats}
          onUpdateStats={handleUpdateStats}
          addNotification={addNotification}
        />;
      case 'reports':
        return <Reports userData={userData} stats={stats} historyData={historyData} />;
      case 'calculator-hub':
        return <CalculatorHub onNavigate={handleNavigate} />;
      case 'calculator':
        return <Calculator userData={userData} onUpdateProfile={handleUpdateProfile} />;
      case 'protein-calculator':
        return <ProteinCalculator />;
      case 'one-rep-max':
        return <OneRepMaxCalculator />;
      case 'body-fat-calculator':
        return <BodyFatCalculator />;
      default:
        return <Dashboard userData={userData} stats={stats} onUpdateStats={handleUpdateStats} />;
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onLogin={() => setCurrentView('login')} />;
  }

  if (currentView === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setCurrentView('register')} />;
  }

  if (currentView === 'register') {
    return <RegisterPage onRegister={handleLogin} onNavigateToLogin={() => setCurrentView('login')} />;
  }

  return (
    <MainLayout
      currentView={currentView}
      onNavigate={handleNavigate}
      userData={userData}
      onLogout={handleLogout}
      notifications={notifications}
      setNotifications={setNotifications}
      theme={theme}
      toggleTheme={toggleTheme}
      selectedDate={selectedDate}
      onDateChange={setSelectedDate}
    >
      {renderContent()}
    </MainLayout>
  );
}

export default App;