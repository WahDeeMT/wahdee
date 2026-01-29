import React, { useState } from 'react';
import { X, Plus, Activity, Clock, Flame } from 'lucide-react';

const AddActivityModal = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        type: 'Koşu',
        duration: '',
        calories: ''
    });

    const activityTypes = [
        { id: 'run', label: 'Koşu', icon: '🏃‍♂️', defaultCalPerMin: 10 },
        { id: 'swim', label: 'Yüzme', icon: '🏊‍♂️', defaultCalPerMin: 8 },
        { id: 'cycle', label: 'Bisiklet', icon: '🚴‍♂️', defaultCalPerMin: 7 },
        { id: 'football', label: 'Futbol', icon: '⚽', defaultCalPerMin: 9 },
        { id: 'basketball', label: 'Basketbol', icon: '🏀', defaultCalPerMin: 9 },
        { id: 'tennis', label: 'Tenis', icon: '🎾', defaultCalPerMin: 8 },
        { id: 'rope', label: 'İp Atlama', icon: '🤸‍♂️', defaultCalPerMin: 12 },
        { id: 'walk', label: 'Yürüyüş', icon: '🚶‍♂️', defaultCalPerMin: 4 },
        { id: 'pushup', label: 'Şınav / Kuvvet', icon: '💪', defaultCalPerMin: 6 },
        { id: 'yoga', label: 'Yoga', icon: '🧘‍♂️', defaultCalPerMin: 3 },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-calculate calories if duration changes
            if (name === 'duration' && value && prev.type) {
                const typeInfo = activityTypes.find(t => t.label === prev.type);
                if (typeInfo) {
                    newData.calories = Math.round(value * typeInfo.defaultCalPerMin);
                }
            }
            // Auto-calculate calories if type changes (and duration exists)
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
            // Find icon
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                            <Activity size={24} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Aktivite Ekle</h3>
                            <p className="text-orange-100 text-xs font-medium">Hareket zamanı!</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-95"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Quick Select Type */}
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 block">Aktivite Türü</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {activityTypes.map(type => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleTypeSelect(type.label)}
                                    className={`flex flex-col items-center justify-center p-3 min-w-[80px] rounded-xl border transition-all ${formData.type === type.label
                                        ? 'bg-orange-50 border-orange-500 text-orange-700 ring-1 ring-orange-200'
                                        : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <span className="text-2xl mb-1">{type.icon}</span>
                                    <span className="text-xs font-medium whitespace-nowrap">{type.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Duration Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Süre (Dk)</label>
                            <div className="relative">
                                <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    name="duration"
                                    value={formData.duration}
                                    onChange={handleChange}
                                    placeholder="30"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Calories Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Yakılan (Kcal)</label>
                            <div className="relative">
                                <Flame size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" />
                                <input
                                    type="number"
                                    name="calories"
                                    value={formData.calories}
                                    onChange={handleChange}
                                    placeholder="300"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all font-bold text-gray-800"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition-colors"
                        >
                            Vazgeç
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-200 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            Antrenmanı Kaydet
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddActivityModal;
