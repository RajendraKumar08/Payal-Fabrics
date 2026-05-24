export async function get_token() {
    const response = await fetch("/api/shiprocket/auth", {
        method: "POST",
    });

    return response.json();
}

export async function get_rates(
    token: string,
    delivery_pincode: string
) {
    const response = await fetch(
        `/api/shiprocket/checkRates?token=${token}&pickup_postcode=302017&delivery_postcode=${delivery_pincode}&weight=0.5`
    );

    return response.json();
}

export async function create_order(
    token: string,
    orderData: any
) {
    const response = await fetch(
        "/api/shiprocket/create",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                token,
                orderData,
            }),
        }
    );

    return response.json();
}

export async function assign_awb(
    token: string,
    shipment_id: number
) {
    const response = await fetch(
        "/api/shiprocket/assign",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                token,
                shipment_id,
            }),
        }
    );

    return response.json();
}