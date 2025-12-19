import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { notFound } from 'next/navigation';
import { ArrowLeft, Tag } from 'lucide-react';

// Correctly typing params for Next.js 15+
type Props = {
    params: Promise<{ id: string }>;
};

// Prevent build-time static generation to avoid DB connection errors during build
export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({ params }: Props) {
    const { id } = await params;

    // Dynamically import prisma to ensure it runs ONLY at runtime, not build time
    const { prisma } = await import('@/lib/prisma');

    const project = await (prisma.project as any).findUnique({
        where: { id },
        include: { images: true }
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-soft-white pt-24 pb-20">
            <div className="container mx-auto px-6">
                <Link href="/" className="inline-block mb-8">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-accent-blue transition-colors">
                        <ArrowLeft className="mr-2" size={20} /> Ana Sayfaya Dön
                    </Button>
                </Link>

                <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-stroke">
                    <div className="relative h-[400px] w-full bg-navy/5">
                        {project.imageUrl ? (
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-navy/20 font-bold text-6xl">
                                Double T
                            </div>
                        )}
                        <div className="absolute top-6 left-6">
                            {project.category && (
                                <span className="bg-white/90 backdrop-blur-sm text-navy px-4 py-2 rounded-full text-sm font-semibold shadow-sm flex items-center gap-2">
                                    <Tag size={16} className="text-accent-blue" />
                                    {project.category}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <h1 className="text-4xl font-bold text-navy mb-6">{project.title}</h1>

                        <div className="prose prose-lg max-w-none text-text-gray mb-12">
                            <p className="whitespace-pre-wrap leading-relaxed">{project.description}</p>
                        </div>

                        {/* Gallery Section */}
                        {project.images.length > 0 && (
                            <div>
                                <h3 className="text-2xl font-bold text-navy mb-6">Proje Galerisi</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {project.images.map((img: any) => (
                                        <div key={img.id} className="relative aspect-video rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-md">
                                            <Image
                                                src={img.url}
                                                alt={`${project.title} - Galeri`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
