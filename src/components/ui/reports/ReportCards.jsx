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
        <div className="p-6 rounded-3xl border shadow-sm col-span-12" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Activity className="text-violet-500" size={20} />
                Genel Özet (Bugün)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-2xl flex items-center gap-4 border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                    <div className="p-3 bg-white/10 rounded-xl shadow-sm text-orange-500">
                        <Flame size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Alınan Kalori</p>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{avgCal} <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>kcal</span></p>
                    </div>
                </div>
                <div className="p-4 rounded-2xl flex items-center gap-4" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}>
                    <div className="p-3 bg-white/10 rounded-xl shadow-sm text-blue-500">
                        <Target size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Toplam Yakılan</p>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{totalBurn} <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>kcal</span></p>
                    </div>
                </div>
                <div className="p-4 rounded-2xl flex items-center gap-4" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}>
                    <div className="p-3 bg-white/10 rounded-xl shadow-sm text-green-500">
                        <Footprints size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Adım Sayısı</p>
                        <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{avgSteps} <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>adım</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. Calorie Report Card
export const CalorieReportCard = ({ stats, dateRange, userData, historyData }) => {
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
        // Weekly (Default) - Use historyData
        data = historyData ? historyData.map(h => ({
            name: h.date,
            alinan: h.calories,
            hedef: dailyGoal
        })) : [];
    }

    return (
        <div className="p-6 rounded-3xl border shadow-sm col-span-12" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Flame className="text-orange-500" size={20} />
                    Kalori Raporu
                </h3>
                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded" style={{ color: 'var(--text-secondary)' }}>{dateRange}</span>
            </div>

            <div className="h-[300px] w-full mb-6">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAlinan" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f97316" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: 'var(--text-primary)' }}
                            itemStyle={{ color: 'var(--text-primary)' }}
                            cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '5 5' }}
                        />
                        <ReferenceLine y={dailyGoal} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'Hedef', position: 'right', fill: '#22c55e', fontSize: 12 }} />
                        <Area type="monotone" dataKey="alinan" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorAlinan)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Insight Box */}
            <div className="p-5 rounded-2xl border flex items-start gap-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                <div className="bg-white/10 p-2 rounded-lg text-orange-500 shadow-sm shrink-0">
                    <Info size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>Durum Analizi</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Bugün şu ana kadar <span className="font-bold text-orange-500">{currentTaken} kcal</span> aldın. Günlük hedefin {dailyGoal} kcal.
                        {currentTaken >= dailyGoal
                            ? <span className="text-green-500 font-bold ml-1">Hedef tamamlandı! 🎉</span>
                            : <span className="ml-1">Hedefe ulaşmak için {dailyGoal - currentTaken} kcal daha alabilirsin.</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

// 3. Weight Report Card
export const WeightReportCard = ({ stats, userData, historyData }) => {
    const currentWeight = userData?.weight || 0;
    const targetWeight = userData?.targetWeight || 0;

    // Use historyData for weight
    const data = historyData ? historyData.map(h => ({
        name: h.date,
        kg: h.weight
    })) : [];

    return (
        <div className="p-6 rounded-3xl border shadow-sm col-span-12 lg:col-span-6 flex flex-col" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <TrendingDown className="text-violet-500" size={20} />
                Kilo Değişimi
            </h3>
            <p className="text-sm font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>İlerleme Grafiği</p>

            <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                        <Tooltip contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
                        <Line type="monotone" dataKey="kg" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: 'var(--bg-card)' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                    <div className="text-center">
                        <span className="block text-xs uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Mevcut</span>
                        <span className="block text-xl font-black text-violet-500">{currentWeight}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>➜</div>
                    <div className="text-center">
                        <span className="block text-xs uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Hedef</span>
                        <span className="block text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{targetWeight}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. Activity Report Card
export const ActivityReportCard = ({ stats, dateRange, historyData }) => {
    const currentSteps = stats?.steps.current || 0;

    let data = [];
    if (dateRange === 'Günlük') {
        data = [{ name: 'Bugün', adim: currentSteps }];
    } else {
        data = historyData ? historyData.map(h => ({
            name: h.date,
            adim: h.steps
        })) : [];
    }

    // Statistics Calculations
    const stepValues = historyData ? historyData.map(h => h.steps) : [0];
    const avgSteps = Math.round(stepValues.reduce((a, b) => a + b, 0) / stepValues.length);
    const maxSteps = Math.max(...stepValues);
    const minSteps = Math.min(...stepValues);

    return (
        <div className="p-6 rounded-3xl border shadow-sm col-span-12 lg:col-span-12" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Footprints className="text-green-500" size={20} />
                    Adım & Aktivite
                </h3>
                {currentSteps > 5000 && (
                    <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                        <Trophy size={16} />
                        <span className="text-xs font-bold">Harika gidiyorsun!</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                            <Tooltip
                                cursor={{ fill: 'rgba(var(--sidebar-active-rgba))' }}
                                contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                            />
                            <Bar dataKey="adim" fill="#4ade80" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                            <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Bugünkü Adım</p>
                            <p className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{currentSteps}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-violet-500/5 rounded-xl border border-violet-500/10">
                                <p className="text-[10px] uppercase font-bold text-violet-500 mb-1">Haftalık Ortalama</p>
                                <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{avgSteps}</p>
                            </div>
                            <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                <p className="text-[10px] uppercase font-bold text-blue-500 mb-1">En Çok (Hafta)</p>
                                <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{maxSteps}</p>
                            </div>
                            <div className="p-3 bg-orange-500/5 rounded-xl border border-orange-500/10">
                                <p className="text-[10px] uppercase font-bold text-orange-500 mb-1">En Az (Hafta)</p>
                                <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{minSteps}</p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                                <p className="text-[10px] uppercase font-bold text-green-500 mb-1">Durum</p>
                                <p className="text-sm font-bold text-green-500">
                                    {currentSteps > 8000 ? 'Çok Aktif' : currentSteps > 4000 ? 'Aktif' : 'Düşük'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// 5. Water Report Card
export const WaterReportCard = ({ stats, dateRange, historyData, userData }) => {
    const currentWater = stats?.water.current || 0;
    const waterGoal = userData?.waterGoal || 2000;

    let data = [];
    if (dateRange === 'Günlük') {
        data = [{ name: 'Bugün', su: currentWater }];
    } else {
        data = historyData ? historyData.map(h => ({
            name: h.date,
            su: h.water
        })) : [];
    }

    return (
        <div className="p-6 rounded-3xl border shadow-sm col-span-12 lg:col-span-6 flex flex-col" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <span className="text-blue-500">💧</span>
                Su Takibi
            </h3>
            <p className="text-sm font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>Günlük Tüketim (ml)</p>

            <div className="flex-1 min-h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                        <Tooltip
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                            contentStyle={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                        />
                        <Bar dataKey="su" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between p-4 rounded-2xl border" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                    <div className="text-center">
                        <span className="block text-xs uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Bugün</span>
                        <span className="block text-xl font-black text-blue-500">{currentWater} ml</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-xs uppercase font-bold" style={{ color: 'var(--text-secondary)' }}>Hedef</span>
                        <span className="block text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{waterGoal} ml</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
