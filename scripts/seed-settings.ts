import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const settingsCount = await prisma.siteSettings.count();

    if (settingsCount === 0) {
        await prisma.siteSettings.create({
            data: {
                phone1: '+90 544 375 21 10',
                phone2: '+90 532 497 81 09',
                email: 'info@doubletsoft.com',
                address: 'Teknopark İstanbul, Pendik/İstanbul',
            },
        });
        console.log('Default site settings created.');
    } else {
        console.log('Site settings already exist.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
