"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = {
    itemname: FormDataEntryValue | null;
    price: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
    category: FormDataEntryValue | null;
    stock_quantity: FormDataEntryValue | null;
    stock_unit: FormDataEntryValue | null;
    highlight: FormDataEntryValue | null;
    image: FormDataEntryValue | null;
};

type Errors = Record<string, string>;

const AdminPage = () => {

    const [loading, setloading] = useState(false);
    const [errors, seterrors] = useState<Errors>({});
    const [imagePreview, setImagePreview] = useState<string>("");

    const validate = (data: FormValues) => {

        const newerrors: Errors = {};

        if (!data.itemname?.toString().trim()) {
            newerrors.itemname = "Item name is required";
        }

        if (!data.price || Number(data.price.toString()) <= 0) {
            newerrors.price = "Valid price is required";
        }

        if (!data.description?.toString().trim()) {
            newerrors.description = "Description is required";
        }

        if (!data.category) {
            newerrors.category = "Category is required";
        }

        if (!data.stock_quantity || Number(data.stock_quantity.toString()) <= 0) {
            newerrors.stock_quantity = "Stock quantity is required";
        }

        if (!data.stock_unit) {
            newerrors.stock_unit = "Stock unit is required";
        }

        if (!data.image || !(data.image instanceof File) || data.image.size === 0) {
            newerrors.image = "Product image is required";
        }

        if (data.highlight === "") {
            newerrors.highlight = "Please select highlight option";
        }

        return newerrors;
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview("");
        }
    };

    const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const data = {
            itemname: formdata.get("itemname"),
            price: formdata.get("price"),
            description: formdata.get("description"),
            category: formdata.get("category"),
            stock_quantity: formdata.get("stock_quantity"),
            stock_unit: formdata.get("stock_unit"),
            highlight: formdata.get("highlight"),
            image: formdata.get("image"),
        };

        const validationerrors = validate(data as FormValues);

        if (Object.keys(validationerrors).length > 0) {
            seterrors(validationerrors);
            return;
        }

        seterrors({});
        setloading(true);

        try {

            const response = await fetch("/api/createitem", {
                method: "POST",
                body: formdata,
            });

            const result = await response.json();

            alert(result.message);

            window.location.reload();

        } catch (error) {

            console.log(error);

        } finally {

            setloading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4 text-black">

            <form
                className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-5 text-black"
                onSubmit={handlesubmit}
            >

                <h1 className="text-3xl font-bold text-center text-black">
                    Add Product
                </h1>

                {/* Item Name */}
                <div>
                    <label htmlFor="itemname" className="block text-sm font-medium text-slate-700 mb-2">
                        Item Name
                    </label>
                    <input
                        id="itemname"
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
                            errors.itemname
                                ? "border-red-500 focus:ring-red-300"
                                : "border-pink-200 focus:ring-pink-400"
                        }`}
                        type="text"
                        name="itemname"
                        placeholder="Enter item name"
                    />

                    {errors.itemname && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.itemname}
                        </p>
                    )}
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                        Price
                    </label>
                    <input
                        id="price"
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
                            errors.price
                                ? "border-red-500 focus:ring-red-300"
                                : "border-pink-200 focus:ring-pink-400"
                        }`}
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        min="0"
                        step="0.01"
                    />

                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.price}
                        </p>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 resize-none ${
                            errors.description
                                ? "border-red-500 focus:ring-red-300"
                                : "border-pink-200 focus:ring-pink-400"
                        }`}
                        name="description"
                        placeholder="Enter description"
                        rows={4}
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                        Category
                    </label>
                    <select
                        id="category"
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
                            errors.category
                                ? "border-red-500 focus:ring-red-300"
                                : "border-pink-200 focus:ring-pink-400"
                        }`}
                        name="category"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select Category
                        </option>

                        <option value="dress material">
                            Dress Material
                        </option>

                        <option value="fabric">
                            Fabric
                        </option>
                    </select>

                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.category}
                        </p>
                    )}
                </div>

                {/* Image Upload */}
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-2">
                        Product Image
                    </label>
                    <input
                        id="image"
                        className={`w-full border rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 ${
                            errors.image
                                ? "border-red-500 focus:ring-red-300"
                                : "border-pink-200 focus:ring-pink-400"
                        }`}
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {imagePreview && (
                        <div className="mt-3 rounded-3xl overflow-hidden border border-pink-100 shadow-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image}
                        </p>
                    )}
                </div>

                {/* Stock */}
                <div className="flex gap-3">

                    <div className="w-full">
                        <label htmlFor="stock_quantity" className="block text-sm font-medium text-slate-700 mb-2">
                            Stock Quantity
                        </label>
                        <input
                            id="stock_quantity"
                            className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
                                errors.stock_quantity
                                    ? "border-red-500 focus:ring-red-300"
                                    : "border-pink-200 focus:ring-pink-400"
                            }`}
                            type="number"
                            step="0.1"
                            name="stock_quantity"
                            placeholder="Stock quantity"
                            min="0"
                        />

                        {errors.stock_quantity && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.stock_quantity}
                            </p>
                        )}
                    </div>

                    <div className="w-full">
                        <label htmlFor="stock_unit" className="block text-sm font-medium text-slate-700 mb-2">
                            Stock Unit
                        </label>
                        <select
                            id="stock_unit"
                            className="w-full border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                            name="stock_unit"
                            defaultValue="meter"
                        >
                            <option value="meter">
                                Meter
                            </option>

                            <option value="piece">
                                Piece
                            </option>

                            <option value="set">
                                Set
                            </option>
                        </select>
                    </div>

                </div>

                {/* Highlight */}
                <div>
                    <label htmlFor="highlight" className="block text-sm font-medium text-slate-700 mb-2">
                        Highlighted Product
                    </label>
                    <select
                        id="highlight"
                        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 ${
                            errors.highlight
                                ? "border-red-500 focus:ring-red-300"
                                : "border-pink-200 focus:ring-pink-400"
                        }`}
                        name="highlight"
                        defaultValue=""
                    >
                        <option value="" disabled>
                            Select Highlights
                        </option>

                        <option value="true">
                            Yes
                        </option>

                        <option value="false">
                            No
                        </option>
                    </select>

                    {errors.highlight && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.highlight}
                        </p>
                    )}
                </div>

                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:bg-pink-300"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

            </form>

        </div>
    );
};

export default AdminPage;