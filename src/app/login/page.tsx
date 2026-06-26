'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';
import {
  loginSalonUser,
  getCurrentSalonUser,
  isMockModeEnabled,
  MOCK_USERS,
} from '@/lib/dashboard-auth';
import type { SalonRole } from '@/types/auth';

const mockEnabled = isMockModeEnabled();

const dashboardSignals = [
  { label: 'Today', value: '18', detail: 'appointments queued' },
  { label: 'Clients', value: '96%', detail: 'follow-ups on track' },
  { label: 'Billing', value: 'Live', detail: 'daily collections visible' },
];

const roleHighlights = ['Owner', 'Manager', 'Receptionist', 'Stylist'];

export default function LoginPage() {
  const { brand } = usePublicSiteData();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkExistingSession() {
      if (
        isMockModeEnabled() &&
        typeof window !== 'undefined' &&
        sessionStorage.getItem('mockRole')
      ) {
        router.replace('/dashboard');
        return;
      }
      try {
        const user = await getCurrentSalonUser();
        if (user) {
          router.replace('/dashboard');
          return;
        }
      } catch {
        // Not logged in, show login form.
      }
      setChecking(false);
    }
    checkExistingSession();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginSalonUser({ email, password });
      router.replace('/dashboard');
    } catch (err) {
      setError(
        (err as Error).message ||
          'Unable to sign in. Please check your credentials or contact the salon owner.'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleMockLogin(role: SalonRole) {
    sessionStorage.setItem('mockRole', role);
    router.replace('/dashboard');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#101827] px-10 py-8 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(233,61,130,0.22)_0%,rgba(16,24,39,0)_42%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_38%)]" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-[linear-gradient(0deg,rgba(233,61,130,0.16),rgba(233,61,130,0))]" />

          <Link
            href="/"
            className="relative z-10 flex w-fit items-center gap-3 rounded-2xl pr-3 transition hover:opacity-85"
            aria-label={`${brand.name} home`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <Icon name="SparklesIcon" size={20} className="text-white" />
            </div>
            <div>
              <p className="text-xl font-bold">{brand.name}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Salon workspace</p>
            </div>
          </Link>

          <div className="relative z-10 flex flex-1 flex-col justify-center py-6">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-pink-100">
                <Icon name="CalendarDaysIcon" size={14} className="text-primary" />
                Today&apos;s salon control room
              </div>
              <h1 className="font-display text-4xl leading-tight xl:text-[2.85rem]">
                Run every booking, bill, and client moment with calm control.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Sign in to coordinate appointments, customers, staff, services, billing, and reports
                from one focused dashboard.
              </p>
            </div>

            <div className="mt-7 grid max-w-2xl grid-cols-3 gap-3">
              {dashboardSignals.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/8 p-3 shadow-xl shadow-black/10 backdrop-blur"
                >
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="mt-1.5 text-xl font-bold text-white">{item.value}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <p className="text-sm font-semibold text-white">Dashboard preview</p>
                  <p className="mt-1 text-xs text-slate-400">Live salon flow snapshot</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-200">
                  Open
                </span>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ['10:00', 'Bridal consultation', 'Confirmed'],
                  ['12:30', 'Hair spa follow-up', 'In service'],
                  ['15:00', 'Party makeup', 'Requested'],
                ].map(([time, title, status]) => (
                  <div
                    key={`${time}-${title}`}
                    className="grid grid-cols-[64px_1fr_auto] items-center gap-3 rounded-2xl bg-white/8 px-3 py-2.5"
                  >
                    <span className="text-sm font-semibold text-pink-100">{time}</span>
                    <span className="text-sm text-white">{title}</span>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between text-sm text-slate-400">
            <p>
              {brand.fullName} · {brand.location}
            </p>
            <div className="flex gap-2">
              {roleHighlights.map((role) => (
                <span key={role} className="rounded-full border border-white/10 px-3 py-1 text-xs">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-2xl pr-3 transition hover:opacity-80"
                aria-label={`${brand.name} home`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary shadow-md shadow-primary/25">
                  <Icon name="SparklesIcon" size={17} className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{brand.name}</p>
                  <p className="text-xs text-muted-foreground">Salon dashboard</p>
                </div>
              </Link>
              <Link href="/" className="text-sm font-medium text-primary">
                Website
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(233,61,130,0.12)] sm:p-8">
              <div>
                <p className="text-sm font-semibold text-primary">Welcome back</p>
                <h2 className="mt-2 text-3xl font-bold text-card-foreground">Sign in</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Access your team dashboard for {brand.name}.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Email</label>
                  <div className="relative">
                    <Icon
                      name="EnvelopeIcon"
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@salon.com"
                      className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>
                  <div className="relative">
                    <Icon
                      name="LockClosedIcon"
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter password"
                      className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-secondary hover:text-primary"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                    </button>
                  </div>
                </div>

                {error ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="pink-gradient-btn flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <Icon name="ArrowRightIcon" size={17} className="text-white" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 gap-2 rounded-2xl bg-muted p-2">
                {['Secure login', 'Role access', 'Live data'].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-white px-2 py-2 text-center text-[11px] font-semibold text-muted-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>

              {mockEnabled ? (
                <div className="mt-8 border-t border-border pt-6">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                    Development Mock Login
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(MOCK_USERS).map(([role, mockUser]) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => handleMockLogin(role as SalonRole)}
                        className="rounded-xl border border-border bg-white px-3 py-2 text-left text-xs font-medium text-gray-600 transition-colors hover:border-primary/40 hover:bg-secondary/60"
                      >
                        <span className="block text-gray-900">{mockUser.name}</span>
                        <span className="text-gray-400 capitalize">{role}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              <Link
                href="/"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                &larr; Back to website
              </Link>
            </p>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Customer?{' '}
              <Link
                href="/create-account"
                className="font-semibold text-primary transition-colors hover:text-primary/80"
              >
                Create your account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
