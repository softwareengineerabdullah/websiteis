"use client";

import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';

interface Reference {
    id: string;
    name: string;
    websiteUrl: string | null;
    logoUrl?: string; // Opsiyonel logo
}

export default function Clients() {
    const [references, setReferences] = useState<Reference[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "references"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedRefs: Reference[] = [];
            snapshot.forEach((doc) => {
                fetchedRefs.push({ id: doc.id, ...doc.data() } as Reference);
            });
            setReferences(fetchedRefs);
            setLoading(false);
        }, (error) => {
            console.error("Referanslar çekilemedi:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return null; // Yüklenirken boş dön veya bir skeleton gösterilebilir
    if (references.length === 0) return null;

    // Sonsuz döngü hissi verebilmek için listeyi yeterince çoğaltıyoruz
    // Marquee için en az ekranı dolduracak kadar eleman olmalı
    const marqueeItems = references.length < 5
        ? [...references, ...references, ...references, ...references, ...references, ...references]
        : [...references, ...references];

    return (
        <section className="py-12 bg-white border-b border-stroke overflow-hidden">
            <div className="container mx-auto px-6 mb-8 text-center">
                <p className="text-sm font-medium text-text-gray uppercase tracking-widest">Bizi Tercih Edenler</p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4 px-4">
                    {marqueeItems.map((ref, idx) => (
                        <div
                            key={`${ref.id}-${idx}`}
                            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-default"
                            title={ref.name}
                        >
                            {ref.logoUrl ? (
                                <div className="relative h-12 w-32 md:h-16 md:w-40">
                                    {/* Next/Image kullanmıyoruz çünkü harici URL'ler (googleusercontent vb.) hostname config gerektirir ve kullanıcı rastgele URL girebilir */}
                                    <img
                                        src={ref.logoUrl}
                                        alt={ref.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <span className="text-xl md:text-2xl font-bold text-navy whitespace-nowrap">
                                    {ref.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Seamless loop için duplicate set (CSS animasyonunun düzgün akması için) */}
                <div className="animate-marquee aria-hidden whitespace-nowrap flex items-center gap-16 py-4 px-4" aria-hidden="true">
                    {marqueeItems.map((ref, idx) => (
                        <div
                            key={`dup-${ref.id}-${idx}`}
                            className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 transform hover:scale-110 cursor-default"
                        >
                            {ref.logoUrl ? (
                                <div className="relative h-12 w-32 md:h-16 md:w-40">
                                    <img
                                        src={ref.logoUrl}
                                        alt={ref.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ) : (
                                <span className="text-xl md:text-2xl font-bold text-navy whitespace-nowrap">
                                    {ref.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused; /* Üzerine gelince dursun */
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
            `}</style>
        </section>
    );
}
