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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-100/50 hover:border-violet-300 hover:-translate-y-1 group h-full">
            <h3 className="text-gray-700 font-bold self-start mb-4 flex items-center gap-2">
                <Flame size={20} className="text-orange-500" />
                Kalori Özeti
            </h3>

            {/* Circular Chart */}
            <div className="relative w-48 h-48 flex items-center justify-center mb-6 scale-90 sm:scale-100">
                {/* SVG Defs for Gradient */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#c084fc" /> {/* purple-400 */}
                            <stop offset="100%" stopColor="#7c3aed" /> {/* violet-600 */}
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
                        className="text-gray-100/50"
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
                    <span className="text-4xl font-extrabold text-gray-800 tracking-tight">{remaining}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Kalan</span>
                </div>
            </div>

            {/* Stats with Controls */}
            <div className="grid grid-cols-2 gap-4 w-full mt-auto">

                {/* Taken (Alınan) */}
                <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="p-1.5 bg-primary-100 text-primary-600 rounded-lg">
                            <Utensils size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Alınan</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800 ml-1">{taken}</span>

                    <div className="flex gap-1.5 mt-1">
                        <button
                            onClick={() => onUpdateCalories(-100)}
                            className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-white border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-95"
                        >
                            <Minus size={12} />
                        </button>
                        <button
                            onClick={() => onUpdateCalories(100)}
                            className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-white border border-gray-200 hover:border-primary-200 text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all active:scale-95"
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                </div>

                {/* Burned (Yakılan) */}
                <div className="flex flex-col gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-1.5 mb-1">
                        <div className="p-1.5 bg-orange-100 text-orange-500 rounded-lg">
                            <Flame size={14} />
                        </div>
                        <span className="text-xs font-bold text-gray-400 uppercase">Yakılan</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800 ml-1">{burned}</span>

                    <div className="flex gap-1.5 mt-1">
                        <button
                            onClick={() => onUpdateBurned(-100)}
                            className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-white border border-gray-200 hover:border-red-200 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all active:scale-95"
                        >
                            <Minus size={12} />
                        </button>
                        <button
                            onClick={() => onUpdateBurned(100)}
                            className="flex-1 flex items-center justify-center py-1.5 rounded-lg bg-white border border-gray-200 hover:border-orange-200 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all active:scale-95"
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
