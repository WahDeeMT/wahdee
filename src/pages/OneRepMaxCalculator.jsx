import React, { useState, useEffect } from 'react';
import { Dumbbell, Weight, ArrowRight, TrendingUp, Info, CheckCircle2, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';

const OneRepMaxCalculator = () => {
    const [liftWeight, setLiftWeight] = useState(100);
    const [reps, setReps] = useState(5);
    const [bodyWeight, setBodyWeight] = useState(75);
    const [results, setResults] = useState(null);

    const calculate1RM = () => {
        // Formulas
        const epley = liftWeight * (1 + reps / 30);
        const brzycki = liftWeight * (36 / (37 - reps));
        const lander = (100 * liftWeight) / (101.3 - 2.67123 * reps);
        const lombardi = liftWeight * Math.pow(reps, 0.10);
        const mayhew = (100 * liftWeight) / (52.2 + 41.9 * Math.pow(Math.E, -0.055 * reps));

        const average = (epley + brzycki + lander + lombardi + mayhew) / 5;
        const ratio = average / bodyWeight;

        // Strength Level
        let level = "Beginner - Yeni Başlayan";
        if (ratio >= 2.0) level = "Elite - Profesyonel Seviye - Üstün Kuvvet";
        else if (ratio >= 1.75) level = "Advanced - İleri Seviye";
        else if (ratio >= 1.5) level = "Intermediate - Orta Seviye";
        else if (ratio >= 1.25) level = "Novice - Gelişmiş";

        // Training Percentages
        const percentages = [
            { pct: 50, label: "15–20 tekrar | Isınma, Dayanıklılık" },
            { pct: 60, label: "12–15 tekrar | Kas Dayanıklılığı" },
            { pct: 70, label: "10–12 tekrar | Hipertrofi" },
            { pct: 80, label: "6–8 tekrar | Kuvvet Gelişimi" },
            { pct: 90, label: "3–5 tekrar | Maksimal Kuvvet" },
            { pct: 95, label: "1–3 tekrar | Pik Kuvvet, Test" }
        ].map(p => ({
            ...p,
            weight: (average * (p.pct / 100)).toFixed(1)
        }));

        setResults({
            average: average.toFixed(1),
            ratio: ratio.toFixed(2),
            level,
            formulas: [
                { name: "Epley", val: epley.toFixed(1), desc: "En yaygın kullanılan genel formül" },
                { name: "Brzycki", val: brzycki.toFixed(1), desc: "Düşük tekrarlar için ideal (1-5)" },
                { name: "Lander", val: lander.toFixed(1), desc: "Orta tekrar aralığı için dengeli" },
                { name: "Lombardi", val: lombardi.toFixed(1), desc: "Yüksek ağırlıklarda doğruluk artar" },
                { name: "Mayhew", val: mayhew.toFixed(1), desc: "Bilimsel araştırmalara dayalı" }
            ],
            percentages
        });
    };

    // Calculate on initial load and when inputs change
    useEffect(() => {
        calculate1RM();
    }, [liftWeight, reps, bodyWeight]);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-full text-sm font-bold border border-rose-100 mb-2">
                    <TrendingUp size={16} />
                    5 FARKLI FORMÜL – EN DOĞRU SONUÇ
                </div>
                <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>1RM Hesaplayıcı</h1>
                <p className="font-medium max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Maksimal kaldırma kapasitenizi hesaplayın ve antrenman ağırlıklarınızı belirleyin.
                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT: User Input */}
                <div className="lg:col-span-7 space-y-10">
                    <section className="p-8 rounded-[32px] border shadow-xl space-y-10" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg text-rose-600" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}>
                                <Weight size={20} />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Bilgilerinizi Girin</h2>
                        </div>


                        {/* Lift Weight Slider */}
                        <div className="space-y-4 p-6 rounded-2xl border transition-all shadow-inner" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))', borderColor: 'var(--border-color)' }}>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Kaldırılan Ağırlık (kg)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={liftWeight}
                                        onChange={(e) => setLiftWeight(Math.min(300, Math.max(0, parseInt(e.target.value) || 0)))}
                                        className="w-16 h-8 text-center font-black rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all border outline-none"
                                        style={{ backgroundColor: 'var(--bg-card)', color: 'var(--primary-600)', borderColor: 'var(--border-color)' }}
                                    />
                                    <span className="text-sm font-bold" style={{ color: 'var(--primary-400)' }}>kg</span>
                                </div>
                            </div>

                            <input
                                type="range" min="0" max="300" value={liftWeight}
                                onChange={(e) => setLiftWeight(parseInt(e.target.value))}
                                className="modern-slider text-rose-600"
                            />
                        </div>

                        {/* Reps Slider */}
                        <div className="space-y-4 p-6 rounded-2xl border transition-all shadow-inner" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderColor: 'var(--border-color)' }}>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Tekrar Sayısı</label>
                                <input
                                    type="number"
                                    value={reps}
                                    onChange={(e) => setReps(Math.min(12, Math.max(1, parseInt(e.target.value) || 1)))}
                                    className="w-16 h-8 text-center font-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border outline-none"
                                    style={{ backgroundColor: 'var(--bg-card)', color: '#6366f1', borderColor: 'var(--border-color)' }}
                                />
                            </div>
                            <input
                                type="range" min="1" max="12" value={reps}
                                onChange={(e) => setReps(parseInt(e.target.value))}
                                className="modern-slider text-indigo-600"
                            />
                        </div>


                        {/* Body Weight Slider */}
                        <div className="space-y-4 p-6 rounded-2xl border transition-all shadow-inner" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'var(--border-color)' }}>
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Vücut Ağırlığı (kg)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={bodyWeight}
                                        onChange={(e) => setBodyWeight(Math.min(150, Math.max(40, parseInt(e.target.value) || 40)))}
                                        className="w-16 h-8 text-center font-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border outline-none"
                                        style={{ backgroundColor: 'var(--bg-card)', color: '#3b82f6', borderColor: 'var(--border-color)' }}
                                    />
                                    <span className="text-sm font-bold" style={{ color: '#60a5fa' }}>kg</span>
                                </div>
                            </div>
                            <input
                                type="range" min="40" max="150" value={bodyWeight}
                                onChange={(e) => setBodyWeight(parseInt(e.target.value))}
                                className="modern-slider text-blue-600"
                            />
                            <p className="text-[10px] font-bold uppercase text-center mt-2" style={{ color: 'var(--text-secondary)' }}>Kuvvet seviyenizi belirlemek için</p>
                        </div>


                        <button
                            onClick={calculate1RM}
                            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3 group mt-10 shadow-xl shadow-violet-500/20"
                        >
                            1RM'i Hesapla
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>

                    </section>
                </div>

                {/* RIGHT: Results */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Main Result Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 text-white shadow-3xl shadow-rose-200/20 relative overflow-hidden animate-in zoom-in-95 duration-700">
                        <div className="relative z-10">
                            <div className="inline-block px-4 py-1.5 bg-rose-600 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                                Hesaplama Sonucu
                            </div>

                            <div className="flex items-center justify-between gap-6 mb-10">
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ortalama 1RM</p>
                                    <div className="text-6xl font-black text-rose-400 animate-in fade-in zoom-in duration-500" key={results?.average}>
                                        {results?.average} <span className="text-lg opacity-50 uppercase tracking-widest">kg</span>
                                    </div>
                                    <div className="inline-block px-4 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-tight border border-rose-100 mt-2">
                                        {results?.level}
                                    </div>
                                    <p className="text-xs text-gray-400 font-medium mt-1">Vücut ağırlığı oranı: <span className="text-rose-400 font-bold">{results?.ratio}x</span></p>
                                </div>

                                <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
                                    <div className="absolute inset-0 bg-rose-600/20 rounded-full animate-ping" />
                                    <div className="absolute inset-4 bg-rose-600/30 rounded-full animate-pulse" />
                                    <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-rose-600 to-rose-400 rounded-full shadow-2xl shadow-rose-500/50 flex items-center justify-center border-2 border-white/20">
                                        <Dumbbell size={32} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h4 className="text-xs font-black text-gray-400 uppercase mb-4 tracking-widest">Formül Karşılaştırması</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {results?.formulas.map((f, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                            <div>
                                                <p className="font-bold text-white text-sm group-hover:text-rose-400 transition-colors uppercase">{f.name}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{f.desc}</p>
                                            </div>
                                            <span className="text-xl font-black text-white">{f.val} kg</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* BOTTOM: Training Percentages */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg text-primary-500" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}>
                        <Dumbbell size={20} />
                    </div>
                    <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Antrenman Ağırlıkları</h2>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {results?.percentages.map((p, i) => (
                        <div key={i} className="p-6 rounded-3xl border shadow-sm hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 group hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <span className="text-primary-600 font-black text-2xl group-hover:scale-110 block transition-transform">{p.pct}%</span>
                            <p className="text-xl font-black mt-1" style={{ color: 'var(--text-primary)' }}>{p.weight} kg</p>
                            <p className="text-[10px] font-bold uppercase mt-3 leading-tight" style={{ color: 'var(--text-secondary)' }}>
                                {p.label}
                            </p>
                        </div>
                    ))}
                </div>

            </section>

            {/* Info Footer */}
            <div className="rounded-[32px] p-8 text-white shadow-xl shadow-rose-500/10 border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-rose-400 shrink-0" style={{ backgroundColor: 'rgba(244, 63, 94, 0.1)' }}>
                        <Info size={32} />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Hesaplama Hakkında Not</h4>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            1RM hesaplamaları tahmini değerlerdir. Güvenliğiniz için gerçek 1RM denemelerini mutlaka bir gözlemci eşliğinde ve tam ısınma sonrası gerçekleştirin.
                            Verilen antrenman yüzdeleri dünya çapında kabul görmüş genel standartlardır.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OneRepMaxCalculator;
