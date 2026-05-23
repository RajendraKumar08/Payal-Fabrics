'use client';

import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-20 text-slate-900">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Please sign in to continue</h1>
        <p className="mb-8 text-slate-600">
          You need to be logged in before you can add items to your cart. Click the button below to sign in.
        </p>
        <LoginLink className="inline-flex rounded-full bg-purple-600 px-6 py-3 text-white transition hover:bg-purple-500">
          Login with Kinde
        </LoginLink>
      </div>
    </main>
  );
}
