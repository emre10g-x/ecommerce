import { NextRequest } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getCart } from "@/lib/cart";

export async function POST(request: NextRequest) {
  try {
    const cartItems = await getCart();
    if (cartItems.length === 0) {
      return Response.json({ error: "Sepet boş" }, { status: 400 });
    }

    const body = await request.json();
    const { name, email, address, city, postalCode } = body;

    if (!name || !email || !address || !city || !postalCode) {
      return Response.json({ error: "Tüm alanlar zorunlu" }, { status: 400 });
    }

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "try",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/cart`,
      customer_email: email,
      metadata: {
        name,
        email,
        address,
        city,
        postalCode,
        items: JSON.stringify(
          cartItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            price: i.price,
          }))
        ),
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json({ error: "Ödeme başlatılamadı" }, { status: 500 });
  }
}
