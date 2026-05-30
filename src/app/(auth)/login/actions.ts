"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const redirectTo = formData.get("redirect") as string || "/";

  if (!email || !password) {
    return { error: "E-posta ve şifre gerekli" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { error: "E-posta veya şifre hatalı" };
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return { error: "E-posta veya şifre hatalı" };
  }

  await createSession({ id: user.id, email: user.email, name: user.name });
  redirect(redirectTo);
}
