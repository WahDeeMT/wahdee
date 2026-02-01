import React, { useState } from 'react';
import { X, Plus, Activity, Clock, Flame, ChevronRight } from 'lucide-react';

const AddActivityModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: 'Koşu',
        duration: '',
        calories: ''
    });

    const activityTypes = [
        { id: 'run', label: 'Koşu', icon: '🏃‍♂️', defaultCalPerMin: 10, color: 'text-orange-400' },
        { id: 'swim', label: 'Yüzme', icon: '🏊‍♂️', defaultCalPerMin: 8, color: 'text-blue-400' },
        { id: 'cycle', label: 'Bisiklet', icon: '🚴‍♂️', defaultCalPerMin: 7, color: 'text-green-400' },
        { id: 'football', label: 'Futbol', icon: '⚽', defaultCalPerMin: 9, color: 'text-yellow-400' },
        { id: 'basketball', label: 'Basketbol', icon: '🏀', defaultCalPerMin: 9, color: 'text-orange-500' },
        { id: 'tennis', label: 'Tenis', icon: '🎾', defaultCalPerMin: 8, color: 'text-lime-400' },
        { id: 'rope', label: 'İp Atlama', icon: '🤸‍♂️', defaultCalPerMin: 12, color: 'text-pink-400' },
        { id: 'walk', label: 'Yürüyüş', icon: '🚶‍♂️', defaultCalPerMin: 4, color: 'text-emerald-400' },
        { id: 'pushup', label: 'Şınav / Kuvvet', icon: '💪', defaultCalPerMin: 6, color: 'text-slate-400' },
        { id: 'yoga', label: 'Yoga', icon: '🧘‍♂️', defaultCalPerMin: 3, color: 'text-violet-400' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            if (name === 'duration' && value && prev.type) {
                const typeInfo = activityTypes.find(t => t.label === prev.type);
                if (typeInfo) {
                    newData.calories = Math.round(value * typeInfo.defaultCalPerMin);
                }
            }
            if (name === 'type') {
                const typeInfo = activityTypes.find(t => t.label === value);
                if (typeInfo && prev.duration) {
                    newData.calories = Math.round(prev.duration * typeInfo.defaultCalPerMin);
                }
            }
            return newData;
        });
    };

    const handleTypeSelect = (typeLabel) => {
        const typeInfo = activityTypes.find(t => t.label === typeLabel);
        setFormData(prev => ({
            ...prev,
            type: typeLabel,
            calories: prev.duration ? Math.round(prev.duration * typeInfo.defaultCalPerMin) : prev.calories
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.type && formData.duration && formData.calories) {
            const typeInfo = activityTypes.find(t => t.label === formData.type);
            onSave({
                ...formData,
                icon: typeInfo ? typeInfo.icon : '⚡',
                duration: parseInt(formData.duration),
                calories: parseInt(formData.calories)
            });
            setFormData({ type: 'Koşu', duration: '', calories: '' });
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden font-inter">
            {/* Backdrop with extreme blur */}
            <div
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl animate-in fade-in duration-300"
                onClick={onClose}
            ></div>

            <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Visual Header Decoration */}
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none"></div>

                {/* Header */}
                <div className="p-8 pb-4 flex justify-between items-start relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center border border-orange-500/30 shadow-lg shadow-orange-500/10">
                            <Activity className="text-orange-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tight">Antrenman Ekle</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Bugün ne kadar aktiftin?</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all border border-white/5 active:scale-90"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-8 relative z-10">

                    {/* Activity Type Selection */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 ml-1">Egzersiz Türü</label>
                        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 snap-x">
                            {activityTypes.map(type => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleTypeSelect(type.label)}
                                    className={`flex flex-col items-center justify-center p-4 min-w-[90px] rounded-3xl border transition-all snap-start ${formData.type === type.label
                                        ? 'bg-orange-500/20 border-orange-500/50 text-white shadow-lg shadow-orange-500/10 active:scale-95'
                                        : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-3xl mb-2">{type.icon}</span>
                                    <span className="text-[10px] font-black uppercase tracking-tight">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Duration Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-400 ml-1">Süre (Dakika)</label>
                            <div className="relative group">
                                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="30"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all font-bold placeholder:text-slate-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Calories Input */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-400 ml-1">Yakılan (Kcal)</label>
                            <div className="relative group">
                                <Flame size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
                                <input
                                    type="number"
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    placeholder="250"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/5 transition-all font-bold placeholder:text-slate-700"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-black text-sm uppercase tracking-[2px] py-5 rounded-2xl transition-all shadow-xl shadow-orange-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                        >
                            <Plus size={20} className="font-black" />
                            Aktiviteyi Kaydet
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full py-4 text-slate-500 hover:text-slate-300 font-bold text-xs uppercase tracking-widest transition-colors"
                        >
                            Vazgeç
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddActivityModal;
