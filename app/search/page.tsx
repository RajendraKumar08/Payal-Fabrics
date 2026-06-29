"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    style: ['normal', 'italic'],
});

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
});

interface Product {
    id: string;
    name: string;
    image?: string | null;
    price: number;
    description: string;
    category: string;
    MainCategory: string;
    SubCategory: string;
    Material: string;
    Color: string;
    FabricType: string;
    stock: number;
    highlight: boolean;
}

export default function Search() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedFabricType, setSelectedFabricType] = useState<string>("");
    const [selectedMaterial, setSelectedMaterial] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("/api/getallitems");
                if (!res.ok) {
                    throw new Error("Failed to load products");
                }
                const data = await res.json();
                setProducts(data || []);
            } catch (err: any) {
                console.error(err);
                setError("Could not retrieve catalog. Please reload the page.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Dynamically extract unique values from current catalog for populate filters
    const filterOptions = useMemo(() => {
        const colors = new Set<string>();
        const fabricTypes = new Set<string>();
        const materials = new Set<string>();

        products.forEach((p) => {
            if (p.Color?.trim()) colors.add(p.Color.trim());
            if (p.FabricType?.trim()) fabricTypes.add(p.FabricType.trim());
            if (p.Material?.trim()) materials.add(p.Material.trim());
        });

        return {
            colors: Array.from(colors).sort(),
            fabricTypes: Array.from(fabricTypes).sort(),
            materials: Array.from(materials).sort(),
        };
    }, [products]);

    // Compound filtering logic
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch = searchQuery
                ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.description.toLowerCase().includes(searchQuery.toLowerCase())
                : true;

            const matchesCategory = selectedCategory
                ? p.category.toLowerCase() === selectedCategory.toLowerCase()
                : true;

            const matchesColor = selectedColor
                ? p.Color.toLowerCase() === selectedColor.toLowerCase()
                : true;

            const matchesFabricType = selectedFabricType
                ? p.FabricType.toLowerCase() === selectedFabricType.toLowerCase()
                : true;

            const matchesMaterial = selectedMaterial
                ? p.Material.toLowerCase() === selectedMaterial.toLowerCase()
                : true;

            return matchesSearch && matchesCategory && matchesColor && matchesFabricType && matchesMaterial;
        });
    }, [products, searchQuery, selectedCategory, selectedColor, selectedFabricType, selectedMaterial]);

    const handleResetFilters = () => {
        setSearchQuery("");
        setSelectedCategory("");
        setSelectedColor("");
        setSelectedFabricType("");
        setSelectedMaterial("");
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4d243d]"></div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#7d5069]">Loading collections...</p>
                </div>
            </main>
        );
    }

    return (
        <main className={`min-h-screen bg-[#faf6f0] text-slate-800 pb-20 ${poppins.className}`}>
            {/* Header Banner */}
            <section className="relative bg-gradient-to-br from-[#e5d5c5] to-[#f4eae1] py-16 px-6 text-center border-b border-pink-100/50">
                <div className="max-w-4xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#7d5069] font-bold mb-2">Search Catalog</p>
                    <h1 className={`text-4xl md:text-5xl font-extrabold text-[#3c1e2e] tracking-tight ${playfair.className}`}>
                        Browse Collections
                    </h1>
                    <p className="mt-3 text-[#5c404f] text-xs md:text-sm max-w-lg mx-auto leading-relaxed font-semibold">
                        Explore our handcrafted Ajrakh & Bagru block prints, unstitched suit materials, and premium designer fabrics.
                    </p>

                    {/* Search Input Box */}
                    <div className="relative max-w-xl mx-auto mt-8">
                        <input
                            type="text"
                            placeholder="Search by product name, pattern or print..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-pink-100/60 rounded-full py-3.5 pl-12 pr-6 text-sm text-[#3c1e2e] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4d243d]/20 focus:border-[#4d243d] transition-all shadow-md font-medium"
                        />
                        <svg className="absolute left-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-pink-100/50 rounded-3xl p-6 shadow-md lg:sticky lg:top-24 flex flex-col gap-6">
                            
                            <div className="flex items-center justify-between border-b border-pink-100/40 pb-4">
                                <h2 className={`text-lg font-bold text-[#3c1e2e] ${playfair.className}`}>Filters</h2>
                                <button
                                    onClick={handleResetFilters}
                                    className="text-xs font-bold text-[#7d5069] hover:text-[#4d243d] underline transition-colors"
                                >
                                    Reset All
                                </button>
                            </div>

                            {/* Color Filter */}
                            {filterOptions.colors.length > 0 && (
                                <div className="border-b border-pink-100/40 pb-5">
                                    <h3 className="text-[10px] font-bold text-[#7d5069] uppercase tracking-wider mb-3">Color</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedColor("")}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                !selectedColor
                                                    ? "bg-[#4d243d] text-white border-[#4d243d] shadow-md shadow-pink-900/10"
                                                    : "bg-white text-slate-600 border-pink-100 hover:border-pink-200"
                                            }`}
                                        >
                                            All
                                        </button>
                                        {filterOptions.colors.map((col) => (
                                            <button
                                                key={col}
                                                onClick={() => setSelectedColor(col)}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                    selectedColor.toLowerCase() === col.toLowerCase()
                                                        ? "bg-[#4d243d] text-white border-[#4d243d] shadow-md shadow-pink-900/10"
                                                        : "bg-white text-slate-600 border-pink-100 hover:border-pink-200"
                                                }`}
                                            >
                                                {col}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Fabric Type Filter */}
                            {filterOptions.fabricTypes.length > 0 && (
                                <div className="border-b border-pink-100/40 pb-5">
                                    <h3 className="text-[10px] font-bold text-[#7d5069] uppercase tracking-wider mb-3">Fabric Type</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedFabricType("")}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                !selectedFabricType
                                                    ? "bg-[#4d243d] text-white border-[#4d243d] shadow-md shadow-pink-900/10"
                                                    : "bg-white text-slate-600 border-pink-100 hover:border-pink-200"
                                            }`}
                                        >
                                            All
                                        </button>
                                        {filterOptions.fabricTypes.map((ft) => (
                                            <button
                                                key={ft}
                                                onClick={() => setSelectedFabricType(ft)}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                    selectedFabricType.toLowerCase() === ft.toLowerCase()
                                                        ? "bg-[#4d243d] text-white border-[#4d243d] shadow-md shadow-pink-900/10"
                                                        : "bg-white text-slate-600 border-pink-100 hover:border-pink-200"
                                                }`}
                                            >
                                                {ft}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Material Filter */}
                            {filterOptions.materials.length > 0 && (
                                <div>
                                    <h3 className="text-[10px] font-bold text-[#7d5069] uppercase tracking-wider mb-3">Material</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedMaterial("")}
                                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                !selectedMaterial
                                                    ? "bg-[#4d243d] text-white border-[#4d243d] shadow-md shadow-pink-900/10"
                                                    : "bg-white text-slate-600 border-pink-100 hover:border-pink-200"
                                            }`}
                                        >
                                            All
                                        </button>
                                        {filterOptions.materials.map((mat) => (
                                            <button
                                                key={mat}
                                                onClick={() => setSelectedMaterial(mat)}
                                                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                                    selectedMaterial.toLowerCase() === mat.toLowerCase()
                                                        ? "bg-[#4d243d] text-white border-[#4d243d] shadow-md shadow-pink-900/10"
                                                        : "bg-white text-slate-600 border-pink-100 hover:border-pink-200"
                                                }`}
                                            >
                                                {mat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {error && (
                            <div className="text-center py-10 bg-red-50 border border-red-100 rounded-3xl p-6 mb-8">
                                <p className="text-sm font-bold text-red-700">{error}</p>
                            </div>
                        )}

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white border border-pink-100/40 rounded-3xl p-8 shadow-sm">
                                <span className="text-4xl block mb-3">🔍</span>
                                <h3 className={`text-xl font-bold text-[#3c1e2e] mb-1.5 ${playfair.className}`}>No Products Match</h3>
                                <p className="text-slate-500 text-xs font-semibold max-w-sm mx-auto mb-6">
                                    We couldn&apos;t find any item matching your query or selected filters. Try broadening your criteria.
                                </p>
                                <button
                                    onClick={handleResetFilters}
                                    className="px-6 py-2.5 bg-[#4d243d] hover:bg-[#5e2e4b] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl border border-pink-100/50 hover:border-pink-200/50 bg-white transition-all duration-500 ease-in-out cursor-pointer flex flex-col"
                                    >
                                        {/* Image */}
                                        <div className="relative w-full h-[360px] overflow-hidden bg-slate-50">
                                            <img
                                                src={p.image || "/noimage.jpg"}
                                                alt={p.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                            />

                                            {/* Explore Overlay */}
                                            <Link href={`/product/${p.id}`}>
                                                <div className="absolute inset-0 bg-[#4d243d]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8 z-10">
                                                    <div className="text-center">
                                                        <span className="text-white text-xs font-bold tracking-[3px] uppercase border border-white/60 px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
                                                            Explore →
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>

                                            {/* Featured Badge */}
                                            {p.highlight && (
                                                <div className="absolute top-4 right-4 bg-[#4d243d] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-md shadow-sm z-20">
                                                    Featured
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer Info */}
                                        <div className="px-5 py-4 border-t border-slate-100 bg-white flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-2">
                                                    <h3 className={`text-base font-bold text-[#3c1e2e] capitalize leading-snug group-hover:text-[#7d5069] transition-colors ${playfair.className}`}>
                                                        {p.name}
                                                    </h3>
                                                    <p className="text-xs font-bold text-[#7d5069] shrink-0 mt-0.5">
                                                        {p.category.toLowerCase() === "fabric"
                                                            ? `₹${p.price.toFixed(2)}/M`
                                                            : `₹${p.price.toFixed(2)}`}
                                                    </p>
                                                </div>
                                                
                                                {/* Specs Labels */}
                                                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                                                    {p.FabricType && (
                                                        <span className="text-[9px] font-semibold text-[#7d5069] bg-[#4d243d]/5 px-2 py-0.5 rounded">
                                                            {p.FabricType}
                                                        </span>
                                                    )}
                                                    {p.Material && (
                                                        <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                                            {p.Material}
                                                        </span>
                                                    )}
                                                    {p.Color && (
                                                        <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded capitalize">
                                                            {p.Color}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Stock / Actions bar */}
                                            <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                                                <span className={p.stock > 0 ? "text-green-700" : "text-red-600"}>
                                                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                                                </span>
                                                <span className="text-[#7d5069] capitalize">
                                                    {p.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}