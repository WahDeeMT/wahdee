import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

const MealCard = ({ title, items, color, hoverBorder, hoverShadow, totalCalories, onAdd, onRemove }) => {
  return (
    <div className={cn(
      "rounded-2xl p-5 flex flex-col h-full transition-all duration-300 border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 group",
      color,
      hoverBorder,
      hoverShadow
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-gray-800 text-lg tracking-tight">{title}</h3>
        <div className="bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-700 shadow-sm group-hover:bg-white/90 transition-all">
          {totalCalories} kcal
        </div>
      </div>

      <div className="flex-1 space-y-3 mb-4">
        {items.length === 0 && (
          <div className="text-gray-500/60 text-sm text-center py-6 italic font-medium">Henüz yiyecek eklenmedi</div>
        )}
        {items.map((item) => (
          <div key={item.id} className="bg-white/70 backdrop-blur-md rounded-xl p-3 flex justify-between items-center group/item shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
            <div>
              <div className="font-semibold text-gray-800 text-sm">{item.name}</div>
              <div className="text-xs text-gray-500 font-medium">{item.calories} kcal</div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover/item:opacity-100 transition-all p-1.5 hover:bg-red-50 rounded-lg"
              title="Sil"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onAdd}
        className="w-full py-3 bg-white/60 hover:bg-white text-gray-700 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow group-hover:bg-white/80"
      >
        <Plus size={16} className="text-gray-500 group-hover:text-primary-600 transition-colors" />
        <span className="group-hover:text-primary-700 transition-colors">Yiyecek Ekle</span>
      </button>
    </div>
  );
};

export default MealCard;