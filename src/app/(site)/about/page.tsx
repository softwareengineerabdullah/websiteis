"use client";

import { motion } from 'framer-motion';
import { Target, Lightbulb, Heart, Calendar } from 'lucide-react';

const values = [
    { icon: Target, title: "Misyon", desc: "Karmaşık iş süreçlerini, herkesin kullanabileceği basit, hızlı ve güçlü sistemlere dönüştürmek." },
    { icon: Lightbulb, title: "Vizyon", desc: "Türkiye'nin en güvenilir KOBİ ve Kurumsal dijitalleşme partneri olmak." },
    { icon: Heart, title: "Değerler", desc: "Şeffaflık, Sonuç Odaklılık ve 7/24 Sürekli Destek." },
];

const processSteps = [
    { step: "01", title: "Tanışma & Analiz", desc: "İhtiyaçlarınızı dinliyor, projenin kapsamını belirliyor ve size özel bir yol haritası çıkarıyoruz." },
    { step: "02", title: "Tasarım & Prototip", desc: "Marka kimliğinize uygun, modern ve kullanıcı dostu arayüzler tasarlayarak onayınıza sunuyoruz." },
    { step: "03", title: "Geliştirme", desc: "En son teknolojileri kullanarak projenizi güvenli, hızlı ve ölçeklenebilir bir şekilde kodluyoruz." },
    { step: "04", title: "Teslim & Destek", desc: "Testleri tamamlanan projeyi canlıya alıyor, eğitimleri veriyor ve sonrasında da yanınızda oluyoruz." },
];

export default function AboutPage() {
    return (
        <div className="bg-soft-white min-h-screen pt-20">
            {/* Header */}
            <section className="py-20 container mx-auto px-6 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-navy mb-6"
                >
                    <span className="text-accent-blue">Kodların Arkasındaki</span> Çözüm Ortağınız
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-text-gray max-w-3xl mx-auto"
                >
                    İşletmenizin dijital dönüşüm yolculuğunda size sadece yazılım değil, operasyonel verimliliğinizi artıran ve cironuzu yükselten sürdürülebilir büyüme stratejileri sunuyoruz.
                </motion.p>
            </section>

            {/* Values */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((val, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="text-center p-8 border border-stroke rounded-3xl bg-soft-white hover:shadow-card transition-all"
                        >
                            <div className="w-16 h-16 bg-blue-50 text-accent-blue rounded-full flex items-center justify-center mx-auto mb-6">
                                <val.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-navy mb-3">{val.title}</h3>
                            <p className="text-text-gray">{val.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process / Steps */}
            <section className="py-20 bg-soft-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-navy text-center mb-16">Çalışma Sürecimiz</h2>
                    <div className="space-y-8 max-w-3xl mx-auto">
                        {processSteps.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="flex gap-6 items-start"
                            >
                                <div className="w-24 flex-shrink-0 text-right font-bold text-accent-blue text-2xl pt-1 opacity-50">
                                    {item.step}
                                </div>
                                <div className="relative pl-8 border-l-2 border-gray-200 pb-8 last:pb-0 last:border-l-0">
                                    <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-navy border-4 border-white shadow-sm" />
                                    <h3 className="text-xl font-bold text-navy mb-2">{item.title}</h3>
                                    <p className="text-text-gray">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
