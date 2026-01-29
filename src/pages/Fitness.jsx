import React, { useState } from 'react';
import { Play, Clock, Flame, Plus, Calendar, ChevronRight, Trophy } from 'lucide-react';
import AddActivityModal from '../components/ui/AddActivityModal';
import ActivityDetailModal from '../components/ui/ActivityDetailModal';

const Fitness = ({ userData }) => {
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
    };

    const handleDeleteActivity = (id) => {
        setActivities(prev => prev.filter(a => a.id !== id));
        setSelectedActivity(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-2">
                        <span className="bg-orange-100 p-2 rounded-xl">🏋️</span>
                        Fitness & Antrenman
                    </h1>
                    <p className="text-gray-500 font-medium ml-1">Hareket takibi ve aktivite geçmişi</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-5 py-3 rounded-xl font-bold shadow-lg shadow-gray-200 transition-all active:scale-95"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                    Aktivite Ekle
                </button>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Activity */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Play size={100} className="text-blue-600" />
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <Play fill="currentColor" size={24} />
                        </div>
                        <p className="text-gray-500 font-medium text-sm">Toplam Aktivite</p>
                        <h3 className="text-4xl font-black text-gray-800 mt-1">
                            {totalCount} <span className="text-lg text-gray-400 font-semibold">adet</span>
                        </h3>
                    </div>
                </div>

                {/* Total Duration */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Clock size={100} className="text-purple-600" />
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                            <Clock size={24} />
                        </div>
                        <p className="text-gray-500 font-medium text-sm">Toplam Süre</p>
                        <h3 className="text-4xl font-black text-gray-800 mt-1">
                            {totalDuration} <span className="text-lg text-gray-400 font-semibold">dk</span>
                        </h3>
                    </div>
                </div>

                {/* Total Calories */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-xl hover:shadow-orange-100/50 hover:border-orange-200 transition-all duration-300 hover:-translate-y-1">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Flame size={100} className="text-orange-600" />
                    </div>
                    <div className="relative">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                            <Flame fill="currentColor" size={24} />
                        </div>
                        <p className="text-gray-500 font-medium text-sm">Yakılan Kalori</p>
                        <h3 className="text-4xl font-black text-gray-800 mt-1">
                            {totalCalories} <span className="text-lg text-gray-400 font-semibold">kcal</span>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Activity List Section */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <Calendar size={20} className="text-gray-500" />
                        Yapılan Aktiviteler
                    </h2>
                    <span className="text-sm font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-lg">Bugün</span>
                </div>

                <div className="divide-y divide-gray-100">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <div
                                key={activity.id}
                                onClick={() => setSelectedActivity(activity)}
                                className="p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors group cursor-pointer"
                            >
                                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform duration-300 group-hover:bg-white group-hover:shadow-md">
                                    {activity.icon}
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-lg">{activity.type}</h4>
                                    <p className="text-gray-400 text-sm font-medium flex items-center gap-2">
                                        <Clock size={14} /> {activity.date}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className="text-right">
                                        <span className="block font-bold text-gray-800">{activity.duration} dk</span>
                                        <span className="text-xs text-gray-400 font-medium">Süre</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-orange-500">-{activity.calories} kcal</span>
                                        <span className="text-xs text-gray-400 font-medium">Yakılan</span>
                                    </div>
                                    <ChevronRight size={20} className="text-gray-300 group-hover:text-gray-600 transition-colors" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-12 text-center text-gray-400 flex flex-col items-center">
                            <Trophy size={48} className="mb-4 text-gray-200" />
                            <p className="font-medium">Henüz bir aktivite kaydı yok.</p>
                            <p className="text-sm">Harekete geç ve sağlıklı kal!</p>
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
