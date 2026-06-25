import type { SalonRole } from '@/types/auth';
import type { ReportFilterParams } from '@/types/reports';

export function formatReportCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatReportNumber(value: number): string {
  return new Intl.NumberFormat('en-IN').format(value);
}

export function formatReportPercent(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

export function getDefaultDateRange(period: ReportFilterParams['period'] = 'month') {
  const end = new Date();
  const start = new Date();
  if (period === 'today') start.setHours(0, 0, 0, 0);
  if (period === 'week') start.setDate(end.getDate() - 6);
  if (period === 'month') start.setDate(end.getDate() - 29);
  if (period === 'quarter') start.setDate(end.getDate() - 89);
  if (period === 'year') start.setFullYear(end.getFullYear() - 1);
  return {
    dateFrom: start.toISOString().slice(0, 10),
    dateTo: end.toISOString().slice(0, 10),
    label: getReportPeriodLabel(period),
  };
}

export function getReportPeriodLabel(period?: ReportFilterParams['period']): string {
  const labels = {
    today: 'Today',
    week: 'Last 7 days',
    month: 'Last 30 days',
    quarter: 'Last 90 days',
    year: 'Last year',
    custom: 'Custom range',
  };
  return labels[period ?? 'month'];
}

export function canViewReports(role: SalonRole): boolean {
  return ['owner', 'manager', 'accountant'].includes(role);
}

export function canViewRevenueReport(role: SalonRole): boolean {
  return ['owner', 'accountant'].includes(role);
}

export function canViewAppointmentReport(role: SalonRole): boolean {
  return ['owner', 'manager'].includes(role);
}

export function canViewStaffReport(role: SalonRole): boolean {
  return role === 'owner';
}

export function canViewCustomerReport(role: SalonRole): boolean {
  return ['owner', 'manager'].includes(role);
}

export function getReportAccessForRole(role: SalonRole) {
  return {
    hub: canViewReports(role),
    revenue: canViewRevenueReport(role),
    appointments: canViewAppointmentReport(role),
    staff: canViewStaffReport(role),
    customers: canViewCustomerReport(role),
  };
}

export function filterReportByPeriod<T>(data: T, _params?: ReportFilterParams): T {
  return data;
}
