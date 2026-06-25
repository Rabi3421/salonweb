import type { SalonRole } from './auth';

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: string;
  roles: SalonRole[];
  comingSoon?: boolean;
}

export interface DashboardNavGroup {
  title: string;
  items: DashboardNavItem[];
}

export interface StatCardData {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
}

export type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'default';
