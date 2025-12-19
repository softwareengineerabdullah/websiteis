"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, Phone, Mail, MapPin, Instagram, Linkedin, Twitter, Globe, Loader2 } from "lucide-react";

interface SettingsData {
    phone: string;
    phone2?: string;
    email: string;
    address: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    website: string;
}

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState<SettingsData>({
        phone: "",
        phone2: "",
        email: "",
        address: "",
        instagram: "",
        linkedin: "",
        twitter: "",
        website: ""
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, "settings", "general");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data() as SettingsData);
                }
            } catch (error) {
                console.error("Ayarlar çekilemedi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);

        try {
            await setDoc(doc(db, "settings", "general"), {
                ...formData,
                updatedAt: serverTimestamp()
            });
            setMessage({ type: 'success', text: "Ayarlar başarıyla kaydedildi ve sitede güncellendi!" });

            // 3 saniye sonra mesajı kaldır
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            setMessage({ type: 'error', text: "Kaydederken bir hata oluştu." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-accent-blue">Ayarlar yükleniyor...</div>;

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold text-navy mb-2">Site Ayarları</h1>
            <p className="text-gray-500 mb-8">İletişim bilgilerinizi ve sosyal medya hesaplarınızı buradan yönetebilirsiniz.</p>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* İletişim Bilgileri */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2 border-b border-gray-50 pb-4">
                        <Phone size={20} className="text-accent-blue" />
                        İletişim Bilgileri
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                            <input
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="text"
                                placeholder="+90 555 123 45 67"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">2. Telefon Numarası (Opsiyonel)</label>
                            <input
                                name="phone2"
                                value={formData.phone2 || ""}
                                onChange={handleChange}
                                type="text"
                                placeholder="+90 532 123 45 67"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta Adresi</label>
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                placeholder="info@doubletsoft.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Şirket adresi..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Sosyal Medya */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2 border-b border-gray-50 pb-4">
                        <Globe size={20} className="text-accent-blue" />
                        Sosyal Medya Linkleri
                    </h2>

                    <div className="space-y-4">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                            <Instagram className="absolute left-4 top-9 text-gray-400" size={18} />
                            <input
                                name="instagram"
                                value={formData.instagram}
                                onChange={handleChange}
                                type="text"
                                placeholder="https://instagram.com/..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <Linkedin className="absolute left-4 top-9 text-gray-400" size={18} />
                            <input
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                type="text"
                                placeholder="https://linkedin.com/in/..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all"
                            />
                        </div>
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">X (Twitter)</label>
                            <Twitter className="absolute left-4 top-9 text-gray-400" size={18} />
                            <input
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                type="text"
                                placeholder="https://x.com/..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="md:col-span-2 flex items-center justify-end gap-4">
                    {message && (
                        <div className={`text-sm font-medium px-4 py-2 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-gradient-to-r from-navy to-blue-900 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70 disabled:hover:scale-100"
                    >
                        {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Kaydet ve Güncelle
                    </button>
                </div>
            </form>
        </div>
    );
}
