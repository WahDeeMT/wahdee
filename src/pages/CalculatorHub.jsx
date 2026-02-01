import React from 'react';
import { Calculator, ArrowRight, Activity, Zap, Dumbbell, Percent } from 'lucide-react';

const CalculatorHub = ({ onNavigate }) => {
    const cards = [
        {
            id: 'calculator',
            title: 'Kalori ve Makro Hesaplayıcı',
            description: 'Cinsiyet, yaş, kilo ve boy bilgilerinize göre günlük almanız gereken kalori ve makroları hesaplayın.',
            icon: Calculator,
            color: 'bg-violet-600',
            shadow: 'shadow-violet-200'
        },
        {
            id: 'protein-calculator',
            title: 'Günlük Protein Gereksinimi Hesaplayıcı',
            description: 'Hedeflerinize ve aktivite seviyenize göre günlük almanız gereken ideal protein miktarını öğrenin.',
            icon: Zap,
            color: 'bg-orange-500',
            shadow: 'shadow-orange-200'
        },
        {
            id: 'one-rep-max',
            title: '1RM (One Rep Max) Hesaplayıcı',
            description: 'Maksimal kaldırma kapasitenizi hesaplayın ve antrenman ağırlıklarınızı belirleyin.',
            icon: Dumbbell,
            color: 'bg-indigo-600',
            shadow: 'shadow-indigo-200'
        },
        {
            id: 'body-fat-calculator',
            title: 'Vücut Yağ Yüzdesi Hesaplayıcı',
            description: 'Vücut ölçümlerinize göre yağ yüzdenizi hesaplayın – BMI’dan daha doğru!',
            icon: Percent,
            color: 'bg-cyan-600',
            shadow: 'shadow-cyan-200'
        }
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-2">
                <h1 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Hesaplayıcılar</h1>
                <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>Hedeflerinize ulaşmak için ihtiyacınız olan tüm araçlar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => onNavigate(card.id)}
                        className="group relative p-8 rounded-[32px] border shadow-xl hover:shadow-2xl transition-all duration-500 text-left overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                    >
                        {/* Background Accent */}
                        <div className={`absolute -right-8 -top-8 w-32 h-32 ${card.color} opacity-0 group-hover:opacity-10 rounded-full group-hover:scale-150 transition-all duration-700`} />

                        <div className="flex flex-col h-full space-y-4 relative z-10">
                            <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center text-white shadow-lg ${card.shadow} group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                <card.icon size={28} />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold group-hover:text-primary-500 transition-colors" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                                <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                                    {card.description}
                                </p>
                            </div>

                            <div className="pt-4 mt-auto flex items-center text-sm font-bold text-violet-500 gap-2 group-hover:gap-3 transition-all">
                                Hemen Hesapla
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CalculatorHub;
