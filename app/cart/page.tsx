"use client";

import { useCart } from "@/app/components/CartContext";
import Script from "next/script";
export default function CartPage() {
  const { items, count, clearCart, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    // Implement checkout logic here, e.g., redirect to a checkout page or call an API
    const res = await fetch("http://localhost:3000/api/createorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total * 100 }) // Razorpay expects amount in paise
    });
    console.log("response from razorpay order creation", res);
    const orderData = await res.json();


    const paymentOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Razorpay Key ID

      amount: total * 100, // Amount in paise,
      currency: orderData.currency,

      name: "Payal Fabrics",
      description: "Complete your purchase",

      order_id: orderData.id, // Razorpay Order ID from server

      handler: async function (response: any) {
        console.log("Payment response from Razorpay:", response);
        
        const res = await fetch('api/verifyorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          })
        });
        const data = await res.json();
        if (data.isOk) {
          alert("Payment successful and verified!");
          clearCart();
        } else {
          alert("Payment verification failed. Please contact support.");
        }

      },
    };

    const rzp = new (window as any).Razorpay(paymentOptions);
    rzp.open();



    // alert("Proceeding to checkout with total amount: ₹" + total.toFixed(2));
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl bg-white p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold">Your Cart</h1>
              <p className="text-slate-600">{count} item{count === 1 ? "" : "s"} in your cart</p>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Clear Cart
            </button>
          </div>

          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
              Your cart is empty. Add products from the shop to see them here.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                    <p className="mt-2 text-sm text-slate-600">Qty: {item.quantity}</p>
                    <p className="mt-1 text-sm text-slate-700">Price: ₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6 text-right text-slate-900">
              <p className="text-sm text-slate-600">Total</p>
              <p className="mt-2 text-3xl font-bold">₹{total.toFixed(2)}</p>
              <button onClick={handleCheckout} className="mt-4 rounded-full bg-green-600 px-6 py-3 text-white font-semibold transition hover:bg-green-700">
                Proceed to Checkout
              </button>
            </div>

          )}
        </div>
      </div>
    </main>
  );
}
