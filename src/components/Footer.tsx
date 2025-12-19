"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Linkedin, Twitter, Phone, Mail, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface SettingsData {
    phone: string;
    phone2?: string;
    email: string;
    address: string;
    instagram: string;
    linkedin: string;
    twitter: string;
}

export default function Footer() {
    const [settings, setSettings] = useState<SettingsData | null>(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "settings", "general"), (doc) => {
            if (doc.exists()) {
                setSettings(doc.data() as SettingsData);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <footer className="bg-soft-white border-t border-stroke pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                                <Image
                                    src="/logo.png"
                                    alt="Double T Soft Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-navy text-lg tracking-tight">Double T Soft</span>
                        </Link>
                        <p className="text-text-gray text-sm mb-6 leading-relaxed">
                            Büyüme ve inovasyonu destekleyen teknoloji çözümleri üretiyoruz.
                            Mobil uygulamalardan yapay zeka entegrasyonlarına kadar, dijital dönüşümde iş ortağınızız.
                        </p>
                        <div className="flex gap-4">
                            {settings?.linkedin && (
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-stroke flex items-center justify-center text-text-gray hover:text-accent-blue hover:border-accent-blue transition-colors">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {settings?.instagram && (
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-stroke flex items-center justify-center text-text-gray hover:text-accent-blue hover:border-accent-blue transition-colors">
                                    <Instagram size={18} />
                                </a>
                            )}
                            {settings?.twitter && (
                                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-stroke flex items-center justify-center text-text-gray hover:text-accent-blue hover:border-accent-blue transition-colors">
                                    <Twitter size={18} />
                                </a>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-navy mb-6">Hizmetler</h4>
                        <ul className="space-y-4 text-sm text-text-gray">
                            <li><Link href="/services" className="hover:text-accent-blue transition-colors">Web Geliştirme</Link></li>
                            <li><Link href="/services" className="hover:text-accent-blue transition-colors">Mobil Uygulama</Link></li>
                            <li><Link href="/services" className="hover:text-accent-blue transition-colors">Kafe POS Sistemi</Link></li>
                            <li><Link href="/services" className="hover:text-accent-blue transition-colors">Özel Yazılım</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-navy mb-6">Kurumsal</h4>
                        <ul className="space-y-4 text-sm text-text-gray">
                            <li><Link href="/about" className="hover:text-accent-blue transition-colors">Hakkımızda</Link></li>
                            <li><Link href="/blog" className="hover:text-accent-blue transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-accent-blue transition-colors">İletişim</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-navy mb-6">İletişim</h4>
                        <ul className="space-y-4 text-sm text-text-gray">
                            <li className="flex items-start gap-3">
                                <Mail size={16} className="mt-1 text-accent-blue" />
                                <span>{settings?.email || 'info@doubletsoft.com'}</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={16} className="mt-1 text-accent-blue" />
                                <span>{settings?.phone || '+90 555 123 45 67'}</span>
                            </li>
                            {settings?.phone2 && (
                                <li className="flex items-start gap-3">
                                    <Phone size={16} className="mt-1 text-accent-blue" />
                                    <span>{settings.phone2}</span>
                                </li>
                            )}
                            {settings?.address && (
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="mt-1 text-accent-blue" />
                                    <span>{settings.address}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-text-gray">
                        © {new Date().getFullYear()} Double T Soft. Tüm hakları saklıdır.
                    </p>
                    <div className="flex gap-6 text-xs text-text-gray">
                        <Link href="/privacy" className="hover:text-navy">Gizlilik Politikası</Link>
                        <Link href="/terms" className="hover:text-navy">Kullanım Koşulları</Link>
                        <Link href="/cookies" className="hover:text-navy">Çerez Politikası</Link>
                        <Link href="/kvkk" className="hover:text-navy">KVKK Aydınlatma Metni</Link>

                    </div>
                </div>
            </div>
        </footer>
    );
}
