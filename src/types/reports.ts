import type { PaymentMode } from '@/types/billing';

export interface ReportDateRange {
  dateFrom: string;
  dateTo: string;
  label?: string;
}

export interface ReportMetric {
  label: string;
  value: string | number;
  helperText?: string;
  trend?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'primary';
}

export interface DailyRevenuePoint {
  date: string;
  total: number;
  cash: number;
  upi: number;
  card: number;
  due: number;
}

export interface PaymentModeBreakdown {
  mode: PaymentMode;
  amount: number;
  count: number;
  percentage: number;
}

export interface ServiceRevenuePoint {
  serviceName: string;
  category: string;
  bookings: number;
  revenue: number;
  percentage: number;
}

export interface CustomerValuePoint {
  customerId: string;
  name: string;
  phone: string;
  visits: number;
  totalSpent: number;
  lastVisit: string;
}

export interface RevenueReportData {
  dateRange: ReportDateRange;
  metrics: ReportMetric[];
  dailyRevenue: DailyRevenuePoint[];
  paymentModeBreakdown: PaymentModeBreakdown[];
  serviceRevenue: ServiceRevenuePoint[];
  packageRevenue: ServiceRevenuePoint[];
  dueSummary: ReportMetric[];
  topCustomers: CustomerValuePoint[];
}

export interface AppointmentStatusBreakdown {
  status: string;
  count: number;
  percentage: number;
}

export interface AppointmentReportData {
  dateRange: ReportDateRange;
  metrics: ReportMetric[];
  statusBreakdown: AppointmentStatusBreakdown[];
  sourceBreakdown: AppointmentStatusBreakdown[];
  dailyAppointments: { date: string; total: number; completed: number; cancelled: number }[];
  topServices: ServiceRevenuePoint[];
  cancellationSummary: ReportMetric[];
}

export interface StaffPerformancePoint {
  staffId: string;
  staffName: string;
  role: string;
  appointments: number;
  completedServices: number;
  revenue: number;
  rating?: number;
  repeatClients?: number;
}

export interface StaffReportData {
  dateRange: ReportDateRange;
  metrics: ReportMetric[];
  staffPerformance: StaffPerformancePoint[];
  attendanceSnapshot?: ReportMetric[];
}

export interface CustomerReportData {
  dateRange: ReportDateRange;
  metrics: ReportMetric[];
  newVsRepeat: { label: string; count: number; percentage: number }[];
  topCustomers: CustomerValuePoint[];
  customerSources: AppointmentStatusBreakdown[];
  retentionSummary: ReportMetric[];
}

export interface ReportFilterParams {
  dateFrom?: string;
  dateTo?: string;
  period?: 'today' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
}
