"use client";

import { useState, useEffect } from "react";
import { Plus, PenTool, Trash2, Search, Edit } from "lucide-react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Make sure to export db from your firebase config
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    createdAt: any;
    coverImage?: string;
}

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Real-time fetching from Firestore
    useEffect(() => {
        const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedPosts: BlogPost[] = [];
            snapshot.forEach((doc) => {
                fetchedPosts.push({ id: doc.id, ...doc.data() } as BlogPost);
            });
            setPosts(fetchedPosts);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching blog posts:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) {
            try {
                await deleteDoc(doc(db, "blog", id));
            } catch (error) {
                console.error("Silme hatası:", error);
                alert("Silinirken bir hata oluştu.");
            }
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="text-accent-blue p-8">Yazılar yükleniyor...</div>;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-navy">Blog Yazıları</h1>
                    <p className="text-gray-500 text-sm mt-1">Sitenizdeki blog içeriklerini buradan yönetebilirsiniz.</p>
                </div>
                <Link href="/admin/blog/new">
                    <button className="flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-colors">
                        <Plus size={20} />
                        Yeni Yazı Ekle
                    </button>
                </Link>
            </div>

            {/* Search & List */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6">
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Blog yazılarında ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/3 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                    />
                </div>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                        <PenTool size={48} className="opacity-20 mb-4" />
                        <p>Henüz hiç blog yazısı eklenmemiş.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="border border-gray-100 rounded-2xl p-4 hover:shadow-md transition-all group bg-gray-50/50">
                                {post.coverImage && (
                                    <div className="h-40 w-full mb-4 rounded-xl bg-gray-200 overflow-hidden relative">
                                        {/* Next/Image usage would be better but simple img is easier for generic URLs */}
                                        <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full" />
                                    </div>
                                )}
                                <h3 className="font-bold text-navy mb-2 line-clamp-1">{post.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10">{post.excerpt}</p>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200/60">
                                    <span className="text-xs text-gray-400">
                                        {post.createdAt?.seconds ? format(new Date(post.createdAt.seconds * 1000), "d MMM yyyy", { locale: tr }) : "-"}
                                    </span>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/blog/edit/${post.id}`}>
                                            <button className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors" title="Düzenle">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
