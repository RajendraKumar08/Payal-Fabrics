import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";
import { redirect } from "next/navigation";
import CreateItemForm from "@/app/components/createitems";

const adminpage = async () => {
     const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user) {
        redirect("/");
    }

    const dbuser = await prisma.user.findUnique({
        where: {
            kindeId: user.id,
        },
    });

    if (!dbuser || dbuser.role !== "ADMIN") {
        redirect("/");
    }

    return(
        <>
            <CreateItemForm />
        </>
    )
}

export default adminpage;