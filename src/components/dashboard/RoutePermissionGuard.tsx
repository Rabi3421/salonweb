'use client';

import { usePathname } from 'next/navigation';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import { canAccessRoute } from '@/lib/dashboard-permissions';

export default function RoutePermissionGuard({ children }: { children: React.ReactNode }) {
  const user = useDashboardUser();
  const pathname = usePathname();

  if (!canAccessRoute(user.role, pathname)) return <PermissionDenied />;

  return children;
}
