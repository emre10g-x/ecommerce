import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, logout } from "@/lib/auth";
import { FiPackage, FiUser, FiLogOut, FiHome } from "react-icons/fi";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSession();
  if (!user) redirect("/login");

  const links = [
    { href: "/dashboard/orders", label: "Siparişlerim", icon: FiPackage },
    { href: "/dashboard/profile", label: "Hesabım", icon: FiUser },
    { href: "/", label: "Ana Sayfa", icon: FiHome },
  ];

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block">
        <div className="mb-8">
          <p className="text-sm text-gray-500">Hoş geldin,</p>
          <p className="font-semibold text-gray-900">{user.name}</p>
        </div>
        <nav className="space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
          <form action={async () => { "use server"; await logout(); }}>
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <FiLogOut className="w-5 h-5" />
              Çıkış Yap
            </button>
          </form>
        </nav>
      </aside>
      <div className="flex-1 p-6 md:p-8">{children}</div>
      {/* Mobile nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex-1 flex flex-col items-center py-3 text-xs text-gray-500 hover:text-blue-600"
          >
            <link.icon className="w-5 h-5 mb-1" />
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
