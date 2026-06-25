'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import Icon from '@/components/ui/AppIcon';
import { loginSalonUser, getCurrentSalonUser, isMockModeEnabled, MOCK_USERS } from '@/lib/dashboard-auth';
import type { SalonRole } from '@/types/auth';

const mockEnabled = isMockModeEnabled();

export default function LoginPage() {
  const { brand } = usePublicSiteData();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkExistingSession() {
      if (isMockModeEnabled() && typeof window !== 'undefined' && sessionStorage.getItem('mockRole')) {
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
        // Not logged in — show login form
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
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F9FAFB]">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 flex-col justify-between p-12">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
              <Icon name="SparklesIcon" size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">{brand.name}</span>
          </div>
          <h1 className="mt-16 text-4xl font-bold text-white leading-tight max-w-md">
            Salon Dashboard for your team.
          </h1>
          <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-sm">
            Manage appointments, customers, staff, billing, and daily salon operations from one
            place.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          {brand.fullName} &middot; {brand.location}
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Mobile brand */}
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="SparklesIcon" size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">{brand.name}</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
          <p className="mt-1 text-sm text-gray-500">Access your salon dashboard</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@salon.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-400"
              />
            </div>

            {error ? (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Mock login for dev */}
          {mockEnabled ? (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-600 mb-3">
                Development Mock Login
              </p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(MOCK_USERS).map(([role, mockUser]) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => handleMockLogin(role as SalonRole)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 hover:border-primary/30 transition-colors text-left"
                  >
                    <span className="block text-gray-900">{mockUser.name}</span>
                    <span className="text-gray-400 capitalize">{role}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <p className="mt-8 text-center text-xs text-gray-400">
            <Link href="/" className="text-primary hover:text-primary/80 transition-colors">
              ← Back to website
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
