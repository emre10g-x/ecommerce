"use client";

import Link from "next/link";
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { formatPrice } from "@/lib/utils";
import { updateQuantityAction, removeItemAction } from "./actions";
import { useOptimistic, startTransition } from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartContent({ items: initialItems }: { items: CartItem[] }) {
  const [items, setItems] = useOptimistic(initialItems);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  async function handleUpdateQuantity(productId: string, newQuantity: number) {
    startTransition(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId
            ? { ...i, quantity: Math.max(0, newQuantity) }
            : i
        ).filter((i) => i.quantity > 0)
      );
    });
    await updateQuantityAction(productId, newQuantity);
  }

  async function handleRemove(productId: string) {
    startTransition(() => {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    });
    await removeItemAction(productId);
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <FiShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sepetin Boş</h2>
        <p className="text-gray-500 mb-8">Alışverişe başlamak için ürünleri keşfedin.</p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.productId}`}
                className="font-semibold text-gray-900 hover:text-blue-600 truncate block"
              >
                {item.name}
              </Link>
              <p className="text-blue-600 font-bold mt-1">{formatPrice(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
            <div className="text-right min-w-[80px]">
              <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
            </div>
            <button
              onClick={() => handleRemove(item.productId)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 h-fit sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sipariş Özeti</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Ürünler ({itemCount} adet)</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Kargo</span>
            <span className="text-green-600">Ücretsiz</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Toplam</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-6 block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Ödemeye Geç
        </Link>
      </div>
    </div>
  );
}
