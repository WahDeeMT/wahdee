import React from 'react';
import { Plus, Minus, Flame, Utensils } from 'lucide-react';
import { cn } from '../../lib/utils';

const CalorieCard = ({ taken, burned, goal, onUpdateCalories, onUpdateBurned }) => {
    const remaining = goal - taken + burned;
    const percentage = Math.min(100, Math.max(0, (taken / (goal + burned)) * 100));

    // HUD Circle calculations
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div
            className="rounded-[32px] shadow-sm border p-6 flex flex-col items-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group h-full"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
            <h3 className="font-bold self-start mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                <Flame size={20} className="text-orange-500" />
                Kalori Özeti
            </h3>

            {/* Circular Chart */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-6 scale-90 sm:scale-100 group-hover:scale-105 transition-transform duration-500">
                {/* Visual Glow */}
                <div className="absolute inset-4 bg-violet-400/10 rounded-full blur-2xl animate-pulse" />

                {/* SVG Defs for Gradient */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a78bfa" /> {/* primary-400 */}
                            <stop offset="100%" stopColor="#7c3aed" /> {/* primary-600 */}
                        </linearGradient>
                    </defs>
                </svg>

                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-gray-100 dark:text-gray-800"
                        style={{ opacity: 0.3 }}
                    />
                    {/* Progress Circle with Gradient */}
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="url(#purpleGradient)"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="relative">
                        <span className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{remaining}</span>
                        <div className="absolute -inset-2 bg-violet-400/5 blur-lg rounded-full animate-ping" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-secondary)' }}>Kalan kcal</span>
                </div>
            </div>

            {/* Stats with Controls */}
            <div className="grid grid-cols-2 gap-4 w-full mt-auto">

                {/* Alınan (Taken) */}
                <div
                    className="flex flex-col gap-2 p-3.5 rounded-2xl border transition-all group/stat"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}
                >
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                            <div className="p-1.5 bg-violet-500/20 text-violet-500 rounded-lg group-hover/stat:rotate-6 transition-transform">
                                <Utensils size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: 'var(--text-secondary)' }}>Alınan</span>
                        </div>
                        <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{taken}</span>
                    </div>

                    <div className="premium-progress h-2 dark:bg-gray-800 border-none">
                        <div className="premium-progress-bar bg-violet-500" style={{ width: `${Math.min(100, (taken / goal) * 100)}%` }}>
                            <div className="premium-progress-shimmer" />
                        </div>
                    </div>

                    <div className="flex gap-1.5 mt-2">
                        <button
                            onClick={() => onUpdateCalories(-100)}
                            className="flex-1 flex items-center justify-center py-1 rounded-lg bg-white/10 border border-white/20 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
                        >
                            <Minus size={12} />
                        </button>
                        <button
                            onClick={() => onUpdateCalories(100)}
                            className="flex-1 flex items-center justify-center py-1 rounded-lg bg-white/10 border border-white/20 text-gray-400 hover:text-violet-500 hover:bg-violet-500/10 transition-all active:scale-90"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                </div>

                {/* Yakılan (Burned) */}
                <div
                    className="flex flex-col gap-2 p-3.5 rounded-2xl border transition-all group/stat"
                    style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}
                >
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                            <div className="p-1.5 bg-orange-500/20 text-orange-500 rounded-lg group-hover/stat:rotate-6 transition-transform">
                                <Flame size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-tighter" style={{ color: 'var(--text-secondary)' }}>Yakılan</span>
                        </div>
                        <span className="text-sm font-black" style={{ color: 'var(--text-primary)' }}>{burned}</span>
                    </div>

                    <div className="premium-progress h-2 dark:bg-gray-800 border-none">
                        <div className="premium-progress-bar bg-orange-500" style={{ width: `${Math.min(100, (burned / 500) * 100)}%` }}>
                            <div className="premium-progress-shimmer" />
                        </div>
                    </div>

                    <div className="flex gap-1.5 mt-2">
                        <button
                            onClick={() => onUpdateBurned(-100)}
                            className="flex-1 flex items-center justify-center py-1 rounded-lg bg-white/10 border border-white/20 text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-90"
                        >
                            <Minus size={12} />
                        </button>
                        <button
                            onClick={() => onUpdateBurned(100)}
                            className="flex-1 flex items-center justify-center py-1 rounded-lg bg-white/10 border border-white/20 text-gray-400 hover:text-orange-500 hover:bg-orange-500/10 transition-all active:scale-90"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalorieCard;
