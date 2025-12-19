"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    createdAt: any;
    coverImage?: string;
    author?: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <div className="bg-soft-white min-h-screen pb-20">
            {/* Header Section */}
            <div className="bg-navy text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-accent-blue/10 backdrop-blur-3xl"></div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-accent-blue font-bold tracking-widest text-sm uppercase bg-white/5 px-4 py-2 rounded-full border border-white/10 mb-6 inline-block">
                            Blog & Haberler
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                            Dijital Dünyadan <br />
                            <span className="text-accent-blue">İçgörüler ve Haberler</span>
                        </h1>
                        <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                            Teknoloji, yazılım trendleri ve işletmenizi büyütecek ipuçları hakkında en güncel makalelerimizi keşfedin.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Blog List Section */}
            <div className="container mx-auto px-6 -mt-10 relative z-20">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue"></div>
                    </div>
                ) : posts.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-3xl p-12 text-center shadow-card border border-gray-100"
                    >
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-navy mb-2">Henüz yazı bulunmuyor</h3>
                        <p className="text-gray-500">Çok yakında harika içeriklerle burada olacağız.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {posts.map((post) => (
                            <motion.article
                                key={post.id}
                                variants={itemVariants}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-card hover:-translate-y-2 transition-all duration-300 border border-gray-100 group flex flex-col h-full"
                            >
                                <Link href={`/blog/${post.id}`} className="block relative h-56 overflow-hidden">
                                    {post.coverImage ? (
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-navy/5 flex items-center justify-center">
                                            <BookOpen size={48} className="text-navy/10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className="text-accent-blue" />
                                            {post.createdAt?.seconds
                                                ? format(new Date(post.createdAt.seconds * 1000), "d MMM yyyy", { locale: tr })
                                                : "Tarih Yok"}
                                        </div>
                                        {/* Optional Category if available in future */}
                                        {/* <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span>Teknoloji</span> */}
                                    </div>

                                    <Link href={`/blog/${post.id}`}>
                                        <h2 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-accent-blue transition-colors">
                                            {post.title}
                                        </h2>
                                    </Link>

                                    <p className="text-text-gray text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-navy font-bold text-xs">
                                                DT
                                            </div>
                                            <span className="text-xs font-medium text-navy">Double T Soft</span>
                                        </div>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="flex items-center gap-1 text-xs font-bold text-accent-blue hover:gap-2 transition-all p-2"
                                        >
                                            DEVAMINI OKU <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
