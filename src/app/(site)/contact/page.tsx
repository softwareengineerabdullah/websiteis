"use client";

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

export default function ContactPage() {

    const [settings, setSettings] = useState<{ phone: string; phone2?: string; email: string } | null>(null);

    useEffect(() => {
        // Dinamik import ile Firebase modüllerini yükle (SSR hatasını önlemek için)
        const fetchSettings = async () => {
            const { doc, getDoc } = await import('firebase/firestore');
            const { db } = await import('@/lib/firebase');

            const docRef = doc(db, "settings", "general");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setSettings(docSnap.data() as any);
            }
        };
        fetchSettings();
    }, []);

    return (
        <div className="min-h-screen bg-soft-white pt-20">
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-5xl font-bold text-navy mb-8">Tanışalım</h1>
                        <p className="text-xl text-text-gray mb-12 leading-relaxed">
                            Aklınızda bir proje mi var? Sizi dinlemek isteriz. <br />
                            Bize bir mesaj gönderin, en kısa sürede dönüş yapalım.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-navy shadow-sm border border-stroke">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-text-gray uppercase tracking-wider font-semibold">Telefonlar</p>
                                    <div className="flex flex-col gap-2 mt-1">
                                        <p className="text-lg text-navy font-medium flex items-center gap-2">
                                            <span className="font-bold">Hat 1:</span> {settings?.phone || 'Yükleniyor...'}
                                        </p>
                                        {settings?.phone2 && (
                                            <p className="text-lg text-navy font-medium flex items-center gap-2">
                                                <span className="font-bold">Hat 2:</span> {settings.phone2}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-navy shadow-sm border border-stroke">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-text-gray uppercase tracking-wider font-semibold">E-posta</p>
                                    <p className="text-lg text-navy font-medium">{settings?.email || 'Yükleniyor...'}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-stroke"
                    >
                        <h2 className="text-2xl font-bold text-navy mb-8">Mesaj Gönder</h2>
                        <form className="space-y-6" onSubmit={async (e) => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const btn = form.querySelector('button');
                            const formData = new FormData(form);

                            // Form verilerini al
                            const name = formData.get('name') as string;
                            const email = formData.get('email') as string;
                            const subject = formData.get('subject') as string;
                            const message = formData.get('message') as string;

                            if (btn) {
                                const originalText = btn.innerHTML;
                                btn.disabled = true;
                                btn.innerText = 'Gönderiliyor...';

                                try {
                                    // Firebase Firestore'a kaydet
                                    // Dinamik import kullanarak build hatalarını önle (SSR sorunu olmaması için)
                                    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
                                    const { db } = await import('@/lib/firebase');

                                    await addDoc(collection(db, "contact_messages"), {
                                        name,
                                        email,
                                        subject: subject || 'Konu Belirtilmedi',
                                        message,
                                        privacyConsent: true,
                                        createdAt: serverTimestamp() // Sunucu zamanı
                                    });

                                    alert('Mesajınız başarıyla alındı! En kısa sürede size dönüş yapacağız.');
                                    form.reset();
                                } catch (error) {
                                    console.error("Firebase Hatası:", error);
                                    alert('Bir bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.');
                                } finally {
                                    btn.disabled = false;
                                    btn.innerHTML = originalText;
                                }
                            }
                        }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-navy">Ad Soyad</label>
                                    <input name="name" required type="text" className="w-full bg-soft-white border border-stroke rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all" placeholder="Adınız Soyadınız" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-navy">E-posta</label>
                                    <input name="email" required type="email" className="w-full bg-soft-white border border-stroke rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all" placeholder="ornek@sirket.com" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy">Konu</label>
                                <input name="subject" required type="text" className="w-full bg-soft-white border border-stroke rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all" placeholder="Proje Hakkında" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy">Mesajınız</label>
                                <textarea name="message" required rows={4} className="w-full bg-soft-white border border-stroke rounded-xl px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all resize-none" placeholder="Projenizden bahsedin..." />
                            </div>



                            <div className="flex items-start gap-3">
                                <div className="flex items-center h-5">
                                    <input
                                        id="privacyConsent"
                                        name="privacyConsent"
                                        type="checkbox"
                                        required
                                        className="w-4 h-4 rounded border-gray-300 text-navy focus:ring-navy"
                                    />
                                </div>
                                <label htmlFor="privacyConsent" className="text-sm text-text-gray select-none">
                                    <a href="/privacy" target="_blank" className="font-medium text-navy hover:underline">Gizlilik Politikası</a>
                                    {' ve '}
                                    <a href="/kvkk" target="_blank" className="font-medium text-navy hover:underline">KVKK Aydınlatma Metni</a>
                                    {'’ni okudum.'}
                                </label>
                            </div>

                            <Button className="w-full" size="lg">
                                Gönder <Send className="ml-2 w-5 h-5" />
                            </Button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div >
    );
}
