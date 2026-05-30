"use server";

import { cookies } from "next/headers";

export interface CartItemData {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CART_COOKIE = "cart";

function parseCart(value: string): CartItemData[] {
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export async function getCart(): Promise<CartItemData[]> {
  const cookieStore = await cookies();
  const cart = cookieStore.get(CART_COOKIE)?.value;
  return cart ? parseCart(cart) : [];
}

export async function addToCart(item: Omit<CartItemData, "quantity">) {
  const cookieStore = await cookies();
  const current = getCartFromStore(cookieStore);
  const existing = current.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    current.push({ ...item, quantity: 1 });
  }
  cookieStore.set(CART_COOKIE, JSON.stringify(current), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function removeFromCart(productId: string) {
  const cookieStore = await cookies();
  const current = getCartFromStore(cookieStore);
  const filtered = current.filter((i) => i.productId !== productId);
  cookieStore.set(CART_COOKIE, JSON.stringify(filtered), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function updateQuantity(productId: string, quantity: number) {
  const cookieStore = await cookies();
  const current = getCartFromStore(cookieStore);
  const item = current.find((i) => i.productId === productId);
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
  }
  cookieStore.set(CART_COOKIE, JSON.stringify(current), {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

function getCartFromStore(cookieStore: Awaited<ReturnType<typeof cookies>>): CartItemData[] {
  const cart = cookieStore.get(CART_COOKIE)?.value;
  return cart ? parseCart(cart) : [];
}
