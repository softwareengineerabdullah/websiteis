"use client";

import { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
    const [isOpen, setIsOpen] = useState(false);

    const handleWhatsAppClick = (number: string) => {
        // Basic cleaning of the number
        const cleanNumber = number.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanNumber}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-xl p-4 w-72 border border-stroke mb-2"
                    >
                        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                            <h3 className="font-semibold text-navy">Bize Ulaşın</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <p className="text-sm text-text-gray mb-4">
                            Size nasıl yardımcı olabiliriz?
                        </p>
                        <div className="space-y-3">
                            <button
                                onClick={() => handleWhatsAppClick("+90 544 375 21 10")}
                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 text-left group transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                    <MessageCircle size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-navy text-sm">Kurumsal Hat 1</p>
                                    <p className="text-xs text-text-gray">+90 544 375 21 10</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleWhatsAppClick("+90 532 497 81 09")}
                                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-left group transition-colors border border-transparent hover:border-gray-200"
                            >
                                <div className="w-10 h-10 rounded-full bg-white text-navy border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Phone size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-navy text-sm">Kurumsal Hat 2</p>
                                    <p className="text-xs text-text-gray">+90 532 497 81 09</p>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 ${isOpen ? 'bg-navy rotate-90' : 'bg-[#25D366] animate-pulse-slow'
                    }`}
            >
                {isOpen ? (
                    <X size={28} className="text-white" />
                ) : (
                    <MessageCircle size={32} className="text-white" />
                )}
            </motion.button>
        </div>
    );
}
