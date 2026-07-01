'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import { getCurrentCustomer, loginCustomer } from '@/lib/customer-account-api';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { brand } = usePublicSiteData();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentCustomer()
      .then((customer) => {
        if (customer) router.replace('/account/dashboard');
      })
      .finally(() => setChecking(false));
  }, [router]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginCustomer({ email, password });
      router.replace('/account/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Unable to sign in. Please check your details.');
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1fr_0.92fr]">
        <section className="relative hidden overflow-hidden bg-[#1f2933] px-10 py-8 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(233,61,130,0.28)_0%,rgba(31,41,51,0)_45%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_42%)]" />
          <Link href="/" className="relative z-10 flex w-fit items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
              <Icon name="SparklesIcon" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{brand.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Customer portal</p>
            </div>
          </Link>

          <div className="relative z-10 flex flex-1 flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-100">
              Your salon visits, organized
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight">
              See what is booked, what you loved, and what comes next.
            </h1>
            <div className="mt-8 grid max-w-xl gap-3">
              {[
                ['Upcoming bookings', 'Know your next visit, time, service, and current status.'],
                ['Visit history', 'Keep a simple record of past services and spending.'],
                ['Faster repeat booking', 'Jump back into booking without starting from scratch.'],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-white/8 p-4">
                  <div className="flex gap-3">
                    <Icon name="CheckCircleIcon" size={20} className="mt-0.5 text-primary" />
                    <div>
                      <p className="font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary">
                  <Icon name="SparklesIcon" size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold">{brand.name}</p>
                  <p className="text-xs text-muted-foreground">Customer portal</p>
                </div>
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(233,61,130,0.12)] sm:p-8">
              <p className="text-sm font-semibold text-primary">Customer sign in</p>
              <h2 className="mt-2 text-3xl font-bold text-card-foreground">Welcome back</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in with the email you used to create your customer account.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <Field label="Email" icon="EnvelopeIcon">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </Field>

                <Field label="Password" icon="LockClosedIcon">
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Your password"
                    className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-[38px] text-gray-400 transition hover:text-primary"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                  </button>
                </Field>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="pink-gradient-btn h-14 rounded-2xl text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                New here?{' '}
                <Link href="/create-account" className="font-semibold text-primary">
                  Create customer account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <label className="relative block">
      <span className="mb-2 block text-sm font-semibold text-card-foreground">{label}</span>
      <Icon name={icon} size={18} className="absolute left-4 top-[38px] text-gray-400" />
      {children}
    </label>
  );
}
