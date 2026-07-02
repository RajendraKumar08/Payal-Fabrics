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
  const [pickupOptionincart, setPickupOptionincart] = useState("home");
  const [token, setToken] = useState<string | null>(null);
  const { getUser } = getKindeServerSession();
  const user = getUser();
  console.log("user in cart page", user);

  const handleDeliverySubmit = (
    data: DeliveryFormData,
    pickupOption: string
  ) => {

    console.log(
      "pickupOption",
      pickupOption
    );

    setDeliveryData(data);

    setPickupOptionincart(
      pickupOption
    );

    handleCheckout(
      data,
      pickupOption
    );
  };

  console.log("pickup option in cart page", pickupOptionincart);
  // console.log("pickup option in form page", pickupOption);

  const handleCheckout = async (deliveryFormData?: DeliveryFormData, pickupOption?: string) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total * 100,  pickupOption: pickupOption, billingPincode: deliveryFormData?.billing_pincode }) // Razorpay expects amount in paise
      });

      if (!res.ok) {
        throw new Error("Failed to create order. Please try again.");
      }

      console.log("response from razorpay order creation", res);
      const { order, couriersoption } = await res.json();
      const orderData = order;

      if (!orderData.id) {
        throw new Error("Invalid order data received from server.");
      }

      const paymentOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Razorpay Key ID

        amount: orderData.amount, // Amount in paise,
        currency: orderData.currency,

        name: "Payal Fabrics",
        description: "Complete your purchase",

        order_id: orderData.id, // Razorpay Order ID from server

        handler: async function (response: any) {
          try {
            console.log("=== Razorpay payment success ===");
            console.log("Payment response from Razorpay:", response);

            const verifyRes = await fetch('/api/verifyorder', {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature
              })
            });

            console.log("=== Verification response ===");
            console.log("Status:", verifyRes.status);
            console.log("OK:", verifyRes.ok);
            console.log("Headers:", Object.fromEntries(verifyRes.headers.entries()));

            let data;
            try {
              const text = await verifyRes.text();
              console.log("Response text:", text);
              data = text ? JSON.parse(text) : {};
            } catch (parseErr) {
              console.error("JSON parse error:", parseErr);
              throw new Error("Invalid response from verification server");
            }

            console.log("Parsed data:", data);

            if (!verifyRes.ok) {
              console.error("Verification failed:", data);
              throw new Error(`Verification request failed: ${data?.message || 'Unknown error'}`);
            }
            if (data.isOk) {
              // Create ShipRocket order after payment verification
              if (deliveryFormData && pickupOption === "home" && couriersoption !== "PAYALFABRICS") {
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
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-slate-600">Processing your payment...</p>
        </div>
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
    <main className="min-h-screen bg-slate-50 px-4 md:px-6 py-10 md:py-20 text-slate-900">
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

        <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 sm:p-8 shadow-xl">
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
                  key={item.uid}
                  className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                    {item.category?.toLowerCase() === "fabric" ? (
                      <p className="mt-2 text-sm text-slate-600">Meter: {item.quantity}</p>
                    ) : (
                      <p className="mt-2 text-sm text-slate-600">Qty: {item.quantity}</p>
                    )}
                    <p className="mt-1 text-sm text-slate-700">Price: ₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.uid)}
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
