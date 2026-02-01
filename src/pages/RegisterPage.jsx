import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Activity, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const RegisterPage = ({ onRegister, onNavigateToLogin }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onRegister();
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#020617] font-inter">

            {/* Dynamic Mesh Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            </div>

            <div className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-white/[0.02] backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl relative z-10 overflow-hidden">

                {/* Visual Side (Hidden on mobile) */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600/20 to-transparent border-r border-white/5 order-2 lg:order-1">
                    <div>
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <Activity className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter italic">WahDeeFit</span>
                        </div>

                        <h1 className="text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                            Yepyeni Bir <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Sen Başlasın.</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                            Potansiyelini keşfetmek ve yaşam kaliteni artırmak için ilk adımı bugün at.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex -space-x-3 mb-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020617] bg-slate-800 overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-[#020617] bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                                +2k
                            </div>
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Binlerce kişiyle birlikte geliş.</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 lg:p-16 flex flex-col justify-center order-1 lg:order-2">
                    <div className="max-w-md w-full mx-auto">
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl font-bold text-white mb-2">Aramıza Katıl</h2>
                            <p className="text-slate-400 font-medium">
                                Zaten hesabın var mı? {' '}
                                <button
                                    onClick={onNavigateToLogin}
                                    className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors"
                                >
                                    Giriş Yap
                                </button>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 ml-1">Ad Soyad</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-600"
                                        placeholder="Adın Soyadın"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 ml-1">E-posta</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-600"
                                        placeholder="ornek@mail.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 ml-1">Şifre</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-600"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 py-2 px-1">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 w-4 h-4 rounded bg-white/5 border-white/10 text-indigo-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                                />
                                <p className="text-xs text-slate-500 leading-normal">
                                    <button className="text-indigo-400 hover:underline">Kullanım Koşulları</button> ve <button className="text-indigo-400 hover:underline">Gizlilik Politikası</button>'nı okudum, kabul ediyorum.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black text-lg py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        Hesap Oluştur
                                        <ArrowRight size={22} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
