import React from 'react';
import { Mail, Lock, ArrowRight, Activity } from 'lucide-react';

const LoginPage = ({ onLogin, onNavigateToRegister }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-inter">
            {/* Visual Side */}
            <div className="hidden lg:flex lg:w-1/2 bg-violet-600 relative overflow-hidden items-center justify-center p-12 text-white">
                <div className="relative z-10 max-w-lg">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 shadow-inner border border-white/10">
                        <Activity size={32} className="text-white" />
                    </div>
                    <h2 className="text-5xl font-black mb-6 leading-tight">Yolculuğuna <br /> Kaldığın Yerden Devam Et.</h2>
                    <p className="text-violet-100 text-lg leading-relaxed">
                        Hedeflerine ulaşmak için attığın her adım değerli. Bugünün başarısı, yarının motivasyonu olsun.
                    </p>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Giriş Yap</h2>
                        <p className="mt-2 text-gray-500">Hesabın yok mu? <button onClick={onNavigateToRegister} className="text-violet-600 font-bold hover:underline">Şimdi Kayıt Ol</button></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta Adresi</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-medium"
                                    placeholder="ornek@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-semibold text-gray-700">Şifre</label>
                                <a href="#" className="text-sm font-semibold text-violet-600 hover:text-violet-500">Şifremi Unuttum?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded" />
                            <label className="ml-2 block text-sm text-gray-600 font-medium">Beni hatırla</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-gray-200"
                        >
                            Giriş Yap
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500 font-medium">veya</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                            <img src="https://www.svgrepo.com/show/475647/apple-color.svg" alt="Apple" className="w-5 h-5" />
                            Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
