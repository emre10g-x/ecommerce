"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateQuantityAction(productId: string, quantity: number) {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart")?.value;
  if (!cart) return { success: false };

  const items = JSON.parse(cart);
  const item = items.find((i: { productId: string }) => i.productId === productId);
  if (item) {
    if (quantity <= 0) {
      return removeItemAction(productId);
    }
    item.quantity = quantity;
  }

  cookieStore.set("cart", JSON.stringify(items), { path: "/", maxAge: 60 * 60 * 24 * 7 });
  revalidatePath("/cart");
  return { success: true };
}

export async function removeItemAction(productId: string) {
  const cookieStore = await cookies();
  const cart = cookieStore.get("cart")?.value;
  if (!cart) return { success: false };

  const items = JSON.parse(cart).filter(
    (i: { productId: string }) => i.productId !== productId
  );

  cookieStore.set("cart", JSON.stringify(items), { path: "/", maxAge: 60 * 60 * 24 * 7 });
  revalidatePath("/cart");
  return { success: true };
}
