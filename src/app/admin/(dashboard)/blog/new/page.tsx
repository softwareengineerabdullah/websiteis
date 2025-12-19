"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "", // This would ideally be a rich text editor, but a textarea for now
        coverImage: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "blog"), {
                ...formData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            router.push("/admin/blog");
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Yazı oluşturulurken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/blog" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-navy">Yeni Blog Yazısı</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-bold text-navy mb-2">Başlık</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none font-bold text-lg"
                        placeholder="Örn: Kafe Yönetim Sistemlerinin Faydaları"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy mb-2">Kısa Özet (Excerpt)</label>
                    <textarea
                        rows={2}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none resize-none"
                        placeholder="Listeleme sayfasında görünecek kısa açıklama..."
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy mb-2">Görsel URL (Opsiyonel)</label>
                    <input
                        type="url"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none text-sm font-mono"
                        placeholder="https://..."
                        value={formData.coverImage}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy mb-2">İçerik</label>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <textarea
                            rows={15}
                            required
                            className="w-full bg-transparent border-none focus:ring-0 outline-none resize-y"
                            placeholder="Yazı içeriğinizi buraya yazın... (Markdown destekler)"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-navy to-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Yayınla
                    </button>
                </div>
            </form>
        </div>
    );
}
