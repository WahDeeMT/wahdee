import React, { useEffect } from 'react';
import { Trophy, X } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 3500); // Auto close after 3.5s
            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full relative flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-5 duration-500">

                {/* Animated Trophy Icon */}
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg shadow-yellow-100">
                    <Trophy size={40} className="text-yellow-500" />
                </div>

                <h3 className="text-2xl font-black text-gray-800 mb-2 tracking-tight">
                    Başardın! 🎉
                </h3>

                <p className="text-gray-500 font-medium mb-8 leading-relaxed">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-violet-200 active:scale-95 transition-all"
                >
                    Harika!
                </button>

            </div>
        </div>
    );
};

export default SuccessModal;
