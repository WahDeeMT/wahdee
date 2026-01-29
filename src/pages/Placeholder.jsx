import React from 'react';
import { Construction } from 'lucide-react';

const Placeholder = ({ title }) => {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in duration-500">
            <div className="bg-gray-100 p-6 rounded-3xl mb-6">
                <Construction size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500 max-w-sm">
                Bu sayfa şu anda yapım aşamasında. Çok yakında harika özelliklerle burada olacak!
            </p>
        </div>
    );
};

export default Placeholder;
