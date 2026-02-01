import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Activity, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const LoginPage = ({ onLogin, onNavigateToRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            onLogin();
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#020617] font-inter">

            {/* Dynamic Mesh Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            </div>

            <div className="w-full max-w-[1100px] grid lg:grid-cols-2 bg-white/[0.02] backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl relative z-10 overflow-hidden">

                {/* Left Side: Visual/Branding */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-violet-600/20 to-transparent border-r border-white/5">
                    <div>
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 bg-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                                <Activity className="text-white" size={24} />
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter italic">WahDeeFit</span>
                        </div>

                        <h1 className="text-6xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                            Hedeflerine <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Geri Dön.</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                            Kaldığın yerden devam etmek ve gelişimini takip etmek için hesabına giriş yap.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400">
                                <ShieldCheck size={20} />
                            </div>
                            <p className="text-sm text-slate-300 font-medium">Verileriniz uçtan uca şifrelenir.</p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Log-in Form */}
                <div className="p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md w-full mx-auto">
                        <div className="text-center lg:text-left mb-10">
                            <h2 className="text-3xl font-bold text-white mb-2">Hoş Geldiniz</h2>
                            <p className="text-slate-400 font-medium">
                                Hesabın yok mu? {' '}
                                <button
                                    onClick={onNavigateToRegister}
                                    className="text-violet-400 hover:text-violet-300 font-bold transition-colors"
                                >
                                    Hemen Kayıt Ol
                                </button>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-400 ml-1">E-posta</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium placeholder:text-slate-600"
                                        placeholder="ornek@mail.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-bold text-slate-400">Şifre</label>
                                    <button type="button" className="text-xs font-bold text-violet-400 hover:text-violet-300">Unuttum?</button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-violet-400 transition-colors" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white outline-none focus:border-violet-500/50 focus:ring-4 focus:ring-violet-500/10 transition-all font-medium placeholder:text-slate-600"
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

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black text-lg py-4 rounded-2xl transition-all shadow-xl shadow-violet-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-wait"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Giriş Yap
                                            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8">
                            <div className="relative flex items-center justify-center mb-8">
                                <div className="w-full border-t border-white/10"></div>
                                <span className="absolute px-4 bg-[#0a0f1e] text-slate-500 text-sm font-bold">veya şununla devam et</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl transition-all">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl transition-all">
                                    <Activity className="w-5 h-5 text-violet-400" />
                                    Apple
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
