import type { SalonRole } from './auth';

export interface OverviewStat {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
  variant?: 'default' | 'success' | 'warning' | 'info';
}

export interface TodayAppointment {
  id: string;
  time: string;
  customerName: string;
  service: string;
  stylistName: string;
  status: 'confirmed' | 'checked_in' | 'in_service' | 'completed' | 'pending' | 'cancelled';
  amount?: number;
}

export interface RecentEnquiry {
  id: string;
  name: string;
  phone: string;
  type: string;
  status: string;
  createdAt: string;
}

export interface RevenueSummary {
  todayCollection: number;
  monthCollection: number;
  pendingDues: number;
  paymentModes: { mode: string; amount: number }[];
}

export interface StaffSnapshot {
  totalStaff: number;
  availableToday: number;
  busyNow: number;
  onLeave: number;
}

export interface QuickAction {
  label: string;
  icon: string;
  href: string;
  comingSoon?: boolean;
}

export interface DashboardOverviewData {
  role: SalonRole;
  salonName: string;
  isDemoData: boolean;
  stats: OverviewStat[];
  todayAppointments: TodayAppointment[];
  recentEnquiries: RecentEnquiry[];
  revenueSummary: RevenueSummary;
  staffSnapshot: StaffSnapshot;
  quickActions: QuickAction[];
  alerts: string[];
}
