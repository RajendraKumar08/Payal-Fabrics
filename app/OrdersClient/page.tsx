"use client";

import { useState } from "react";

export default function OrdersClient(shiprocketId: any) {

    console.log("Orders in orderclient page:", shiprocketId);
    const usesableshiprocketid = shiprocketId.razid;
    const [orderDetails, setOrderDetails] = useState<any>({});

    const handlegetdetails = async (razid: string) => {
        
        try {
            console.log("razid in handlegetdetails:", razid);
            
            const res = await fetch(`/api/shiprocket/getorder/${razid}`);
            const data = await res.json();
            setOrderDetails(data.data);
            console.log(data);
            console.log("Order details fetched successfully:", data.data);
            console.log("Order status: ", data.data.status);
        } catch (e) {
            console.log(e);
        }
    };


    const getstatus = (status: string) => {
        switch (status) {
            case "NEW":
                return "Pending";
            case "SHIPPED":
                return "Shipped";
            case "DELIVERED":
                return "Delivered";
            default:
                return status;
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2">
                <button
                    className="border-1 border-slate-200 py-2 px-4 rounded-lg shadow-sm hover:bg-amber-50 hover:cursor-pointer"
                    onClick={() => handlegetdetails(shiprocketId.razid)}
                >
                    View Status
                </button>
                {/* order detail  */}
                <h1>Status : {orderDetails && orderDetails.data && getstatus(orderDetails.data.status)}</h1>
            </div>
        </>
    );
}