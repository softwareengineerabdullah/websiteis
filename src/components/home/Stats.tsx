"use client";

import { motion } from 'framer-motion';

const stats = [
    { number: "150+", label: "Tamamlanan Proje" },
    { number: "98%", label: "Müşteri Memnuniyeti" },
    { number: "24/7", label: "Kesintisiz Destek" },
    { number: "10+", label: "Yıllık Deneyim" },
];

export default function Stats() {
    return (
        <section className="py-20 relative overflow-hidden bg-navy text-white">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-blue rounded-full blur-[120px] opacity-20" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] opacity-20" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-pastel-blue mb-2 hover:scale-110 transition-transform duration-300">
                                {stat.number}
                            </div>
                            <div className="text-gray-400 font-medium tracking-wide text-sm uppercase">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
