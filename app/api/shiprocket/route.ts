import { NextRequest, NextResponse } from "next/server";

interface OrderItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

interface DeliveryData {
  billing_customer_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

async function get_shiprocket_token() {

  const response = await fetch(
    `${process.env.SHIPROCKET_API_URL}/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: process.env.SHIPROCKET_API_EMAIL,
        password: process.env.SHIPROCKET_API_PASSWORD,
      }),
    }
  );

  const data = await response.json();

  console.log("ShipRocket Auth Response:", data);

  if (!response.ok) {

    throw new Error(
      JSON.stringify(data)
    );
  }

  return data.token;
}

export async function POST(req: NextRequest) {

  try {

    const body = await req.json();

    const {
      razorpayOrderId,
      razorpayPaymentId,
      deliveryData,
      orderData,
    } = body;

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !deliveryData ||
      !orderData
    ) {

      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const token = await get_shiprocket_token();

    const payload = {

      order_id: razorpayOrderId,

      order_date: new Date().toISOString(),

      pickup_location: "warehouse",

      billing_customer_name:
        deliveryData.billing_customer_name,

      billing_last_name: "",

      billing_address:
        deliveryData.billing_address,

      billing_address_2: "",

      billing_city:
        deliveryData.billing_city,

      billing_pincode:
        deliveryData.billing_pincode,

      billing_state:
        deliveryData.billing_state,

      billing_country:
        deliveryData.billing_country,

      billing_email:
        orderData.email,

      billing_phone:
        deliveryData.billing_phone,

      shipping_is_billing: true,

      order_items: orderData.items.map(
        (item: OrderItem) => ({
          name: item.name,

          sku: String(item.productId),

          units: item.quantity,

          selling_price: item.price,
        })
      ),

      payment_method: "Prepaid",

      sub_total: orderData.total,

      length: deliveryData.length,

      breadth: deliveryData.breadth,

      height: deliveryData.height,

      weight: deliveryData.weight,
    };

    console.log(
      "ShipRocket Payload:",
      payload
    );

    const response = await fetch(
      `${process.env.SHIPROCKET_API_URL}/orders/create/adhoc`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    console.log(
      "ShipRocket Create Order Response:",
      data
    );

    if (!response.ok) {

      return NextResponse.json(
        {
          error: data,
        },
        {
          status: response.status,
        }
      );
    }

    if (!data.shipment_id) {

      return NextResponse.json(
        {
          error: "Shipment ID missing",

          details: data,
        },
        {
          status: 400,
        }
      );
    }

    const shipment_id = data.shipment_id;

    const assign_response = await fetch(
      `${process.env.SHIPROCKET_API_URL}/courier/assign/awb`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          shipment_id: shipment_id,
        }),
      }
    );

    const assign_data =
      await assign_response.json();

    console.log(
      "ShipRocket Assign AWB Response:",
      assign_data
    );

    if (!assign_response.ok) {

      return NextResponse.json(
        {
          error: "AWB assign failed",

          details: assign_data,
        },
        {
          status: assign_response.status,
        }
      );
    }

    return NextResponse.json({
      success: true,

      shipment_id: shipment_id,

      awb_data: assign_data,

      order_data: data,
    });

  } catch (error: any) {

    console.log(
      "ShipRocket Main Error:",
      error
    );

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}