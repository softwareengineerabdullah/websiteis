"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Smartphone, Monitor, Coffee, Code2, ArrowUpRight } from 'lucide-react';

const services = [
    {
        icon: Coffee,
        title: "Kafe POS & QR Menü",
        desc: "Siparişleri hızlandıran, garson maliyetini düşüren ve ciroyu artıran yeni nesil restoran yönetim sistemi.",
        color: "bg-orange-100 text-orange-600",
        href: "/services", // Daha sonra detay sayfasına gidebilir
    },
    {
        icon: Code2,
        title: "Kurumsal Özel Yazılım",
        desc: "Paket programlara sıkışmayın. İş akışınıza %100 uyum sağlayan, güvenli ve hızlı web tabanlı yönetim panelleri.",
        color: "bg-blue-100 text-blue-600",
        href: "/services",
    },
    {
        icon: Smartphone,
        title: "Mobil Uygulama",
        desc: "iOS ve Android dünyasında yerinizi alın. Müşterilerinize doğrudan ulaşan performanslı mobil çözümler.",
        color: "bg-purple-100 text-purple-600",
        href: "/services",
    },
    {
        icon: Monitor,
        title: "Web Tasarım & E-Ticaret",
        desc: "Google uyumlu, hızlı ve modern web siteleri ile dijital dünyadaki vitrininizi profesyonelleştirin.",
        color: "bg-green-100 text-green-600",
        href: "/services",
    },
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-accent-blue font-semibold tracking-wider text-sm uppercase">Hizmetlerimiz</span>
                    <h2 className="text-4xl font-bold text-navy mt-2 mb-4">Neler Sunuyoruz?</h2>
                    <p className="text-text-gray text-lg">
                        İşletmenizi büyütmek ve rekabetçi pazarda öne çıkmak için kapsamlı dijital çözümler.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-8 rounded-3xl bg-soft-white border border-transparent hover:border-stroke hover:shadow-card hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-navy mb-3">{service.title}</h3>
                            <p className="text-text-gray text-sm leading-relaxed mb-6">
                                {service.desc}
                            </p>
                            <Link href={service.href} className="flex items-center text-sm font-semibold text-navy group-hover:text-accent-blue transition-colors">
                                Daha fazlası <ArrowUpRight size={16} className="ml-1" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
