import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-8">Kayıt Ol</h1>
        <RegisterForm />
        <p className="text-center text-sm text-gray-500 mt-6">
          Zaten hesabın var mı?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
