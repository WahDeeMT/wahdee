import React, { useState } from 'react';
import { Play, Clock, Flame, Plus, Calendar, ChevronRight, Trophy } from 'lucide-react';
import AddActivityModal from '../components/ui/AddActivityModal';
import ActivityDetailModal from '../components/ui/ActivityDetailModal';

const Fitness = ({ userData, stats, onUpdateStats, addNotification }) => {
    const [activities, setActivities] = useState([
        { id: 1, type: 'Koşu', icon: '🏃‍♂️', duration: 30, calories: 320, date: 'Bugün, 08:30' },
        { id: 2, type: 'Şınav / Kuvvet', icon: '💪', duration: 15, calories: 120, date: 'Bugün, 09:15' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    // Calculate Stats
    const totalDuration = activities.reduce((acc, curr) => acc + curr.duration, 0);
    const totalCalories = activities.reduce((acc, curr) => acc + curr.calories, 0);
    const totalCount = activities.length;

    const handleAddActivity = (newActivity) => {
        const activity = {
            ...newActivity,
            id: Date.now(),
            date: `Bugün, ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`
        };
        setActivities(prev => [activity, ...prev]);

        // Sync with Global Stats
        if (onUpdateStats && stats) {
            onUpdateStats({
                calories: {
                    ...stats.calories,
                    burned: (stats.calories.burned || 0) + activity.calories,
                    totalBurned: (stats.calories.totalBurned || 0) + activity.calories
                }
            });
        }

        // Trigger Notification
        if (addNotification) {
            addNotification(`Harika! ${activity.type} tamamlandı, bugün bu aktiviteler yapıldı! 🔥`);
        }
    };

    const handleDeleteActivity = (id) => {
        const activityToDelete = activities.find(a => a.id === id);

        if (activityToDelete && onUpdateStats && stats) {
            onUpdateStats({
                calories: {
                    ...stats.calories,
                    burned: Math.max(0, (stats.calories.burned || 0) - activityToDelete.calories),
                    totalBurned: Math.max(0, (stats.calories.totalBurned || 0) - activityToDelete.calories)
                }
            });
        }

        setActivities(prev => prev.filter(a => a.id !== id));
        setSelectedActivity(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                        <div className="bg-orange-500/10 p-3 rounded-2xl shadow-sm border" style={{ borderColor: 'var(--border-color)' }}>
                            <span className="text-2xl">🏋️</span>
                        </div>
                        Fitness & Antrenman
                    </h1>
                    <p className="font-medium ml-1 mt-1" style={{ color: 'var(--text-secondary)' }}>Hareket takibi ve aktivite geçmişi</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95 border border-white/10"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    Aktivite Ekle
                </button>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {/* Total Activity */}
                <div
                    className="p-8 rounded-[32px] border relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Play size={140} className="text-blue-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-100/20">
                            <Play fill="currentColor" size={28} />
                        </div>
                        <p className="font-black text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Toplam Aktivite</p>
                        <h3 className="text-4xl font-black mt-2" style={{ color: 'var(--text-primary)' }}>
                            {totalCount} <span className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>adet</span>
                        </h3>
                    </div>
                </div>

                {/* Total Duration */}
                <div
                    className="p-8 rounded-[32px] border relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Clock size={140} className="text-purple-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-purple-100/20">
                            <Clock size={28} />
                        </div>
                        <p className="font-black text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Toplam Süre</p>
                        <h3 className="text-4xl font-black mt-2" style={{ color: 'var(--text-primary)' }}>
                            {totalDuration} <span className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>dk</span>
                        </h3>
                    </div>
                </div>

                {/* Total Calories */}
                <div
                    className="p-8 rounded-[32px] border relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                >
                    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Flame size={140} className="text-orange-600" />
                    </div>
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-orange-100/20">
                            <Flame fill="currentColor" size={28} />
                        </div>
                        <p className="font-black text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Yakılan Kalori</p>
                        <h3 className="text-4xl font-black mt-2" style={{ color: 'var(--text-primary)' }}>
                            {totalCalories} <span className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>kcal</span>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Activity List Section */}
            <div className="rounded-[32px] border overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <div className="p-8 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                    <h2 className="text-xl font-black flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                        <div className="p-2 rounded-xl border transition-colors" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <Calendar size={20} style={{ color: 'var(--text-secondary)' }} />
                        </div>
                        Yapılan Aktiviteler
                    </h2>
                    <span className="text-[10px] font-black bg-white/10 px-4 py-1.5 rounded-full uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Bugün</span>
                </div>

                <div className="p-4 divide-y" style={{ borderColor: 'var(--border-color)' }}>
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                onClick={() => setSelectedActivity(activity)}
                                className="p-5 flex items-center gap-5 hover:bg-gray-50/80 rounded-[24px] transition-all group cursor-pointer hover:scale-[1.01] active:scale-[0.99] border border-transparent hover:border-gray-100 hover:shadow-lg hover:shadow-gray-200/20"
                            >
                                <div className="backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-sm border group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3 group-hover:shadow-md" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', width: '4rem', height: '4rem' }}>
                                    {activity.icon}
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-black text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>{activity.type}</h4>
                                    <p className="text-xs font-bold flex items-center gap-1.5 mt-1" style={{ color: 'var(--text-secondary)' }}>
                                        <Clock size={12} /> {activity.date}
                                    </p>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <span className="block font-black" style={{ color: 'var(--text-primary)' }}>{activity.duration} dk</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Süre</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-black text-orange-500">-{activity.calories} kcal</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Yakılan</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                        <ChevronRight size={20} className="text-gray-400 group-hover:text-primary-500 transition-all group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-16 text-center text-gray-400 flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                <Trophy size={48} className="text-gray-200" />
                            </div>
                            <p className="font-black text-gray-500">Henüz bir aktivite kaydı yok.</p>
                            <p className="text-sm font-medium text-gray-400 mt-1">Harekete geç ve sağlıklı kal!</p>
                        </div>
                    )}
                </div>
            </div>

            <AddActivityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddActivity}
            />

            <ActivityDetailModal
                isOpen={!!selectedActivity}
                onClose={() => setSelectedActivity(null)}
                activity={selectedActivity}
                onDelete={handleDeleteActivity}
            />

        </div>
    );
};

export default Fitness;
