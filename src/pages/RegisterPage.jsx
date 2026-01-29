import React from 'react';
import { Mail, Lock, User, ArrowRight, Activity } from 'lucide-react';

const RegisterPage = ({ onRegister, onNavigateToLogin }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister();
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-inter">
            {/* Visual Side (Left on desktop) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center p-12 text-white">
                <div className="relative z-10 max-w-lg">
                    <div className="w-16 h-16 bg-gradient-to-tr from-violet-600 to-purple-500 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-violet-900/50">
                        <Activity size={32} className="text-white" />
                    </div>
                    <h2 className="text-5xl font-black mb-6 leading-tight">Yepyeni Bir Sen <br /> İçin İlk Adım.</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        WahDeeFit ile potansiyelini keşfet. Binlerce kullanıcı gibi sen de değişimine bugün başla.
                    </p>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-blob animation-delay-4000"></div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Aramıza Katıl</h2>
                        <p className="mt-2 text-gray-500">Zaten hesabın var mı? <button onClick={onNavigateToLogin} className="text-violet-600 font-bold hover:underline">Giriş Yap</button></p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Ad Soyad</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-medium"
                                    placeholder="Adın Soyadın"
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Şifre</label>
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

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-4 rounded-xl font-bold text-lg transition-all active:scale-95 shadow-xl shadow-violet-200"
                        >
                            Hesap Oluştur
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    <p className="text-center text-xs text-gray-400 font-medium px-4">
                        Kayıt olarak <a href="#" className="underline">Kullanım Koşulları</a> ve <a href="#" className="underline">Gizlilik Politikası</a>'nı kabul etmiş olursunuz.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
