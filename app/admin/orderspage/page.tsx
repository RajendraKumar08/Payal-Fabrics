'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

const OrdersInAdmin = () => {
    const [orders, set_orders] = useState<any[]>([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState<string | null>(null);
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [shiprocketResponse, setShiprocketResponse] = useState<any>(null);
    const [orderstatusloading, setOrderStatusLoading] = useState(false);

    useEffect(() => {
        const fetch_orders = async () => {
            try {
                const res = await fetch('/api/admin/getallorders');
                const data = await res.json();

                if (!res.ok) {
                    set_error(data?.message || 'Unable to fetch orders');
                    set_orders([]);
                } else if (Array.isArray(data)) {
                    set_orders(data);
                } else if (data?.orders && Array.isArray(data.orders)) {
                    set_orders(data.orders);
                } else {
                    set_error('Unexpected orders format returned from server.');
                    set_orders([]);
                }
            } catch (err) {
                console.log('Error fetching orders in admin', err);
                set_error('Error fetching orders in admin.');
                set_orders([]);
            } finally {
                set_loading(false);
            }
        };

        fetch_orders();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status?.toUpperCase()) {
            case 'SHIPPED':
            case 'PAID':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'FAILED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const isOrderShipped = (order: any) => order?.status?.toString().toUpperCase() === 'SHIPPED';

    const handleshipbtn = async () => {
        if (!expandedOrderId) {
            alert('Please expand an order first before marking it as shipped.');
            return;
        }

        alert("This will mark the order as shipped and update the status in the database. You can also integrate with Shiprocket API to create a shipment and get tracking details.");
        setOrderStatusLoading(true);
        try {
            const res = await fetch(`/api/admin/shiporder/${expandedOrderId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || `Server returned ${res.status}`);
            }

            console.log('Shiprocket API response:', data);
            setShiprocketResponse(data);
            set_orders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === expandedOrderId ? { ...order, status: 'SHIPPED' } : order
                )
            );
        } catch (err) {
            console.error('Error calling shiporder API:', err);
            alert('Failed to mark order as shipped. Please try again.');
        } finally {
            setOrderStatusLoading(false);
        }
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50 px-6 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                    </div>
                    <p className="mt-4 text-center text-slate-600">Loading orders...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-purple-50 to-slate-50 px-6 py-12">

            <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-8 text-pink-500">
                <h1 className="text-2xl font-bold mb-6 text-center text-pink-500">
                    Pickup Options Information
                </h1>

                <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-gray-50 border-l-4">
                        <h2 className="text-lg font-semibold">HOME</h2>
                        <p className="text-gray-600">
                            <strong>HOME</strong> when the order will be delivered to the customer’s home address through Shiprocket. Shiprocket courier partner will pick up the order and deliver it directly to the customer.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border-l-4 ">
                        <h2 className="text-lg font-semibold">WAREHOUSE</h2>
                        <p className="text-gray-600">
                            <strong>WAREHOUSE</strong> when the customer will personally visit the warehouse/shop to collect their order. No delivery service is required in this option.
                        </p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 border-l-4 ">
                        <h2 className="text-lg font-semibold">PAYALFABRIC</h2>
                        <p className="text-gray-600">
                            <strong>PAYALFABRIC</strong> when the customer is within 20 km distance and delivery can be handled by the Payal Fabrics team. A team member will personally deliver the order to the customer’s home.
                        </p>
                    </div>
                </div>
            </div>


            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Orders Management</h1>
                    <p className="text-slate-600">Track and manage all customer orders</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 flex items-start gap-3">
                        <span className="text-red-600 text-xl">⚠️</span>
                        <div>
                            <h3 className="font-semibold text-red-900">Error</h3>
                            <p className="text-red-800 text-sm">{error}</p>
                        </div>
                    </div>
                )}

                {/* Orders List */}
                {orders.length === 0 ? (
                    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-white p-12 text-center">
                        <p className="text-xl text-slate-600 mb-2">📦 No orders found</p>
                        <p className="text-slate-500">Orders will appear here once customers place them.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-sm text-slate-600 mb-4">
                            Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
                        </div>
                        {orders.map((order: any) => (
                            <div
                                key={order.id}
                                className="rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                {/* Order Header */}
                                <button
                                    onClick={() =>
                                        setExpandedOrderId(
                                            expandedOrderId === order.id ? null : order.id
                                        )
                                    }
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                                >
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Order ID</p>
                                            <p className="text-sm font-semibold text-slate-900 truncate">
                                                {order.id.slice(0, 8)}...
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Customer</p>
                                            <p className="text-sm font-semibold text-slate-900">{order.orderedBy}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Total Amount</p>
                                            <p className="text-sm font-semibold text-purple-600">
                                                ₹{order.totalAmount.toFixed(2)}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">Shipping Status</p>
                                            <span
                                                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                                                    order.status
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                            <p className="text-[10px] text-slate-500 mt-1">
                                                Payment: {order.paymentStatus}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <span className="text-slate-400">
                                            {expandedOrderId === order.id ? '▼' : '▶'}
                                        </span>
                                    </div>
                                </button>

                                {/* Order Details - Expanded */}
                                {expandedOrderId === order.id && (
                                    <div className="border-t border-slate-200 px-6 py-4 bg-slate-50 space-y-4">
                                        {/* Order Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                                    Order Date
                                                </p>
                                                <p className="text-sm text-slate-900">
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                                    Full Order ID
                                                </p>
                                                <p className="text-xs font-mono text-slate-700 truncate">{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                                    Payment ID
                                                </p>
                                                <p className="text-xs font-mono text-slate-700 truncate">
                                                    {order.razorpayPaymentId || 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                                    Customer Name
                                                </p>
                                                <p className="text-xs font-mono text-slate-700 truncate">
                                                    {order.orderedBy}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                                                    Delivery Option
                                                </p>
                                                <p className="text-xs font-mono text-slate-700 truncate">
                                                    {order.pickOption}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Additional Info */}
                                        <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 mb-4">
                                            <p>Order Status: <span className="font-semibold text-slate-900">{order.status}</span></p>
                                            <button
                                                onClick={handleshipbtn}
                                                disabled={isOrderShipped(order)}
                                                className={`cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${isOrderShipped(order)
                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                    : 'bg-green-600 text-white hover:bg-green-700'} ${orderstatusloading && !isOrderShipped(order) ? 'bg-yellow-500 cursor-wait hover:bg-yellow-500' : ''}`}
                                            >
                                                {
                                                    isOrderShipped(order) ? 'Already Shipped' : (orderstatusloading ? "Wait..." : "Mark as Delivered")
                                                }
                                            </button>
                                        </div>

                                        {/* View Details Button */}
                                        <div className="flex gap-2">
                                            <button className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors">
                                                <Link href={`/admin/order/${order.id}`}>
                                                    View Full Order Details
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default OrdersInAdmin;