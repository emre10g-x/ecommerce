import { getCart } from "@/lib/cart";
import CartContent from "./CartContent";

export default async function CartPage() {
  const cartItems = await getCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>
      <CartContent items={cartItems} />
    </div>
  );
}
