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
  onSubmit: (data: DeliveryFormData) => void;
  loading?: boolean;
}

export default function DeliveryForm({ onSubmit, loading = false }: DeliveryFormProps) {
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
    pickup_location: "Home",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.billing_customer_name.trim()) {
      newErrors.billing_customer_name = "Name is required";
    }
    if (!formData.billing_phone.trim() || !/^\d{10}$/.test(formData.billing_phone)) {
      newErrors.billing_phone = "Valid 10-digit phone number required";
    }
    if (!formData.billing_address.trim()) {
      newErrors.billing_address = "Address is required";
    }
    if (!formData.billing_city.trim()) {
      newErrors.billing_city = "City is required";
    }
    if (!formData.billing_pincode.trim() || !/^\d{6}$/.test(formData.billing_pincode)) {
      newErrors.billing_pincode = "Valid 6-digit pincode required";
    }
    if (!formData.billing_state.trim()) {
      newErrors.billing_state = "State is required";
    }
    if (formData.length <= 0) {
      newErrors.length = "Length must be greater than 0";
    }
    if (formData.breadth <= 0) {
      newErrors.breadth = "Breadth must be greater than 0";
    }
    if (formData.height <= 0) {
      newErrors.height = "Height must be greater than 0";
    }
    if (formData.weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }
    if (
      !formData.billing_email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.billing_email)
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white p-8 shadow-xl">
          <h1 className="text-4xl font-bold mb-2">Delivery Details</h1>
          <p className="text-slate-600 mb-8">Please provide your delivery information</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_customer_name ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
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

                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_email
                    ? "border-red-500 bg-red-50"
                    : "border-slate-200 bg-slate-50 focus:border-purple-500"
                  }`}
              />

              {errors.billing_email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.billing_email}
                </p>
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_phone ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_address ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                  }`}
              />
              {errors.billing_address && (
                <p className="mt-1 text-sm text-red-600">{errors.billing_address}</p>
              )}
            </div>

            {/* City */}
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_city ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                  }`}
              />
              {errors.billing_city && (
                <p className="mt-1 text-sm text-red-600">{errors.billing_city}</p>
              )}
            </div>

            {/* Pincode */}
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_pincode ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                  }`}
              />
              {errors.billing_pincode && (
                <p className="mt-1 text-sm text-red-600">{errors.billing_pincode}</p>
              )}
            </div>

            {/* State */}
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-slate-900 placeholder-slate-400 transition focus:outline-none ${errors.billing_state ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                  }`}
              />
              {errors.billing_state && (
                <p className="mt-1 text-sm text-red-600">{errors.billing_state}</p>
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
                className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition focus:border-purple-500 focus:outline-none"
              >
                <option value="India">India</option>
              </select>
            </div>

            {/* Package Dimensions */}
            <div className="border-t border-slate-200 pt-6">
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
                    className={`w-full rounded-lg border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.length ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
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
                    className={`w-full rounded-lg border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.breadth ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
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
                    className={`w-full rounded-lg border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.height ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
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
                    className={`w-full rounded-lg border-2 px-3 py-2 text-slate-900 transition focus:outline-none ${errors.weight ? "border-red-500 bg-red-50" : "border-slate-200 bg-slate-50 focus:border-purple-500"
                      }`}
                  />
                  {errors.weight && (
                    <p className="mt-1 text-xs text-red-600">{errors.weight}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-full bg-purple-600 px-6 py-3 text-white font-semibold transition hover:bg-purple-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Proceed to Checkout"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
