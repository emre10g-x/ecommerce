import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { FiPackage } from "react-icons/fi";

export default async function OrdersPage() {
  const user = await requireAuth();
  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <FiPackage className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Henüz siparişin yok</h2>
        <p className="text-gray-500 mb-8">Alışverişe başla, siparişlerin burada görünecek.</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Siparişlerim</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white border border-gray-200 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  #{order.id.slice(0, 8)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status === "paid" ? "Ödendi" : "Beklemede"}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.name} x {item.quantity}
                  </span>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-bold">
              <span>Toplam</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>Teslimat: {order.address}, {order.district}/{order.city} {order.postalCode}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
