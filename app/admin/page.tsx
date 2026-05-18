"use client";

import { FormEvent, useState } from "react";

const adminpage = () => {

    const [loading, setloading] = useState(false);

    const handlesubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setloading(true);

        const formdata = new FormData(e.currentTarget);

        const data = {
            itemname: formdata.get("itemname"),
            price: formdata.get("price"),
            description: formdata.get("description"),
            category: formdata.get("category"),
            stock_quantity: Number(formdata.get("stock_quantity")),
            stock_unit: formdata.get("stock_unit"),
        };

        try {

            const response = await fetch("/api/createitem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            console.log(result);

        } catch (error) {

            console.log(error);

        } finally {

            setloading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">

                <form
                    className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-5"
                    onSubmit={handlesubmit}
                >

                    <h1 className="text-3xl font-bold text-center text-pink-600">
                        Add Product
                    </h1>

                    <input
                        className="border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                        type="text"
                        name="itemname"
                        placeholder="Enter item name"
                    />

                    <input
                        className="border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
                        type="number"
                        name="price"
                        placeholder="Enter price"
                    />

                    <textarea
                        className="border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                        name="description"
                        placeholder="Enter description"
                        rows={4}
                    />

                    <select
                        className="border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
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

                    <div className="flex gap-3">

                        <input
                            className="border border-pink-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400 w-full"
                            type="number"
                            step="0.1"
                            name="stock_quantity"
                            placeholder="Stock quantity"
                        />

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

                    <button
                        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:bg-pink-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>

                </form>

            </div>
        </>
    );
};

export default adminpage;