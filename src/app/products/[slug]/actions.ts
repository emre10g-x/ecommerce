"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface AddToCartInput {
  productId: string;
  name: string;
  price: number;
  image: string;
}

export async function addToCartAction(input: AddToCartInput) {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart")?.value;
  const items: Array<{ productId: string; name: string; price: number; image: string; quantity: number }> =
    cart ? JSON.parse(cart) : [];

  const existing = items.find((i) => i.productId === input.productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...input, quantity: 1 });
  }

  cookieStore.set("cart", JSON.stringify(items), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  revalidatePath("/cart");
  return { success: true };
}
