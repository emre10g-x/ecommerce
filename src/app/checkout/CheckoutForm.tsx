"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutForm({ total }: { total: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Bir hata oluştu: " + (data.error || "Bilinmeyen hata"));
      }
    } catch {
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    { label: "Ad Soyad", name: "name", type: "text" },
    { label: "E-posta", name: "email", type: "email" },
    { label: "Adres", name: "address", type: "text" },
    { label: "Şehir", name: "city", type: "text" },
    { label: "Posta Kodu", name: "postalCode", type: "text" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Teslimat Bilgileri</h2>
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            required
            value={form[field.name]}
            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
      >
        {loading ? "Yönlendiriliyor..." : `Ödemeye Git - ${(total / 100).toFixed(2)} TL`}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Ödeme Stripe tarafından güvenli bir şekilde işlenir. Kart bilgileriniz bizde saklanmaz.
      </p>
    </form>
  );
}
