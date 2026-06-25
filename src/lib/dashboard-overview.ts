import { apiGet } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import type { SalonRole } from '@/types/auth';
import type {
  DashboardOverviewData,
  OverviewStat,
  TodayAppointment,
  RecentEnquiry,
  RevenueSummary,
  StaffSnapshot,
  QuickAction,
} from '@/types/dashboard-overview';

export async function getDashboardOverview(role: SalonRole): Promise<DashboardOverviewData> {
  if (isMockModeEnabled()) {
    const siteData = await getPublicSiteDataAsync();
    return getMockOverviewData(role, siteData.brand.fullName);
  }
  try {
    const res = await apiGet<DashboardOverviewData>('/api/salon/dashboard/overview');
    if (res.data) return { ...res.data, isDemoData: false };
  } catch {
    throw new Error('Dashboard overview is unavailable. Please make sure salonbackend is running.');
  }
  return getMockOverviewData(role);
}

const MOCK_APPOINTMENTS: TodayAppointment[] = [
  {
    id: 'a1',
    time: '10:00 AM',
    customerName: 'Priya Sharma',
    service: 'Hair Styling',
    stylistName: 'Ananya',
    status: 'confirmed',
    amount: 1500,
  },
  {
    id: 'a2',
    time: '11:30 AM',
    customerName: 'Neha Patel',
    service: 'Facial Treatment',
    stylistName: 'Sana',
    status: 'checked_in',
    amount: 2000,
  },
  {
    id: 'a3',
    time: '01:00 PM',
    customerName: 'Aisha Khan',
    service: 'Bridal Makeup',
    stylistName: 'Meera',
    status: 'pending',
    amount: 12000,
  },
  {
    id: 'a4',
    time: '02:30 PM',
    customerName: 'Kavita Mehta',
    service: 'Nail Art',
    stylistName: 'Riya',
    status: 'confirmed',
    amount: 1200,
  },
  {
    id: 'a5',
    time: '04:00 PM',
    customerName: 'Riya Shah',
    service: 'Hair Spa',
    stylistName: 'Ananya',
    status: 'pending',
    amount: 2500,
  },
];

const MOCK_ENQUIRIES: RecentEnquiry[] = [
  {
    id: 'e1',
    name: 'Simran Kaur',
    phone: '98765xxxxx',
    type: 'Appointment',
    status: 'new',
    createdAt: 'Today 9:15 AM',
  },
  {
    id: 'e2',
    name: 'Pooja Desai',
    phone: '98765xxxxx',
    type: 'Contact',
    status: 'new',
    createdAt: 'Today 8:40 AM',
  },
  {
    id: 'e3',
    name: 'Meenal Jain',
    phone: '98765xxxxx',
    type: 'Bridal Enquiry',
    status: 'in_progress',
    createdAt: 'Yesterday',
  },
];

const MOCK_REVENUE: RevenueSummary = {
  todayCollection: 8500,
  monthCollection: 185000,
  pendingDues: 12500,
  paymentModes: [
    { mode: 'Cash', amount: 3500 },
    { mode: 'UPI', amount: 4000 },
    { mode: 'Card', amount: 1000 },
  ],
};

const MOCK_STAFF: StaffSnapshot = { totalStaff: 6, availableToday: 5, busyNow: 3, onLeave: 1 };

