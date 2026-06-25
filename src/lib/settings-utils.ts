import type { SalonRole } from '@/types/auth';
import type { SalonDashboardUser, UserListParams } from '@/types/settings';

export function canViewSettings(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
}

export function canEditSettings(role: SalonRole): boolean {
  return role === 'owner';
}

export function canViewSettingsSection(role: SalonRole, section: string): boolean {
  if (role === 'owner' || role === 'manager') return true;
  if (role === 'receptionist')
    return ['profile', 'business', 'booking', 'notifications'].includes(section);
  if (role === 'accountant') return section === 'notifications';
  return false;
}

export function canViewUsers(role: SalonRole): boolean {
  return ['owner', 'manager'].includes(role);
}

export function canManageUsers(role: SalonRole): boolean {
  return role === 'owner';
}

export function getUserStatusLabel(isActive: boolean): string {
  return isActive ? 'Active' : 'Inactive';
}

export function formatSettingsDate(date?: string): string {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function filterUsers(
  users: SalonDashboardUser[],
  filters: UserListParams
): SalonDashboardUser[] {
  return users.filter((user) => {
    const search = filters.search?.toLowerCase().trim();
    const matchesSearch =
      !search ||
      [user.name, user.phone, user.email, user.role].some((value) =>
        value.toLowerCase().includes(search)
      );
    const matchesRole = !filters.role || user.role === filters.role;
    const matchesStatus =
      !filters.status || (filters.status === 'active' ? user.isActive : !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });
}

export const ROLE_PERMISSIONS: Record<SalonRole, string[]> = {
  owner: ['Full settings', 'Manage users', 'Reports', 'Billing', 'Appointments', 'Customers'],
  manager: ['View settings', 'View users', 'Operational reports', 'Appointments', 'Customers'],
  receptionist: ['Limited settings', 'Appointments', 'Customers', 'Enquiries', 'Billing'],
  stylist: ['Own appointments', 'Customer service history'],
  accountant: ['Notification settings', 'Finance reports', 'Billing', 'Payments'],
};
