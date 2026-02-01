import React, { useState, useEffect } from 'react';
import { User, Users, Activity, Target, Zap, ChevronRight, Info, Calculator as CalculatorIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const ActivityCard = ({ id, label, description, icon: Icon, isActive, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={cn(
            "relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 group",
            isActive
                ? "border-violet-500 shadow-md"
                : "border-transparent hover:bg-violet-500/10"
        )}
        style={{
            backgroundColor: isActive ? 'rgba(var(--sidebar-active-rgba))' : 'var(--bg-card)',
            borderColor: isActive ? 'var(--primary-500)' : 'var(--border-color)'
        }}
    >
        <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors",
            isActive ? "bg-violet-500 text-white" : "bg-white/5 text-gray-400 group-hover:bg-violet-500/20 group-hover:text-violet-500"
        )}>
            <Icon size={24} />
        </div>
        <span className={cn("text-xs font-bold mb-1", isActive ? "text-violet-500" : "text-gray-400")} style={{ color: isActive ? '' : 'var(--text-secondary)' }}>{label}</span>
        <span className="text-[10px] text-center leading-tight" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>{description}</span>
    </button>
);

const RangeSlider = ({ label, value, min, max, unit, onChange, color = "violet" }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{label}</span>
            <div className="flex items-center gap-1">
                <span className={cn("text-lg font-black", `text-${color}-500`)}>{value}</span>
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{unit}</span>
            </div>
        </div>
        <div className="relative pt-2">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className={cn("modern-slider", `text-${color}-600`)}
            />
        </div>
    </div>
);

