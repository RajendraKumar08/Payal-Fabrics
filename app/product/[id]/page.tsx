'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddToCartButton from '@/app/components/AddToCartButton';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Playfair_Display, Poppins } from 'next/font/google';
import Select from 'react-select';
import Footer from '@/app/components/footer';

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
    stock: number;
    highlight: boolean;
    Color: string;
    MainCategory: string;
    SubCategory: string;
    FabricType: string;
    Material: string;
}

export default function ProductDetail() {
    const params = useParams();
    const id = params?.id as string | undefined;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { isAuthenticated } = useKindeBrowserClient();
    const authenticated = Boolean(isAuthenticated);
    const [quantity, setQuantity] = useState(0.5);

    const options = [
        { value: 0.5, label: "0.5 Meter" },
        { value: 1, label: "1.0 Meter" },
        { value: 1.5, label: "1.5 Meters" },
        { value: 2, label: "2.0 Meters" },
        { value: 2.5, label: "2.5 Meters" },
        { value: 3, label: "3.0 Meters" },
        { value: 3.5, label: "3.5 Meters" },
        { value: 4, label: "4.0 Meters" },
        { value: 4.5, label: "4.5 Meters" },
        { value: 5, label: "5.0 Meters" },
        { value: 5.5, label: "5.5 Meters" },
        { value: 6, label: "6.0 Meters" },
        { value: 6.5, label: "6.5 Meters" },
        { value: 7, label: "7.0 Meters" },
        { value: 7.5, label: "7.5 Meters" },
        { value: 8, label: "8.0 Meters" },
        { value: 8.5, label: "8.5 Meters" },
        { value: 9, label: "9.0 Meters" },
        { value: 9.5, label: "9.5 Meters" },
        { value: 10, label: "10.0 Meters" },
    ];
    const [showpopup, setShowpopup] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('Product ID is missing.');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/getitem?id=${id}`);
                if (!res.ok) {
                    const json = await res.json().catch(() => null);
                    setError(json?.message || 'Product not found.');
                    return;
                }

                const data = await res.json();
                setProduct(data.product);
            } catch (err) {
                console.error('Failed to load product:', err);
                setError('Failed to load product.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    
    const stock = product?.stock;
     

    const customSelectStyles = {
        control: (styles: any) => ({
            ...styles,
            borderColor: '#pink-200',
            borderWidth: '1px',
            borderRadius: '9999px',
            padding: '2px 8px',
            fontSize: '13px',
            fontWeight: '600',
            boxShadow: 'none',
            outline: 'none',
            backgroundColor: 'white',
        }),
        option: (styles: any, { isSelected, isFocused }: any) => ({
            ...styles,
            backgroundColor: isSelected ? '#4d243d' : isFocused ? '#4d243d/5' : undefined,
            color: isSelected ? 'white' : '#3c1e2e',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            ':active': {
                backgroundColor: '#4d243d',
                color: 'white',
            }
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: '#3c1e2e',
        })
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#faf6f0] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#4d243d]"></div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-wider text-[#7d5069]">Loading product details...</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="min-h-screen bg-[#faf6f0] flex items-center justify-center px-6">
                <div className="text-center max-w-md bg-white p-10 rounded-3xl border border-pink-100 shadow-xl">
                    <h1 className={`text-3xl font-extrabold text-[#3c1e2e] mb-2 tracking-tight ${playfair.className}`}>Product Not Found</h1>
                    <p className="text-slate-600 text-sm mb-6 leading-relaxed">{error || 'The product you are looking for does not exist.'}</p>
                    <Link
                        href="/"
                        className="inline-block px-8 py-3 bg-[#4d243d] hover:bg-[#5e2e4b] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-colors active:scale-95"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className={`min-h-screen bg-[#faf6f0] text-slate-800 ${poppins.className}`}>
            {/* Breadcrumb */}
            <section className="bg-[#f4eae1]/50 border-b border-pink-100/50 px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-xs font-bold text-[#7d5069] tracking-wider uppercase">
                        <Link href="/" className="hover:text-[#4d243d] transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            href={`/${product.category}`}
                            className="hover:text-[#4d243d] transition-colors capitalize"
                        >
                            {product.category}
                        </Link>
                        <span>/</span>
                        <span className="text-[#3c1e2e] font-extrabold truncate max-w-[200px]">{product.name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Detail Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden bg-white shadow-xl border border-pink-100/50">
                            <Image
                                src={product.image || '/noimage.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover animate-fade-in"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-start">

                        {/* Badge */}
                        {product.highlight && (
                            <div className="inline-block mb-4 w-fit">
                                <span className="bg-[#4d243d] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                                    ✦ Featured Product
                                </span>
                            </div>
                        )}

                        {/* Product Name */}
                        <h1 className={`text-4xl md:text-5xl font-extrabold text-[#3c1e2e] mb-4 tracking-tight leading-tight ${playfair.className}`}>
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="mb-6 pb-6 border-b border-pink-100/40">
                            <p className="text-3xl font-extrabold text-[#7d5069]">
                                {product.category.toLowerCase() === 'fabric'
                                    ? `₹${product.price.toFixed(2)}/Meter`
                                    : `₹${product.price.toFixed(2)}`}
                            </p>
                            <p className="text-xs font-semibold text-slate-500 mt-2">
                                Inclusive of all taxes
                            </p>
                        </div>

                        {/* Category & Stock */}
                        <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6 border-b border-pink-100/30 pb-6 text-sm">
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Category</p>
                                <p className="font-bold text-[#3c1e2e] capitalize">{product.category}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Stock Available</p>
                                <p className={`font-bold ${product.stock > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                    {product.stock > 0 ? `${product.stock} ${product.category.toLowerCase() === 'fabric' ? 'Meters' : 'Items'}` : 'Out of Stock'}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Sub Category</p>
                                <p className="font-bold text-[#3c1e2e] capitalize">{product.SubCategory}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Fabric Type</p>
                                <p className="font-bold text-[#3c1e2e] capitalize">{product.FabricType}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Material</p>
                                <p className="font-bold text-[#3c1e2e] capitalize">{product.Material}</p>
                            </div>
                        </div>

                        {/* colour and maincategory */}
                        <div className="mb-6 grid grid-cols-2 gap-4 border-b border-pink-100/30 pb-6 text-sm">
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Color</p>
                                <p style={{color: product.Color, fontWeight: 'bold'}} className="capitalize">{product.Color}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-1">Main Category</p>
                                <p className="font-bold text-[#3c1e2e] capitalize">{product.MainCategory}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8 pb-8 border-b border-pink-100/40">
                            <p className="text-[10px] text-[#7d5069] uppercase tracking-wider font-bold mb-2.5">Description</p>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Add to Cart & Actions */}
                        <div className="mb-8 flex flex-col gap-4">
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                {product.category.toLowerCase() === 'fabric' && (
                                    <div className="w-full sm:w-48">
                                        <Select
                                            placeholder="0.5 Meter"
                                            value={options.find((option) => option.value === quantity)}
                                            options={options}
                                            onChange={(selected) => setQuantity(selected?.value || 0.5)}
                                            menuPlacement="auto"
                                            maxMenuHeight={200}
                                            styles={customSelectStyles}
                                            className="text-black"
                                        />
                                    </div>
                                )}
                                
                                <div className="flex-1">
                                    {product.stock > 0  ?(
                                            <AddToCartButton
                                                product={{
                                                    id: product.id,
                                                    name: product.name,
                                                    price: product.price,
                                                    image: product.image || '',
                                                    stock: product.stock,
                                                    category: product.category,
                                                    quantity: product.category.toLowerCase() === 'fabric' ? quantity : 1,
                                                }}
                                                authenticated={authenticated}

                                            />
                                        
                                    ): 
                                        <button disabled className="w-full px-8 py-3.5 bg-slate-200 text-slate-500 font-bold uppercase tracking-wider text-xs rounded-full cursor-not-allowed">
                                            Out of Stock
                                        </button>
                                    }
                                </div>
                            </div>
                            
                            <div className="mt-2">
                                <button
                                    onClick={() => setShowpopup(true)}
                                    className="border-2 border-[#4d243d] text-[#4d243d] hover:bg-[#4d243d]/5 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 transform active:scale-95 cursor-pointer"
                                >
                                    Size Estimation Guide
                                </button>
                                <p className='text-left text-black mt-4 font-semibold'> Fabric stitching ke liye WhatsApp par baat karein 👇 </p>
                                <a href="https://wa.me/919898976916?text=Hello%20I%20want%20to%20know%20more"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white bg-green-600 rounded-lg px-6 py-2 hover:bg-green-700 font-semibold mt-2 inline-block">
                                    💬 WhatsApp Karein
                                </a>

                                {showpopup && (
                                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                                        {/* Modal Box */}
                                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[75vh] relative p-6 md:p-8 flex flex-col border border-pink-100">
                                            {/* Close Button */}
                                            <button
                                                onClick={() => setShowpopup(false)}
                                                className="absolute top-4 right-5 text-3xl font-light text-slate-400 hover:text-black transition-colors"
                                            >
                                                ×
                                            </button>

                                            {/* Heading */}
                                            <h2 className={`text-2xl md:text-3xl font-extrabold text-[#3c1e2e] text-center mb-1 ${playfair.className}`}>
                                                Fabric Size Guide
                                            </h2>
                                            <p className="text-center text-[#7d5069] text-xs font-semibold mb-6 uppercase tracking-wider">
                                                Estimate required meters for standard sizes (L / 40)
                                            </p>

                                            {/* Scrollable Table Content */}
                                            <div className="overflow-y-auto flex-1 border border-pink-100 rounded-2xl">
                                                <table className="w-full text-center border-collapse">
                                                    <thead>
                                                        <tr className="bg-[#f4eae1]/60 text-[#3c1e2e] font-bold text-[10px] md:text-xs uppercase tracking-wider border-b border-pink-100">
                                                            <th className="p-3 border-r border-pink-100 text-left pl-6">Garment Pattern</th>
                                                            <th className="p-3">Required Meters (Est. for Size L)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-pink-100/50 text-slate-700 text-xs md:text-sm">
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Anarkali Suit</td><td className="p-3 font-semibold">4.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Blouse</td><td className="p-3 font-semibold">1.0 Meter</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Co-ord Set</td><td className="p-3 font-semibold">4.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Crop Top</td><td className="p-3 font-semibold">1.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Flared Kurti</td><td className="p-3 font-semibold">3.0 - 4.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Floor Length Dress</td><td className="p-3 font-semibold">3.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Kaftan</td><td className="p-3 font-semibold">3.0 Meters & above</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">High Low Kurti</td><td className="p-3 font-semibold">3.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">High Waist Skirt</td><td className="p-3 font-semibold">5.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Mini Dress</td><td className="p-3 font-semibold">3.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Patiyala Pants</td><td className="p-3 font-semibold">5.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Palazzo Pants</td><td className="p-3 font-semibold">3.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Salwaar Pants</td><td className="p-3 font-semibold">2.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Saree (Standard)</td><td className="p-3 font-semibold">5.5 - 6.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Short Kurti</td><td className="p-3 font-semibold">2.0 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Stole / Dupatta</td><td className="p-3 font-semibold">1.5 - 2.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Straight Kurti</td><td className="p-3 font-semibold">3.5 Meters</td></tr>
                                                        <tr><td className="p-3 border-r border-pink-100 text-left pl-6 font-semibold">Wrap Dress</td><td className="p-3 font-semibold">5.5 Meters & above</td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 pt-8 border-t border-pink-100/40">
                            <p className="text-[10px] text-[#7d5069] uppercase tracking-wider mb-4 font-bold">Why Choose Payal Fabrics?</p>
                            <ul className="space-y-3.5">
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-[#7d5069] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-slate-600 text-xs font-bold uppercase tracking-wide">Premium quality fabrics from trusted local artisans</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-[#7d5069] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-slate-600 text-xs font-bold uppercase tracking-wide">100% secure checkout & reliable home delivery</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-4 h-4 text-[#7d5069] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                    <span className="text-slate-600 text-xs font-bold uppercase tracking-wide">Heritage patterns curated with absolute satisfaction</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            <section className="bg-[#f4eae1]/30 border-t border-pink-100/50 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className={`text-3xl font-extrabold text-[#3c1e2e] text-center mb-3 tracking-tight ${playfair.className}`}>
                        Explore More from {product.category}
                    </h2>
                    <p className="text-center text-[#7d5069] text-xs font-bold uppercase tracking-wider mb-10">
                        Discover other beautiful options in our collections
                    </p>
                    <div className="text-center">
                        <Link
                            href={`/${product.category}`}
                            className="inline-block px-8 py-3.5 bg-[#4d243d] hover:bg-[#5e2e4b] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-pink-900/10 transition-all duration-300 transform active:scale-95 cursor-pointer"
                        >
                            View All {product.category}
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
