import React from 'react';
import { X, Clock, Flame, Calendar, Trash2, Activity } from 'lucide-react';

const ActivityDetailModal = ({ isOpen, onClose, activity, onDelete }) => {
    if (!isOpen || !activity) return null;

    // Calculate intensity (Cal/Min)
    const intensity = Math.round(activity.calories / activity.duration);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 relative border border-white/20">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-colors z-10"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                {/* Header / Icon Area */}
                <div className="flex flex-col items-center pt-10 pb-8 bg-gradient-to-b from-gray-50/50 to-white">
                    <div className="w-24 h-24 bg-white rounded-[24px] shadow-xl shadow-gray-200/50 flex items-center justify-center text-5xl mb-6 border border-gray-100 group-hover:scale-110 transition-transform duration-500 hover:rotate-3">
                        {activity.icon}
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight leading-none">{activity.type}</h2>
                    <p className="text-gray-400 font-bold flex items-center gap-1.5 mt-2 text-xs uppercase tracking-widest bg-gray-100/50 px-3 py-1 rounded-full border border-gray-100">
                        <Calendar size={12} />
                        {activity.date}
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 px-8 mb-10">
                    <div className="bg-orange-50/50 p-5 rounded-[24px] border border-orange-100 flex flex-col items-center shadow-sm">
                        <Flame size={24} className="text-orange-500 mb-2" />
                        <span className="text-2xl font-black text-gray-900 leading-none">{activity.calories}</span>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Kalori</span>
                    </div>
                    <div className="bg-blue-50/50 p-5 rounded-[24px] border border-blue-100 flex flex-col items-center shadow-sm">
                        <Clock size={24} className="text-blue-500 mb-2" />
                        <span className="text-2xl font-black text-gray-900 leading-none">{activity.duration}</span>
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Dakika</span>
                    </div>
                    <div className="col-span-2 bg-gray-50/50 p-5 rounded-[24px] border border-gray-100 flex items-center justify-between px-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100">
                                <Activity size={20} className="text-emerald-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-gray-800 uppercase tracking-tighter">Yoğunluk</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Ortalama Yakım</span>
                            </div>
                        </div>
                        <span className="text-lg font-black text-gray-900">~{intensity} <span className="text-[10px] font-bold text-gray-400 ml-0.5">kcal/dk</span></span>
                    </div>
                </div>

                {/* Actions */}
                <div className="p-8 pt-0">
                    <button
                        onClick={() => {
                            onDelete(activity.id);
                            onClose();
                        }}
                        className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 group border border-red-100/50"
                    >
                        <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                        Kaydı Sil
                    </button>
                </div>

            </div>
        </div >
    );
};

export default ActivityDetailModal;