function getRoleStats(role: SalonRole): OverviewStat[] {
  switch (role) {
    case 'owner':
      return [
        {
          label: 'Today Revenue',
          value: '₹8,500',
          icon: 'CurrencyRupeeIcon',
          trend: '+12%',
          variant: 'success',
        },
        { label: 'Monthly Revenue', value: '₹1,85,000', icon: 'ChartBarIcon', variant: 'success' },
        { label: 'Today Appointments', value: 5, icon: 'CalendarDaysIcon', variant: 'info' },
        { label: 'Pending Requests', value: 3, icon: 'ClockIcon', variant: 'warning' },
        { label: 'Active Customers', value: 128, icon: 'UserGroupIcon' },
        {
          label: 'Pending Dues',
          value: '₹12,500',
          icon: 'ExclamationTriangleIcon',
          variant: 'warning',
        },
      ];
    case 'manager':
      return [
        { label: 'Today Appointments', value: 5, icon: 'CalendarDaysIcon', variant: 'info' },
        { label: 'Pending Confirmations', value: 2, icon: 'ClockIcon', variant: 'warning' },
        { label: 'Checked-In Clients', value: 1, icon: 'CheckCircleIcon', variant: 'success' },
        { label: 'Open Enquiries', value: 3, icon: 'ChatBubbleLeftRightIcon', variant: 'warning' },
        { label: 'Staff Available', value: 5, icon: 'UsersIcon' },
        { label: 'Walk-Ins Today', value: 0, icon: 'ArrowRightOnRectangleIcon' },
      ];
    case 'receptionist':
      return [
        { label: 'Today Queue', value: 5, icon: 'QueueListIcon', variant: 'info' },
        { label: 'Next Appointment', value: '10:00 AM', icon: 'ClockIcon' },
        {
          label: 'Pending Confirmations',
          value: 2,
          icon: 'ExclamationCircleIcon',
          variant: 'warning',
        },
        { label: 'Checked-In', value: 1, icon: 'CheckCircleIcon', variant: 'success' },
        { label: 'Walk-Ins Today', value: 0, icon: 'ArrowRightOnRectangleIcon' },
        { label: 'Open Enquiries', value: 3, icon: 'ChatBubbleLeftRightIcon', variant: 'warning' },
      ];
    case 'stylist':
      return [
        { label: 'My Appointments', value: 3, icon: 'CalendarDaysIcon', variant: 'info' },
        { label: 'Next Client', value: '10:00 AM', icon: 'ClockIcon' },
        { label: 'Completed Today', value: 0, icon: 'CheckCircleIcon', variant: 'success' },
        { label: 'Pending Services', value: 3, icon: 'SparklesIcon', variant: 'warning' },
      ];
    case 'accountant':
      return [
        {
          label: 'Today Collection',
          value: '₹8,500',
          icon: 'CurrencyRupeeIcon',
          trend: '+12%',
          variant: 'success',
        },
        {
          label: 'Monthly Collection',
          value: '₹1,85,000',
          icon: 'ChartBarIcon',
          variant: 'success',
        },
        {
          label: 'Pending Dues',
          value: '₹12,500',
          icon: 'ExclamationTriangleIcon',
          variant: 'warning',
        },
        { label: 'Today Expenses', value: '₹2,200', icon: 'BanknotesIcon' },
        { label: 'Cash Received', value: '₹3,500', icon: 'BanknotesIcon' },
        { label: 'UPI Received', value: '₹4,000', icon: 'CreditCardIcon' },
      ];
    default:
      return [];
  }
}

