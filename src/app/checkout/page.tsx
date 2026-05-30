import { redirect } from "next/navigation";
import { getCart } from "@/lib/cart";
import { getSession } from "@/lib/auth";
import { formatPrice } from "@/lib/utils";
import CheckoutForm from "./CheckoutForm";

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/login?redirect=/checkout");

  const cartItems = await getCart();
  if (cartItems.length === 0) redirect("/cart");

  const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Ödeme</h1>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Sipariş Özeti</h2>
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Toplam</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <CheckoutForm total={total} userId={user.id} email={user.email} name={user.name} />
      </div>
    </div>
  );
}
