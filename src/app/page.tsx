import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            TrendyShop'a Hoş Geldiniz
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            En yeni ürünler, en uygun fiyatlarla. Hemen alışverişe başlayın!
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Yeni Ürünler</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
