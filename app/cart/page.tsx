"use client";

import { useCart } from "@/app/components/CartContext";
import DeliveryForm from "@/app/components/DeliveryForm";
import Script from "next/script";
import { useState } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import {
    get_token,
    get_rates,
    create_order,
    assign_awb,
} from "@/app/utils/shiprocket";

interface DeliveryFormData {
  billing_customer_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  length: number;
  breadth: number;
  height: number;
  weight: number;
  pickup_location?: string;
}

export default function CartPage() {
  const { items, count, clearCart, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryData, setDeliveryData] = useState<DeliveryFormData | null>(null);

  const [token, setToken] = useState<string | null>(null);
  const { getUser } = getKindeServerSession();
  const user = getUser();
  console.log("user in cart page", user);

  const handleDeliverySubmit = (data: DeliveryFormData) => {
    setDeliveryData(data);
    handleCheckout(data);
  };

  const handleCheckout = async (deliveryFormData?: DeliveryFormData) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100 }) // Razorpay expects amount in paise
      });

      if (!res.ok) {
        throw new Error("Failed to create order. Please try again.");
      }

      console.log("response from razorpay order creation", res);
      const orderData = await res.json();

      if (!orderData.id) {
        throw new Error("Invalid order data received from server.");
      }

      const paymentOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Razorpay Key ID

        amount: total * 100, // Amount in paise,
        currency: orderData.currency,

        name: "Payal Fabrics",
        description: "Complete your purchase",

        order_id: orderData.id, // Razorpay Order ID from server

        handler: async function (response: any) {
          try {
            console.log("Payment response from Razorpay:", response);
            
            const verifyRes = await fetch('/api/verifyorder', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature
              })
            });

            if (!verifyRes.ok) {
              throw new Error("Verification request failed.");
            }

            const data = await verifyRes.json();
            if (data.isOk) {
              // Create ShipRocket order after payment verification
              if (deliveryFormData) {
                try {
                  const shipRocketRes = await fetch('/api/shiprocket', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      razorpayOrderId: response.razorpay_order_id,
                      razorpayPaymentId: response.razorpay_payment_id,
                      deliveryData: deliveryFormData,
                      orderData: {
                        email: deliveryFormData.billing_email,
                        items: items.map(item => ({
                          productId: item.id,
                          quantity: item.quantity,
                          name: item.name,
                          price: item.price,
                        })),
                        total: total,
                      }
                    })
                  });

                  if (shipRocketRes.ok) {
                    const shipRocketData = await shipRocketRes.json();
                    console.log("ShipRocket order created:", shipRocketData);
                  } else {
                    const shipRocketData = await shipRocketRes.json();
                    console.error("ShipRocket order creation failed:", shipRocketData);
                  }
                } catch (err) {
                  console.error("ShipRocket integration error:", err);
                }
              }

              alert("Payment successful and verified! Click Ok to proceed.");
              clearCart();
              setShowDeliveryForm(false);
              setLoading(false);
            } else {
              alert("Payment verification failed. Please contact support.");
              setLoading(false);
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert("An error occurred during payment verification. Please contact support.");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
            setError("Payment was cancelled. Please try again.");
          }
        },

        retry: {
          enabled: true,
          max_count: 3
        }
      };

      const rzp = new (window as any).Razorpay(paymentOptions);
      rzp.on('payment.failed', function (response: any) {
        setLoading(false);
        setError(`Payment failed: ${response.error.description}`);
        console.error("Razorpay payment failed:", response.error);
      });

      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
      setError(err instanceof Error ? err.message : "An error occurred during checkout. Please try again.");
    }
  }

 if (loading) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden">
      
      <div className="relative w-full max-w-xl rounded-[32px] border border-purple-100 bg-white p-10 shadow-[0_20px_60px_rgba(168,85,247,0.12)]">

        {/* Glow Effects */}
        <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-purple-200/40 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-fuchsia-200/40 blur-3xl"></div>

        <div className="relative z-10 text-center">

          {/* Animated Loader */}
          <div className="flex justify-center mb-8">
            <div className="relative h-20 w-20">
              
              <div className="absolute inset-0 rounded-full border-[6px] border-purple-100"></div>

              <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-purple-700 border-r-purple-500 animate-spin"></div>

              <div className="absolute inset-3 rounded-full bg-purple-50 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-purple-600 animate-pulse"></div>
              </div>

            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-purple-800">
            Processing Payment
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base md:text-lg leading-relaxed text-purple-600">
            Please wait while we securely complete your transaction.
          </p>

          {/* Rounded Loading Bar */}
          <div className="mt-10 overflow-hidden rounded-full bg-purple-100 h-3">
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-700 animate-[loading_1.8s_ease-in-out_infinite]"></div>
          </div>

          {/* Footer Text */}
          <p className="mt-5 text-sm text-slate-500">
            Do not close this window or refresh the page.
          </p>

        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
      `}</style>

    </main>
  );
}

if (showDeliveryForm) {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <DeliveryForm onSubmit={handleDeliverySubmit} loading={loading} />
    </>
  );
}

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="mx-auto max-w-6xl space-y-8">
        {error && (
          <div className="rounded-3xl bg-red-50 border border-red-200 p-6">
            <p className="text-red-800 font-semibold flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </p>
          </div>
        )}

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
              <button 
                onClick={() => setShowDeliveryForm(true)} 
                disabled={loading} 
                className="mt-4 rounded-full bg-green-600 px-6 py-3 text-white font-semibold transition hover:bg-green-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-green-600 rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>
              
            </div>

          )}
        </div>
      </div>
    </main>
  );
}
