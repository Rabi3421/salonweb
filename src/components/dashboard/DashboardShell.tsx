'use client';

import React, { useState } from 'react';
import type { SalonAuthUser } from '@/types/auth';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';
import DashboardMobileNav from './DashboardMobileNav';

interface DashboardShellProps {
  user: SalonAuthUser;
  onLogout: () => void;
  children: React.ReactNode;
}

export default function DashboardShell({ user, onLogout, children }: DashboardShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-[#F9FAFB]">
      <DashboardSidebar user={user} />
      <DashboardMobileNav
        user={user}
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <DashboardTopbar user={user} onMenuToggle={() => setMobileNavOpen(true)} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5">{children}</main>
      </div>
    </div>
  );
}
