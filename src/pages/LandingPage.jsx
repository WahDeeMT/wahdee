import React from 'react';
import { ArrowRight, Activity, Droplets, Utensils, Check, Zap, Star } from 'lucide-react';

const LandingPage = ({ onLogin }) => {
    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white font-inter selection:bg-purple-100 selection:text-purple-900">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-purple-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                            <Activity size={24} />
                        </div>
                        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-800 tracking-tight">
                            WahDee<span className="text-gray-900">Fit</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hidden md:block text-sm font-semibold text-gray-600 hover:text-purple-600 transition-colors">Özellikler</a>
                        <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hidden md:block text-sm font-semibold text-gray-600 hover:text-purple-600 transition-colors">Fiyatlandırma</a>
                        <button
                            onClick={onLogin}
                            className="bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-gray-200"
                        >
                            Giriş Yap
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10 animate-pulse delay-700"></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 -z-10"></div>

                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-bold text-sm border border-purple-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            Yeni: Su Takibi ve Fitness Modülü Yayında!
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            Hayalindeki <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Vücuda Ulaşma</span> <br />
                            Zamanı.
                        </h1>

                        <p className="text-xl text-gray-500 font-medium max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Kalori takibi, su hatırlatıcıları, egzersiz planları ve detaylı analizler. Hepsi tek bir yerde.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <button
                                onClick={onLogin}
                                className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-violet-200 transition-all hover:-translate-y-1"
                            >
                                Hemen Başla
                                <ArrowRight size={20} />
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1">
                                Daha Fazla Bilgi
                            </button>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Mock Logos */}
                            <span className="text-xl font-black text-gray-400">FITLIFE</span>
                            <span className="text-xl font-black text-gray-400">HEALTHY+</span>
                            <span className="text-xl font-black text-gray-400">GYMPRO</span>
                        </div>
                    </div>

                    {/* Hero Image / Visual */}
                    <div className="relative animate-in fade-in zoom-in-50 duration-1000 delay-200 hidden lg:block">
                        <div className="relative z-10 bg-white rounded-[2.5rem] p-4 shadow-2xl shadow-purple-200 border border-purple-50 rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2685&auto=format&fit=crop"
                                alt="App Dashboard Preview"
                                className="rounded-[2rem] shadow-inner"
                            />
                            {/* Floating Cards */}
                            <div className="absolute -left-12 top-1/2 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-purple-100 delay-700">
                                <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                                    <Utensils size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400">Kalori</p>
                                    <p className="text-lg font-black text-gray-800">1,250 <span className="text-xs text-gray-400 font-normal">kcal</span></p>
                                </div>
                            </div>

                            <div className="absolute -right-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-blue-100" style={{ animationDelay: '1s' }}>
                                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                    <Droplets size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400">Su</p>
                                    <p className="text-lg font-black text-gray-800">2.5 <span className="text-xs text-gray-400 font-normal">lt</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-gray-50/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-purple-600 font-bold tracking-wider uppercase text-sm">Özellikler</span>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-4">Sağlıklı Yaşam İçin <br /> İhtiyacınız Olan Her Şey</h2>
                        <p className="text-gray-500">Tek bir uygulamadan tüm sağlık verilerinizi takip edin ve hedeflerinize daha hızlı ulaşın.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-purple-100 hover:border-purple-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                <Utensils size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Akıllı Kalori Takibi</h3>
                            <p className="text-gray-500 leading-relaxed">Binlerce yiyecek veritabanı ile günlük kalori alımınızı saniyeler içinde kaydedin ve analiz edin.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-blue-100 hover:border-blue-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Droplets size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Su İçme Hatırlatıcısı</h3>
                            <p className="text-gray-500 leading-relaxed">Günlük su hedefinizi belirleyin, akıllı bildirimlerle susuz kalmayın ve sağlığınızı koruyun.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-purple-100 hover:border-purple-200 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Aktivite & Fitness</h3>
                            <p className="text-gray-500 leading-relaxed">Koşu, yüzme, futbol ve daha fazlası. Aktivitelerinizi kaydedin, yaktığınız kaloriyi görün.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-violet-600 font-bold tracking-wider uppercase text-sm">Fiyatlandırma</span>
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-4">Herkes İçin Şeffaf Planlar</h2>
                        <p className="text-gray-500">İster yeni başlıyor olun, ister profesyonel bir sporcu. Sizin için bir planımız var.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 hover:border-violet-200 transition-colors relative">
                            <h3 className="text-2xl font-bold text-gray-900">Başlangıç</h3>
                            <div className="my-6">
                                <span className="text-5xl font-black text-gray-900">0</span>
                                <span className="text-xl font-bold text-gray-400">₺ / ay</span>
                            </div>
                            <p className="text-gray-500 mb-8 font-medium">Sağlıklı yaşama adım atmak isteyenler için temel özellikler.</p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 font-semibold text-gray-700">
                                    <div className="bg-gray-100 p-1 rounded-full"><Check size={14} /></div>
                                    Günlük Kalori Takibi
                                </li>
                                <li className="flex items-center gap-3 font-semibold text-gray-700">
                                    <div className="bg-gray-100 p-1 rounded-full"><Check size={14} /></div>
                                    Temel Su Takibi
                                </li>
                                <li className="flex items-center gap-3 font-semibold text-gray-700">
                                    <div className="bg-gray-100 p-1 rounded-full"><Check size={14} /></div>
                                    Sınırlı Aktivite Geçmişi
                                </li>
                            </ul>
                            <button
                                onClick={onLogin}
                                className="w-full py-4 rounded-xl border-2 border-gray-900 text-gray-900 font-bold hover:bg-gray-900 hover:text-white transition-all active:scale-95"
                            >
                                Ücretsiz Başla
                            </button>
                        </div>

                        {/* Pro Plan */}
                        <div className="bg-gray-900 p-10 rounded-[2.5rem] relative overflow-hidden text-white shadow-2xl shadow-purple-200">
                            <div className="absolute top-0 right-0 p-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-bl-3xl text-sm font-bold px-6">
                                EN POPÜLER
                            </div>
                            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 blur-3xl -z-10 rounded-full translate-x-1/3 -translate-y-1/3"></div>

                            <div className="flex items-center gap-2 mb-2 text-violet-300 font-bold">
                                <Star fill="currentColor" size={16} />
                                PRO PLAN
                            </div>
                            <h3 className="text-2xl font-bold text-white">Profesyonel</h3>
                            <div className="my-6">
                                <span className="text-5xl font-black text-white">199</span>
                                <span className="text-xl font-bold text-gray-400">₺ / ay</span>
                            </div>
                            <p className="text-gray-400 mb-8 font-medium">Ciddi hedefleri olanlar için sınırsız erişim ve detaylı analizler.</p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 font-semibold hover:text-white transition-colors">
                                    <div className="bg-violet-600 p-1 rounded-full"><Check size={14} /></div>
                                    Tüm Başlangıç Özellikleri
                                </li>
                                <li className="flex items-center gap-3 font-semibold hover:text-white transition-colors">
                                    <div className="bg-violet-600 p-1 rounded-full"><Check size={14} /></div>
                                    Sınırsız Aktivite & Geçmiş
                                </li>
                                <li className="flex items-center gap-3 font-semibold hover:text-white transition-colors">
                                    <div className="bg-violet-600 p-1 rounded-full"><Check size={14} /></div>
                                    Detaylı Raporlar & Grafikler
                                </li>
                                <li className="flex items-center gap-3 font-semibold hover:text-white transition-colors">
                                    <div className="bg-violet-600 p-1 rounded-full"><Check size={14} /></div>
                                    Diyetisyen Desteği
                                </li>
                            </ul>
                            <button
                                onClick={onLogin}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:to-purple-500 font-bold text-white shadow-lg shadow-violet-900/50 transition-all active:scale-95 border border-white/10"
                            >
                                Pro'ya Geç
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 pt-16 pb-12">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 font-medium text-gray-500">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
                                <Activity size={18} />
                            </div>
                            <h1 className="text-xl font-black text-gray-900">WahDeeFit</h1>
                        </div>
                        <p className="max-w-xs text-sm">Sağlıklı yaşam yolculuğunuzda size rehberlik eden modern ve akıllı asistan.</p>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-4">Ürün</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Özellikler</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Fiyatlandırma</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">SSS</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-gray-900 font-bold mb-4">Şirket</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Hakkımızda</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">İletişim</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
                    © 2026 WahDeeFit. Tüm hakları saklıdır. Mert tarafından tasarlanmıştır.
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;
