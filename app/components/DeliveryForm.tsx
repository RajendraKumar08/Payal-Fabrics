"use client";

import { useState } from "react";

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



interface DeliveryFormProps {
  onSubmit: (data: DeliveryFormData, pickup_option: string) => void;
  loading?: boolean;
}

export default function DeliveryForm({ onSubmit, loading = false }: DeliveryFormProps) {
  const [pickupOption, setPickupOption] = useState("home");
  const [formData, setFormData] = useState<DeliveryFormData>({
    billing_customer_name: "",
    billing_email: "",
    billing_phone: "",
    billing_address: "",
    billing_city: "",
    billing_pincode: "",
    billing_state: "",
    billing_country: "India",
    length: 10,
    breadth: 10,
    height: 10,
    weight: 0.5,
    pickup_location: "warehouse",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState<number | null>(null);
  const [deliveryCheckMessage, setDeliveryCheckMessage] = useState<string | null>(null);
  const [checkingDeliveryCharge, setCheckingDeliveryCharge] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.billing_customer_name.trim() && pickupOption === "home") {
      newErrors.billing_customer_name = "Name is required";
    }
    if ((!formData.billing_phone.trim() || !/^\d{10}$/.test(formData.billing_phone)) && pickupOption === "home") {
      newErrors.billing_phone = "Valid 10-digit phone number required";
    }
    if (!formData.billing_address.trim() && pickupOption === "home") {
      newErrors.billing_address = "Address is required";
    }
    if (!formData.billing_city.trim() && pickupOption === "home") {
      newErrors.billing_city = "City is required";
    }
    if ((!formData.billing_pincode.trim() || !/^\d{6}$/.test(formData.billing_pincode)) && pickupOption === "home") {
      newErrors.billing_pincode = "Valid 6-digit pincode required";
    }
    if (!formData.billing_state.trim() && pickupOption === "home") {
      newErrors.billing_state = "State is required";
    }
    if (formData.length <= 0 && pickupOption === "home") {
      newErrors.length = "Length must be greater than 0";
    }
    if (formData.breadth <= 0 && pickupOption === "home") {
      newErrors.breadth = "Breadth must be greater than 0";
    }
    if (formData.height <= 0 && pickupOption === "home") {
      newErrors.height = "Height must be greater than 0";
    }
    if (formData.weight <= 0 && pickupOption === "home") {
      newErrors.weight = "Weight must be greater than 0";
    }
    if (
      (!formData.billing_email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billing_email)) && pickupOption === "home"
    ) {
      newErrors.billing_email =
        "Valid email required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("length") || name.includes("breadth") || name.includes("height") || name.includes("weight")
        ? parseFloat(value) || 0
        : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (name === "billing_pincode") {
      setDistanceKm(null);
      setDeliveryCharge(null);
      setDeliveryCheckMessage(null);
    }
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData, pickupOption);
    }
  };

  const handleCheckDeliveryCharge = async () => {
    if (!/^\d{6}$/.test(formData.billing_pincode.trim())) {
      setErrors((prev) => ({
        ...prev,
        billing_pincode: "Valid 6-digit pincode required",
      }));
      return;
    }

    setCheckingDeliveryCharge(true);
    setDeliveryCheckMessage(null);
    setDistanceKm(null);
    setDeliveryCharge(null);

    try {
      const response = await fetch("/api/pincode-distance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pincode1: formData.billing_pincode.trim(),
          pincode2: "396360",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to calculate delivery charge.");
      }

      const distance = Number(data.distanceInKm ?? 0);
      setDistanceKm(distance);

      const charge = distance > 20 ? 100 : 0;
      setDeliveryCharge(charge);
      setDeliveryCheckMessage(
        distance > 20
          ? `Delivery charge is ₹100 because the distance is greater than 20 km.`
          : `Delivery is free because the distance is within 20 km.`
      );
    } catch (error) {
      setDeliveryCheckMessage(
        error instanceof Error ? error.message : "Delivery charge check failed."
      );
    } finally {
      setCheckingDeliveryCharge(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto grid w-full max-w-7xl gap-8 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-8">
          <div className="rounded-[28px] border border-slate-200 bg-white px-8 py-8 shadow-xl shadow-slate-200/40">
            <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">
              Pickup preference
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              Check whether pickup is available from your chosen address
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              Select the pickup mode for your order. Choose “Home” to have your package collected from the address you provide, or choose “Warehouse” if you plan to drop it off.
            </p>

            <div className="mt-8">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Pickup option
              </label>
              <select
                value={pickupOption}
                onChange={(e) => setPickupOption(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition focus:border-purple-500 focus:outline-none"
              >
                <option value="warehouse">Warehouse (You will collect the order yourself from our warehouse)</option>
                <option value="home">Home (We will deliver the order to your house)</option>
              </select>
            </div>
          </div>

          {pickupOption === "home" && (
            <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-xl">
              <h2 className="text-3xl font-bold mb-2 text-slate-900">Delivery Details</h2>
              <p className="text-slate-600 mb-8">Please provide your delivery information.</p>

              <div className="space-y-6 overflow-auto max-h-[620px] pr-2">
                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="billing_customer_name"
                    value={formData.billing_customer_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_customer_name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                      }`}
                  />
                  {errors.billing_customer_name && (
                    <p className="mt-1 text-sm text-red-600">{errors.billing_customer_name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="billing_email"
                    value={formData.billing_email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_email ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                      }`}
                  />
                  {errors.billing_email && (
                    <p className="mt-1 text-sm text-red-600">{errors.billing_email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    name="billing_phone"
                    value={formData.billing_phone}
                    onChange={handleChange}
                    placeholder="Enter your 10-digit phone number"
                    className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_phone ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                      }`}
                  />
                  {errors.billing_phone && (
                    <p className="mt-1 text-sm text-red-600">{errors.billing_phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="billing_address"
                    value={formData.billing_address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    rows={3}
                    className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_address ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                      }`}
                  />
                  {errors.billing_address && (
                    <p className="mt-1 text-sm text-red-600">{errors.billing_address}</p>
                  )}
                </div>

                {/* City / Pincode / State */}
                <div className="grid gap-4 lg:grid-cols-3">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="billing_city"
                      value={formData.billing_city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_city ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                        }`}
                    />
                    {errors.billing_city && (
                      <p className="mt-1 text-sm text-red-600">{errors.billing_city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pincode (6 digits) *
                    </label>
                    <input
                      type="tel"
                      name="billing_pincode"
                      value={formData.billing_pincode}
                      onChange={handleChange}
                      placeholder="Enter 6-digit pincode"
                      className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_pincode ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                        }`}
                    />
                    {errors.billing_pincode && (
                      <p className="mt-1 text-sm text-red-600">{errors.billing_pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="billing_state"
                      value={formData.billing_state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      className={`w-full rounded-xl border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_state ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                        }`}
                    />
                    {errors.billing_state && (
                      <p className="mt-1 text-sm text-red-600">{errors.billing_state}</p>
                    )}
                  </div>
                </div>

                <div className="rounded-3xl border border-purple-200 bg-purple-50 p-6 shadow-sm">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-purple-700">Check delivery charge</p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Enter your pincode and compare it with our warehouse pincode <span className="font-semibold">396360</span>.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleCheckDeliveryCharge}
                      disabled={checkingDeliveryCharge}
                      className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {checkingDeliveryCharge ? "Checking..." : "Check charge"}
                    </button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Warehouse pincode</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">396360</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Your pincode</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{formData.billing_pincode || "—"}</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                    <p className="font-semibold">Delivery charge rule</p>
                    <p className="mt-2">
                      If the distance between your pincode and our warehouse pincode is greater than 20 km, ₹100 delivery charge will apply.
                      If it is 20 km or less, delivery is free.
                    </p>
                  </div>

                  {distanceKm !== null && (
                    <div className="mt-4 rounded-2xl bg-white p-4 text-sm text-slate-900 shadow-sm">
                      <p className="text-sm text-slate-500">Distance</p>
                      <p className="mt-1 text-lg font-semibold">{distanceKm.toFixed(2)} km</p>
                      <p className="mt-2 text-sm text-slate-600">
                        {deliveryCharge && deliveryCharge > 0 ? `Delivery charge is ₹${deliveryCharge}.` : "Delivery is free."}
                      </p>
                    </div>
                  )}

                  {deliveryCheckMessage && (
                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {deliveryCheckMessage}
                    </div>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Country
                  </label>
                  <select
                    name="billing_country"
                    value={formData.billing_country}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-purple-500 focus:outline-none"
                  >
                    <option value="India">India</option>
                  </select>
                </div>

                {/* Package Dimensions */}
                {/* <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Package Dimensions</h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Length (cm) *
                      </label>
                      <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        className={`w-full rounded-xl border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.length ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                          }`}
                      />
                      {errors.length && (
                        <p className="mt-1 text-xs text-red-600">{errors.length}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Breadth (cm) *
                      </label>
                      <input
                        type="number"
                        name="breadth"
                        value={formData.breadth}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        className={`w-full rounded-xl border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.breadth ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                          }`}
                      />
                      {errors.breadth && (
                        <p className="mt-1 text-xs text-red-600">{errors.breadth}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Height (cm) *
                      </label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        className={`w-full rounded-xl border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.height ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                          }`}
                      />
                      {errors.height && (
                        <p className="mt-1 text-xs text-red-600">{errors.height}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Weight (kg) *
                      </label>
                      <input
                        type="number"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        className={`w-full rounded-xl border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.weight ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                          }`}
                      />
                      {errors.weight && (
                        <p className="mt-1 text-xs text-red-600">{errors.weight}</p>
                      )}
                    </div>
                  </div>
                </div> */}
              </div>
            </form>
          )}
        </div>

        <div className="sticky top-24 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
            <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">
              Order summary
            </span>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">Ready to proceed</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Review the pickup mode and delivery details before checkout.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Pickup mode</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{pickupOption === "home" ? "Home pickup" : "Warehouse drop-off"}</p>
              </div>

              {pickupOption === "home" && (
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Delivery address</p>
                  <p className="mt-2 text-sm leading-6 text-slate-900">
                    {formData.billing_address ? formData.billing_address : "Enter your address to proceed."}
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="mt-8 w-full rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}