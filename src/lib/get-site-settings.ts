import { getPrisma } from '@/lib/prisma';

export async function getSiteSettings() {
    try {
        const prisma = getPrisma();
        const settings = await prisma.siteSettings.findFirst();

        // Return default values if no settings found
        if (!settings) {
            return {
                phone1: '+90 544 375 21 10',
                phone2: '+90 532 497 81 09',
                email: 'info@doubletsoft.com',
                address: 'Konya, Türkiye'
            };
        }

        return settings;
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return {
            phone1: '+90 544 375 21 10',
            phone2: '+90 532 497 81 09',
            email: 'info@doubletsoft.com',
            address: 'Konya, Türkiye'
        };
    }
}
