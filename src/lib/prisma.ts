import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const getPrisma = () => {
    // Safety check: specific variable check or dummy return if critical envs are missing
    // However, simplest robust way is try-catch around instantiation
    if (!globalForPrisma.prisma) {
        try {
            globalForPrisma.prisma = new PrismaClient()
        } catch (error) {
            console.warn('Prisma Client failed to initialize. Returning mock for build phase.');
            // Return a safe mock using Proxy to prevent crashes on property access
            globalForPrisma.prisma = new Proxy({}, {
                get: (target, prop) => {
                    return new Proxy({}, {
                        get: (target, prop) => {
                            return async () => null; // Returns null for any prisma.model.method() call
                        }
                    });
                }
            }) as unknown as PrismaClient;
        }
    }
    return globalForPrisma.prisma
}
