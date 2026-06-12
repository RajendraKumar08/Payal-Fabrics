import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/prisma-db";

type KindeUserData = {
  id?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  email_verified?: boolean;
};

const UserPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = (await getUser()) as KindeUserData | null;
  const dbUser = user?.id
    ? await prisma.user.findUnique({
        where: { kindeId: user.id },
      })
    : null;

  const fullName =
    user?.name ||
    [user?.given_name, user?.family_name].filter(Boolean).join(" ") ||
    "User";

  const profileImage = dbUser?.profileImage || user?.picture || "";
  console.log(profileImage);
  const firstName = user?.given_name || "—";
  const lastName = user?.family_name || "—";
  const emailVerifiedText = user?.email_verified ? "Verified" : "Not verified";

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-md">
          <p className="text-lg font-semibold text-slate-900">No user session available</p>
          <p className="mt-4 text-slate-600">
            Sign in to access your account information and profile settings.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex rounded-full bg-slate-900/95 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Login
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="relative overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="mb-12 max-w-3xl">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-600">
              Account Dashboard
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Your profile overview
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              A polished summary of your account details, status, and next actions.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                  {profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profileImage}
                      alt={fullName}
                      className="w-36 h-36 object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100 text-4xl font-semibold text-slate-700">
                      {fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{fullName}</p>
                  <p className="mt-2 text-sm text-slate-600">{user.email || "No email provided"}</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-medium text-slate-700 mb-2">Quick actions</p>
                  <p className="text-xs text-slate-500 mb-4">Navigate quickly to commonly used account pages.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/cart"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-3xl bg-slate-900/95 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      View Cart
                    </Link>
                    <Link
                      href="/userorder"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-3xl border border-slate-200 bg-transparent px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      View Orders
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Profile details</p>
                    <h2 className="mt-3 text-2xl font-semibold text-slate-900">Personal information</h2>
                  </div>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-600">
                    Secure
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="First Name" value={firstName} />
                  <ProfileField label="Last Name" value={lastName} />
                  <ProfileField label="Email" value={user.email || "—"} />
                  <ProfileField label="Full Name" value={fullName} />
                  <ProfileField label="Picture" value={user.picture ? "Available" : "Not available"} />
                </div>
              </div>

              {/* Quick actions moved to the left profile column */}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

const ProfileField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-medium text-slate-900">{value}</p>
  </div>
);

export default UserPage;
