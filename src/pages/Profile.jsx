import React, { useState, useEffect } from 'react';
import { User, Ruler, Weight, Activity, Save, Mail, Calendar, XCircle } from 'lucide-react';

const Profile = ({ userData, stats, onUpdate, onUpdateStats }) => {
    // Merge global stats into form state for steps context
    const initialFormState = {
        ...userData,
        currentSteps: stats?.steps?.current || 0,
        stepGoal: stats?.steps?.goal || 10000
    };
    const [formData, setFormData] = useState(initialFormState);
    const [isChanged, setIsChanged] = useState(false);

    // Sync with prop if it changes externally
    useEffect(() => {
        setFormData({
            ...userData,
            currentSteps: stats?.steps?.current || 0,
            stepGoal: stats?.steps?.goal || 10000
        });
    }, [userData, stats]);

    // Check for changes
    useEffect(() => {
        const isDifferent = JSON.stringify(formData) !== JSON.stringify({
            ...userData,
            currentSteps: stats?.steps?.current || 0,
            stepGoal: stats?.steps?.goal || 10000
        });
        setIsChanged(isDifferent);
    }, [formData, userData, stats]);

    const [bmi, setBmi] = useState(0);
    const [bmiCategory, setBmiCategory] = useState('');

    // Calculate BMI
    useEffect(() => {
        if (formData.height && formData.weight) {
            const heightInMeters = formData.height / 100;
            const bmiValue = formData.weight / (heightInMeters * heightInMeters);
            setBmi(bmiValue.toFixed(1));

            if (bmiValue < 18.5) setBmiCategory('Zayıf');
            else if (bmiValue < 24.9) setBmiCategory('Normal');
            else if (bmiValue < 29.9) setBmiCategory('Fazla Kilolu');
            else setBmiCategory('Obez');
        }
    }, [formData.height, formData.weight]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleSave = () => {
        // Update user data (name, weight, etc.)
        const { currentSteps, stepGoal, ...userFields } = formData;
        onUpdate(userFields);

        // Update global stats (steps)
        if (onUpdateStats) {
            onUpdateStats({
                steps: {
                    ...stats.steps,
                    current: currentSteps,
                    goal: stepGoal
                }
            });
        }

        setIsChanged(false);
    };

    const handleCancel = () => {
        setFormData(userData);
        setIsChanged(false);
    };

    const calculateBmiColor = (category) => {
        switch (category) {
            case 'Zayıf': return 'text-blue-500 bg-blue-50';
            case 'Normal': return 'text-green-500 bg-green-50';
            case 'Fazla Kilolu': return 'text-orange-500 bg-orange-50';
            case 'Obez': return 'text-red-500 bg-red-50';
            default: return 'text-gray-500 bg-gray-50';
        }
    };

    return (
        <div className="pb-10 animate-in fade-in duration-500">
            <h2 className="text-3xl font-black mb-10 tracking-tight" style={{ color: 'var(--text-primary)' }}>Profil Ayarları</h2>


            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                {/* BMI Card */}
                {/* BMI Card */}
                <div className="p-8 rounded-[32px] shadow-xl border flex items-center gap-6 hover:shadow-2xl transition-all duration-500 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

                    <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border ${calculateBmiColor(bmiCategory).split(' ').map(c => c.includes('bg-') ? '' : c).join(' ')}`} style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>

                        <Activity size={32} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>BMI Endeksi</div>
                        <div className="flex items-center gap-2">
                            <span className="text-3xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>{bmi}</span>

                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${calculateBmiColor(bmiCategory)}`}>
                                {bmiCategory}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Current Weight Card */}
                {/* Current Weight Card */}
                <div className="p-8 rounded-[32px] shadow-xl border flex items-center gap-6 hover:shadow-2xl transition-all duration-500 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

                    <div className="w-16 h-16 rounded-[24px] bg-green-50/50 text-green-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-green-100">
                        <Weight size={32} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Mevcut Kilo</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>{formData.weight}</span>
                            <span className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>kg</span>
                        </div>

                    </div>
                </div>

                {/* Target Weight Card */}
                {/* Target Weight Card */}
                <div className="p-8 rounded-[32px] shadow-xl border flex items-center gap-6 hover:shadow-2xl transition-all duration-500 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

                    <div className="w-16 h-16 rounded-[24px] bg-blue-50/50 text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 border border-blue-100">
                        <Activity size={32} />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Hedef Kilo</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>{formData.targetWeight}</span>
                            <span className="text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>kg</span>
                        </div>

                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="rounded-[32px] shadow-xl border overflow-hidden" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                <div className="p-8 border-b flex justify-between items-center" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                    <h3 className="font-black text-lg flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                        <div className="p-2 rounded-xl shadow-sm border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>

                            <User size={20} className="text-violet-600" />
                        </div>
                        Kişisel Bilgiler
                    </h3>
                    {isChanged && (
                        <div className="flex items-center gap-2 text-[10px] font-black text-orange-600 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 animate-pulse uppercase tracking-widest">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                            Değişiklikler var
                        </div>
                    )}
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Ad Soyad */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Ad Soyad</label>

                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                    {/* E-posta */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>E-posta Adresi</label>

                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email || ''}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>


                    {/* Boy */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Boy (cm)</label>

                        <div className="relative">
                            <Ruler size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                    {/* Kilo */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Kilo (kg)</label>

                        <div className="relative">
                            <Weight size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                step="0.1"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                    {/* Yaş */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Yaş</label>

                        <div className="relative">
                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                    {/* Hedef Kalori */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Günlük Hedef Kalori</label>

                        <div className="relative">
                            <Activity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="dailyGoal"
                                value={formData.dailyGoal}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                    {/* Hedef Kilo */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Hedef Kilo (kg)</label>

                        <div className="relative">
                            <Weight size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="targetWeight"
                                value={formData.targetWeight}
                                onChange={handleChange}
                                step="0.1"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                    {/* Günlük Su Hedefi */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Günlük Su Hedefi (ml)</label>

                        <div className="relative">
                            <Activity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                            <input
                                type="number"
                                name="waterGoal"
                                value={formData.waterGoal}
                                onChange={handleChange}
                                step="100"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'rgba(59, 130, 246, 0.3)' }}
                            />

                        </div>
                    </div>

                    {/* Mevcut Adım */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Mevcut Adım 🔥</label>

                        <div className="relative">
                            <Activity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400" />
                            <input
                                type="number"
                                name="currentSteps"
                                value={formData.currentSteps}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all font-bold"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'rgba(249, 115, 22, 0.3)' }}
                            />

                        </div>
                    </div>

                    {/* Günlük Adım Hedefi */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest ml-1" style={{ color: 'var(--text-secondary)' }}>Günlük Adım Hedefi 🏃‍♂️</label>

                        <div className="relative group/input">
                            <Activity size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-green-500 transition-colors" />
                            <input
                                type="number"
                                name="stepGoal"
                                value={formData.stepGoal}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-4 rounded-[20px] border outline-none transition-all font-black"
                                style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                            />

                        </div>
                    </div>

                </div>

                <div className="p-8 border-t flex justify-end gap-4" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>

                    {isChanged && (
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all border active:scale-90 text-sm uppercase tracking-widest shadow-sm"
                            style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }}
                        >

                            <XCircle size={18} />
                            İptal
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-10 py-4 rounded-2xl font-black transition-all shadow-xl shadow-violet-500/20 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-sm uppercase tracking-widest"
                        disabled={!isChanged}
                    >

                        <Save size={18} />
                        Değişiklikleri Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
