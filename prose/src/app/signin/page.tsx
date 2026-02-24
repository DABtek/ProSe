"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const callbackUrl = searchParams.get("callbackUrl") ?? "/";

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setSubmitting(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(result?.url ?? callbackUrl);
    router.refresh();
  }

  return (
    <div className="card max-w-md mx-auto space-y-4">
      <div>
        <h1 className="font-display text-2xl text-ink">Sign In</h1>
        <p className="mt-1 text-xs text-ink/60">
          Sign in to access your case data and scoped uploads.
        </p>
      </div>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Email</span>
          <input
            className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
            Password
          </span>
          <input
            className="mt-2 w-full rounded-xl border border-ink/10 bg-parchment/80 px-3 py-2"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error ? <p className="text-xs text-rust">{error}</p> : null}
        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
      <p className="text-xs text-ink/60">
        New user? <Link href="/register" className="text-teal font-semibold">Create account</Link>
      </p>
    </div>
  );
}
