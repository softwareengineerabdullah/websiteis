"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    MessageSquare,
    Settings,
    LogOut,
    PenTool,
    Users,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Auth Protection
    useEffect(() => {
        if (!loading && !user) {
            router.push("/admin/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-navy">Yükleniyor...</div>;
    if (!user) return null;

    const navItems = [
        { name: "Mesajlar", href: "/admin/messages", icon: MessageSquare },
        { name: "Blog Yazıları", href: "/admin/blog", icon: PenTool },
        { name: "Referanslar", href: "/admin/references", icon: Users },
        { name: "Site Ayarları", href: "/admin/settings", icon: Settings },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={{ x: 0 }}
                animate={{ x: isSidebarOpen ? 0 : -280 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed lg:sticky top-0 left-0 h-screen w-[280px] bg-white border-r border-gray-100 z-40 flex flex-col shadow-2xl lg:shadow-none ${!isSidebarOpen && 'hidden lg:flex'}`}
            >
                <div className="p-8 flex flex-col items-center border-b border-gray-50">
                    <div className="w-16 h-16 relative mb-4">
                        <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
                    </div>
                    <span className="text-xl font-bold text-navy tracking-tight">Yönetim Paneli</span>
                    <span className="text-xs text-gray-400 mt-1">Double T Soft v1.0</span>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href} onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}>
                                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive ? 'bg-navy text-white shadow-lg shadow-navy/20' : 'text-gray-500 hover:bg-gray-50 hover:text-navy'}`}>
                                    <item.icon size={20} className={isActive ? 'text-accent-blue' : 'group-hover:text-accent-blue transition-colors'} />
                                    <span className="font-medium">{item.name}</span>
                                    {isActive && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 rounded-full bg-accent-blue ml-auto" />}
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-3.5 w-full rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Çıkış Yap</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 flex items-center justify-between lg:hidden">
                    <button onClick={toggleSidebar} className="p-2 -ml-2 text-gray-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-navy">Yönetim Paneli</span>
                    <div className="w-8" />
                </header>

                <div className="p-6 lg:p-10 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
