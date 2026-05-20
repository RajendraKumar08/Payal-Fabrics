"use client";

import { FormEvent, useState } from "react";

const adminpage = () => {

    const [loading, setloading] = useState(false);
    const [errors, seterrors] = useState<any>({});

    const validate = (data: any) => {

        const newerrors: any = {};

        if (!data.itemname?.trim()) {
            newerrors.itemname = "Item name is required";
        }

        if (!data.price || Number(data.price) <= 0) {
            newerrors.price = "Valid price is required";
        }

        if (!data.description?.trim()) {
            newerrors.description = "Description is required";
        }

        if (!data.category) {
            newerrors.category = "Category is required";
        }

        if (!data.stock_quantity || Number(data.stock_quantity) <= 0) {
            newerrors.stock_quantity = "Stock quantity is required";
        }

        if (!data.stock_unit) {
            newerrors.stock_unit = "Stock unit is required";
        }

        if (data.highlight === "") {
            newerrors.highlight = "Please select highlight option";
        }

        return newerrors;
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
        };

        const validationerrors = validate(data);

        if (Object.keys(validationerrors).length > 0) {
            seterrors(validationerrors);
            return;
        }

        seterrors({});
        setloading(true);

        try {

            const response = await fetch("/api/createitem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...data,
                    stock_quantity: Number(data.stock_quantity),
                    highlight: data.highlight === "true",
                }),
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
        <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">

            <form
                className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-5"
                onSubmit={handlesubmit}
            >

                <h1 className="text-3xl font-bold text-center text-pink-600">
                    Add Product
                </h1>

                {/* Item Name */}
                <div>
                    <input
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
                    <input
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
                    <textarea
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
                    <select
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

                {/* Stock */}
                <div className="flex gap-3">

                    <div className="w-full">
                        <input
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

                    <select
                        className="border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
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

                {/* Highlight */}
                <div>
                    <select
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

export default adminpage;