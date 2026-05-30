"use client";

import { useActionState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { addToCartAction } from "./actions";

export default function AddToCartButton({
  productId,
  name,
  price,
  image,
}: {
  productId: string;
  name: string;
  price: number;
  image: string;
}) {
  const [state, action, pending] = useActionState(
    () => addToCartAction({ productId, name, price, image }),
    { success: false }
  );

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiShoppingCart className="w-5 h-5" />
        {pending ? "Ekleniyor..." : state.success ? "Sepete Eklendi ✓" : "Sepete Ekle"}
      </button>
    </form>
  );
}
