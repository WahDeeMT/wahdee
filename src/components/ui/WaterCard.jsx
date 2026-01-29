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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-300 hover:-translate-y-1 group h-full">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-gray-700 font-bold flex items-center gap-2">
                    <Droplets size={20} className="text-blue-500" />
                    Su Takibi
                </h3>
                <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded-lg">
                    {percentage.toFixed(0)}%
                </span>
            </div>

            <div className="flex items-end gap-2 mb-8 justify-center">
                <span className="text-5xl font-bold text-gray-800">{current}</span>
                <span className="text-sm text-gray-400 mb-2 font-medium">/ {goal} ml</span>
            </div>

            {/* Visual Bar with Animation */}
            <div className="relative flex-1 w-full max-w-[120px] mx-auto bg-blue-50 rounded-2xl overflow-hidden border-4 border-white ring-1 ring-blue-100 mb-8 shadow-inner min-h-[160px]">
                {/* Wave Water Level */}
                <div
                    className="absolute bottom-0 w-[200%] -left-1/2 bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-700 ease-out opacity-90 group-hover:opacity-100 animate-wave"
                    style={{ height: `${percentage}%` }}
                ></div>

                {/* Bubbles */}
                {bubbles.map(bubble => (
                    <div
                        key={bubble.id}
                        className="absolute bottom-0 bg-white/30 rounded-full animate-bubble pointer-events-none"
                        style={{
                            left: bubble.left,
                            width: `${10 * bubble.scale}px`,
                            height: `${10 * bubble.scale}px`,
                            animationDuration: bubble.duration
                        }}
                    />
                ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-auto">
                {[250, 500, 1000].map((amount) => (
                    <div key={amount} className="flex flex-col gap-2">
                        <button
                            onClick={() => onAdd(amount)}
                            className="flex items-center justify-center py-2.5 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 text-blue-600 transition-all active:scale-95 shadow-sm"
                            title={`Ekle +${amount}`}
                        >
                            <Plus size={14} className="mr-1" />
                            <span className="text-xs font-bold">{amount < 1000 ? amount : '1L'}</span>
                        </button>
                        <button
                            onClick={() => onRemove(amount)}
                            className="flex items-center justify-center py-1.5 rounded-lg border border-transparent hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
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
