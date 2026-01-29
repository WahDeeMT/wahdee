import React from 'react';
import { Footprints, Plus, Minus, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const WeightCard = ({ current, target, start, steps, stepGoal, onAddSteps, onRemoveSteps }) => {
    const remaining = (current - target).toFixed(1);
    const stepsPercentage = Math.min(100, Math.max(0, (steps / stepGoal) * 100));

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-green-100/50 hover:border-green-300 hover:-translate-y-1 h-full group">
            <div>
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-gray-700 font-bold flex items-center gap-2">
                        <Footprints size={20} className="text-green-500" />
                        Adım Takibi
                    </h3>
                    <span className="text-xs font-bold bg-green-50 text-green-600 px-2.5 py-1 rounded-lg">
                        {stepsPercentage.toFixed(0)}%
                    </span>
                </div>

                {/* Weight Section Mini */}
                <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-xl">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Mevcut Kilo</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-800">{current}</span>
                            <span className="text-xs text-gray-500">kg</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500 font-medium">Hedef</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-700">{target}</span>
                            <span className="text-xs text-gray-500">kg</span>
                        </div>
                    </div>
                </div>

                {/* Steps Big Display */}
                <div className="flex flex-col items-center mb-6">
                    <span className="text-4xl font-extrabold text-gray-800 tracking-tight">{steps.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">/ {stepGoal.toLocaleString()} Adım</span>
                </div>
            </div>

            <div className="mt-auto">
                {/* Modern Progress Bar (Green) */}
                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner relative mb-6 ring-1 ring-gray-200/50">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000 ease-out relative"
                        style={{ width: `${stepsPercentage}%` }}
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite] -translate-x-full"></div>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Remove Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onRemoveSteps(500)}
                            className="flex-1 flex items-center justify-center py-2 rounded-xl border border-transparent bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all active:scale-95"
                            title="Çıkar -500"
                        >
                            <Minus size={14} className="mr-0.5" />
                            <span className="text-xs font-bold">500</span>
                        </button>
                        <button
                            onClick={() => onRemoveSteps(1000)}
                            className="flex-1 flex items-center justify-center py-2 rounded-xl border border-transparent bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all active:scale-95"
                            title="Çıkar -1000"
                        >
                            <Minus size={14} className="mr-0.5" />
                            <span className="text-xs font-bold">1k</span>
                        </button>
                    </div>

                    {/* Add Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onAddSteps(500)}
                            className="flex-1 flex items-center justify-center py-2 rounded-xl border border-green-100 bg-green-50 hover:bg-green-100 text-green-600 transition-all active:scale-95 shadow-sm"
                            title="Ekle +500"
                        >
                            <Plus size={14} className="mr-0.5" />
                            <span className="text-xs font-bold">500</span>
                        </button>
                        <button
                            onClick={() => onAddSteps(1000)}
                            className="flex-1 flex items-center justify-center py-2 rounded-xl border border-green-100 bg-green-50 hover:bg-green-100 text-green-600 transition-all active:scale-95 shadow-sm"
                            title="Ekle +1000"
                        >
                            <Plus size={14} className="mr-0.5" />
                            <span className="text-xs font-bold">1k</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightCard;
