"use client";

import { FormEvent, useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    image?: string | null;
    createdAt: string;
}

const UpdateItemPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loadingList, setLoadingList] = useState(true);
    const [listError, setListError] = useState("");
    const [search, setSearch] = useState("");

    const [selected, setSelected] = useState<Product | null>(null);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchAll = async () => {
            setLoadingList(true);
            try {
                const res = await fetch("/api/getitems");
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setProducts(data.products);
            } catch {
                setListError("Could not load products. Please refresh.");
            } finally {
                setLoadingList(false);
            }
        };
        fetchAll();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selected) return;
        setSaving(true);
        setSuccessMsg("");
        setErrorMsg("");
        const formdata = new FormData(e.currentTarget);
        const data = {
            id: selected.id,
            name: formdata.get("name") as string,
            price: Number(formdata.get("price")),
            description: formdata.get("description") as string,
            category: formdata.get("category") as string,
            stock: Number(formdata.get("stock")),
        };
        try {
            const res = await fetch("/api/updateitem", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (!res.ok) { setErrorMsg(result.message || "Something went wrong."); return; }
            setSuccessMsg("Product updated successfully!");
            setProducts((prev) => prev.map((p) => p.id === selected.id ? { ...p, ...data } : p));
            setSelected((prev) => prev ? { ...prev, ...data } : prev);
        } catch {
            setErrorMsg("Network error. Please try again.");
        } finally {
            setSaving(false);
        }
    };

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const inputClass =
        "w-full border-2 border-pink-100 rounded-2xl px-4 py-3 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 bg-white text-gray-800 placeholder-gray-400 transition-all duration-200 text-sm font-medium";

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">

            {/* ── Decorative blobs ───────────────────────────────────────── */}
            <div aria-hidden className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-3xl" />
                <div className="absolute top-1/2 -right-40 w-80 h-80 bg-fuchsia-200 rounded-full opacity-25 blur-3xl" />
                <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-rose-200 rounded-full opacity-20 blur-3xl" />
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">

                {/* ══════════════════════════════════════════════════════════
                    HERO HEADER
                ══════════════════════════════════════════════════════════ */}
                <div className="mb-10 text-center relative">
                    <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 text-xs font-bold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse inline-block" />
                        Admin Panel
                    </div>
                    <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 tracking-tight">
                        Update Products
                    </h1>
                    <p className="text-gray-500 mt-3 text-base max-w-md mx-auto">
                        Browse your inventory and click any product to edit its details instantly.
                    </p>
                    {!selected && (
                        <div className="mt-3 text-sm text-pink-400 font-semibold">
                            {products.length} product{products.length !== 1 ? "s" : ""} in catalogue
                        </div>
                    )}
                </div>

                {selected ? (
                    /* ══════════════════════════════════════════════════════════
                       EDIT FORM
                    ══════════════════════════════════════════════════════════ */
                    <div className="max-w-2xl mx-auto">

                        {/* Back */}
                        <button
                            id="back-to-list-btn"
                            type="button"
                            onClick={() => { setSelected(null); setSuccessMsg(""); setErrorMsg(""); }}
                            className="flex items-center gap-2 text-pink-500 hover:text-pink-700 text-sm font-bold mb-6 group transition"
                        >
                            <span className="w-7 h-7 rounded-full bg-pink-100 group-hover:bg-pink-200 flex items-center justify-center transition">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </span>
                            Back to all products
                        </button>

                        <div className="bg-white rounded-3xl shadow-2xl shadow-pink-100 overflow-hidden border border-pink-100">

                            {/* Form header stripe */}
                            <div className="h-2 w-full bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-400" />

                            <div className="p-8">
                                {/* Title row */}
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-200">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 013.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5 12.362-12.226z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-gray-800">Editing Product</h2>
                                        <p className="text-xs text-pink-400 font-semibold mt-0.5 truncate max-w-xs">{selected.name}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                    {/* Name */}
                                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="name">Product Name</label>
                                        <input id="name" name="name" className={inputClass} type="text" defaultValue={selected.name} required />
                                    </div>

                                    {/* Price */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="price">Price (₹)</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400 font-bold text-sm">₹</span>
                                            <input id="price" name="price" className={`${inputClass} pl-8`} type="number" min="0" step="0.01" defaultValue={selected.price} required />
                                        </div>
                                    </div>

                                    {/* Stock */}
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="stock">Stock Quantity</label>
                                        <input id="stock" name="stock" className={inputClass} type="number" min="0" defaultValue={selected.stock} required />
                                    </div>

                                    {/* Category */}
                                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="category">Category</label>
                                        <select id="category" name="category" className={inputClass} defaultValue={selected.category} required>
                                            <option value="" disabled>Select Category</option>
                                            <option value="dress material">Dress Material</option>
                                            <option value="fabric">Fabric</option>
                                        </select>
                                    </div>

                                    {/* Description */}
                                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider" htmlFor="description">Description</label>
                                        <textarea id="description" name="description" className={`${inputClass} resize-none`} rows={4} defaultValue={selected.description} required />
                                    </div>

                                    {/* Feedback */}
                                    {successMsg && (
                                        <div className="sm:col-span-2 flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 rounded-2xl px-4 py-3 text-sm font-semibold">
                                            <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            {successMsg}
                                        </div>
                                    )}
                                    {errorMsg && (
                                        <div className="sm:col-span-2 flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-2xl px-4 py-3 text-sm font-semibold">
                                            <span className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                                                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </span>
                                            {errorMsg}
                                        </div>
                                    )}

                                    {/* Buttons */}
                                    <div className="sm:col-span-2 flex gap-3 pt-2">
                                        <button
                                            id="save-changes-btn"
                                            type="submit"
                                            disabled={saving}
                                            className="flex-1 relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-pink-300 disabled:to-rose-300 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            {saving ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                                    </svg>
                                                    Saving…
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Save Changes
                                                </>
                                            )}
                                        </button>
                                        <button
                                            id="cancel-edit-btn"
                                            type="button"
                                            onClick={() => { setSelected(null); setSuccessMsg(""); setErrorMsg(""); }}
                                            className="px-6 py-3.5 rounded-2xl border-2 border-pink-200 text-pink-500 hover:bg-pink-50 hover:border-pink-400 font-bold transition-all duration-200"
                                        >
                                            Cancel
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>

                ) : (
                    /* ══════════════════════════════════════════════════════════
                       PRODUCT LIST
                    ══════════════════════════════════════════════════════════ */
                    <>
                        {/* Search bar */}
                        {!loadingList && products.length > 0 && (
                            <div className="mb-7 max-w-md mx-auto relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                                </svg>
                                <input
                                    id="product-search"
                                    type="text"
                                    placeholder="Search by name or category…"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-pink-100 rounded-2xl outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 text-sm font-medium text-gray-700 placeholder-gray-400 shadow-md shadow-pink-50 transition-all duration-200"
                                />
                            </div>
                        )}

                        {/* Loading skeletons */}
                        {loadingList && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="bg-white rounded-2xl shadow-md p-5 animate-pulse">
                                        <div className="h-36 bg-pink-100 rounded-xl mb-4" />
                                        <div className="h-4 bg-pink-100 rounded-full w-3/4 mb-2" />
                                        <div className="h-3 bg-pink-50 rounded-full w-1/2" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {listError && (
                            <div className="text-center py-20">
                                <p className="text-red-400 font-semibold">{listError}</p>
                                <button onClick={() => window.location.reload()} className="mt-4 text-pink-500 underline text-sm">Retry</button>
                            </div>
                        )}

                        {!loadingList && !listError && products.length === 0 && (
                            <div className="text-center py-24 text-gray-400">
                                <svg className="w-16 h-16 mx-auto text-pink-200 mb-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <p className="font-semibold">No products yet.</p>
                            </div>
                        )}

                        {!loadingList && !listError && filtered.length === 0 && products.length > 0 && (
                            <div className="text-center py-20 text-gray-400">
                                <p className="font-semibold">No products match &quot;{search}&quot;</p>
                                <button onClick={() => setSearch("")} className="mt-2 text-pink-500 text-sm underline">Clear search</button>
                            </div>
                        )}

                        {/* Product grid */}
                        {!loadingList && !listError && filtered.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {filtered.map((p) => (
                                    <button
                                        key={p.id}
                                        id={`select-product-${p.id}`}
                                        type="button"
                                        onClick={() => { setSelected(p); setSuccessMsg(""); setErrorMsg(""); }}
                                        className="text-left bg-white rounded-2xl shadow-md hover:shadow-2xl hover:shadow-pink-100 border-2 border-transparent hover:border-pink-300 transition-all duration-300 group overflow-hidden"
                                    >
                                        {/* Image area */}
                                        <div className="relative w-full h-36 bg-gradient-to-br from-pink-50 to-rose-100 overflow-hidden">
                                            {p.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <svg className="w-12 h-12 text-pink-200 group-hover:text-pink-300 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5M4.5 3h15A1.5 1.5 0 0121 4.5v15A1.5 1.5 0 0119.5 21h-15A1.5 1.5 0 013 19.5v-15A1.5 1.5 0 014.5 3z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Category badge overlay */}
                                            <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${p.category === "fabric" ? "bg-fuchsia-100 text-fuchsia-600" : "bg-pink-100 text-pink-600"}`}>
                                                {p.category}
                                            </span>
                                            {/* Edit overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-pink-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                                                <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                                                    Edit ✏️
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card body */}
                                        <div className="p-4">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h2 className="font-black text-gray-800 text-sm leading-snug group-hover:text-pink-600 transition-colors duration-200 line-clamp-1">
                                                    {p.name}
                                                </h2>
                                            </div>

                                            <p className="text-lg font-black text-pink-500">
                                                ₹{p.price.toLocaleString("en-IN")}
                                            </p>

                                            <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">{p.description}</p>

                                            {/* Stock indicator */}
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all"
                                                        style={{ width: `${Math.min(100, (p.stock / 100) * 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-gray-500 font-semibold shrink-0">{p.stock} units</span>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default UpdateItemPage;