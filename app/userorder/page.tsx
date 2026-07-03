
import { redirect } from 'next/navigation';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { prisma } from '@/prisma-db';
// import { useState } from 'react';
import OrdersClient from '../OrdersClient/page';


export default async function UserOrderPage() {
    const { getUser } = getKindeServerSession();
    // const [clickedorder, setclickedorder] = useState();
    const user = await getUser();
    if (!user) redirect('/login');

    const dbUser = await prisma.user.findUnique({ where: { kindeId: user.id } });
    if (!dbUser) redirect('/login');

    const orders = await prisma.order.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: 'desc' },
        include: {
            orderItems: { include: { product: true } },
        },
    });

    const fmtDate = (d: any) => {
        try {
            return new Date(d).toLocaleString();
        } catch {
            return '-';
        }
    };
    const fmtCurrency = (n: any) => {
        const v = Number(n ?? 0);
        return `₹${v.toFixed(2)}`;
    };

   

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 px-4 md:px-6 py-8 md:py-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8">
                    <h1 className="text-3xl font-semibold">My Orders</h1>
                    <p className="text-sm text-slate-600 mt-1">Recent purchases and order details</p>
                </header>

                {orders.length === 0 ? (
                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                        <p className="text-xl text-slate-700 mb-2">No orders yet</p>
                        <p className="text-sm text-slate-500">When you place an order, it will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order: any) => (
                            <article key={order.id} className="rounded-lg bg-white shadow-sm border border-slate-100 p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Order</p>
                                        <h2 className="text-lg font-medium text-slate-900">#{String(order.id).slice(0, 8)}</h2>
                                        <p className="text-xs text-slate-500 mt-1">Placed: {fmtDate(order.createdAt)}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-slate-500">Status</p>
                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${order.status === 'SHIPPED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                            {order.status ?? 'PENDING'}
                                        </span>
                                        <p className="mt-3 text-sm text-slate-700 font-medium">{fmtCurrency(order.totalAmount ?? order.amount ?? 0)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <OrdersClient razid={order.shiprocketId} />
                                    </div>
                                    
                                </div>

                                <div className="mt-4 border-t border-slate-100 pt-4">
                                    <h3 className="text-sm font-medium text-slate-800 mb-3">Items</h3>
                                    <ul className="space-y-3">
                                        {order.orderItems.map((it: any) => (
                                            <li key={it.id} className="flex items-center gap-4">
                                                <div className="w-14 h-14 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                                                    {it.product?.image ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img src={it.product.image} alt={it.product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-slate-400">📦</div>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-slate-900">{it.product?.name ?? 'Product'}</div>
                                                    <div className="text-xs text-slate-500">Qty: {it.quantity} • {fmtCurrency(it.price)}</div>
                                                </div>
                                                <div className="text-sm text-slate-700 font-medium">{fmtCurrency((it.price ?? 0) * (it.quantity ?? 1))}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}