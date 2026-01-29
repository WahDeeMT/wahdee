import React from 'react';
import { X, Clock, Flame, Calendar, Trash2, Activity } from 'lucide-react';

const ActivityDetailModal = ({ isOpen, onClose, activity, onDelete }) => {
    if (!isOpen || !activity) return null;

    // Calculate intensity (Cal/Min)
    const intensity = Math.round(activity.calories / activity.duration);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 relative">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-10"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                {/* Header / Icon Area */}
                <div className="flex flex-col items-center pt-8 pb-6 bg-gradient-to-b from-gray-50 to-white">
                    <div className="w-24 h-24 bg-white rounded-3xl shadow-lg shadow-gray-100 flex items-center justify-center text-5xl mb-4 border border-gray-100">
                        {activity.icon}
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">{activity.type}</h2>
                    <p className="text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                        <Calendar size={14} />
                        {activity.date}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 px-6 mb-8">
                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col items-center">
                        <Flame size={24} className="text-orange-500 mb-2" />
                        <span className="text-2xl font-bold text-gray-800">{activity.calories}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Kalori</span>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex flex-col items-center">
                        <Clock size={24} className="text-blue-500 mb-2" />
                        <span className="text-2xl font-bold text-gray-800">{activity.duration}</span>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wide">Dakika</span>
                    </div>
                    <div className="col-span-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                                <Activity size={20} className="text-green-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-700">Yoğunluk</span>
                                <span className="text-xs text-gray-400">Ortalama kalori yakımı</span>
                            </div>
                        </div>
                        <span className="text-lg font-bold text-gray-800">~{intensity} <span className="text-xs font-normal text-gray-400">kcal/dk</span></span>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0">
                    <button
                        onClick={() => {
                            onDelete(activity.id);
                            onClose();
                        }}
                        className="w-full py-3.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 group"
                    >
                        <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                        Kaydı Sil
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ActivityDetailModal;
