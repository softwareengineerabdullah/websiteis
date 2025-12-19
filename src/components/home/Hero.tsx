"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-soft-white">
            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pastel-blue rounded-full blur-[100px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pastel-yellow rounded-full blur-[100px] opacity-60" />
                <div className="absolute top-[40%] left-[80%] w-[20%] h-[20%] bg-pastel-green rounded-full blur-[80px] opacity-40" />
            </div>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center lg:text-left"
                >
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                        <span className="bg-pastel-blue text-accent-blue px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
                            Kafe & Restoran Çözümleri
                        </span>
                        <span className="bg-pastel-green text-green-700 px-3 py-1 rounded-full text-sm font-semibold tracking-wide">
                            Kurumsal & Özel Yazılım
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold text-navy leading-tight mb-6 tracking-tight">
                        İşletmenizi Büyüten <span className="text-accent-blue">Akıllı Yazılım Çözümleri</span>
                    </h1>

                    <p className="text-xl text-text-gray mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                        Kafeniz, restoranınız veya şirketiniz için QR Menü, POS Sistemleri ve Özel Web/Mobil çözümler üretiyoruz. Karmaşayı bitirin, verimliliğinizi artırın.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href="/contact">
                            <Button as="div" size="lg" variant="primary" className="shadow-lg shadow-blue-500/20 group">
                                Ücretsiz Analiz Alın <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button as="div" size="lg" variant="secondary">
                                Çözümlerimiz
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    {/* Glassmorphism Card */}
                    <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-card max-w-md mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                        <div className="flex items-center gap-4 mb-6 border-b border-white/30 pb-4">
                            <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">
                                TT
                            </div>
                            <div>
                                <h3 className="font-bold text-navy text-lg">Proje Durumu</h3>
                                <p className="text-sm text-green-600 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Aktif Geliştirme
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/60 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="text-accent-blue w-5 h-5" />
                                        <span className="text-navy font-medium text-sm">{i}. Aşama Tamamlandı</span>
                                    </div>
                                    <span className="text-xs text-text-gray">Az önce</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/30">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span className="text-text-gray">Tamamlanma</span>
                                <span className="text-navy">98%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "98%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-accent-blue rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Floating Element */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 right-0 bg-white p-4 rounded-2xl shadow-lg border border-stroke z-20"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                            <span className="font-bold text-navy">Yeni Talep</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-gray"
            >
                <span className="text-xs tracking-widest uppercase mb-2 block text-center">Scroll</span>
                <div className="w-[1px] h-12 bg-gray-300 mx-auto" />
            </motion.div>
        </section>
    );
}