const Calculator = ({ userData }) => {
    const [gender, setGender] = useState(userData?.gender || 'male');
    const [age, setAge] = useState(userData?.age || 25);
    const [weight, setWeight] = useState(userData?.weight || 70);
    const [height, setHeight] = useState(userData?.height || 175);
    const [activity, setActivity] = useState('moderate');
    const [goal, setGoal] = useState('maintain');
    const [results, setResults] = useState(null);

    const activityLevels = [
        { id: 'sedentary', label: 'Hareketsiz', description: 'Masa başı iş, az egzersiz', icon: User, multiplier: 1.2 },
        { id: 'light', label: 'Az Aktif', description: 'Haftada 1-3 gün egzersiz', icon: Activity, multiplier: 1.375 },
        { id: 'moderate', label: 'Orta Aktif', description: 'Haftada 3-5 gün egzersiz', icon: Zap, multiplier: 1.55 },
        { id: 'very', label: 'Çok Aktif', description: 'Haftada 6-7 gün egzersiz', icon: Target, multiplier: 1.725 },
        { id: 'extra', label: 'Ekstra Aktif', description: 'Günde 2 kez spor, ağır iş', icon: Users, multiplier: 1.9 },
    ];

    const goals = [
        { id: 'fast_loss', label: 'Hızlı Kilo Ver', description: '-1kg / Hafta', offset: -1000 },
        { id: 'loss', label: 'Kilo Ver', description: '-0.5kg / Hafta', offset: -500 },
        { id: 'maintain', label: 'Kilonu Koru', description: 'Aynı kal', offset: 0 },
        { id: 'gain', label: 'Kilo Al', description: '+0.5kg / Hafta', offset: 500 },
    ];

    const handleCalculate = () => {
        // BMR (Mifflin-St Jeor)
        let bmr = (10 * weight) + (6.25 * height) - (5 * age);
        bmr = gender === 'male' ? bmr + 5 : bmr - 161;

        // TDEE
        const activityLevel = activityLevels.find(a => a.id === activity);
        const tdee = bmr * activityLevel.multiplier;

        // Target Calories
        const goalLevel = goals.find(g => g.id === goal);
        const targetCalories = Math.round(tdee + goalLevel.offset);

        // Macros (Protein: 30%, Carbs: 40%, Fat: 30%)
        const protein = Math.round((targetCalories * 0.3) / 4);
        const carbs = Math.round((targetCalories * 0.4) / 4);
        const fat = Math.round((targetCalories * 0.3) / 9);

        setResults({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            targetCalories,
            macros: { protein, carbs, fat }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 text-violet-500 rounded-full text-sm font-bold border border-violet-500/20 mb-2">
                    <CalculatorIcon size={16} />
                    AKILLI HESAPLAYICI
                </div>
                <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Kalori ve Makro Hesaplayıcı</h1>
                <p className="font-medium max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>Vücut yapınıza ve hedeflerinize en uygun kalori ve makrobesin dengesini saniyeler içinde belirleyin.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Input Section */}
                <div className="lg:col-span-7 space-y-10">
                    <section className="p-8 rounded-[32px] border shadow-xl space-y-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500">
                                <User size={20} />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Kişisel Bilgiler</h2>
                        </div>

                        <div className="space-y-10">
                            {/* Gender Selection */}
                            <div className="space-y-4">
                                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Cinsiyet</span>
                                <div className="flex p-1.5 bg-white/5 dark:bg-white/10 rounded-2xl w-full border" style={{ borderColor: 'var(--border-color)' }}>
                                    <button
                                        onClick={() => setGender('male')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                                            gender === 'male' ? "bg-white dark:bg-slate-700 text-violet-500 shadow-sm" : "text-gray-400 hover:text-gray-300"
                                        )}
                                    >
                                        Erkek
                                    </button>
                                    <button
                                        onClick={() => setGender('female')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                                            gender === 'female' ? "bg-white dark:bg-slate-700 text-pink-500 shadow-sm" : "text-gray-400 hover:text-gray-300"
                                        )}
                                    >
                                        Kadın
                                    </button>
                                </div>
                            </div>

                            {/* Physical Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                                <RangeSlider label="Yaş" value={age} min={15} max={80} unit="Yıl" onChange={setAge} />
                                <RangeSlider label="Boy" value={height} min={140} max={220} unit="cm" onChange={setHeight} color="indigo" />
                                <div className="md:col-span-2">
                                    <RangeSlider label="Kilo" value={weight} min={40} max={180} unit="kg" onChange={setWeight} color="blue" />
                                </div>
                            </div>

                            {/* Activity Level */}
                            <div className="space-y-4">
                                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Aktivite Seviyesi</span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {activityLevels.map(level => (
                                        <ActivityCard
                                            key={level.id}
                                            {...level}
                                            isActive={activity === level.id}
                                            onClick={setActivity}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Goal */}
                            <div className="space-y-4">
                                <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Hedefiniz</span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {goals.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => setGoal(g.id)}
                                            className={cn(
                                                "p-4 rounded-2xl border-2 transition-all text-left",
                                                goal === g.id
                                                    ? "border-emerald-500 bg-emerald-500/10 shadow-sm"
                                                    : "border-transparent bg-white/5 hover:bg-emerald-500/5 text-gray-400"
                                            )}
                                        >
                                            <div className={cn("text-xs font-bold", goal === g.id ? "text-emerald-500" : "text-gray-400")} style={{ color: goal === g.id ? '' : 'var(--text-primary)' }}>{g.label}</div>
                                            <div className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>{g.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-xl shadow-violet-500/10 flex items-center justify-center gap-3 group"
                            >
                                Hesapla
                                <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </section>
                </div>

                {/* Results Section */}
                <div className="lg:col-span-5">
                    {results ? (
                        <div className="space-y-6 animate-in zoom-in-95 duration-700">
                            <div className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 text-white shadow-3xl shadow-violet-200/20 relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="inline-block px-4 py-1.5 bg-violet-600 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                                        Günlük Hedef
                                    </div>
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <div className="text-6xl font-black text-violet-400">{results.targetCalories}</div>
                                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">kcal / gün</div>
                                        </div>
                                        <div className="w-24 h-24 relative flex items-center justify-center">
                                            <div className="absolute inset-0 bg-violet-600/20 rounded-full animate-ping" />
                                            <div className="absolute inset-2 bg-violet-600/30 rounded-full animate-pulse" />
                                            <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-violet-600 to-violet-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                                                <Zap size={24} className="text-white" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-4">
                                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">BMR</div>
                                            <div className="text-xl font-black">{results.bmr}</div>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                                            <div className="text-[10px] font-bold text-gray-400 uppercase mb-1">TDEE</div>
                                            <div className="text-xl font-black">{results.tdee}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 rounded-[32px] shadow-xl border space-y-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-violet-500/10 rounded-lg text-violet-500">
                                        <Activity size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Makro Besinler</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Protein</span>
                                                <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: 'var(--text-secondary)' }}>Kas Onarımı</p>
                                            </div>
                                            <span className="text-lg font-black text-blue-500">{results.macros.protein}g</span>
                                        </div>
                                        <div className="premium-progress">
                                            <div className="premium-progress-bar bg-blue-500" style={{ width: '30%' }}>
                                                <div className="premium-progress-shimmer" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Karbonhidrat</span>
                                                <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: 'var(--text-secondary)' }}>Enerji Kaynağı</p>
                                            </div>
                                            <span className="text-lg font-black text-emerald-500">{results.macros.carbs}g</span>
                                        </div>
                                        <div className="premium-progress">
                                            <div className="premium-progress-bar bg-emerald-500" style={{ width: '40%' }}>
                                                <div className="premium-progress-shimmer" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>Yağ</span>
                                                <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: 'var(--text-secondary)' }}>Hormon Dengesi</p>
                                            </div>
                                            <span className="text-lg font-black text-amber-500">{results.macros.fat}g</span>
                                        </div>
                                        <div className="premium-progress">
                                            <div className="premium-progress-bar bg-amber-500" style={{ width: '30%' }}>
                                                <div className="premium-progress-shimmer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                    <div className="flex items-start gap-4 p-4 rounded-2xl border" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))', borderColor: 'var(--border-color)' }}>
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shrink-0">
                                            <Info size={20} />
                                        </div>
                                        <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                                            Bu değerler genel yaklaşımlardır. <span className="font-bold" style={{ color: 'var(--text-primary)' }}>%30 Protein, %40 Karbonhidrat</span> ve <span className="font-bold" style={{ color: 'var(--text-primary)' }}>%30 Yağ</span> oranına göre hesaplanmıştır.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-[40px] p-12 border-4 border-dashed h-full flex flex-col items-center justify-center text-center space-y-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <div className="w-24 h-24 rounded-full flex items-center justify-center text-gray-300 shadow-inner" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}>
                                <CalculatorIcon size={48} className="opacity-20" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold" style={{ color: 'var(--text-secondary)' }}>Henüz Hesaplama Yapılmadı</h3>
                                <p className="text-sm max-w-[200px] mx-auto opacity-50" style={{ color: 'var(--text-secondary)' }}>Bilgilerinizi girip hesapla butonuna tıklayarak sonuçları görebilirsiniz.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
