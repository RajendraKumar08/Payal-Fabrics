import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma-db";

// ShipRocket API configuration
const SHIPROCKET_API_URL = "https://apiv2.shiprocket.in/v1/external";
const SHIPROCKET_EMAIL = process.env.SHIPROCKET_EMAIL || "";
const SHIPROCKET_PASSWORD = process.env.SHIPROCKET_PASSWORD || "";

interface OrderItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

interface DeliveryData {
  billing_customer_name: string;
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
  pickup_location?: string;
}

// Get ShipRocket Auth Token
async function getShipRocketToken() {
  try {
    const response = await fetch(`${SHIPROCKET_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: SHIPROCKET_EMAIL,
        password: SHIPROCKET_PASSWORD,
      }),
    });

    const data = await response.json();
    if (data.token) {
      return data.token;
    }
    throw new Error("Failed to get ShipRocket token");
  } catch (error) {
    console.error("ShipRocket auth error:", error);
    throw error;
  }
}

// Create order in ShipRocket
async function createShipRocketOrder(
  token: string,
  orderData: any,
  deliveryData: DeliveryData
) {
  try {
    const payload = {
      order_id: orderData.orderId,
      order_date: new Date().toISOString(),
      pickup_location: deliveryData.pickup_location || "Home",
      billing_customer_name: deliveryData.billing_customer_name,
      billing_email: orderData.email,
      billing_phone: deliveryData.billing_phone,
      billing_address: deliveryData.billing_address,
      billing_address_2: "",
      billing_city: deliveryData.billing_city,
      billing_pincode: deliveryData.billing_pincode,
      billing_state: deliveryData.billing_state,
      billing_country: deliveryData.billing_country,
      billing_isd_code: "+91",
      shipping_is_billing: true,
      order_items: orderData.items.map((item: OrderItem) => ({
        name: item.name,
        sku: item.productId,
        units: item.quantity,
        selling_price: item.price,
      })),
      payment_method: "Prepaid",
      sub_total: orderData.total,
      length: deliveryData.length,
      breadth: deliveryData.breadth,
      height: deliveryData.height,
      weight: deliveryData.weight,
    };

    const response = await fetch(`${SHIPROCKET_API_URL}/orders/create/adhoc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ShipRocket order creation error:", error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { razorpayOrderId, razorpayPaymentId, deliveryData, orderData } = body;

    if (!razorpayOrderId || !razorpayPaymentId || !deliveryData || !orderData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get ShipRocket token
    const token = await getShipRocketToken();

    // Create order in ShipRocket
    const shipRocketResponse = await createShipRocketOrder(
      token,
      {
        orderId: razorpayOrderId,
        email: orderData.email,
        items: orderData.items,
        total: orderData.total,
      },
      deliveryData
    );

    if (!shipRocketResponse.success) {
      return NextResponse.json(
        { error: "Failed to create ShipRocket order", details: shipRocketResponse },
        { status: 400 }
      );
    }

    // Save delivery info to database (optional)
    // You can extend your Prisma schema to include a DeliveryInfo model
    // and save the delivery details here

    return NextResponse.json({
      success: true,
      shipRocketOrderId: shipRocketResponse.data.shipment_id,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("ShipRocket API error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
