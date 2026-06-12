'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const OrderDetailsPage = () => {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const fetchOrderDetails = async () => {
            try {
                setLoading(true);

                const response = await fetch(`/api/admin/getorder/${orderId}`);
                const data = await response.json();

                setOrder(data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-pink-50 flex items-center justify-center">
                <div className="text-pink-500 text-lg font-medium">
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white p-6">
            <div className="max-w-5xl mx-auto">
                
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Order Details
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View complete order information
                    </p>
                </div>

                {order && order.length > 0 ? (
                    <div className="grid gap-5">
                        {order.map((item: any) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-3xl border border-pink-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
                            >
                                <div className="flex justify-between items-start flex-wrap gap-4">
                                    
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {item.productName}
                                        </h2>

                                        <p className="text-gray-500 text-sm mt-1">
                                            Product ID: {item.productId}
                                        </p>
                                    </div>

                                    <div className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full text-sm font-medium">
                                        Qty: {item.quantity}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                    
                                    <div className="bg-pink-50 rounded-xl p-4">
                                        <p className="text-gray-500 text-sm">
                                            Unit Price
                                        </p>

                                        <p className="text-lg font-semibold text-gray-800">
                                            ₹{item.price}
                                        </p>
                                    </div>

                                    <div className="bg-pink-50 rounded-xl p-4">
                                        <p className="text-gray-500 text-sm">
                                            Quantity
                                        </p>

                                        <p className="text-lg font-semibold text-gray-800">
                                            {item.quantity}
                                        </p>
                                    </div>

                                    <div className="bg-pink-100 rounded-xl p-4">
                                        <p className="text-pink-600 text-sm">
                                            Total Amount
                                        </p>

                                        <p className="text-2xl font-bold text-pink-600">
                                            ₹{item.price * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-pink-100 shadow-sm p-10 text-center">
                        <p className="text-gray-500">
                            No order items found
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetailsPage;