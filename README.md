# Payal Fabrics

A premium fabric and dress material storefront built with Next.js, Prisma, Kinde authentication, Razorpay payment processing, and Shiprocket shipping integration.

This project is a full-stack e-commerce application tailored for online fabric shopping. It includes polished storefront pages, product detail views, search and filtering, cart management, checkout with payment verification, order creation, and both customer and admin workflows.

## Key Features

- **Homepage with curated highlights**
  - Displays featured products from the database.
  - Includes a branded hero and content section for curated collections.

- **Category browsing**
  - Dedicated fabric and dress material category pages.
  - Product cards link directly to detailed product pages.

- **Product detail page**
  - Shows product images, price, stock, and attributes.
  - Supports meter-based fabric quantity selection.
  - Uses category-specific behavior for fabric items.

- **Search and filtering**
  - Search products by name or description.
  - Filter by color, fabric type, material, and category.
  - Responsive filter panel for desktop and mobile.

- **Cart and checkout flow**
  - Persistent cart state using local storage and server-side cart syncing.
  - Add/remove products and clear cart support.
  - Delivery details form with pickup option selection.
  - Dynamic delivery charge calculation based on pincode distance.

- **Razorpay integration**
  - Creates Razorpay orders from the app backend.
  - Verifies payment signatures server-side.
  - Updates order status, creates order items, and decrements inventory after successful payment.

- **Shiprocket order creation**
  - Sends shipping order details to Shiprocket once payment is confirmed.
  - Assigns AWB automatically via Shiprocket APIs.
  - Stores Shiprocket IDs in the order record.

- **User orders dashboard**
  - Displays authenticated user order history.
  - Shows each order with line items, status, totals, and shipment tracking support.

- **Admin workflows**
  - Admin-only page protection through Kinde auth.
  - Product creation form for adding new inventory.
  - Product update UI for managing existing items.
  - Order management features for admin users.

- **Contact support**
  - Contact form with WhatsApp message generation.
  - Email notification route for order confirmations.

## Technology Stack

- **Next.js 16** for server-side rendering, routing, and frontend architecture.
- **React 19** with modern hooks and client/server components.
- **TypeScript** for typed components and API routes.
- **Prisma** for database modeling and querying.
- **Kinde Auth** for authentication and user session management.
- **Razorpay** for secure payment processing.
- **Shiprocket** for shipping order creation and AWB assignment.
- **Nodemailer** for sending transactional emails.
- **Tailwind CSS** for styling and responsive UI.
- **Cloudinary** support available for image handling.

## User Workflow

### Visitor browsing

- Users land on the homepage and see featured products.
- They can browse category pages, use search controls, and view product details.
- Fabric products allow meter quantity selection before adding to cart.

### Cart & delivery

- Users add items to the cart and the application preserves selections in local storage.
- If authenticated, the cart is also synced to the server.
- During checkout, users select a pickup option:
  - **Home delivery** – delivery is calculated by pincode distance.
  - **Warehouse pickup** – the customer will collect directly from the warehouse.
- The delivery form validates contact details, shipping address, and parcel dimensions.

### Payment and order creation

- Checkout triggers a backend Razorpay order creation request.
- The frontend opens the Razorpay payment window for the customer.
- After payment, the app calls the verification endpoint.
- Verified payments update the order record, create order items, and deduct stock.

### Shipping and notifications

- Once payment is verified, the app optionally creates a Shiprocket shipping order.
- Shiprocket shipment creation includes customer address, package dimensions, and items.
- An email confirmation is sent to the user from the app backend.

### Order history

- Authenticated users can view their orders on the `userorder` page.
- Each order shows placed date, status, total amount, and purchased items.

## Admin Workflow

- Admin users sign in via Kinde and access protected admin pages.
- Admin interface allows adding new products through a product creation form.
- Admins can update product details using the admin product update page.
- Admins can also review and manage orders, including shipping statuses.

## Important Pages and Routes

- `app/page.tsx` – Homepage with featured highlights.
- `app/fabric/page.tsx` – Fabric category browsing.
- `app/dress material/page.tsx` – Dress material category browsing.
- `app/product/[id]/page.tsx` – Product detail and add-to-cart.
- `app/search/page.tsx` – Search and filter product catalog.
- `app/cart/page.tsx` – Cart page, delivery form, and checkout.
- `app/user/page.tsx` – Authenticated user profile.
- `app/userorder/page.tsx` – User order history.
- `app/admin/page.tsx` – Admin access gate.
- `app/admin/createitem/page.tsx` – Create new inventory product.
- `app/admin/updateitem/page.tsx` – Product editing interface.

API routes:

- `app/api/cart/route.ts` – Cart persistence and retrieval.
- `app/api/createorder/route.tsx` – Razorpay order creation and cart checkout initiation.
- `app/api/verifyorder/route.ts` – Payment signature verification and order finalization.
- `app/api/shiprocket/route.ts` – Shiprocket order creation and AWB assignment.
- `app/api/sendemail/route.ts` – Email notifications.
- `app/api/contact/route.ts` – Contact form support and WhatsApp link generation.
- `app/api/pincode-distance/route.ts` – Distance-based delivery charge calculation.
- `app/api/getallitems/route.ts` and `app/api/getitem/route.ts` – Product catalog APIs.

## Environment Variables

This project relies on several environment variables for payment, shipping, and email integrations.

Required variables include:

- `DATABASE_URL` – Prisma database connection string.
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` – Razorpay public key.
- `RAZORPAY_SECRET_ID` – Razorpay secret key.
- `GMAIL_APP_PASSWORD` – App password for Gmail email sending.
- `SHIPROCKET_API_URL` – Shiprocket API base URL.
- `SHIPROCKET_API_EMAIL` – Shiprocket API username.
- `SHIPROCKET_API_PASSWORD` – Shiprocket API password.
- `OPENCAGE_API_KEY` – OpenCage API key for pincode geocoding.
- `WHATSAPP_PHONE` – WhatsApp contact number for support links.
- `PUBLIC_BASE_URL` – Public application URL used by server-side requests.

## Run Locally

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` to use the application.

## Notes

- The app uses both client-side and server-side components to support authentication, payments, and shipping flows.
- Cart storage is persisted locally and synchronized to the database when the user is authenticated.
- Razorpay and Shiprocket integrations are designed to work together for a smooth checkout and fulfillment workflow.
- Admin access is protected by Kinde authentication and checks the user role in the database.

## Project Structure

- `app/` – Main application pages and components.
- `app/components/` – Shared UI components like cart context, delivery form, and footer.
- `app/api/` – Backend API routes for cart, checkout, verification, shipping, and support.
- `prisma/` – Prisma schema and migration history.
- `prisma-db.ts` – Prisma client setup and database seeding utilities.

---

Thank you for reviewing the Payal Fabrics project. This README captures the implemented features and how the core workflows behave in the current app.