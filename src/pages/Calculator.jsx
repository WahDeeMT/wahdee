import React, { useState, useEffect } from 'react';
import { User, Users, Activity, Target, Zap, ChevronRight, Info, Calculator as CalculatorIcon } from 'lucide-react';
import { cn } from '../lib/utils';

const ActivityCard = ({ id, label, description, icon: Icon, isActive, onClick }) => (
    <button
        onClick={() => onClick(id)}
        className={cn(
            "relative flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 group",
            isActive
                ? "border-violet-600 bg-violet-50/50 shadow-md shadow-violet-100"
                : "border-gray-100 bg-white hover:border-violet-200 hover:bg-violet-50/30"
        )}
    >
        <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors",
            isActive ? "bg-violet-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-violet-100 group-hover:text-violet-600"
        )}>
            <Icon size={24} />
        </div>
        <span className={cn("text-xs font-bold mb-1", isActive ? "text-violet-700" : "text-gray-600")}>{label}</span>
        <span className="text-[10px] text-gray-400 text-center leading-tight">{description}</span>
    </button>
);

const RangeSlider = ({ label, value, min, max, unit, onChange, color = "violet" }) => (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-600">{label}</span>
            <div className="flex items-center gap-1">
                <span className={cn("text-lg font-black", `text-${color}-600`)}>{value}</span>
                <span className="text-xs font-medium text-gray-400">{unit}</span>
            </div>
        </div>
        <div className="relative h-6 flex items-center">
            <div className="absolute w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={cn("h-full transition-all duration-300", `bg-${color}-600`)}
                    style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                />
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
            />
            <div
                className={cn("absolute w-4 h-4 rounded-full border-2 border-white shadow-md transition-all duration-75 pointer-events-none", `bg-${color}-600`)}
                style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 8px)` }}
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
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Input Section */}
                <div className="flex-1 space-y-8">
                    <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                        <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-200">
                                <CalculatorIcon size={24} />
                            </div>
                            Hesaplayıcı
                        </h2>

                        <div className="space-y-10">
                            {/* Gender Selection */}
                            <div className="space-y-4">
                                <span className="text-sm font-semibold text-gray-600">Cinsiyet</span>
                                <div className="flex p-1.5 bg-gray-100 rounded-2xl w-full">
                                    <button
                                        onClick={() => setGender('male')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                                            gender === 'male' ? "bg-white text-violet-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        Erkek
                                    </button>
                                    <button
                                        onClick={() => setGender('female')}
                                        className={cn(
                                            "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300",
                                            gender === 'female' ? "bg-white text-pink-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                        )}
                                    >
                                        Kız
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
                                <span className="text-sm font-semibold text-gray-600">Aktivite Seviyesi</span>
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
                                <span className="text-sm font-semibold text-gray-600">Hedefiniz</span>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {goals.map(g => (
                                        <button
                                            key={g.id}
                                            onClick={() => setGoal(g.id)}
                                            className={cn(
                                                "p-4 rounded-2xl border-2 transition-all text-left",
                                                goal === g.id
                                                    ? "border-emerald-500 bg-emerald-50/50"
                                                    : "border-gray-100 bg-white hover:border-emerald-200"
                                            )}
                                        >
                                            <div className={cn("text-xs font-bold", goal === g.id ? "text-emerald-700" : "text-gray-700")}>{g.label}</div>
                                            <div className="text-[10px] text-gray-400 mt-1">{g.description}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleCalculate}
                                className="w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-violet-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                            >
                                Hesapla
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <div className="w-full md:w-80 space-y-6">
                    {results ? (
                        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-6">
                            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-violet-200">
                                <span className="text-violet-200 text-xs font-bold uppercase tracking-widest">Günlük Hedef</span>
                                <div className="text-5xl font-black mt-2 mb-1">{results.targetCalories}</div>
                                <span className="text-violet-200 text-sm font-medium">kcal / gün</span>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                                        <div className="text-[10px] font-bold text-violet-200 uppercase">BMR</div>
                                        <div className="text-lg font-black">{results.bmr}</div>
                                    </div>
                                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
                                        <div className="text-[10px] font-bold text-violet-200 uppercase">TDEE</div>
                                        <div className="text-lg font-black">{results.tdee}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 space-y-6">
                                <h3 className="text-lg font-bold text-gray-800">Makro Besinler</h3>

                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-blue-600">Protein</span>
                                            <span className="text-gray-500">{results.macros.protein}g</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[30%]" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-emerald-600">Karbonhidrat</span>
                                            <span className="text-gray-500">{results.macros.carbs}g</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500 w-[40%]" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span className="text-amber-600">Yağ</span>
                                            <span className="text-gray-500">{results.macros.fat}g</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-500 w-[30%]" />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                                        <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-gray-400 leading-relaxed">
                                            Bu değerler genel yaklaşımlardır. %30 Protein, %40 Karbonhidrat ve %30 Yağ oranına göre hesaplanmıştır.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-3xl p-8 border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-300">
                                <CalculatorIcon size={32} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400">Henüz Hesaplama Yapılmadı</h3>
                                <p className="text-xs text-gray-300 mt-1">Bilgilerinizi girip hesapla butonuna tıklayın.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
