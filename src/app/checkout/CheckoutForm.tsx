"use client";

import { useState } from "react";
import { cities } from "@/lib/cities";

export default function CheckoutForm({
  total,
  userId,
  email: userEmail,
  name: userName,
}: {
  total: number;
  userId: string;
  email: string;
  name: string;
}) {
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [form, setForm] = useState({
    name: userName,
    email: userEmail,
    district: "",
    address: "",
    postalCode: "",
  });

  const districts = cities.find((c) => c.name === selectedCity)?.districts ?? [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, city: selectedCity, userId }),
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

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Teslimat Bilgileri</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">İl</label>
        <select
          required
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setForm({ ...form, district: "" });
          }}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          <option value="">İl seçin</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
        <select
          required
          value={form.district}
          onChange={(e) => setForm({ ...form, district: e.target.value })}
          disabled={!selectedCity}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:text-gray-400"
        >
          <option value="">İlçe seçin</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
        <textarea
          required
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Posta Kodu</label>
        <input
          type="text"
          required
          value={form.postalCode}
          onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

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
