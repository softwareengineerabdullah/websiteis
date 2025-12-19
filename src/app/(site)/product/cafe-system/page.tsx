"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
    QrCode, Smartphone, LayoutDashboard, CreditCard,
    ChefHat, BarChart3, ArrowRight, Check
} from 'lucide-react';

const features = [
    { icon: QrCode, title: "QR Menü", desc: "Müşteriler için temassız dijital menü." },
    { icon: Smartphone, title: "Mobil Sipariş", desc: "Doğrudan masadan sipariş verme imkanı." },
    { icon: LayoutDashboard, title: "Masa Yönetimi", desc: "Gerçek zamanlı masa durumu takibi." },
    { icon: CreditCard, title: "POS Entegrasyonu", desc: "Sorunsuz ödeme işlemleri." },
    { icon: Smartphone, title: "Garson Uygulaması", desc: "Personel verimliliği için mobil uygulama." },
    { icon: ChefHat, title: "Mutfak Ekranı", desc: "Sipariş yönlendirmesi için dijital KDS." },
    { icon: BarChart3, title: "Canlı Raporlar", desc: "Gerçek zamanlı satış analizleri." },
    { icon: LayoutDashboard, title: "Yönetim Paneli", desc: "Mekanınız üzerinde tam kontrol." },
];

export default function CafeSystemPage() {
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        email: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Always defaults to Line 1 (Abdullah TOLAK)
        const phoneNumber = '905443752110';
        const message = `Merhaba, Kafe Yönetim Sistemi hakkında teklif almak istiyorum.
        
Ad Soyad: ${formData.name}
İşletme Adı: ${formData.businessName}
E-posta: ${formData.email}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        setFormData({
            name: "",
            businessName: "",
            email: ""
        });
    };

    return (
        <div className="bg-soft-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold text-navy mb-6"
                    >
                        En Kapsamlı <span className="text-accent-blue">Kafe Yönetim</span> Sistemi
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-text-gray max-w-2xl mx-auto mb-10"
                    >
                        Modern kafeler ve restoranlar için tasarlanmış hepsi bir arada çözümümüzle operasyonları düzenleyin, verimliliği artırın ve satışlarınızı yükseltin.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center gap-4"
                    >
                        <Link href="/contact">
                            <Button as="div" size="lg">Hemen Başla</Button>
                        </Link>
                        <Link href="https://wa.me/905443752110" target="_blank">
                            <Button as="div" size="lg" variant="secondary">Hızlı Fiyat Al</Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="p-6 rounded-2xl bg-soft-white border border-transparent hover:border-stroke hover:shadow-lg transition-all"
                            >
                                <div className="w-12 h-12 bg-blue-50 text-accent-blue rounded-xl flex items-center justify-center mb-4">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-bold text-navy text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-text-gray">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-navy rounded-3xl p-12 relative overflow-hidden text-center">
                        {/* Background Decorations */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue rounded-full blur-[80px] opacity-20" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[80px] opacity-20" />

                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                İşletmenizi dönüştürmeye hazır mısınız?
                            </h2>
                            <p className="text-gray-300 mb-8 text-lg">
                                Sistemimizi kullanan yüzlerce başarılı işletmeye katılın. Bugün işletmenize özel teklif alın.
                            </p>

                            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-left">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Adınız Soyadınız"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="İşletme Adı"
                                            value={formData.businessName}
                                            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                            className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="E-posta Adresi"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-accent-blue"
                                        required
                                    />

                                    <Button type="submit" className="w-full bg-accent-blue hover:bg-blue-600 text-white" size="lg">
                                        WhatsApp Üzerinden Teklif Al
                                    </Button>

                                    <div className="text-center mt-3">
                                        <p className="text-sm text-gray-400">
                                            Hattımız meşgulse{' '}
                                            <a
                                                href="https://wa.me/905324978109"
                                                target="_blank"
                                                className="text-accent-blue hover:underline cursor-pointer"
                                            >
                                                yedek hattımızdan
                                            </a>
                                            {' '}ulaşabilirsiniz.
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
