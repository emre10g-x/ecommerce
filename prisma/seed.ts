import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

const products = [
  {
    name: "Klasik Beyaz Tişört",
    slug: "klasik-beyaz-tisort",
    description: "Pamuklu, rahat kesim, her kombin için ideal beyaz tişört.",
    price: 29900,
    image: "/images/tshirt-white.jpg",
    category: "giyim",
  },
  {
    name: "Spor Ayakkabı Siyah",
    slug: "spor-ayakkabi-siyah",
    description: "Hafif, esnek tabanlı, günlük kullanım için spor ayakkabı.",
    price: 89900,
    image: "/images/sneakers-black.jpg",
    category: "ayakkabi",
  },
  {
    name: "Deri Cüzdan",
    slug: "deri-cuzdan",
    description: "Hakiki deri, ince tasarım, 8 kartlık cüzdan.",
    price: 49900,
    image: "/images/wallet-leather.jpg",
    category: "aksesuar",
  },
  {
    name: "Bluetooth Kulaklık",
    slug: "bluetooth-kulaklik",
    description: "Gürültü engellemeli, 30 saat pil ömrü, kablosuz kulaklık.",
    price: 149900,
    image: "/images/headphones.jpg",
    category: "elektronik",
  },
  {
    name: "Kol Saati - Klasik",
    slug: "kol-saati-klasik",
    description: "Paslanmaz çelik kasa, deri kayış, su geçirmez kol saati.",
    price: 249900,
    image: "/images/watch-classic.jpg",
    category: "aksesuar",
  },
  {
    name: "Sırt Çantası",
    slug: "sirt-cantasi",
    description: "Su geçirmez, 25L, laptop bölmeli günlük sırt çantası.",
    price: 69900,
    image: "/images/backpack.jpg",
    category: "aksesuar",
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
