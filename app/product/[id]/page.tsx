'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AddToCartButton from '@/app/components/AddToCartButton';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { Dancing_Script } from 'next/font/google';
import Select from 'react-select';

const dancingScript = Dancing_Script({
    subsets: ['latin'],
    weight: ['400', '700'],
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

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                    <p className="mt-4 text-slate-600">Loading product details...</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Product Not Found</h1>
                    <p className="text-slate-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Breadcrumb */}
            <section className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-slate-600">
                        <Link href="/" className="hover:text-purple-600 transition-colors">
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            href={`/${product.category}`}
                            className="hover:text-purple-600 transition-colors capitalize"
                        >
                            {product.category}
                        </Link>
                        <span>/</span>
                        <span className="text-slate-900 font-semibold">{product.name}</span>
                    </nav>
                </div>
            </section>

            {/* Product Detail Section */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-white shadow-lg border border-slate-200">
                            <Image
                                src={product.image || '/noimage.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-start">
                        
                        {/* Badge */}
                        {product.highlight && (
                            <div className="inline-block mb-4 w-fit">
                                <span className="bg-black text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                                    ✦ Featured Product
                                </span>
                            </div>
                        )}

                        {/* Product Name */}
                        <h1 className={`text-5xl font-bold text-slate-900 mb-4 ${dancingScript.className}`}>
                            {product.name}
                        </h1>

                        {/* Price */}
                        <div className="mb-6 pb-6 border-b border-slate-200">
                            <p className="text-4xl font-bold text-purple-600">
                                {product.category.toLowerCase() === 'fabric'
                                    ? `₹${product.price.toFixed(2)}/Meter`
                                    : `₹${product.price.toFixed(2)}`}
                            </p>
                            <p className="text-sm text-slate-500 mt-2">
                                Inclusive of all taxes
                            </p>
                        </div>

                        {/* Category & Stock */}
                        <div className="mb-6 flex gap-4">
                            <div>
                                <p className="text-sm text-slate-500 uppercase tracking-wider">Category</p>
                                <p className="text-lg font-semibold text-slate-900 capitalize">{product.category}</p>
                            </div>
                            <div className="border-l border-slate-200"></div>
                            <div>
                                <p className="text-sm text-slate-500 uppercase tracking-wider">Stock Available</p>
                                <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {product.stock > 0 ? `${product.stock} ${product.category.toLowerCase() === 'fabric' ? 'Meters' : 'Items'}` : 'Out of Stock'}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8 pb-8 border-b border-slate-200">
                            <p className="text-sm text-slate-500 uppercase tracking-wider mb-3">Description</p>
                            <p className="text-slate-700 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Add to Cart & Actions */}
                        <div className="flex flex-col gap-4">
                            {product.category.toLowerCase() === 'fabric' && (
                                <Select
                                    placeholder="0.5 Meter"
                                    value={options.find((option) => option.value === quantity)}
                                    options={options}
                                    onChange={(selected) => setQuantity(selected?.value || 0.5)}
                                    menuPlacement="auto"
                                    maxMenuHeight={200}
                                    className="text-black w-48"
                                />
                            )}
                            {product.stock > 0 ? (
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
                            ) : (
                                <button disabled className="px-6 py-3 bg-slate-300 text-slate-600 font-semibold rounded-lg cursor-not-allowed">
                                    Out of Stock
                                </button>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-4">Why Choose Us?</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-600 text-xl">✓</span>
                                    <span className="text-slate-700">Premium quality fabrics from trusted artisans</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-600 text-xl">✓</span>
                                    <span className="text-slate-700">Secure checkout & fast delivery</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="text-purple-600 text-xl">✓</span>
                                    <span className="text-slate-700">100% satisfaction guarantee</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products Section (Optional) */}
            <section className="bg-white border-t border-slate-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className={`text-4xl font-bold text-slate-900 text-center mb-12 ${dancingScript.className}`}>
                        Explore More from {product.category}
                    </h2>
                    <p className="text-center text-slate-600 mb-8">
                        Discover other beautiful products in the {product.category} category
                    </p>
                    <div className="text-center">
                        <Link
                            href={`/${product.category}`}
                            className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            View All {product.category}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
