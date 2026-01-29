import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Fitness from './pages/Fitness';
import LandingPage from './pages/LandingPage';
import Reports from './pages/Reports';
import Calculator from './pages/Calculator';
import Placeholder from './pages/Placeholder';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [userData, setUserData] = useState({
    name: 'Mert',
    weight: 82.5,
    targetWeight: 75,
    height: 180,
    age: 24,
    gender: 'male',
    dailyGoal: 2200,
    waterGoal: 2500
  });

  // Global Stats State (Lifted from Dashboard)
  const [stats, setStats] = useState({
    calories: {
      taken: 1250,
      burned: 450,
      totalBurned: 1340
    },
    water: {
      current: 1250,
      goal: 2500
    },
    steps: {
      current: 5240,
      goal: 10000
    }
  });

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const handleUpdateProfile = (newData) => {
    setUserData(prev => ({ ...prev, ...newData }));
  };

  const handleUpdateStats = (newStats) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userData={userData} stats={stats} onUpdateStats={handleUpdateStats} />;
      case 'profile':
        return <Profile userData={userData} onUpdate={handleUpdateProfile} />;
      case 'fitness':
        return <Fitness userData={userData} />;
      case 'reports':
        return <Reports userData={userData} stats={stats} />;
      case 'calculator':
        return <Calculator userData={userData} onUpdateProfile={handleUpdateProfile} />;
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
    >
      {renderContent()}
    </MainLayout>
  );
}

export default App;