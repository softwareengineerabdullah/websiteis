"use client";

import { useState, useEffect } from "react";
import { Plus, Users, Trash2, Search, ExternalLink } from "lucide-react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

interface Reference {
    id: string;
    name: string;
    logoUrl?: string;
    websiteUrl?: string;
    createdAt: any;
}

export default function AdminReferencesPage() {
    const [references, setReferences] = useState<Reference[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu referansı silmek istediğinize emin misiniz?")) {
            await deleteDoc(doc(db, "references", id));
        }
    };

    const filteredRefs = references.filter(ref =>
        ref.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-accent-blue p-8">Yükleniyor...</div>;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-navy">Referanslar</h1>
                    <p className="text-gray-500 text-sm mt-1">İş ortaklarınızı ve referanslarınızı yönetin.</p>
                </div>
                <Link href="/admin/references/new">
                    <button className="flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-colors">
                        <Plus size={20} />
                        Yeni Referans Ekle
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Referans ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                    />
                </div>

                {filteredRefs.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                        <Users size={48} className="opacity-20 mb-4" />
                        <p>Henüz referans eklenmemiş.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredRefs.map((ref) => (
                            <div key={ref.id} className="group relative border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all bg-white flex flex-col items-center justify-center gap-4">
                                <div className="w-20 h-20 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                    {ref.logoUrl ? (
                                        <img src={ref.logoUrl} alt={ref.name} className="object-contain max-h-full max-w-full" />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                            Logosuz
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-bold text-navy text-sm text-center">{ref.name}</h3>

                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                    {ref.websiteUrl && (
                                        <a href={ref.websiteUrl} target="_blank" className="p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                    <button onClick={() => handleDelete(ref.id)} className="p-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-100">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
