"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Kontrol: Kullanıcı daha önce tercihini belirtti mi?
        // 'cookieConsent_v3' anahtarını kullanıyoruz (yeni tasarım için sıfırlama)
        const consent = localStorage.getItem('cookieConsent_v3');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000); // 1 saniye sonra göster
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        localStorage.setItem('cookieConsent_v3', 'accepted');
        localStorage.setItem('analytics_active', 'true');
    };

    const handleReject = () => {
        setIsVisible(false);
        localStorage.setItem('cookieConsent_v3', 'rejected');
        localStorage.setItem('analytics_active', 'false');
    };

    const handleDismiss = () => {
        setIsVisible(false); // X'e basınca geçici kapatma veya reddetme
        localStorage.setItem('cookieConsent_v3', 'rejected'); // Varsayılan olarak reddetmiş sayalım veya sormayalım
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[9999] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

                    {/* Metin Alanı */}
                    <div className="flex-1 text-center md:text-left pr-8">
                        <p className="text-gray-600 text-sm leading-relaxed">
                            İnternet sitemizde çerezlerden faydalanılmaktadır. Ayrıntılı bilgi için{' '}
                            <Link href="/privacy" className="text-navy font-semibold hover:underline decoration-navy decoration-1 underline-offset-2">
                                Gizlilik Politikamızı
                            </Link>
                            {' '}ve{' '}
                            <Link href="/cookies" className="text-navy font-semibold hover:underline decoration-navy decoration-1 underline-offset-2">
                                Çerez Politikamızı
                            </Link>
                            {' '}inceleyebilirsiniz.
                        </p>
                    </div>

                    {/* Butonlar */}
                    <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                        <button
                            onClick={handleReject}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 text-gray-700 font-medium text-sm rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            Reddet
                        </button>
                        <button
                            onClick={handleAccept}
                            className="flex-1 md:flex-none px-6 py-2.5 bg-navy text-white font-medium text-sm rounded-lg hover:bg-opacity-90 transition-colors duration-200"
                        >
                            Kabul Et
                        </button>
                    </div>

                    {/* Kapat butonu (Mobil uyumlu pozisyonlama) */}
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600 transition-colors md:top-1/2 md:-translate-y-1/2 md:right-4"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// Global analytics helper - fonksiyonları window objesine atayabiliriz veya context kullanabiliriz.
// Şimdilik sadece localStorage güncellemesi yeterli.
export const enableAnalytics = () => {
    localStorage.setItem('analytics_active', 'true');
}

export const disableAnalytics = () => {
    localStorage.setItem('analytics_active', 'false');
}
