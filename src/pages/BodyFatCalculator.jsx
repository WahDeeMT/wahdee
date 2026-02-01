import React, { useState, useEffect } from 'react';
import { Percent, ArrowRight, Info, CheckCircle2, Settings2, User, Users, Ruler, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

const BodyFatCalculator = () => {
    const [gender, setGender] = useState('male'); // 'male' or 'female'
    const [age, setAge] = useState(30);
    const [weight, setWeight] = useState(75);
    const [height, setHeight] = useState(175);
    const [waist, setWaist] = useState(85);
    const [neck, setNeck] = useState(38);
    const [hip, setHip] = useState(95); // Only for women
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const calculateBodyFat = () => {
        let bodyFat = 0;

        if (gender === 'male') {
            // Navy Method Male: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
            bodyFat = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
        } else {
            // Navy Method Female: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
            bodyFat = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
        }

        const bfValue = Math.max(2, Math.min(50, bodyFat)).toFixed(1);
        const fatMass = (weight * (bfValue / 100)).toFixed(1);
        const leanMass = (weight - fatMass).toFixed(1);

        // Determine Category
        let category = "Ortalama";
        let colorClass = "text-blue-600 bg-blue-50 border-blue-100";

        const bf = parseFloat(bfValue);
        if (gender === 'male') {
            if (bf < 6) { category = "Zorunlu Yağ"; colorClass = "text-red-600 bg-red-50 border-red-100"; }
            else if (bf < 14) { category = "Atletik / Fit"; colorClass = "text-green-600 bg-green-50 border-green-100"; }
            else if (bf < 18) { category = "İyi / Formda"; colorClass = "text-emerald-600 bg-emerald-50 border-emerald-100"; }
            else if (bf < 25) { category = "Ortalama"; colorClass = "text-blue-600 bg-blue-50 border-blue-100"; }
            else { category = "Yüksek / Obezite Riski"; colorClass = "text-orange-600 bg-orange-50 border-orange-100"; }
        } else {
            if (bf < 14) { category = "Zorunlu Yağ"; colorClass = "text-red-600 bg-red-50 border-red-100"; }
            else if (bf < 21) { category = "Atletik / Fit"; colorClass = "text-green-600 bg-green-50 border-green-100"; }
            else if (bf < 25) { category = "İyi / Formda"; colorClass = "text-emerald-600 bg-emerald-50 border-emerald-100"; }
            else if (bf < 32) { category = "Ortalama"; colorClass = "text-blue-600 bg-blue-50 border-blue-100"; }
            else { category = "Yüksek / Obezite Riski"; colorClass = "text-orange-600 bg-orange-50 border-orange-100"; }
        }

        setResults({
            percentage: bfValue,
            category,
            colorClass,
            fatMass,
            leanMass
        });
        setShowResults(true);
    };

    // Calculate whenever inputs change
    useEffect(() => {
        calculateBodyFat();
    }, [gender, age, weight, height, waist, neck, hip]);

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Area */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-600 rounded-full text-sm font-bold border border-cyan-100 mb-2">
                    <Activity size={16} />
                    NAVY METHOD – EN DOĞRU SONUÇ
                </div>
                <h1 className="text-4xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Vücut Yağ Yüzdesi Hesaplayıcı</h1>
                <p className="font-medium max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                    Vücut ölçümlerinize göre yağ yüzdenizi hesaplayın – BMI’dan daha doğru!
                </p>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* LEFT: User Input */}
                <div className="lg:col-span-7 space-y-10">
                    <section className="p-8 rounded-[32px] border shadow-xl space-y-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg text-cyan-600" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
                                <Settings2 size={20} />
                            </div>
                            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Ölçümlerinizi Girin</h2>
                        </div>


                        {/* Gender Toggle */}
                        <div className="flex p-1.5 rounded-2xl gap-2" style={{ backgroundColor: 'var(--bg-page)' }}>
                            <button
                                onClick={() => setGender('male')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all border border-transparent",
                                    gender === 'male' ? "bg-white text-cyan-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                )}
                                style={{
                                    backgroundColor: gender === 'male' ? 'var(--bg-card)' : 'transparent',
                                    borderColor: gender === 'male' ? 'var(--border-color)' : 'transparent'
                                }}
                            >
                                <User size={20} />
                                Erkek
                            </button>
                            <button
                                onClick={() => setGender('female')}
                                className={cn(
                                    "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all border border-transparent",
                                    gender === 'female' ? "bg-white text-pink-600 shadow-sm" : "text-gray-400 hover:text-gray-600"
                                )}
                                style={{
                                    backgroundColor: gender === 'female' ? 'var(--bg-card)' : 'transparent',
                                    borderColor: gender === 'female' ? 'var(--border-color)' : 'transparent'
                                }}
                            >
                                <Users size={20} />
                                Kadın
                            </button>
                        </div>


                        <div className="space-y-6">
                            {/* Age Slider */}
                            <div className="space-y-4 p-5 rounded-2xl border transition-all" style={{ backgroundColor: 'rgba(226, 232, 240, 0.05)', borderColor: 'var(--border-color)' }}>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Yaş</label>
                                    <input
                                        type="number" value={age}
                                        onChange={(e) => setAge(Math.min(80, Math.max(10, parseInt(e.target.value) || 10)))}
                                        className="w-16 h-8 text-center font-black rounded-lg border outline-none shadow-sm"
                                        style={{ backgroundColor: 'var(--bg-card)', color: '#06b6d4', borderColor: 'var(--border-color)' }}
                                    />
                                </div>
                                <input type="range" min="10" max="80" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="modern-slider text-cyan-600" />
                            </div>


                            {/* Weight Slider */}
                            <div className="space-y-4 p-5 rounded-2xl border transition-all" style={{ backgroundColor: 'rgba(226, 232, 240, 0.05)', borderColor: 'var(--border-color)' }}>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Kilo (kg)</label>
                                    <input
                                        type="number" value={weight}
                                        onChange={(e) => setWeight(Math.min(150, Math.max(30, parseInt(e.target.value) || 30)))}
                                        className="w-16 h-8 text-center font-black rounded-lg border outline-none shadow-sm"
                                        style={{ backgroundColor: 'var(--bg-card)', color: '#06b6d4', borderColor: 'var(--border-color)' }}
                                    />
                                </div>
                                <input type="range" min="30" max="150" value={weight} onChange={(e) => setWeight(parseInt(e.target.value))} className="modern-slider text-cyan-600" />
                            </div>


                            {/* Height Slider */}
                            <div className="space-y-4 p-5 rounded-2xl border transition-all" style={{ backgroundColor: 'rgba(226, 232, 240, 0.05)', borderColor: 'var(--border-color)' }}>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>Boy (cm)</label>
                                    <input
                                        type="number" value={height}
                                        onChange={(e) => setHeight(Math.min(210, Math.max(130, parseInt(e.target.value) || 130)))}
                                        className="w-16 h-8 text-center font-black rounded-lg border outline-none shadow-sm"
                                        style={{ backgroundColor: 'var(--bg-card)', color: '#06b6d4', borderColor: 'var(--border-color)' }}
                                    />
                                </div>
                                <input type="range" min="130" max="210" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} className="modern-slider text-cyan-600" />
                            </div>


                            {/* Waist Slider */}
                            <div className="space-y-4 p-5 rounded-2xl border transition-all shadow-inner" style={{ backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'var(--border-color)' }}>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold uppercase" style={{ color: '#0e7490' }}>Bel Çevresi (cm)</label>
                                    <input
                                        type="number" value={waist}
                                        onChange={(e) => setWaist(Math.min(150, Math.max(50, parseInt(e.target.value) || 50)))}
                                        className="w-16 h-8 text-center font-black rounded-lg border outline-none shadow-sm"
                                        style={{ backgroundColor: 'var(--bg-card)', color: '#06b6d4', borderColor: '#06b6d4' }}
                                    />
                                </div>
                                <input type="range" min="50" max="150" value={waist} onChange={(e) => setWaist(parseInt(e.target.value))} className="modern-slider text-cyan-600" />
                            </div>


                            {/* Neck Slider */}
                            <div className="space-y-4 p-5 rounded-2xl border transition-all shadow-inner" style={{ backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'var(--border-color)' }}>
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold uppercase" style={{ color: '#0e7490' }}>Boyun Çevresi (cm)</label>
                                    <input
                                        type="number" value={neck}
                                        onChange={(e) => setNeck(Math.min(60, Math.max(20, parseInt(e.target.value) || 20)))}
                                        className="w-16 h-8 text-center font-black rounded-lg border outline-none shadow-sm"
                                        style={{ backgroundColor: 'var(--bg-card)', color: '#06b6d4', borderColor: '#06b6d4' }}
                                    />
                                </div>
                                <input type="range" min="20" max="60" value={neck} onChange={(e) => setNeck(parseInt(e.target.value))} className="modern-slider text-cyan-600" />
                            </div>


                            {/* Hip Slider (Kadınlar için) */}
                            {gender === 'female' && (
                                <div className="space-y-4 p-5 rounded-2xl border transition-all shadow-inner animate-in zoom-in duration-300" style={{ backgroundColor: 'rgba(236, 72, 153, 0.05)', borderColor: 'rgba(236, 72, 153, 0.2)' }}>
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-bold uppercase" style={{ color: '#be185d' }}>Kalça Çevresi (cm)</label>
                                        <input
                                            type="number" value={hip}
                                            onChange={(e) => setHip(Math.min(150, Math.max(50, parseInt(e.target.value) || 50)))}
                                            className="w-16 h-8 text-center font-black rounded-lg border outline-none shadow-sm"
                                            style={{ backgroundColor: 'var(--bg-card)', color: '#ec4899', borderColor: '#ec4899' }}
                                        />
                                    </div>
                                    <input type="range" min="50" max="150" value={hip} onChange={(e) => setHip(parseInt(e.target.value))} className="modern-slider text-pink-600" />
                                </div>
                            )}

                        </div>

                        <button
                            onClick={calculateBodyFat}
                            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white py-5 rounded-2xl font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3 group mt-10 shadow-xl shadow-cyan-500/20"
                        >
                            Yağ Yüzdesini Hesapla
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>

                    </section>
                </div>

                {/* RIGHT: Results */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Main Result Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-black rounded-[40px] p-8 text-white shadow-3xl shadow-cyan-200/20 relative overflow-hidden animate-in zoom-in-95 duration-700">
                        <div className="relative z-10">
                            <div className="inline-block px-4 py-1.5 bg-cyan-600 rounded-full text-xs font-black tracking-widest uppercase mb-6">
                                Hesaplama Sonucu
                            </div>

                            <div className="flex items-center justify-between gap-6 mb-10">
                                <div className="space-y-2">
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Yağ Yüzdeniz</p>
                                    <div className="text-6xl font-black text-cyan-400 animate-in fade-in zoom-in duration-500" key={results?.percentage}>
                                        %{results?.percentage}
                                    </div>
                                    <div className={cn(
                                        "inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tight border mt-2",
                                        results?.colorClass
                                    )}>
                                        {results?.category}
                                    </div>
                                </div>

                                <div className="w-28 h-28 relative flex items-center justify-center shrink-0">
                                    <div className="absolute inset-0 bg-cyan-600/20 rounded-full animate-ping" />
                                    <div className="absolute inset-4 bg-cyan-600/30 rounded-full animate-pulse" />
                                    <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-cyan-600 to-cyan-400 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center border-2 border-white/20">
                                        <Percent size={32} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Yağ Kütlesi</p>
                                    <p className="text-2xl font-black text-white">{results?.fatMass} <span className="text-sm opacity-50">kg</span></p>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-center space-y-1">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">Yağsız Kütle</p>
                                    <p className="text-2xl font-black text-white">{results?.leanMass} <span className="text-sm opacity-50">kg</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Measure Card */}
                    <div className="rounded-[32px] p-8 border shadow-xl space-y-6" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg text-cyan-600" style={{ backgroundColor: 'rgba(6, 182, 212, 0.1)' }}>
                                <Ruler size={20} />
                            </div>
                            <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Nasıl Ölçülür?</h3>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-4 p-3 rounded-2xl transition-colors hover:bg-cyan-500/10">
                                <span className="w-6 h-6 bg-cyan-600 text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">1</span>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--text-primary)' }} className="font-bold">Bel:</span> Göbeğin hemen üzerinden, en dar olduğu noktadan ölçün.</p>
                            </li>

                            <li className="flex gap-4 p-3 rounded-2xl transition-colors hover:bg-cyan-500/10">
                                <span className="w-6 h-6 bg-cyan-600 text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">2</span>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}><span style={{ color: 'var(--text-primary)' }} className="font-bold">Boyun:</span> Gırtlağın hemen altından, mezurayı eğmeden ölçün.</p>
                            </li>

                            {gender === 'female' && (
                                <li className="flex gap-4 p-3 rounded-2xl bg-pink-50/50 border border-pink-100 animate-in fade-in duration-300">
                                    <span className="w-6 h-6 bg-pink-600 text-white rounded-lg flex items-center justify-center text-xs font-black shrink-0">3</span>
                                    <p className="text-sm text-pink-700 font-medium"><span className="font-bold">Kalça:</span> Kalçanızın en geniş noktasından yatay olarak ölçün.</p>
                                </li>
                            )}
                        </ul>
                        <div className="flex items-center gap-3 p-4 rounded-2xl border mt-2" style={{ backgroundColor: 'rgba(6, 182, 212, 0.05)', borderColor: 'rgba(6, 182, 212, 0.1)' }}>
                            <Info size={18} className="text-cyan-600 shrink-0" />
                            <p className="text-[10px] font-bold uppercase italic" style={{ color: '#0891b2' }}>Ölçümleri sabah aç karnına yapın.</p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Info Section */}
            <div className="p-10 rounded-[32px] border shadow-xl space-y-8" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Vücut Yağ Yüzdesi Nedir ve Neden Önemlidir?</h3>
                    <div className="h-1.5 w-20 bg-cyan-500 rounded-full" />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4 leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                        <p>
                            Vücut yağ yüzdesi, vücudunuzdaki toplam yağ miktarının toplam ağırlığınıza oranıdır. Sadece kilo ölçümünden farklı olarak, bu değer vücut kompozisyonunuz hakkında gerçekçi bilgi verir.
                        </p>
                        <p>
                            <span className="font-bold" style={{ color: 'var(--text-primary)' }}>BMI ile Farkı:</span> Vücut Kitle Endeksi (BMI) sadece boy ve kilo kullanır. Yoğun kas kütlesine sahip sporcuları "kilolu" gösterebilir. Yağ yüzdesi ise gerçek kütle dağılımını ölçer.
                        </p>
                    </div>
                    <div className="space-y-4 leading-relaxed font-medium" style={{ color: 'var(--text-secondary)' }}>
                        <p>
                            Sağlıklı aralıklar erkeklerde genellikle <span className="text-cyan-600 font-bold">%10-20</span>, kadınlarda ise <span className="text-pink-500 font-bold">%20-30</span> arasındadır.
                        </p>
                        <p>
                            Yüksek yağ oranı, sadece estetik bir konu değil; diyabet, kalp hastalıkları ve hormonal düzensizlikler için ciddi bir risk faktörüdür. Bu oranı takip ederek kalp-damar sağlığınızı kontrol altında tutabilirsiniz.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BodyFatCalculator;
