import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FiUser, FiMail, FiCalendar } from "react-icons/fi";

export default async function ProfilePage() {
  const user = await requireAuth();
  const fullUser = await prisma.user.findUnique({ where: { id: user.id } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Hesabım</h1>
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <FiUser className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-400">Ad Soyad</p>
              <p className="font-medium text-gray-900">{fullUser?.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FiMail className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-400">E-posta</p>
              <p className="font-medium text-gray-900">{fullUser?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <FiCalendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-400">Kayıt Tarihi</p>
              <p className="font-medium text-gray-900">
                {fullUser?.createdAt.toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
