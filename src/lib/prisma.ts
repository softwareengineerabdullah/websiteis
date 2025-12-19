import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const getPrisma = () => {
    // Safety check: specific variable check or dummy return if critical envs are missing
    // However, simplest robust way is try-catch around instantiation
    if (!globalForPrisma.prisma) {
        try {
            globalForPrisma.prisma = new PrismaClient()
        } catch (error) {
            console.warn('Failed to initialize Prisma Client (likely during build phase):', error);
            // Return a proxy/dummy if needed, or let re-try happen at runtime.
            // But returning undefined might crash consumers.
            // Better to throw a runtime error ONLY when used, not when initialized.
            throw new Error('Prisma Client initialization failed. Check database configuration.');
        }
    }
    return globalForPrisma.prisma
}
