"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, User } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import ReactMarkdown from 'react-markdown';
import { motion } from "framer-motion";

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    createdAt: any;
    coverImage?: string;
}

export default function BlogPostDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const docRef = doc(db, "blog_posts", id as string);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setPost({ id: doc.id, ...doc.data() } as BlogPost);
            } else {
                console.log("No such document!");
                // Optionally redirect to 404
                // router.push('/404');
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching document:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [id, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-soft-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-blue"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen bg-soft-white flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-bold text-navy mb-4">Yazı Bulunamadı</h1>
                <p className="text-gray-500 mb-6">Aradığınız blog yazısı silinmiş veya taşınmış olabilir.</p>
                <Link href="/blog" className="px-6 py-3 bg-accent-blue text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                    Blog Listesine Dön
                </Link>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-soft-white pb-20">
            {/* Hero Section with Cover Image */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                {post.coverImage ? (
                    <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-navy flex items-center justify-center">
                        <span className="text-white/20 text-9xl font-bold">Blog</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto max-w-4xl">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full text-sm font-medium border border-white/10 w-fit"
                        >
                            <ArrowLeft size={16} /> Tüm Yazılar
                        </Link>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        >
                            {post.title}
                        </motion.h1>

                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/20">
                                    DT
                                </div>
                                <span>Double T Soft</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-accent-blue" />
                                {post.createdAt?.seconds
                                    ? format(new Date(post.createdAt.seconds * 1000), "d MMMM yyyy", { locale: tr })
                                    : "Tarih Yok"}
                            </div>
                            {/* <div className="flex items-center gap-2">
                                <Clock size={16} className="text-accent-blue" />
                                5 dk okuma
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-4xl -mt-10 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-card"
                        >
                            <div className="prose prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:text-navy prose-p:text-text-gray prose-a:text-accent-blue prose-img:rounded-2xl">
                                <ReactMarkdown>
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar / Share Actions (Desktop) */}
                    <div className="lg:w-24 hidden lg:flex flex-col gap-4 sticky top-24 h-fit">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-4 text-gray-400">
                            <span className="text-xs font-bold uppercase rotate-180 writing-vertical-lr py-2">Paylaş</span>
                            <div className="w-px h-8 bg-gray-200"></div>
                            <button className="hover:text-[#1877F2] hover:scale-110 transition-all"><Facebook size={20} /></button>
                            <button className="hover:text-[#1DA1F2] hover:scale-110 transition-all"><Twitter size={20} /></button>
                            <button className="hover:text-[#0A66C2] hover:scale-110 transition-all"><Linkedin size={20} /></button>
                            <button className="hover:text-navy hover:scale-110 transition-all"><Share2 size={20} /></button>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
