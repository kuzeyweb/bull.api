import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const seedCategoriesTable = async (parentId: any) => {
    await prisma.categories.createMany({
        data: [
            {
                application_id: 1,
                name: "Kadın",
                slug: "kadin",
                parent_id: parentId
            },
            {
                application_id: 1,
                name: "Erkek",
                slug: "erkek",
                parent_id: parentId
            },
            {
                application_id: 1,
                name: "Giyim",
                slug: "kadin-giyim",
                parent_id: 1
            },
            {
                application_id: 1,
                name: "Ayakkabı",
                slug: "kadin-ayakkabi",
                parent_id: 1
            },
            {
                application_id: 1,
                name: "Aksesuar & Çanta",
                slug: "kadin-aksesuar-and-canta",
                parent_id: 1
            },
            {
                application_id: 1, // 6
                name: "Giyim",
                slug: "erkek-giyim",
                parent_id: 2
            },
            {
                application_id: 1, // 7
                name: "Ayakkabı",
                slug: "erkek-ayakkabi",
                parent_id: 2
            },
            {
                application_id: 1, // 8
                name: "Saat & Aksesuar",
                slug: "erkek-saat-and-aksesuar",
                parent_id: 2
            },
            {
                application_id: 1,
                name: "T-Shirt",
                slug: "kadin-tshirt",
                parent_id: 3
            },
            {
                application_id: 1,
                name: "Gömlek",
                slug: "kadin-gomlek",
                parent_id: 3
            },
            {
                application_id: 1,
                name: "Pantolon",
                slug: "kadin-pantolon",
                parent_id: 3
            },
            {
                application_id: 1,
                name: "Topuklu Ayakkabı",
                slug: "kadin-topuklu-ayakkabi",
                parent_id: 4
            },
            {
                application_id: 1,
                name: "Sneaker",
                slug: "kadin-sneaker",
                parent_id: 4
            },
            {
                application_id: 1,
                name: "Günlük Ayakkabi",
                slug: "kadin-gunluk-ayakkabi",
                parent_id: 4
            },
            {
                application_id: 1,
                name: "Babet",
                slug: "kadin-babet",
                parent_id: 4
            },
            {
                application_id: 1,
                name: "Sandalet",
                slug: "kadin-sandalet",
                parent_id: 4
            },
            {
                application_id: 1,
                name: "Bot",
                slug: "kadin-bot",
                parent_id: 4
            },
            {
                application_id: 1,
                name: "Çanta",
                slug: "kadin-canta",
                parent_id: 5
            },
            {
                application_id: 1,
                name: "Saat",
                slug: "kadin-saat",
                parent_id: 5
            },
            {
                application_id: 1,
                name: "Takı",
                slug: "kadin-taki",
                parent_id: 5
            },
            {
                application_id: 1,
                name: "Şapka",
                slug: "kadin-sapka",
                parent_id: 5
            },
            {
                application_id: 1,
                name: "Cüzdan",
                slug: "kadin-cuzdan",
                parent_id: 5
            },
            {
                application_id: 1,
                name: "T-Shirt",
                slug: "erkek-tshirt",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Şort",
                slug: "erkek-sort",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Gömlek",
                slug: "erkek-gomlek",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Eşofman",
                slug: "erkek-esofman",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Pantolon",
                slug: "erkek-pantolon",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Pantolon",
                slug: "erkek-ceket",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Yelek",
                slug: "erkek-yelek",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Mont",
                slug: "erkek-mont",
                parent_id: 6
            },
            {
                application_id: 1,
                name: "Spor Ayakkabı",
                slug: "erkek-spor-ayakkabi",
                parent_id: 7
            },
            {
                application_id: 1,
                name: "Günlük Ayakkabı",
                slug: "erkek-gunluk-ayakkabi",
                parent_id: 7
            },
            {
                application_id: 1,
                name: "Yürüyüş Ayakkabısı",
                slug: "erkek-yuruyus-ayakkabisi",
                parent_id: 7
            },
            {
                application_id: 1,
                name: "Sneaker",
                slug: "erkek-sneaker",
                parent_id: 7
            },
            {
                application_id: 1,
                name: "Klasik",
                slug: "erkek-klasik-ayakkabi",
                parent_id: 7
            },
            {
                application_id: 1,
                name: "Bot",
                slug: "erkek-bot",
                parent_id: 7
            },
            {
                application_id: 1,
                name: "Saat",
                slug: "erkek-saat",
                parent_id: 8
            },
            {
                application_id: 1,
                name: "Güneş Gözlüğü",
                slug: "erkek-gunes-gozlugu",
                parent_id: 8
            },
            {
                application_id: 1,
                name: "Cüzdan",
                slug: "erkek-cuzdan",
                parent_id: 8
            },
            {
                application_id: 1,
                name: "Kemer",
                slug: "erkek-kemer",
                parent_id: 8
            },
            {
                application_id: 1,
                name: "Çanta",
                slug: "erkek-canta",
                parent_id: 8
            },
            {
                application_id: 1,
                name: "Şapka",
                slug: "erkek-sapka",
                parent_id: 8
            },
            {
                application_id: 1,
                name: "Bileklik",
                slug: "erkek-bileklik",
                parent_id: 8
            },
        ]
    });
    prisma.$disconnect();
}