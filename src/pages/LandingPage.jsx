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
        <div className="min-h-screen transition-colors duration-500 font-inter selection:bg-purple-900 selection:text-white dark bg-slate-950" style={{ backgroundColor: '#0f172a' }}>


            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>

                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-purple-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                            <Activity size={24} />
                        </div>
                        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-800 tracking-tight">
                            WahDee<span style={{ color: 'var(--text-primary)' }}>Fit</span>
                        </h1>
                    </div>


                    <div className="flex items-center gap-6">
                        <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hidden md:block text-sm font-semibold hover:text-purple-600 transition-colors" style={{ color: 'var(--text-secondary)' }}>Özellikler</a>
                        <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hidden md:block text-sm font-semibold hover:text-purple-600 transition-colors" style={{ color: 'var(--text-secondary)' }}>Fiyatlandırma</a>
                        <button
                            onClick={onLogin}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-violet-500/20"
                        >
                            Giriş Yap
                        </button>
                    </div>

                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 -z-10 animate-pulse delay-700" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}></div>
                <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 -z-10" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}></div>


                <div className="max-w-7xl mx-auto px-6 text-center lg:text-left grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 text-purple-300 rounded-full font-bold text-sm border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                            </span>
                            Yeni: Su Takibi ve Fitness Modülü Yayında!
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100" style={{ color: 'var(--text-primary)' }}>
                            Hayalindeki <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">Vücuda Ulaşma</span> <br />
                            Zamanı.
                        </h1>

                        <p className="text-xl font-medium max-w-xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200" style={{ color: 'var(--text-secondary)' }}>
                            Kalori takibi, su hatırlatıcıları, egzersiz planları ve detaylı analizler. Hepsi tek bir yerde.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                            <button
                                onClick={onLogin}
                                className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-violet-500/20 transition-all hover:-translate-y-1"
                            >
                                Hemen Başla
                                <ArrowRight size={20} />
                            </button>
                            <button className="flex items-center justify-center gap-2 border px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:-translate-y-1" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
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
                    <div className="relative animate-in fade-in zoom-in-50 duration-1000 delay-200 block mt-12 lg:mt-0 px-4 md:px-0">
                        <div className="relative z-10 p-4 shadow-2xl border rotate-3 hover:rotate-0 transition-transform duration-500 rounded-[2.5rem]" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.15)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=2685&auto=format&fit=crop"
                                alt="App Dashboard Preview"
                                className="rounded-[2rem] shadow-inner opacity-90"
                            />
                            {/* Floating Cards */}
                            <div className="absolute -left-12 top-1/2 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-purple-900/10 delay-700" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                <div className="p-3 rounded-xl text-orange-600" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                                    <Utensils size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>Kalori</p>
                                    <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>1,250 <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>kcal</span></p>
                                </div>
                            </div>

                            <div className="absolute -right-8 bottom-20 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce shadow-blue-900/10" style={{ animationDelay: '1s', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                                <div className="p-3 rounded-xl text-blue-600" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                                    <Droplets size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>Su</p>
                                    <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>2.5 <span className="text-xs font-normal" style={{ color: 'var(--text-secondary)' }}>lt</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-purple-600 font-bold tracking-wider uppercase text-sm">Özellikler</span>
                        <h2 className="text-3xl lg:text-4xl font-black mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>Sağlıklı Yaşam İçin <br /> İhtiyacınız Olan Her Şey</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Tek bir uygulamadan tüm sağlık verilerinizi takip edin ve hedeflerinize daha hızlı ulaşın.</p>
                    </div>


                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-3xl border transition-all duration-300 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                                <Utensils size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Akıllı Kalori Takibi</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Binlerce yiyecek veritabanı ile günlük kalori alımınızı saniyeler içinde kaydedin ve analiz edin.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-3xl border transition-all duration-300 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Droplets size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Su İçme Hatırlatıcısı</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Günlük su hedefinizi belirleyin, akıllı bildirimlerle susuz kalmayın ve sağlığınızı koruyun.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-3xl border transition-all duration-300 group" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Aktivite & Fitness</h3>
                            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Koşu, yüzme, futbol ve daha fazlası. Aktivitelerinizi kaydedin, yaktığınız kaloriyi görün.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-violet-600 font-bold tracking-wider uppercase text-sm">Fiyatlandırma</span>
                        <h2 className="text-3xl lg:text-4xl font-black mt-2 mb-4" style={{ color: 'var(--text-primary)' }}>Herkes İçin Şeffaf Planlar</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>İster yeni başlıyor olun, ister profesyonel bir sporcu. Sizin için bir planımız var.</p>
                    </div>


                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Free Plan */}
                        <div className="p-10 rounded-[2.5rem] border transition-colors relative" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
                            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Başlangıç</h3>
                            <div className="my-6">
                                <span className="text-5xl font-black" style={{ color: 'var(--text-primary)' }}>0</span>
                                <span className="text-xl font-bold" style={{ color: 'var(--text-secondary)' }}>₺ / ay</span>
                            </div>
                            <p className="mb-8 font-medium" style={{ color: 'var(--text-secondary)' }}>Sağlıklı yaşama adım atmak isteyenler için temel özellikler.</p>
                            <ul className="space-y-4 mb-10">
                                <li className="flex items-center gap-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                    <div className="p-1 rounded-full" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}><Check size={14} className="text-violet-600" /></div>
                                    Günlük Kalori Takibi
                                </li>
                                <li className="flex items-center gap-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                    <div className="p-1 rounded-full" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}><Check size={14} className="text-violet-600" /></div>
                                    Temel Su Takibi
                                </li>
                                <li className="flex items-center gap-3 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                                    <div className="p-1 rounded-full" style={{ backgroundColor: 'rgba(var(--sidebar-active-rgba))' }}><Check size={14} className="text-violet-600" /></div>
                                    Sınırlı Aktivite Geçmişi
                                </li>
                            </ul>
                            <button
                                onClick={onLogin}
                                className="w-full py-4 rounded-xl border-2 font-bold transition-all active:scale-95"
                                style={{ borderColor: 'var(--text-primary)', color: 'var(--text-primary)' }}
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
            <footer className="border-t pt-16 pb-12" style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-color)' }}>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 font-medium" style={{ color: 'var(--text-secondary)' }}>
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
                                <Activity size={18} />
                            </div>
                            <h1 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>WahDeeFit</h1>
                        </div>
                        <p className="max-w-xs text-sm">Sağlıklı yaşam yolculuğunuzda size rehberlik eden modern ve akıllı asistan.</p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Ürün</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Özellikler</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Fiyatlandırma</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">SSS</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Şirket</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Hakkımızda</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-purple-600 transition-colors">İletişim</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 mt-12 text-center text-xs opacity-50" style={{ color: 'var(--text-secondary)' }}>
                    © 2026 WahDeeFit. Tüm hakları saklıdır.
                </div>
            </footer>


        </div>
    );
};

export default LandingPage;
