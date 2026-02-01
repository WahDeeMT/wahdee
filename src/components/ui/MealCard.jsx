import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const MealCard = ({ title, items, color, hoverBorder, hoverShadow, totalCalories, onAdd, onRemove }) => {
  return (
    <div className={cn(
      "rounded-[32px] p-6 flex flex-col h-full transition-all duration-300 border hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden bg-white shadow-sm",
      "dark:bg-slate-800/40 dark:border-white/10 dark:shadow-none",
      hoverBorder,
      hoverShadow
    )}
      style={{ borderTop: `4px solid ${color === 'bg-yellow-50' ? '#eab308' : color === 'bg-green-50' ? '#22c55e' : color === 'bg-gray-50' ? '#94a3b8' : '#ec4899'}` }}
    >
      {/* Background Accent Shimmer */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30 group-hover:bg-white/50 transition-colors" />
      <div className="flex justify-between items-start mb-6">
        <h3 className="font-black text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>{title}</h3>
        <div className="backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black shadow-sm group-hover:scale-110 transition-all border" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
          {totalCalories} kcal
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-4">
        {items.length === 0 && (
          <div className="text-sm text-center py-6 italic font-medium" style={{ color: 'var(--text-secondary)' }}>Henüz yiyecek eklenmedi</div>
        )}
        {items.map((item) => (
          <div
            key={item.id}
            className="backdrop-blur-md rounded-2xl p-4 flex justify-between items-center group/item shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <div className="flex flex-col">
              <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.name}</span>
              <span className="text-[10px] font-bold uppercase tracking-tighter mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.calories} kcal</span>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-2 hover:bg-red-500/10 rounded-xl active:scale-90"
              title="Sil"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="w-full py-3.5 bg-white/20 dark:bg-white/5 hover:bg-white/40 dark:hover:bg-white/10 rounded-[20px] text-sm font-black flex items-center justify-center gap-2 transition-all shadow-sm group-hover:shadow active:scale-95 border border-white/20"
        style={{ color: 'var(--text-primary)' }}
      >
        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" style={{ color: 'var(--text-secondary)' }} />
        <span>Yiyecek Ekle</span>
      </button>
    </div>
  );
};

export default MealCard;