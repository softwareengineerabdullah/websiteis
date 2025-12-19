"use client";

import { motion } from 'framer-motion';
import { Coffee, Code2, Smartphone, Monitor } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        icon: Coffee,
        title: "Kafe POS & QR Menü Sistemleri",
        desc: "İşletmenizi dijital dünyaya taşıyın. QR Menü ile müşterilerinize temassız sipariş imkanı sunarken, gelişmiş POS sistemimizle mutfak, kasa ve personel operasyonlarını tek ekrandan yönetin. Stok takibi, detaylı raporlama ve sadakat özellikleriyle cironuzu artırın.",
        color: "bg-orange-100 text-orange-600"
    },
    {
        icon: Code2,
        title: "Kurumsal Özel Yazılım",
        desc: "Hazır paketlerin kısıtlamalarından kurtulun. Şirketinizin benzersiz iş akışlarına tam uyum sağlayan, verimliliğinizi maksimuma çıkaran güvenli ve ölçeklenebilir web tabanlı yönetim sistemleri geliştiriyoruz. B2B portalları, CRM ve ERP modülleri.",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: Smartphone,
        title: "Mobil Uygulama Geliştirme",
        desc: "Fikrinizi cebinize taşıyın. Hem iOS hem de Android platformlarında sorunsuz çalışan, yüksek performanslı ve kullanıcı deneyimi (UX) odaklı mobil uygulamalar. Müşteri sadakati ve kurumsal içi iletişim uygulamaları.",
        color: "bg-purple-100 text-purple-600"
    },
    {
        icon: Monitor,
        title: "Web Tasarım & E-Ticaret",
        desc: "Sadece bir web sitesi değil, 7/24 çalışan dijital şubeniz. Google SEO uyumlu, hızlı açılan, tüm cihazlarda kusursuz görünen kurumsal web siteleri ve yüksek dönüşüm odaklı e-ticaret altyapıları.",
        color: "bg-green-100 text-green-600"
    }
];

export default function ServicesPage() {
    return (
        <div className="bg-soft-white min-h-screen pt-20">
            {/* Header */}
            <section className="py-20 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-navy mb-6"
                >
                    İşletmeniz İçin <span className="text-accent-blue">Modern Çözümler</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-text-gray max-w-3xl mx-auto"
                >
                    Teknolojiyi işinize entegre ederek verimliliğinizi artırıyor, maliyetlerinizi düşürüyor ve büyümenize hız katıyoruz.
                </motion.p>
            </section>

            {/* Services Grid */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        {services.map((service, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-3xl bg-soft-white border border-transparent hover:border-stroke hover:shadow-xl transition-all duration-300"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mb-6 shadow-sm`}>
                                    <service.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-accent-blue transition-colors">{service.title}</h3>
                                <p className="text-text-gray leading-relaxed mb-8">
                                    {service.desc}
                                </p>
                                <div className="border-t border-gray-100 pt-6">
                                    <Link href="/contact" className="inline-flex items-center text-sm font-bold text-navy hover:text-accent-blue transition-colors uppercase tracking-wider">
                                        Teklif Alın &rarr;
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-navy text-white text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Projeniz İçin Hazırız</h2>
                    <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
                        İşletmenizin ihtiyaçlarını analiz edelim ve size en uygun çözümü sunalım.
                    </p>
                    <Link href="/contact" className="bg-accent-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/30 inline-block">
                        Ücretsiz Analiz Başlat
                    </Link>
                </div>
            </section>
        </div>
    );
}
