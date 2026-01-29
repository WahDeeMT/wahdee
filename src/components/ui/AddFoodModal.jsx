import React, { useState } from 'react';
import { X, Plus, Utensils, Flame } from 'lucide-react';
import { cn } from '../../lib/utils';

const AddFoodModal = ({ isOpen, onClose, onSave, categoryTitle, categoryColor }) => {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (foodName && calories) {
            onSave(foodName, parseInt(calories));
            setFoodName('');
            setCalories('');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header with dynamic category color */}
                <div className={cn("p-6 flex justify-between items-center bg-opacity-30", categoryColor)}>
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <Utensils size={20} className="text-gray-600" />
                        Yiyecek Ekle
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/50 hover:bg-white text-gray-600 rounded-full transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-6 py-2">
                    <div className="text-sm font-medium text-gray-500">
                        <span className="font-bold text-gray-800">{categoryTitle}</span> öğününe ekleniyor
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Yiyecek Adı</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Örn: Izgara Tavuk"
                                value={foodName}
                                onChange={(e) => setFoodName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-800 bg-gray-50 focus:bg-white"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Kalori (kcal)</label>
                        <div className="relative">
                            <Flame size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                            <input
                                type="number"
                                placeholder="0"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-800 bg-gray-50 focus:bg-white font-mono font-medium"
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-gray-500 hover:text-gray-700 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                        >
                            Vazgeç
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-200 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            Ekle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFoodModal;
