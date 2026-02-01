import React from 'react';
import { Footprints, Plus, Minus, TrendingDown } from 'lucide-react';
import { cn } from '../../lib/utils';

const WeightCard = ({ current, target, start, steps, stepGoal, onAddSteps, onRemoveSteps }) => {
    const remaining = (current - target).toFixed(1);
    const stepsPercentage = Math.min(100, Math.max(0, (steps / stepGoal) * 100));

    return (
        <div
            className="rounded-[32px] shadow-sm border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full group"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
            <div>
                <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <Footprints size={20} className="text-emerald-500" />
                        Adım Takibi
                    </h3>
                    <span className="text-xs font-bold bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-lg">
                        {stepsPercentage.toFixed(0)}%
                    </span>
                </div>

                {/* Weight Section Mini */}
                <div
                    className="flex items-center justify-between mb-8 p-4 rounded-2xl group/weight"
                    style={{ backgroundColor: 'var(--bg-page)', border: '1px solid var(--border-color)' }}
                >
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-tighter mb-1" style={{ color: 'var(--text-secondary)' }}>Mevcut Kilo</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black" style={{ color: 'var(--text-primary)' }}>{current}</span>
                            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>kg</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-tighter mb-1" style={{ color: 'var(--text-secondary)' }}>Hedef</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold group-hover/weight:text-emerald-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{target}</span>
                            <span className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>kg</span>
                        </div>
                    </div>
                </div>

                {/* Steps Big Display */}
                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <span className="text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{steps.toLocaleString()}</span>
                        {stepsPercentage >= 100 && (
                            <div className="absolute -top-1 -right-6 bg-emerald-500 text-white p-1 rounded-full animate-bounce">
                                <TrendingDown size={12} className="rotate-180" />
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-2 px-3 py-1 bg-white/5 dark:bg-white/10 rounded-full" style={{ color: 'var(--text-secondary)' }}>/ {stepGoal.toLocaleString()} Hedef Adım</span>
                </div>
            </div>

            <div className="mt-auto">
                {/* Premium Progress Bar (Emerald) */}
                <div className="premium-progress h-4 mb-8">
                    <div
                        className="premium-progress-bar bg-gradient-to-r from-emerald-400 to-emerald-600"
                        style={{ width: `${stepsPercentage}%` }}
                    >
                        <div className="premium-progress-shimmer" />
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Remove Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onRemoveSteps(1000)}
                            className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-transparent bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all active:scale-90"
                            title="Çıkar -1000"
                        >
                            <Minus size={14} />
                            <span className="text-xs font-bold ml-1">1k</span>
                        </button>
                    </div>

                    {/* Add Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onAddSteps(1000)}
                            className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-emerald-100 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-all active:scale-90 shadow-sm"
                            title="Ekle +1000"
                        >
                            <Plus size={14} />
                            <span className="text-xs font-bold ml-1">1k</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightCard;
