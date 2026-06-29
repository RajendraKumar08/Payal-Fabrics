"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormValues = {
    itemname: FormDataEntryValue | null;
    price: FormDataEntryValue | null;
    description: FormDataEntryValue | null;
    category: FormDataEntryValue | null;
    mainCategory: FormDataEntryValue | null;
    subCategory: FormDataEntryValue | null;
    material: FormDataEntryValue | null;
    fabricType: FormDataEntryValue | null;
    color: FormDataEntryValue | null;
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
            newerrors.itemname = "Required";
        }

        if (!data.price || Number(data.price.toString()) <= 0) {
            newerrors.price = "Invalid Price";
        }

        if (!data.description?.toString().trim()) {
            newerrors.description = "Required";
        }

        if (!data.category) {
            newerrors.category = "Required";
        }

        if (!data.mainCategory) {
            newerrors.mainCategory = "Required";
        }

        if (!data.subCategory) {
            newerrors.subCategory = "Required";
        }

        if (!data.material) {
            newerrors.material = "Required";
        }

        if (!data.fabricType) {
            newerrors.fabricType = "Required";
        }

        if (!data.color?.toString().trim()) {
            newerrors.color = "Required";
        }

        if (!data.stock_quantity || Number(data.stock_quantity.toString()) <= 0) {
            newerrors.stock_quantity = "Required";
        }

        if (!data.stock_unit) {
            newerrors.stock_unit = "Required";
        }

        if (!data.image || !(data.image instanceof File) || data.image.size === 0) {
            newerrors.image = "Required";
        }

        if (data.highlight === "") {
            newerrors.highlight = "Required";
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
            mainCategory: formdata.get("mainCategory"),
            subCategory: formdata.get("subCategory"),
            material: formdata.get("material"),
            fabricType: formdata.get("fabricType"),
            color: formdata.get("color"),
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
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-white p-4 md:p-6 text-black">
            <form
                className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-pink-100/50 flex flex-col gap-5 text-black md:mx-auto"
                onSubmit={handlesubmit}
            >
                <div className="text-center mb-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">
                        Add New Product
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">
                        Publish new fabric or dress materials to your digital catalog inventory.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Product Details */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 border-b border-pink-100 pb-1.5">
                            Product Details & Media
                        </h2>

                        {/* Item Name */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="itemname" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Item Name
                                </label>
                                {errors.itemname && (
                                    <span className="text-red-500 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                        {errors.itemname}
                                    </span>
                                )}
                            </div>
                            <input
                                id="itemname"
                                className={`w-full border rounded-xl px-3.5 py-2 text-sm bg-slate-50/40 outline-none focus:bg-white focus:ring-4 transition-all duration-200 ${
                                    errors.itemname
                                        ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                                        : "border-slate-200 focus:ring-pink-100 focus:border-pink-400"
                                }`}
                                type="text"
                                name="itemname"
                                placeholder="Enter product display name"
                            />
                        </div>

                        {/* Price & Stock Row */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* Price */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="price" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Price
                                    </label>
                                    {errors.price && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1.5 py-0.5 rounded-full border border-red-100">
                                            Err
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="price"
                                    className={`w-full border rounded-xl px-3 py-2 text-sm bg-slate-50/40 outline-none focus:bg-white focus:ring-4 transition-all duration-200 ${
                                        errors.price
                                            ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                                            : "border-slate-200 focus:ring-pink-100 focus:border-pink-400"
                                    }`}
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                />
                            </div>

                            {/* Stock Quantity */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="stock_quantity" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Stock Qty
                                    </label>
                                    {errors.stock_quantity && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1.5 py-0.5 rounded-full border border-red-100">
                                            Err
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="stock_quantity"
                                    className={`w-full border rounded-xl px-3 py-2 text-sm bg-slate-50/40 outline-none focus:bg-white focus:ring-4 transition-all duration-200 ${
                                        errors.stock_quantity
                                            ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                                            : "border-slate-200 focus:ring-pink-100 focus:border-pink-400"
                                    }`}
                                    type="number"
                                    step="0.1"
                                    name="stock_quantity"
                                    placeholder="Qty"
                                    min="0"
                                />
                            </div>

                            {/* Stock Unit */}
                            <div>
                                <label htmlFor="stock_unit" className="block text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">
                                    Unit
                                </label>
                                <select
                                    id="stock_unit"
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-white transition-all duration-200"
                                    name="stock_unit"
                                    defaultValue="meter"
                                >
                                    <option value="meter">Meter</option>
                                    <option value="piece">Piece</option>
                                    <option value="set">Set</option>
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="description" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Description
                                </label>
                                {errors.description && (
                                    <span className="text-red-500 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                        {errors.description}
                                    </span>
                                )}
                            </div>
                            <textarea
                                id="description"
                                className={`w-full border rounded-xl px-3.5 py-2 text-sm bg-slate-50/40 outline-none focus:bg-white focus:ring-4 transition-all duration-200 resize-none ${
                                    errors.description
                                        ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                                        : "border-slate-200 focus:ring-pink-100 focus:border-pink-400"
                                }`}
                                name="description"
                                placeholder="Describe texture, patterns, width, style, etc..."
                                rows={2.5}
                            />
                        </div>

                        {/* Product Image Upload & Horizontal Preview */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="image" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Product Image
                                </label>
                                {errors.image && (
                                    <span className="text-red-500 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                        {errors.image}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="flex-1">
                                    <input
                                        id="image"
                                        className={`w-full border rounded-xl px-3 py-1.5 text-xs bg-slate-50/40 outline-none focus:bg-white focus:ring-4 transition-all duration-200 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100 ${
                                            errors.image
                                                ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                                                : "border-slate-200 focus:ring-pink-100 focus:border-pink-400"
                                        }`}
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                {imagePreview && (
                                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm shrink-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Category & Specifications */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xs font-bold uppercase tracking-wider text-pink-600 border-b border-pink-100 pb-1.5">
                            Specifications & Categories
                        </h2>

                        {/* Category, Main Category & Sub-Category */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* Category */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="category" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Category
                                    </label>
                                    {errors.category && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100">
                                            !
                                        </span>
                                    )}
                                </div>
                                <select
                                    id="category"
                                    className={`w-full border rounded-xl px-2.5 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-slate-50/40 focus:bg-white transition-all duration-200 ${
                                        errors.category ? "border-red-300" : "border-slate-200"
                                    }`}
                                    name="category"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Dress material">Dress material</option>
                                    <option value="Fabric">Fabric</option>
                                </select>
                            </div>

                            {/* Main Category */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="mainCategory" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Main Cat
                                    </label>
                                    {errors.mainCategory && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100">
                                            !
                                        </span>
                                    )}
                                </div>
                                <select
                                    id="mainCategory"
                                    className={`w-full border rounded-xl px-2.5 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-slate-50/40 focus:bg-white transition-all duration-200 ${
                                        errors.mainCategory ? "border-red-300" : "border-slate-200"
                                    }`}
                                    name="mainCategory"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Cotton fabric">Cotton fabric</option>
                                    <option value="Silk fabric">Silk fabric</option>
                                </select>
                            </div>

                            {/* Sub-Category */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="subCategory" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Sub Cat
                                    </label>
                                    {errors.subCategory && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100">
                                            !
                                        </span>
                                    )}
                                </div>
                                <select
                                    id="subCategory"
                                    className={`w-full border rounded-xl px-2.5 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-slate-50/40 focus:bg-white transition-all duration-200 ${
                                        errors.subCategory ? "border-red-300" : "border-slate-200"
                                    }`}
                                    name="subCategory"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Ajarakh Fabric">Ajarakh Fabric</option>
                                    <option value="Batik Fabric">Batik Fabric</option>
                                    <option value="Kalamkari Fabric">Kalamkari Fabric</option>
                                    <option value="Bagru Fabric">Bagru Fabric</option>
                                    <option value="Sanganeri Fabric">Sanganeri Fabric</option>
                                </select>
                            </div>
                        </div>

                        {/* Material, Fabric Type & Color */}
                        <div className="grid grid-cols-3 gap-3">
                            {/* Material */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="material" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Material
                                    </label>
                                    {errors.material && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100">
                                            !
                                        </span>
                                    )}
                                </div>
                                <select
                                    id="material"
                                    className={`w-full border rounded-xl px-2.5 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-slate-50/40 focus:bg-white transition-all duration-200 ${
                                        errors.material ? "border-red-300" : "border-slate-200"
                                    }`}
                                    name="material"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Cotton">Cotton</option>
                                    <option value="Silk">Silk</option>
                                    <option value="Silk Cotton">Silk Cotton</option>
                                    <option value="Linen">Linen</option>
                                    <option value="Modal Silk">Modal Silk</option>
                                    <option value="Mulberry Silk">Mulberry Silk</option>
                                    <option value="Woollen">Woollen</option>
                                </select>
                            </div>

                            {/* Fabric Type */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="fabricType" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Fabric Type
                                    </label>
                                    {errors.fabricType && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100">
                                            !
                                        </span>
                                    )}
                                </div>
                                <select
                                    id="fabricType"
                                    className={`w-full border rounded-xl px-2.5 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-slate-50/40 focus:bg-white transition-all duration-200 ${
                                        errors.fabricType ? "border-red-300" : "border-slate-200"
                                    }`}
                                    name="fabricType"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="Handloom">Handloom</option>
                                    <option value="Hand Block Print">Hand Block Print</option>
                                    <option value="Printed">Printed</option>
                                    <option value="Woven">Woven</option>
                                    <option value="kantha Work">kantha Work</option>
                                </select>
                            </div>

                            {/* Color */}
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label htmlFor="color" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                        Colour
                                    </label>
                                    {errors.color && (
                                        <span className="text-red-500 text-[10px] font-bold bg-red-50 px-1 py-0.5 rounded border border-red-100">
                                            !
                                        </span>
                                    )}
                                </div>
                                <input
                                    id="color"
                                    className={`w-full border rounded-xl px-3 py-2 text-sm bg-slate-50/40 outline-none focus:bg-white focus:ring-4 transition-all duration-200 ${
                                        errors.color
                                            ? "border-red-300 focus:ring-red-100 focus:border-red-400"
                                            : "border-slate-200 focus:ring-pink-100 focus:border-pink-400"
                                    }`}
                                    type="text"
                                    name="color"
                                    placeholder="e.g. Royal Blue"
                                />
                            </div>
                        </div>

                        {/* Highlighted Product Dropdown */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="highlight" className="block text-xs font-bold text-slate-600 uppercase tracking-wide">
                                    Highlighted Product
                                </label>
                                {errors.highlight && (
                                    <span className="text-red-500 text-[10px] font-bold bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                                        {errors.highlight}
                                    </span>
                                )}
                            </div>
                            <select
                                id="highlight"
                                className={`w-full border rounded-xl px-3 py-2 text-sm outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 bg-slate-50/40 focus:bg-white transition-all duration-200 ${
                                    errors.highlight ? "border-red-300" : "border-slate-200"
                                }`}
                                name="highlight"
                                defaultValue=""
                            >
                                <option value="" disabled>Select Highlights</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        {/* Submit Button inside the right column for balanced vertical layout */}
                        <div>
                            <button
                                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 text-sm active:scale-[0.98] mt-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Adding Product to Catalog..." : "Submit Product"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminPage;