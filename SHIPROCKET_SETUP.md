# ShipRocket Integration Setup Guide

## Overview
This application integrates ShipRocket API to manage order shipments. Users fill in delivery details during checkout, which are then sent to ShipRocket to create shipment orders.

## Prerequisites
1. ShipRocket account (https://www.shiprocket.in/)
2. ShipRocket API credentials (email and password)

## Setup Instructions

### 1. Get ShipRocket Credentials
1. Log in to your [ShipRocket Dashboard](https://app.shiprocket.in/)
2. Go to **Settings** → **API** → **Credentials**
3. Note your **Email** and **Password** for API authentication

### 2. Update Environment Variables
Add the following to your `.env.local` file:

```env
# ShipRocket API Configuration
SHIPROCKET_EMAIL=your_shiprocket_email@example.com
SHIPROCKET_PASSWORD=your_shiprocket_password
```

### 3. Database Schema Extension (Optional)
If you want to store delivery details in your database, extend your Prisma schema:

```prisma
model DeliveryInfo {
  id            Int    @id @default(autoincrement())
  orderId       String  @unique
  customerName  String
  phone         String
  address       String
  city          String
  pincode       String
  state         String
  country       String
  length        Float
  breadth       Float
  height        Float
  weight        Float
  shipRocketId  String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

Then run:
```bash
npx prisma migrate dev --name add_delivery_info
```

## API Endpoints

### Delivery Form Component
**Location:** `app/components/DeliveryForm.tsx`

Captures user delivery details including:
- Customer name and phone
- Delivery address (address, city, pincode, state, country)
- Package dimensions (length, breadth, height, weight in cm/kg)

### ShipRocket API Route
**Location:** `app/api/shiprocket/route.ts`

**Method:** POST

**Request Body:**
```json
{
  "razorpayOrderId": "order_xxxxx",
  "razorpayPaymentId": "pay_xxxxx",
  "deliveryData": {
    "billing_customer_name": "John Doe",
    "billing_phone": "9876543210",
    "billing_address": "123 Main St",
    "billing_city": "Delhi",
    "billing_pincode": "110001",
    "billing_state": "Delhi",
    "billing_country": "India",
    "length": 10,
    "breadth": 10,
    "height": 10,
    "weight": 0.5,
    "pickup_location": "Home"
  },
  "orderData": {
    "email": "customer@example.com",
    "items": [
      {
        "productId": "prod_123",
        "quantity": 2,
        "name": "Product Name",
        "price": 500
      }
    ],
    "total": 1000
  }
}
```

**Response:**
```json
{
  "success": true,
  "shipRocketOrderId": "123456",
  "message": "Order created successfully"
}
```

## Workflow

1. **User adds items to cart**
2. **User clicks "Proceed to Checkout"**
3. **Delivery Form appears** - User enters delivery details
4. **User submits form** - Form validates and processes payment
5. **Razorpay Payment** - User completes payment
6. **ShipRocket Order Creation** - After successful payment verification:
   - Delivery details sent to ShipRocket API
   - ShipRocket creates shipment order
   - Shipment ID returned and logged
7. **Cart cleared** - User's cart is emptied

## Testing

### Test with Sample Data
```javascript
// Sample Delivery Data
{
  billing_customer_name: "Test User",
  billing_phone: "9876543210",
  billing_address: "123 Test Street, Apt 4B",
  billing_city: "Delhi",
  billing_pincode: "110001",
  billing_state: "Delhi",
  billing_country: "India",
  length: 10,
  breadth: 10,
  height: 10,
  weight: 0.5
}
```

### Check Logs
- **Browser Console:** Check for Razorpay and fetch errors
- **Server Console:** Check for ShipRocket API errors
- **Network Tab:** Monitor API requests to `/api/shiprocket`

## Troubleshooting

### "Failed to get ShipRocket token"
- Verify `SHIPROCKET_EMAIL` and `SHIPROCKET_PASSWORD` are correct
- Check ShipRocket account status
- Ensure credentials are added to `.env.local`

### "Failed to create ShipRocket order"
- Verify delivery data format matches ShipRocket requirements
- Check package dimensions are valid (positive numbers)
- Verify ShipRocket account has sufficient balance/credits

### Timeout Errors
- Check internet connection
- Verify ShipRocket API is accessible
- Increase timeout if needed (currently 30s default)

## Common Issues

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check credentials in `.env.local` |
| 400 Bad Request | Validate delivery data format |
| 429 Rate Limited | Wait before retrying, contact ShipRocket |
| Missing fields | Ensure all required fields are provided |

## Security Notes

- Never commit `.env.local` to version control
- Store credentials securely in production (use secrets manager)
- Validate all user input on server side (already implemented)
- Use HTTPS in production
- Implement rate limiting on API endpoints

## Future Enhancements

1. **AWB Assignment** - Auto-generate shipping labels
2. **Tracking** - Display ShipRocket tracking info to customers
3. **Webhook Integration** - Listen for shipment status updates
4. **Multiple Pickup Locations** - Support different warehouse pickups
5. **Delivery Partner Selection** - Let customers choose courier
6. **Order History** - Store shipment details in database

## References

- [ShipRocket API Documentation](https://apidocs.shiprocket.in/)
- [ShipRocket Order Creation API](https://apidocs.shiprocket.in/#71611fb7-e43a-4f6d-8159-35e893d27520)
- [ShipRocket Authentication](https://apidocs.shiprocket.in/#f7b1e7ee-1eaa-4f82-9819-8959c9f9d88a)
