'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SalonAuthUser } from '@/types/auth';
import { getCurrentSalonUser, isMockModeEnabled, MOCK_USERS } from '@/lib/dashboard-auth';
import DashboardShell from './DashboardShell';
import DashboardLoading from './LoadingState';
import { DashboardUserProvider } from './DashboardContext';

interface DashboardAuthGuardProps {
  children: React.ReactNode;
}

export default function DashboardAuthGuard({ children }: DashboardAuthGuardProps) {
  const router = useRouter();
  const [user, setUser] = useState<SalonAuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      // Dev mock mode
      if (isMockModeEnabled()) {
        const mockRole =
          (typeof window !== 'undefined' && sessionStorage.getItem('mockRole')) || 'owner';
        const mockUser = MOCK_USERS[mockRole] ?? MOCK_USERS.owner;
        setUser(mockUser);
        setLoading(false);
        return;
      }

      // Real auth
      const currentUser = await getCurrentSalonUser();
      if (!currentUser) {
        router.replace('/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    if (isMockModeEnabled()) {
      sessionStorage.removeItem('mockRole');
      router.replace('/login');
      return;
    }

    try {
      const { logoutSalonUser } = await import('@/lib/dashboard-auth');
      await logoutSalonUser();
    } finally {
      router.replace('/login');
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">
        <DashboardLoading message="Loading dashboard..." />
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardUserProvider user={user}>
      <DashboardShell user={user} onLogout={handleLogout}>
        {children}
      </DashboardShell>
    </DashboardUserProvider>
  );
}
