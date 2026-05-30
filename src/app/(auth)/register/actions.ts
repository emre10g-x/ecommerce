"use server";

import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerAction(_prev: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "Tüm alanlar gerekli" };
  }

  if (password.length < 6) {
    return { error: "Şifre en az 6 karakter olmalı" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Bu e-posta zaten kayıtlı" };
  }

  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  });

  await createSession({ id: user.id, email: user.email, name: user.name });
  redirect("/");
}
