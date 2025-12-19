"use client";

import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ComingSoon() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-5xl md:text-7xl font-bold text-navy mb-6">Çok Yakında</h1>
                <p className="text-xl text-text-gray mb-10 max-w-lg mx-auto">
                    Bu sayfayı sizler için hazırlıyoruz. Güncellemeler için takipte kalın!
                </p>
                <Link href="/">
                    <Button size="lg" variant="primary">
                        <ArrowLeft className="mr-2 w-5 h-5" /> Ana Sayfaya Dön
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