function getRoleQuickActions(role: SalonRole): QuickAction[] {
  switch (role) {
    case 'owner':
      return [
        {
          label: 'New Appointment',
          icon: 'CalendarDaysIcon',
          href: '/dashboard/appointments/new',
          comingSoon: true,
        },
        {
          label: 'Add Customer',
          icon: 'UserPlusIcon',
          href: '/dashboard/customers/new',
          comingSoon: true,
        },
        {
          label: 'Create Bill',
          icon: 'DocumentTextIcon',
          href: '/dashboard/billing/new',
          comingSoon: true,
        },
        {
          label: 'View Reports',
          icon: 'ChartBarIcon',
          href: '/dashboard/reports',
          comingSoon: true,
        },
      ];
    case 'manager':
      return [
        {
          label: 'Confirm Booking',
          icon: 'CheckCircleIcon',
          href: '/dashboard/appointments',
          comingSoon: true,
        },
        {
          label: 'Add Walk-In',
          icon: 'ArrowRightOnRectangleIcon',
          href: '/dashboard/appointments/new',
          comingSoon: true,
        },
        {
          label: 'Assign Stylist',
          icon: 'UsersIcon',
          href: '/dashboard/appointments',
          comingSoon: true,
        },
        {
          label: 'View Enquiries',
          icon: 'ChatBubbleLeftRightIcon',
          href: '/dashboard/enquiries',
          comingSoon: true,
        },
      ];
    case 'receptionist':
      return [
        {
          label: 'New Appointment',
          icon: 'CalendarDaysIcon',
          href: '/dashboard/appointments/new',
          comingSoon: true,
        },
        {
          label: 'Walk-In Customer',
          icon: 'UserPlusIcon',
          href: '/dashboard/customers/new',
          comingSoon: true,
        },
        {
          label: 'Check-In Client',
          icon: 'CheckCircleIcon',
          href: '/dashboard/appointments',
          comingSoon: true,
        },
        { label: 'Follow Up', icon: 'PhoneIcon', href: '/dashboard/enquiries', comingSoon: true },
      ];
    case 'stylist':
      return [
        {
          label: 'My Schedule',
          icon: 'CalendarDaysIcon',
          href: '/dashboard/appointments',
          comingSoon: true,
        },
        {
          label: 'Start Service',
          icon: 'PlayIcon',
          href: '/dashboard/appointments',
          comingSoon: true,
        },
        {
          label: 'Complete Service',
          icon: 'CheckIcon',
          href: '/dashboard/appointments',
          comingSoon: true,
        },
        { label: 'Add Note', icon: 'PencilIcon', href: '/dashboard/customers', comingSoon: true },
      ];
    case 'accountant':
      return [
        {
          label: 'Create Bill',
          icon: 'DocumentTextIcon',
          href: '/dashboard/billing/new',
          comingSoon: true,
        },
        {
          label: 'Record Payment',
          icon: 'CreditCardIcon',
          href: '/dashboard/payments',
          comingSoon: true,
        },
        {
          label: 'Add Expense',
          icon: 'BanknotesIcon',
          href: '/dashboard/expenses',
          comingSoon: true,
        },
        {
          label: 'Finance Report',
          icon: 'ChartBarIcon',
          href: '/dashboard/reports',
          comingSoon: true,
        },
      ];
    default:
      return [];
  }
}

function getRoleAlerts(role: SalonRole): string[] {
  const alerts: string[] = [];
  if (role === 'owner' || role === 'manager') {
    alerts.push('2 pending appointment confirmations');
    alerts.push('3 new website enquiries');
  }
  if (role === 'owner' || role === 'accountant') {
    alerts.push('₹12,500 dues pending from 4 clients');
  }
  if (role === 'receptionist') {
    alerts.push('2 bookings need confirmation');
  }
  return alerts;
}

export function getMockOverviewData(
  role: SalonRole,
  salonName = 'Salon Dashboard'
): DashboardOverviewData {
  const showFinance = role === 'owner' || role === 'accountant';
  const showAppointments = role !== 'accountant';
  const showStaff = role === 'owner' || role === 'manager';

  return {
    role,
    salonName,
    isDemoData: true,
    stats: getRoleStats(role),
    todayAppointments: showAppointments
      ? role === 'stylist'
        ? MOCK_APPOINTMENTS.filter((a) => a.stylistName === 'Ananya').slice(0, 3)
        : MOCK_APPOINTMENTS
      : [],
    recentEnquiries: role !== 'stylist' && role !== 'accountant' ? MOCK_ENQUIRIES : [],
    revenueSummary: showFinance
      ? MOCK_REVENUE
      : { todayCollection: 0, monthCollection: 0, pendingDues: 0, paymentModes: [] },
    staffSnapshot: showStaff
      ? MOCK_STAFF
      : { totalStaff: 0, availableToday: 0, busyNow: 0, onLeave: 0 },
    quickActions: getRoleQuickActions(role),
    alerts: getRoleAlerts(role),
  };
}
