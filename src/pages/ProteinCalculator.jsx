import React, { useState, useEffect } from 'react';
import { Zap, Weight, Target, Activity, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

const ProteinCalculator = () => {
    const [weight, setWeight] = useState(70);
    const [goal, setGoal] = useState('maintain');
    const [activity, setActivity] = useState('medium');
    const [showResults, setShowResults] = useState(false);
    const [result, setResult] = useState(null);

    const goals = [
        { id: 'lose', label: 'Kilo Vermek', emoji: '🔥', desc: 'Yağ yakarken kas kütlesini korumayı hedefler.' },
        { id: 'maintain', label: 'Kilonu Korumak', emoji: '⚖️', desc: 'Mevcut formunuzu korumak için ideal denge.' },
        { id: 'build', label: 'Kas Yapmak', emoji: '💪', desc: 'Hipertrofi ve güç kazanımı için yüksek destek.' }
    ];

    const activities = [
        { id: 'low', label: 'Düşük', sub: 'Hareketsiz yaşam', emoji: '🛋️' },
        { id: 'medium', label: 'Orta', sub: 'Haftada 2-4 gün spor', emoji: '🏃‍♂️' },
        { id: 'high', label: 'Yüksek', sub: 'Haftada 5+ gün spor', emoji: '🏋️‍♂️' }
    ];

    const calculateProtein = () => {
        let multiplier = 1.6;
        let minMult = 1.4;
        let maxMult = 1.8;

        if (goal === 'lose') {
            multiplier = 2.2;
            minMult = 2.0;
            maxMult = 2.4;
        } else if (goal === 'build') {
            multiplier = 2.5;
            minMult = 2.2;
            maxMult = 2.8;
        }

        // Activity adjustment
        const activityMult = activity === 'high' ? 1.1 : activity === 'low' ? 0.9 : 1.0;

        const daily = Math.round(weight * multiplier * activityMult);
        const min = Math.round(weight * minMult * activityMult);
        const max = Math.round(weight * maxMult * activityMult);
        const perMeal = Math.round(daily / 4);

        setResult({ daily, min, max, perMeal });
        setShowResults(true);

        // Smooth scroll to results
        setTimeout(() => {
            document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-bold border border-orange-100 mb-2">
                    <Zap size={16} />
                    PRO ÖZELLİK
                </div>
                <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Günlük Protein Gereksinimi</h1>
                <p className="font-medium max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Vücut yapınıza ve hedeflerinize en uygun protein miktarını saniyeler içinde belirleyin.</p>

            </div>

            <div className="grid gap-10">
                {/* Weight Slider Section */}
                <section className="p-8 rounded-[32px] border shadow-xl space-y-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                            <Weight size={20} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Mevcut Kilonuz</h2>

                    </div>

                    <div className="relative pt-10 pb-6">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-2 rounded-2xl font-black text-2xl shadow-lg shadow-primary-200 z-10 scale-110">
                            {weight} <span className="text-sm font-bold opacity-80 uppercase">kg</span>
                        </div>
                        <input
                            type="range"
                            min="40"
                            max="150"
                            value={weight}
                            onChange={(e) => setWeight(parseInt(e.target.value))}
                            className="modern-slider text-primary-600 transition-all active:scale-[1.01]"
                        />
                        <div className="flex justify-between mt-4 text-xs font-bold uppercase tracking-widest px-2" style={{ color: 'var(--text-secondary)' }}>
                            <span>40 KG</span>
                            <span>150 KG</span>
                        </div>

                    </div>
                </section>

                {/* Goals Selection */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
                            <Target size={20} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Hedefiniz Nedir?</h2>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {goals.map((g) => (
                            <button
                                key={g.id}
                                onClick={() => setGoal(g.id)}
                                className={cn(
                                    "p-6 rounded-[24px] border-2 text-left transition-all duration-300 group relative overflow-hidden",
                                    goal === g.id
                                        ? "border-primary-600 bg-primary-50/30 ring-4 ring-primary-50 shadow-lg"
                                        : "hover:shadow-md"
                                )}
                                style={{
                                    backgroundColor: goal === g.id ? 'rgba(var(--sidebar-active-rgba))' : 'var(--bg-card)',
                                    borderColor: goal === g.id ? 'var(--primary-500)' : 'var(--border-color)'
                                }}

                            >
                                <div className="text-3xl mb-3">{g.emoji}</div>
                                <h3 className={cn("font-bold text-lg mb-1")} style={{ color: goal === g.id ? 'var(--primary-600)' : 'var(--text-primary)' }}>
                                    {g.label}
                                </h3>
                                <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{g.desc}</p>

                                {goal === g.id && (
                                    <CheckCircle2 size={24} className="absolute top-4 right-4 text-primary-600 animate-in zoom-in" />
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Activity Selection */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                            <Activity size={20} />
                        </div>
                        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Aktivite Seviyeniz</h2>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activities.map((a) => (
                            <button
                                key={a.id}
                                onClick={() => setActivity(a.id)}
                                className={cn(
                                    "flex items-center gap-4 p-5 rounded-[20px] border-2 transition-all duration-300",
                                    activity === a.id
                                        ? "border-blue-600 shadow-md"
                                        : "hover:border-blue-200"
                                )}
                                style={{
                                    backgroundColor: activity === a.id ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-card)',
                                    borderColor: activity === a.id ? '#3b82f6' : 'var(--border-color)'
                                }}

                            >
                                <div className="text-2xl">{a.emoji}</div>
                                <div>
                                    <h3 className="font-bold text-sm block" style={{ color: 'var(--text-primary)' }}>{a.label}</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-tight" style={{ color: 'var(--text-secondary)' }}>{a.sub}</p>
                                </div>

                            </button>
                        ))}
                    </div>
                </section>

                <button
                    onClick={calculateProtein}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3 group shadow-xl shadow-violet-500/20"
                >

                    Protein İhtiyacını Hesapla
                    <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>

                {/* Results Section */}
                {showResults && result && (
                    <div id="results-section" className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 md:p-12 text-white shadow-3xl shadow-primary-200/20 animate-in zoom-in-95 duration-700">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="space-y-6 flex-1 text-center md:text-left">
                                <div className="inline-block px-4 py-1.5 bg-primary-600 rounded-full text-xs font-black tracking-widest uppercase">
                                    Hesaplama Sonucu
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black leading-tight">
                                    Günlük <span className="text-primary-400">{result.daily}g</span> <br />
                                    Protein Almalısın.
                                </h3>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Önerilen Aralık</p>
                                        <p className="text-lg font-black">{result.min}g - {result.max}g</p>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Öğün Başı (4 Öğün)</p>
                                        <p className="text-lg font-black">{result.perMeal}g</p>
                                    </div>
                                </div>
                            </div>

                            <div className="w-56 h-56 relative flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary-600/20 rounded-full animate-ping" />
                                <div className="absolute inset-4 bg-primary-600/30 rounded-full animate-pulse" />
                                <div className="relative z-10 w-40 h-40 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full shadow-2xl shadow-primary-500/50 flex flex-col items-center justify-center border-4 border-white/20">
                                    <Zap size={40} className="mb-1" />
                                    <span className="text-3xl font-black">{result.daily}</span>
                                    <span className="text-xs font-bold opacity-80 uppercase tracking-widest">Gram</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                                    <Info size={24} />
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Hesaplanırken <span className="font-bold text-white">Yüksek Proteinli Diyet</span> parametreleri baz alınmıştır. Bu miktar kas onarımı için optimaldir.
                                </p>
                            </div>
                            <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
                                    <CheckCircle2 size={24} />
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">
                                    Protein kaynağını hayvansal ve bitkisel olarak dengelemeniz, mikrobesin alımınızı artıracaktır.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProteinCalculator;
