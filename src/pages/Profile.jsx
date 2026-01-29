import React, { useState, useEffect } from 'react';
import { User, Ruler, Weight, Activity, Save, Mail, Calendar, XCircle } from 'lucide-react';

const Profile = ({ userData, onUpdate }) => {
    const [formData, setFormData] = useState(userData);
    const [isChanged, setIsChanged] = useState(false);

    // Sync with prop if it changes externally
    useEffect(() => {
        setFormData(userData);
    }, [userData]);

    // Check for changes
    useEffect(() => {
        const isDifferent = JSON.stringify(formData) !== JSON.stringify(userData);
        setIsChanged(isDifferent);
    }, [formData, userData]);

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
        onUpdate(formData);
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
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Profil Ayarları</h2>

            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* BMI Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-lg hover:border-violet-200 transition-all">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${calculateBmiColor(bmiCategory)}`}>
                        <Activity size={28} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">BMI Endeksi</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-800">{bmi}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${calculateBmiColor(bmiCategory)}`}>
                                {bmiCategory}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Current Weight Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-lg hover:border-green-200 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                        <Weight size={28} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">Mevcut Kilo</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-800">{formData.weight}</span>
                            <span className="text-sm text-gray-400">kg</span>
                        </div>
                    </div>
                </div>

                {/* Target Weight Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-5 hover:shadow-lg hover:border-blue-200 transition-all">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Activity size={28} />
                    </div>
                    <div>
                        <div className="text-sm text-gray-500 font-medium mb-1">Hedef Kilo</div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-bold text-gray-800">{formData.targetWeight}</span>
                            <span className="text-sm text-gray-400">kg</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <User size={20} className="text-primary-600" />
                        Kişisel Bilgiler
                    </h3>
                    {isChanged && (
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-1 rounded-lg animate-pulse">
                            Değişiklikler var
                        </span>
                    )}
                </div>

                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Same Inputs as before, but ensure values come from formData state */}
                    {/* Ad Soyad */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Ad Soyad</label>
                        <div className="relative">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* E-posta */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">E-posta Adresi</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Boy */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Boy (cm)</label>
                        <div className="relative">
                            <Ruler size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Kilo */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Kilo (kg)</label>
                        <div className="relative">
                            <Weight size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                step="0.1"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Yaş */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Yaş</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Hedef Kalori */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Günlük Hedef Kalori</label>
                        <div className="relative">
                            <Activity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="dailyGoal"
                                value={formData.dailyGoal}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Hedef Kilo */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Hedef Kilo (kg)</label>
                        <div className="relative">
                            <Weight size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="number"
                                name="targetWeight"
                                value={formData.targetWeight}
                                onChange={handleChange}
                                step="0.1"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                    {/* Günlük Su Hedefi */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-600">Günlük Su Hedefi (ml)</label>
                        <div className="relative">
                            <Activity size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                            <input
                                type="number"
                                name="waterGoal"
                                value={formData.waterGoal}
                                onChange={handleChange}
                                step="100"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-gray-700 bg-gray-50/50 focus:bg-white"
                            />
                        </div>
                    </div>

                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                    {isChanged && (
                        <button
                            onClick={handleCancel}
                            className="flex items-center gap-2 bg-white hover:bg-red-50 text-gray-600 hover:text-red-500 px-6 py-3 rounded-xl font-bold transition-all border border-gray-200 hover:border-red-200 active:scale-95"
                        >
                            <XCircle size={18} />
                            İptal Et
                        </button>
                    )}
                    <button
                        onClick={handleSave}
                        className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md shadow-violet-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
                        disabled={!isChanged}
                    >
                        <Save size={18} />
                        Kaydet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
