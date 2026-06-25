import type { SalonRole } from '@/types/auth';
import type { DashboardNavGroup } from '@/types/dashboard';

export const ROLE_LABELS: Record<SalonRole, string> = {
  owner: 'Owner',
  manager: 'Manager',
  receptionist: 'Receptionist',
  stylist: 'Stylist',
  accountant: 'Accountant',
};

export const ROLE_DESCRIPTIONS: Record<SalonRole, string> = {
  owner: 'Full business control',
  manager: 'Daily operations',
  receptionist: 'Front desk & bookings',
  stylist: 'Service & schedule',
  accountant: 'Finance & billing',
};

export const ROLE_BADGE_STYLES: Record<SalonRole, string> = {
  owner: 'bg-primary/10 text-primary border-primary/20',
  manager: 'bg-amber-50 text-amber-700 border-amber-200',
  receptionist: 'bg-blue-50 text-blue-700 border-blue-200',
  stylist: 'bg-purple-50 text-purple-700 border-purple-200',
  accountant: 'bg-green-50 text-green-700 border-green-200',
};

const ALL_ROLES: SalonRole[] = ['owner', 'manager', 'receptionist', 'stylist', 'accountant'];

export const DASHBOARD_NAV: DashboardNavGroup[] = [
  {
    title: 'Main',
    items: [
      { label: 'Overview', href: '/dashboard', icon: 'Squares2X2Icon', roles: ALL_ROLES },
      {
        label: 'Appointments',
        href: '/dashboard/appointments',
        icon: 'CalendarDaysIcon',
        roles: ['owner', 'manager', 'receptionist', 'stylist'],
      },
      {
        label: 'Customers',
        href: '/dashboard/customers',
        icon: 'UserGroupIcon',
        roles: ['owner', 'manager', 'receptionist', 'stylist', 'accountant'],
      },
      {
        label: 'Enquiries',
        href: '/dashboard/enquiries',
        icon: 'ChatBubbleLeftRightIcon',
        roles: ['owner', 'manager', 'receptionist'],
      },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        label: 'Services',
        href: '/dashboard/services',
        icon: 'SparklesIcon',
        roles: ['owner', 'manager', 'receptionist', 'stylist'],
      },
      {
        label: 'Packages',
        href: '/dashboard/packages',
        icon: 'GiftIcon',
        roles: ['owner', 'manager', 'receptionist'],
      },
      {
        label: 'Staff',
        href: '/dashboard/staff',
        icon: 'UsersIcon',
        roles: ['owner', 'manager'],
      },
      {
        label: 'Users',
        href: '/dashboard/users',
        icon: 'UserCircleIcon',
        roles: ['owner', 'manager'],
      },
      {
        label: 'Inventory',
        href: '/dashboard/inventory',
        icon: 'CubeIcon',
        roles: ['owner', 'manager', 'accountant'],
      },
    ],
  },
  {
    title: 'Finance',
    items: [
      {
        label: 'Billing',
        href: '/dashboard/billing',
        icon: 'DocumentTextIcon',
        roles: ['owner', 'manager', 'receptionist', 'accountant'],
      },
      {
        label: 'Payments',
        href: '/dashboard/payments',
        icon: 'CreditCardIcon',
        roles: ['owner', 'manager', 'receptionist', 'accountant'],
      },
      {
        label: 'Expenses',
        href: '/dashboard/expenses',
        icon: 'BanknotesIcon',
        roles: ['owner', 'accountant'],
        comingSoon: true,
      },
    ],
  },
  {
    title: 'Insights',
    items: [
      {
        label: 'Reports',
        href: '/dashboard/reports',
        icon: 'ChartBarIcon',
        roles: ['owner', 'manager', 'accountant'],
      },
    ],
  },
  {
    title: 'Admin',
    items: [
      {
        label: 'Settings',
        href: '/dashboard/settings',
        icon: 'Cog6ToothIcon',
        roles: ['owner', 'manager', 'receptionist', 'accountant'],
      },
    ],
  },
];

export function getNavigationForRole(role: SalonRole): DashboardNavGroup[] {
  return DASHBOARD_NAV.map((group) => ({
    ...group,
    items: group.items.filter((item) => item.roles.includes(role)),
  })).filter((group) => group.items.length > 0);
}

export function canAccessRoute(role: SalonRole, path: string): boolean {
  if (path === '/dashboard') return true;
  if (path === '/dashboard/settings') {
    return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/settings/notifications')) {
    return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/settings')) {
    return ['owner', 'manager', 'receptionist'].includes(role);
  }
  if (path.startsWith('/dashboard/users/new')) return role === 'owner';
  if (path.startsWith('/dashboard/users')) return ['owner', 'manager'].includes(role);
  if (path.startsWith('/dashboard/enquiries')) {
    return ['owner', 'manager', 'receptionist'].includes(role);
  }
  if (path.startsWith('/dashboard/inventory/new')) return role === 'owner';
  if (path.startsWith('/dashboard/inventory')) {
    return ['owner', 'manager', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/staff/new')) return role === 'owner';
  if (path.startsWith('/dashboard/staff')) return ['owner', 'manager'].includes(role);
  if (path.startsWith('/dashboard/billing/new')) {
    return ['owner', 'receptionist', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/billing')) {
    return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/payments')) {
    return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/reports/revenue')) {
    return ['owner', 'accountant'].includes(role);
  }
  if (path.startsWith('/dashboard/reports/appointments')) {
    return ['owner', 'manager'].includes(role);
  }
  if (path.startsWith('/dashboard/reports/staff')) {
    return role === 'owner';
  }
  if (path.startsWith('/dashboard/reports/customers')) {
    return ['owner', 'manager'].includes(role);
  }
  if (path.startsWith('/dashboard/reports')) {
    return ['owner', 'manager', 'accountant'].includes(role);
  }
  for (const group of DASHBOARD_NAV) {
    for (const item of group.items) {
      if (path.startsWith(item.href) && item.roles.includes(role)) {
        return true;
      }
    }
  }
  return false;
}

export function getRoleLabel(role: SalonRole): string {
  return ROLE_LABELS[role] ?? role;
}

export function getRoleDescription(role: SalonRole): string {
  return ROLE_DESCRIPTIONS[role] ?? '';
}

export function isOwner(role: SalonRole): boolean {
  return role === 'owner';
}
