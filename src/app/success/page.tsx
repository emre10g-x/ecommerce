import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <FiCheckCircle className="w-20 h-20 mx-auto text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h1>
      <p className="text-gray-600 mb-2">
        Siparişiniz başarıyla oluşturuldu. Kısa sürede kargoya verilecektir.
      </p>
      {session_id && (
        <p className="text-sm text-gray-400 mb-8">
          Sipariş numarası: <span className="font-mono">{session_id.slice(0, 12)}</span>
        </p>
      )}
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
      >
        Alışverişe Devam Et
      </Link>
    </div>
  );
}
