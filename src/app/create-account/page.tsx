'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import { createCustomerAccount } from '@/lib/salon-api';

type FormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

const initialForm: FormState = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function CreateAccountPage() {
  const { brand } = usePublicSiteData();
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdName, setCreatedName] = useState('');

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await createCustomerAccount({
        email: form.email,
        password: form.password,
      });
      setCreatedName(response.data?.customer.name || form.email);
      setForm(initialForm);
    } catch (err) {
      setError(
        (err as Error).message ||
          'Unable to create account right now. Please try again or contact the salon.'
      );
    } finally {
      setLoading(false);
    }
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
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Customer account</p>
            </div>
          </Link>

          <div className="relative z-10 flex flex-1 flex-col justify-center py-6">
            <div className="max-w-xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-pink-100">
                <Icon name="UserPlusIcon" size={14} className="text-primary" />
                Joined to this salon
              </div>
              <h1 className="font-display text-4xl leading-tight xl:text-[2.85rem]">
                Create your beauty profile at {brand.name}.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Your account is linked to this salon using the active salon ID, so future bookings
                and visit history stay with the right salon.
              </p>
            </div>

            <div className="mt-7 grid max-w-2xl grid-cols-3 gap-3">
              {['Faster booking', 'Visit history', 'Salon offers'].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/8 p-3 shadow-xl shadow-black/10 backdrop-blur"
                >
                  <Icon name="CheckIcon" size={16} className="mb-2 text-primary" />
                  <p className="text-xs leading-5 text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex items-end justify-between text-sm text-slate-400">
            <p>{brand.fullName}</p>
            <Link href="/" className="font-semibold text-primary transition hover:text-primary/80">
              Back to website
            </Link>
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
                  <p className="text-xs text-muted-foreground">Customer account</p>
                </div>
              </Link>
              <Link href="/" className="text-sm font-medium text-primary">
                Website
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border bg-card p-6 shadow-[0_24px_70px_rgba(233,61,130,0.12)] sm:p-8">
              {createdName ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon name="CheckIcon" size={32} />
                  </div>
                  <h2 className="mt-6 text-3xl font-bold text-card-foreground">
                    Account created, {createdName}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    You are now registered with {brand.name}. You can book appointments with this
                    salon and sign in anytime to see your bookings and visit history.
                  </p>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/book-appointment"
                      className="pink-gradient-btn rounded-2xl px-6 py-3 text-sm font-bold text-white"
                    >
                      Book Appointment
                    </Link>
                    <Link
                      href="/account/login"
                      className="rounded-2xl border border-border bg-white px-6 py-3 text-sm font-bold text-foreground"
                    >
                      Customer Sign In
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-sm font-semibold text-primary">Customer signup</p>
                    <h2 className="mt-2 text-3xl font-bold text-card-foreground">Create account</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Register with {brand.name} using your email.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                    <Field label="Email" icon="EnvelopeIcon">
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => updateField('email', event.target.value)}
                        placeholder="you@email.com"
                        className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                      />
                    </Field>

                    <Field label="Password" icon="LockClosedIcon">
                      <input
                        required
                        type="password"
                        minLength={8}
                        value={form.password}
                        onChange={(event) => updateField('password', event.target.value)}
                        placeholder="Minimum 8 characters"
                        className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                      />
                    </Field>

                    <Field label="Confirm Password" icon="LockClosedIcon">
                      <input
                        required
                        type="password"
                        minLength={8}
                        value={form.confirmPassword}
                        onChange={(event) => updateField('confirmPassword', event.target.value)}
                        placeholder="Repeat password"
                        className="h-14 w-full rounded-2xl border border-input bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-primary focus:ring-4 focus:ring-primary/15"
                      />
                    </Field>

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
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <Icon name="ArrowRightIcon" size={17} className="text-white" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-sm text-muted-foreground">
                    Salon team member?{' '}
                    <Link href="/login" className="font-semibold text-primary">
                      Sign in to dashboard
                    </Link>
                  </p>
                </>
              )}
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
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-gray-700">{label}</span>
      <span className="relative block">
        <Icon
          name={icon}
          size={18}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
        />
        {children}
      </span>
    </label>
  );
}
