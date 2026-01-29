import React from 'react';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine
} from 'recharts';
import { TrendingDown, Flame, Footprints, Activity, Info, Target, Trophy } from 'lucide-react';

// --- Components ---

// 1. General Dashboard Card
export const GeneralReportCard = ({ stats }) => {
    // Use real data, simplified averages
    const avgCal = stats ? Math.round(stats.calories.taken) : 0;
    const totalBurn = stats ? stats.calories.burned : 0;
    const avgSteps = stats ? stats.steps.current : 0;

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm col-span-12">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Activity className="text-violet-600" size={20} />
                Genel Özet (Bugün)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-orange-500">
                        <Flame size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Alınan Kalori</p>
                        <p className="text-2xl font-black text-gray-800">{avgCal} <span className="text-xs text-gray-400 font-normal">kcal</span></p>
                    </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-blue-500">
                        <Target size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Toplam Yakılan</p>
                        <p className="text-2xl font-black text-gray-800">{totalBurn} <span className="text-xs text-gray-400 font-normal">kcal</span></p>
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-green-500">
                        <Footprints size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Adım Sayısı</p>
                        <p className="text-2xl font-black text-gray-800">{avgSteps} <span className="text-xs text-gray-400 font-normal">adım</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Calorie Report Card
export const CalorieReportCard = ({ stats, dateRange, userData }) => {
    const dailyGoal = userData?.dailyGoal || 2200;
    const currentTaken = stats?.calories.taken || 0;
    const currentBurned = stats?.calories.burned || 0;

    // Generate Chart Data
    // We mock past days as 0 or simpler values for now since we don't have DB
    // But we insert TODAY's real value at the end.
    let data = [];

    if (dateRange === 'Günlük') {
        // Hourly breakdown mock for today
        data = [
            { name: '08:00', alinan: 0 },
            { name: '10:00', alinan: Math.round(currentTaken * 0.2) }, // simulated breakfast
            { name: '13:00', alinan: Math.round(currentTaken * 0.5) }, // simulated lunch
            { name: '16:00', alinan: Math.round(currentTaken * 0.6) }, // snack
            { name: '19:00', alinan: currentTaken }, // dinner/current total
            { name: '22:00', alinan: currentTaken },
        ];
    } else if (dateRange === 'Aylık') {
        // Reduced monthly view
        data = [
            { name: 'H1', alinan: 2100 },
            { name: 'H2', alinan: 1950 },
            { name: 'H3', alinan: 2050 },
            { name: 'Bu Hafta', alinan: currentTaken },
        ];
    } else {
        // Weekly (Default)
        data = [
            { name: 'Pzt', alinan: 0, hedef: dailyGoal },
            { name: 'Sal', alinan: 0, hedef: dailyGoal },
            { name: 'Çar', alinan: 0, hedef: dailyGoal },
            { name: 'Per', alinan: 0, hedef: dailyGoal },
            { name: 'Cum', alinan: 0, hedef: dailyGoal },
            { name: 'Cmt', alinan: 0, hedef: dailyGoal },
            { name: 'Bugün', alinan: currentTaken, hedef: dailyGoal },
        ];
    }

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm col-span-12 lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Flame className="text-orange-500" size={20} />
                    Kalori Raporu
                </h3>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{dateRange}</span>
            </div>

            <div className="h-[300px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAlinan" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '5 5' }}
                        />
                        <ReferenceLine y={dailyGoal} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'Hedef', position: 'right', fill: '#22c55e', fontSize: 12 }} />
                        <Area type="monotone" dataKey="alinan" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorAlinan)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Insight Box */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 p-5 rounded-2xl border border-orange-100 flex items-start gap-4">
                <div className="bg-white p-2 rounded-lg text-orange-500 shadow-sm shrink-0">
                    <Info size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">Durum Analizi</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Bugün şu ana kadar <span className="font-bold text-orange-600">{currentTaken} kcal</span> aldın. Günlük hedefin {dailyGoal} kcal.
                        {currentTaken >= dailyGoal
                            ? <span className="text-green-600 font-bold ml-1">Hedef tamamlandı! 🎉</span>
                            : <span className="text-gray-500 ml-1">Hedefe ulaşmak için {dailyGoal - currentTaken} kcal daha alabilirsin.</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

// 3. Weight Report Card
export const WeightReportCard = ({ stats, userData }) => {
    const currentWeight = userData?.weight || 0;
    const targetWeight = userData?.targetWeight || 0;

    // Simulate history for chart
    const data = [
        { name: 'Başlangıç', kg: currentWeight + 1 }, // Mock start
        { name: 'Hafta 1', kg: currentWeight + 0.5 },
        { name: 'Hafta 2', kg: currentWeight + 0.2 },
        { name: 'Bugün', kg: currentWeight }, // Real Current
    ];

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm col-span-12 md:col-span-6 lg:col-span-4 flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                <TrendingDown className="text-violet-600" size={20} />
                Kilo Değişimi
            </h3>
            <p className="text-sm text-gray-400 font-medium mb-6">İlerleme Grafiği</p>

            <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="kg" stroke="#7c3aed" strokeWidth={3} dot={{ r: 4, fill: '#7c3aed', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="text-center">
                        <span className="block text-xs text-gray-400 uppercase font-bold">Mevcut</span>
                        <span className="block text-xl font-black text-violet-600">{currentWeight}</span>
                    </div>
                    <div className="text-gray-300">➜</div>
                    <div className="text-center">
                        <span className="block text-xs text-gray-400 uppercase font-bold">Hedef</span>
                        <span className="block text-lg font-bold text-gray-700">{targetWeight}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. Activity Report Card
export const ActivityReportCard = ({ stats, dateRange }) => {
    const currentSteps = stats?.steps.current || 0;

    let data = [];
    if (dateRange === 'Günlük') {
        data = [{ name: 'Bugün', adim: currentSteps }];
    } else {
        data = [
            { name: 'Pzt', adim: 0 },
            { name: 'Sal', adim: 0 },
            { name: 'Çar', adim: 0 },
            { name: 'Per', adim: 0 },
            { name: 'Cum', adim: 0 },
            { name: 'Cmt', adim: 0 }, // Assuming today is None of these strictly? Just mocking 6 days + Today
            { name: 'Bugün', adim: currentSteps },
        ];
    }

    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm col-span-12 lg:col-span-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Footprints className="text-green-500" size={20} />
                    Adım & Aktivite
                </h3>
                {currentSteps > 5000 && (
                    <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg border border-yellow-100">
                        <Trophy size={16} />
                        <span className="text-xs font-bold">Harika gidiyorsun!</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                            <Tooltip
                                cursor={{ fill: '#f0fdf4' }}
                                contentStyle={{ borderRadius: '12px', border: 'none' }}
                            />
                            <Bar dataKey="adim" fill="#4ade80" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-sm text-gray-500 font-medium mb-1">Bugünkü Adım</p>
                        <p className="text-2xl font-black text-gray-800">{currentSteps}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                        <p className="text-sm text-green-700 font-medium mb-1">Aktivite Durumu</p>
                        <p className="text-2xl font-black text-green-800">
                            {currentSteps > 8000 ? 'Çok Aktif' : currentSteps > 4000 ? 'Aktif' : 'Düşük'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
