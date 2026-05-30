import Link from "next/link";
import { getCart } from "@/lib/cart";
import { getSession } from "@/lib/auth";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default async function Navbar() {
  const cart = await getCart();
  const user = await getSession();
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            TrendyShop
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              Ürünler
            </Link>
            {user ? (
              <Link
                href="/dashboard/orders"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <FiUser className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">{user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-900 text-sm">
                Giriş Yap
              </Link>
            )}
            <Link href="/cart" className="relative text-gray-600 hover:text-gray-900">
              <FiShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
