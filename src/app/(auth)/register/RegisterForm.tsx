"use client";

import { useActionState } from "react";
import { registerAction } from "./actions";

export default function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, null);

  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{state.error}</p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {pending ? "Kaydediliyor..." : "Kayıt Ol"}
      </button>
    </form>
  );
}
