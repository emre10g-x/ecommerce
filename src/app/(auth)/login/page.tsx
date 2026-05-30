import { Suspense } from "react";
import Link from "next/link";
import LoginForm from "./LoginForm";

function LoginFormWrapper() {
  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-8">Giriş Yap</h1>
        <Suspense fallback={<div className="text-center text-gray-400">Yükleniyor...</div>}>
          <LoginFormWrapper />
        </Suspense>
        <p className="text-center text-sm text-gray-500 mt-6">
          Hesabın yok mu?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
}
