'use client'

import { useEffect, useState } from 'react';

const OrdersInAdmin = () => {
    const [orders, set_orders] = useState<any[]>([]);
    const [loading, set_loading] = useState(true);
    const [error, set_error] = useState<string | null>(null);

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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Orders in Admin</h1>

            {error && (
                <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    {error}
                </div>
            )}

            <div>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order: any) => (
                        <div key={order.id}>
                            <h2>Order {order.id}</h2>
                            <p>Customer: {order.orderedBy}</p>
                            <p>
                                Total Amount: ₹{order.totalAmount.toFixed(2)}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default OrdersInAdmin;