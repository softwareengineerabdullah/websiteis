"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    category: string | null;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    // Eski API fetch kaldırıldı.
    // Projeleri göstermek için buraya manuel veri ekleyebilir veya Firebase bağlantısı yapabilirsiniz.
    /*
    useEffect(() => {
        // Firebase entegrasyonu buraya gelecek
    }, []);
    */

    // If no projects, don't show the section
    if (projects.length === 0) return null;

    return (
        <section className="py-20 bg-soft-white" id="projects">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="max-w-xl">
                        <span className="text-accent-blue font-semibold tracking-wider text-sm mb-2 block">REFERANSLARIMIZ & PROJELERİMİZ</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-navy">Öne Çıkan Çalışmalarımız</h2>
                    </div>
                    {/* Optional: Add a "View All" button here if needed in the future */}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl overflow-hidden border border-stroke hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-64 overflow-hidden">
                                {project.imageUrl ? (
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                                        <span className="text-navy/20 font-bold text-4xl">Double T</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <span className="text-white font-medium">{project.category || 'Genel'}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-accent-blue transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-text-gray text-sm line-clamp-3 mb-4">
                                    {project.description}
                                </p>
                                <Link href={`/project/${project.id}`}>
                                    <Button as="div" variant="outline" size="sm" className="w-full justify-between group/btn cursor-pointer">
                                        İncele <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
