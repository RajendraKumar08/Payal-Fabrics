'use client'
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
const OrderDetailsPage = () => {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState([]);
    useEffect(() => {
        if (!orderId) return;
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`/api/admin/getorder/${orderId}`);
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error("Error fetching order details:", error);
            }
        };
        fetchOrderDetails();
    }, [orderId]);
    console.log("Order in order details page", order);
    return (
        <div>
            <h1>Order Details</h1>
            {order && order.length > 0 && order.map((item: any) => {
                return (
                    
                    <div className = "flex gap-4" key={item.id}>
                       <div>
                            <p>Product Name: {item.productName}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {item.price}</p>
                            <p>Total: {item.price * item.quantity}</p>
                       </div>
                    </div>
                )
            })}
        </div>
    )
}

export default OrderDetailsPage;