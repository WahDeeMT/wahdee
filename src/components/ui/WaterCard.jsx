import React, { useEffect, useState } from 'react';
import { Plus, Minus, Droplets } from 'lucide-react';
import { cn } from '../../lib/utils';

const WaterCard = ({ current, goal, onAdd, onRemove }) => {
    const percentage = Math.min(100, (current / goal) * 100);
    const [bubbles, setBubbles] = useState([]);

    // Generate bubbles effect
    useEffect(() => {
        const interval = setInterval(() => {
            setBubbles(prev => {
                const newBubble = {
                    id: Date.now(),
                    left: Math.random() * 80 + 10 + '%',
                    scale: Math.random() * 0.5 + 0.5,
                    duration: Math.random() * 2 + 2 + 's'
                };
                // Keep max 5 bubbles to avoid perf issues
                return [...prev.slice(-4), newBubble];
            });
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="rounded-2xl shadow-sm border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group h-full"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Droplets size={20} className="text-blue-500" />
                    Su Takibi
                </h3>
                <span className="text-xs font-bold bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-lg">
                    {percentage.toFixed(0)}%
                </span>
            </div>

            <div className="flex items-end gap-2 mb-8 justify-center">
                <span className="text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>{current}</span>
                <span className="text-sm mb-2 font-medium" style={{ color: 'var(--text-secondary)' }}>/ {goal} ml</span>
            </div>

            {/* Bottle Visual Area */}
            <div className="relative flex-1 py-4 flex flex-col items-center justify-end mb-8 min-h-[220px]">
                {/* Bottle Cap */}
                <div className="w-8 h-3 bg-blue-300 rounded-t-lg border-x-2 border-t-2 border-blue-400 shadow-sm z-20" />

                {/* Bottle Neck */}
                <div className="w-10 h-8 bg-blue-200/50 border-x-2 border-blue-300 relative z-10" />

                {/* Bottle Body */}
                <div className="relative w-28 h-40 bg-blue-200/40 rounded-[30px] rounded-t-[15px] border-4 border-blue-300 ring-1 ring-blue-400 shadow-xl overflow-hidden group/bottle">
                    {/* Water Level (Wave) */}
                    <div
                        className="absolute bottom-0 w-[200%] -left-1/2 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out opacity-80 group-hover:opacity-100 animate-wave"
                        style={{ height: `${percentage}%` }}
                    />

                    {/* Bubbles */}
                    {bubbles.map(bubble => (
                        <div
                            key={bubble.id}
                            className="absolute bottom-0 bg-white/40 rounded-full animate-bubble pointer-events-none z-10"
                            style={{
                                left: bubble.left,
                                width: `${8 * bubble.scale}px`,
                                height: `${8 * bubble.scale}px`,
                                animationDuration: bubble.duration
                            }}
                        />
                    ))}

                    {/* Glass Shine */}
                    <div className="absolute top-0 left-4 w-2 h-full bg-white/10 skew-x-12" />
                    <div className="absolute top-0 left-8 w-1 h-full bg-white/5 skew-x-12" />
                </div>

                {/* Shadow underneath */}
                <div className="w-20 h-2 bg-blue-900/10 rounded-full blur-md mt-2" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-auto">
                {[250, 500, 1000].map((amount) => (
                    <div key={amount} className="flex flex-col gap-2">
                        <button
                            onClick={() => onAdd(amount)}
                            className="flex items-center justify-center py-2.5 rounded-xl border transition-all active:scale-95 shadow-sm"
                            style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6' }}
                            title={`Ekle +${amount}`}
                        >

                            <Plus size={14} className="mr-1" />
                            <span className="text-xs font-bold">{amount < 1000 ? amount : '1L'}</span>
                        </button>
                        <button
                            onClick={() => onRemove(amount)}
                            className="flex items-center justify-center py-1.5 rounded-lg border border-transparent hover:bg-red-500/10 transition-colors"
                            style={{ color: 'var(--text-secondary)' }}
                            title={`Çıkar -${amount}`}
                        >

                            <Minus size={12} className="mr-1" />
                            <span className="text-[10px] font-medium">-{amount < 1000 ? amount : '1L'}</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WaterCard;
