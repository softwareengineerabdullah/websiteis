"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Save, ArrowLeft, Loader2, UploadCloud, X } from "lucide-react";
import Link from "next/link";

export default function NewReferencePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        websiteUrl: "",
        logoUrl: ""
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.includes("image")) {
            alert("Lütfen geçerli bir resim dosyası seçin (PNG, JPG).");
            return;
        }

        setUploading(true);
        const storageRef = ref(storage, `reference_logos/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Yükleme hatası:", error);
                alert("Logo yüklenirken bir sorun oluştu.");
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData((prev) => ({ ...prev, logoUrl: downloadURL }));
                    setUploading(false);
                });
            }
        );
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({ ...prev, logoUrl: "" }));
        setUploadProgress(0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addDoc(collection(db, "references"), {
                ...formData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            router.push("/admin/references");
        } catch (error) {
            console.error("Error creating reference:", error);
            alert("Referans eklenirken hata oluştu.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/references" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-3xl font-bold text-navy">Yeni Referans Ekle</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm space-y-6">
                <div>
                    <label className="block text-sm font-bold text-navy mb-2">Firma Adı</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none font-bold text-lg"
                        placeholder="Örn: Google Inc."
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy mb-2">Web Sitesi (Opsiyonel)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none text-sm"
                        placeholder="https://..."
                        value={formData.websiteUrl}
                        onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy mb-2">Firma Logosu</label>

                    {!formData.logoUrl ? (
                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 transition-colors hover:border-accent-blue/50 hover:bg-gray-50 text-center relative">
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                disabled={uploading}
                            />
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                {uploading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={32} />
                                        <span className="text-sm font-medium">Yükleniyor... %{Math.round(uploadProgress)}</span>
                                    </>
                                ) : (
                                    <>
                                        <UploadCloud size={40} />
                                        <span className="text-sm font-medium text-gray-600">Logo seçmek için tıklayın</span>
                                        <span className="text-xs text-gray-400">PNG, JPG (Transparent önerilir)</span>
                                    </>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-white p-4 h-40 w-full flex items-center justify-center">
                            <img
                                src={formData.logoUrl}
                                alt="Logo Önizleme"
                                className="max-w-full max-h-full object-contain"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 p-1.5 bg-gray-100 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-bold text-navy mb-2">veya Logo URL Konumu (Opsiyonel)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue outline-none text-sm"
                        placeholder="https://example.com/logo.png"
                        value={formData.logoUrl}
                        onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        * Yükleme çalışmazsa veya hazır bir linkiniz varsa buraya yapıştırabilirsiniz.
                    </p>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="flex items-center gap-2 bg-gradient-to-r from-navy to-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-70"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Kaydet
                    </button>
                </div>
            </form>
        </div>
    );
}
