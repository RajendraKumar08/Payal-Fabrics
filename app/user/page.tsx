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
  const emailVerifiedBadge = user?.email_verified
    ? "bg-emerald-500/15 text-emerald-200"
    : "bg-amber-500/15 text-amber-200";

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
          <p className="text-lg font-semibold text-white">No user session available</p>
          <p className="mt-4 text-slate-400">
            Sign in to access your account information and profile settings.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Login
            </Link>
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.08),transparent_22%),radial-gradient(circle_at_top_right,_rgba(148,163,184,0.04),transparent_30%)] pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="mb-12 max-w-3xl">
            <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-200/80">
              Account Dashboard
            </span>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Your profile overview
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">
              A polished summary of your account details, status, and next actions.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
            <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <div className="flex flex-col items-center gap-6 text-center">
                <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/10 bg-slate-950">
                  {profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profileImage}
                      alt={fullName}
                      className="w-36 h-36 object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/5 text-4xl font-semibold text-white/80">
                      {fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-3xl font-semibold text-white">{fullName}</p>
                  <p className="mt-2 text-sm text-slate-400">{user.email || "No email provided"}</p>
                </div>
              </div>

              <div className="mt-10 space-y-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    Account status
                  </p>
                  <div className="mt-3 flex flex-col gap-3">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${emailVerifiedBadge}`}>
                      {emailVerifiedText}
                    </span>
                    <p className="text-sm text-slate-300">
                      Your email verification status is reflected here. Keep your account secure by maintaining an active login.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Profile details</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">Personal information</h2>
                  </div>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">
                    Secure
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ProfileField label="First Name" value={firstName} />
                  <ProfileField label="Last Name" value={lastName} />
                  <ProfileField label="Email" value={user.email || "—"} />
                  <ProfileField label="Full Name" value={fullName} />
                  <ProfileField label="Email Verified" value={emailVerifiedText} />
                  <ProfileField label="Picture" value={user.picture ? "Available" : "Not available"} />
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Quick actions</h2>
                    <p className="mt-2 text-sm text-slate-400">
                      Navigate quickly to commonly used account pages.
                    </p>
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-400">
                    Ready to go
                  </span>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/cart"
                    className="inline-flex min-h-[3rem] items-center justify-center rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[3rem] items-center justify-center rounded-3xl border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
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
  <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-5 shadow-sm shadow-white/5">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
    <p className="mt-2 text-sm font-medium text-white">{value}</p>
  </div>
);

export default UserPage;
