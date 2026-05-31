import Link from "next/link";
import { ReactNode } from "react";

interface AdminLayoutProps {
    children: ReactNode;
}

const AdminLayout = ({
    children,
}: AdminLayoutProps) => {

    return (
        <>

            <nav className="flex justify-center gap-6 py-4 bg-pink-100">

                <Link
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-all"
                    href="/admin/createitem"
                >
                    Create Product
                </Link>

                <Link
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-all"
                    href="/admin/updateitem"
                >
                    Update Product
                </Link>
                <Link
                    className="bg-pink-500 text-white px-4 py-2 rounded-xl hover:bg-pink-600 transition-all"
                    href="/admin/orderspage"
                >
                    Orders
                </Link>

            </nav>

            <div>
                {children}
            </div>

        </>
    );
};

export default AdminLayout;