'use client';

import React, { createContext, useContext } from 'react';
import type { SalonAuthUser } from '@/types/auth';

const DashboardUserContext = createContext<SalonAuthUser | null>(null);

export function DashboardUserProvider({
  user,
  children,
}: {
  user: SalonAuthUser;
  children: React.ReactNode;
}) {
  return <DashboardUserContext.Provider value={user}>{children}</DashboardUserContext.Provider>;
}

export function useDashboardUser(): SalonAuthUser {
  const user = useContext(DashboardUserContext);
  if (!user) throw new Error('useDashboardUser must be used inside DashboardUserProvider');
  return user;
}
