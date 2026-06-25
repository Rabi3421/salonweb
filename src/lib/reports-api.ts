import { apiGet } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import { formatReportCurrency, getDefaultDateRange } from '@/lib/report-utils';
import type {
  AppointmentReportData,
  CustomerReportData,
  ReportFilterParams,
  RevenueReportData,
  StaffReportData,
} from '@/types/reports';

function buildQuery(params?: object): string {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') qs.set(key, String(value));
    });
  }
  const query = qs.toString();
  return query ? `?${query}` : '';
}

export async function getRevenueReport(params?: ReportFilterParams): Promise<RevenueReportData> {
  if (isMockModeEnabled()) return getMockRevenueReport(params);
  const res = await apiGet<{ report: RevenueReportData }>(
    `/api/salon/reports/revenue${buildQuery(params)}`
  );
  if (!res.data?.report) throw new Error('No revenue report returned.');
  return res.data.report;
}

export async function getAppointmentReport(
  params?: ReportFilterParams
): Promise<AppointmentReportData> {
  if (isMockModeEnabled()) return getMockAppointmentReport(params);
  const res = await apiGet<{ report: AppointmentReportData }>(
    `/api/salon/reports/appointments${buildQuery(params)}`
  );
  if (!res.data?.report) throw new Error('No appointment report returned.');
  return res.data.report;
}

export async function getStaffReport(params?: ReportFilterParams): Promise<StaffReportData> {
  if (isMockModeEnabled()) return getMockStaffReport(params);
  const res = await apiGet<{ report: StaffReportData }>(
    `/api/salon/reports/staff${buildQuery(params)}`
  );
  if (!res.data?.report) throw new Error('No staff report returned.');
  return res.data.report;
}

export async function getCustomerReport(params?: ReportFilterParams): Promise<CustomerReportData> {
  if (isMockModeEnabled()) return getMockCustomerReport(params);
  const res = await apiGet<{ report: CustomerReportData }>(
    `/api/salon/reports/customers${buildQuery(params)}`
  );
  if (!res.data?.report) throw new Error('No customer report returned.');
  return res.data.report;
}

const days = ['Jun 11', 'Jun 12', 'Jun 13', 'Jun 14', 'Jun 15', 'Jun 16', 'Jun 17', 'Jun 18'];
const range = (params?: ReportFilterParams) => ({
  ...getDefaultDateRange(params?.period ?? 'month'),
  dateFrom: params?.dateFrom ?? getDefaultDateRange(params?.period ?? 'month').dateFrom,
  dateTo: params?.dateTo ?? getDefaultDateRange(params?.period ?? 'month').dateTo,
});

export function getMockRevenueReport(params?: ReportFilterParams): RevenueReportData {
  const dailyRevenue = days.map((date, index) => ({
    date,
    total: [18500, 22400, 19800, 31200, 26800, 38500, 42100, 29600][index],
    cash: [4500, 6200, 5100, 8400, 6900, 9200, 11100, 7800][index],
    upi: [8900, 10400, 9600, 15100, 13200, 18500, 19600, 14400][index],
    card: [4100, 4800, 3600, 6200, 5200, 7900, 8600, 5400][index],
    due: [1000, 1000, 1500, 1500, 1500, 2900, 2800, 2000][index],
  }));
  return {
    dateRange: range(params),
    metrics: [
      {
        label: 'Total Revenue',
        value: formatReportCurrency(228900),
        trend: '+18%',
        variant: 'success',
      },
      {
        label: 'Today Collection',
        value: formatReportCurrency(29600),
        helperText: 'Across 18 payments',
      },
      { label: 'Pending Dues', value: formatReportCurrency(14200), variant: 'warning' },
      { label: 'Average Bill Value', value: formatReportCurrency(3180) },
      { label: 'Payments Count', value: 74, helperText: 'Completed payments' },
    ],
    dailyRevenue,
    paymentModeBreakdown: [
      { mode: 'upi', amount: 109700, count: 38, percentage: 48 },
      { mode: 'cash', amount: 59200, count: 22, percentage: 26 },
      { mode: 'card', amount: 45800, count: 12, percentage: 20 },
      { mode: 'other', amount: 14200, count: 2, percentage: 6 },
    ],
    serviceRevenue: [
      {
        serviceName: 'Bridal Makeup',
        category: 'Bridal',
        bookings: 7,
        revenue: 84000,
        percentage: 37,
      },
      { serviceName: 'Hair Color', category: 'Hair', bookings: 18, revenue: 54000, percentage: 24 },
      {
        serviceName: 'Facial Treatment',
        category: 'Skin',
        bookings: 21,
        revenue: 42000,
        percentage: 18,
      },
      { serviceName: 'Nail Art', category: 'Nails', bookings: 16, revenue: 19200, percentage: 8 },
    ],
    packageRevenue: [
      {
        serviceName: 'Bridal Glow Package',
        category: 'Package',
        bookings: 4,
        revenue: 75996,
        percentage: 60,
      },
      {
        serviceName: 'Monthly Grooming',
        category: 'Package',
        bookings: 9,
        revenue: 36000,
        percentage: 28,
      },
      {
        serviceName: 'Hair Spa Bundle',
        category: 'Package',
        bookings: 6,
        revenue: 15000,
        percentage: 12,
      },
    ],
    dueSummary: [
      { label: 'Open Bills', value: 8, helperText: 'Partially paid or unpaid', variant: 'warning' },
      { label: 'Oldest Due', value: '6 days', helperText: 'Neha Patel' },
      {
        label: 'Due Recovery',
        value: formatReportCurrency(18900),
        trend: '+12%',
        variant: 'success',
      },
    ],
    topCustomers: [
      {
        customerId: 'cust-001',
        name: 'Priya Sharma',
        phone: '+919876500001',
        visits: 5,
        totalSpent: 42200,
        lastVisit: '2026-06-18',
      },
      {
        customerId: 'cust-002',
        name: 'Kavya Rao',
        phone: '+919876500104',
        visits: 2,
        totalSpent: 38000,
        lastVisit: '2026-06-17',
      },
      {
        customerId: 'cust-003',
        name: 'Meenal Jain',
        phone: '+919876500006',
        visits: 4,
        totalSpent: 31239,
        lastVisit: '2026-06-16',
      },
    ],
  };
}

export function getMockAppointmentReport(params?: ReportFilterParams): AppointmentReportData {
  return {
    dateRange: range(params),
    metrics: [
      { label: 'Total Appointments', value: 148, trend: '+14%', variant: 'success' },
      { label: 'Completed', value: 118, helperText: '79.7% completion' },
      { label: 'Cancelled', value: 12, variant: 'warning' },
      { label: 'No Shows', value: 6, variant: 'danger' },
      { label: 'Conversion Rate', value: '42%', helperText: 'Enquiry to booking' },
    ],
    statusBreakdown: [
      { status: 'Completed', count: 118, percentage: 80 },
      { status: 'Confirmed', count: 12, percentage: 8 },
      { status: 'Cancelled', count: 12, percentage: 8 },
      { status: 'No Show', count: 6, percentage: 4 },
    ],
    sourceBreakdown: [
      { status: 'Website', count: 52, percentage: 35 },
      { status: 'Walk-In', count: 37, percentage: 25 },
      { status: 'Phone', count: 31, percentage: 21 },
      { status: 'WhatsApp', count: 28, percentage: 19 },
    ],
    dailyAppointments: days.map((date, index) => ({
      date,
      total: [14, 18, 16, 22, 19, 25, 21, 13][index],
      completed: [11, 15, 13, 18, 15, 20, 17, 9][index],
      cancelled: [1, 1, 2, 1, 2, 2, 1, 2][index],
    })),
    topServices: [
      { serviceName: 'Hair Spa', category: 'Hair', bookings: 28, revenue: 70000, percentage: 19 },
      {
        serviceName: 'Facial Treatment',
        category: 'Skin',
        bookings: 24,
        revenue: 48000,
        percentage: 16,
      },
      { serviceName: 'Nail Art', category: 'Nails', bookings: 22, revenue: 26400, percentage: 15 },
      {
        serviceName: 'Bridal Makeup',
        category: 'Bridal',
        bookings: 7,
        revenue: 84000,
        percentage: 5,
      },
    ],
    cancellationSummary: [
      { label: 'Late Cancellations', value: 7, variant: 'warning' },
      { label: 'No-Show Loss', value: formatReportCurrency(15400), variant: 'danger' },
      { label: 'Rescheduled', value: 9, variant: 'success' },
    ],
  };
}

export function getMockStaffReport(params?: ReportFilterParams): StaffReportData {
  return {
    dateRange: range(params),
    metrics: [
      { label: 'Total Staff', value: 6 },
      { label: 'Services Completed', value: 118, trend: '+11%', variant: 'success' },
      { label: 'Staff Revenue', value: formatReportCurrency(214700) },
      { label: 'Average Rating', value: '4.7/5', helperText: 'Post-service feedback' },
    ],
    staffPerformance: [
      {
        staffId: 'staff-001',
        staffName: 'Sana Khan',
        role: 'Senior Stylist',
        appointments: 31,
        completedServices: 29,
        revenue: 68400,
        rating: 4.9,
        repeatClients: 18,
      },
      {
        staffId: 'staff-002',
        staffName: 'Nisha Rao',
        role: 'Makeup Artist',
        appointments: 22,
        completedServices: 21,
        revenue: 62200,
        rating: 4.8,
        repeatClients: 10,
      },
      {
        staffId: 'staff-003',
        staffName: 'Riya Patel',
        role: 'Receptionist',
        appointments: 18,
        completedServices: 0,
        revenue: 0,
        rating: 4.6,
        repeatClients: 0,
      },
      {
        staffId: 'staff-004',
        staffName: 'Meera Kapoor',
        role: 'Manager',
        appointments: 14,
        completedServices: 6,
        revenue: 14800,
        rating: 4.7,
        repeatClients: 4,
      },
      {
        staffId: 'staff-005',
        staffName: 'Anu Thomas',
        role: 'Nail Artist',
        appointments: 26,
        completedServices: 25,
        revenue: 32200,
        rating: 4.6,
        repeatClients: 12,
      },
      {
        staffId: 'staff-006',
        staffName: 'Ira Sen',
        role: 'Skin Therapist',
        appointments: 24,
        completedServices: 23,
        revenue: 37100,
        rating: 4.8,
        repeatClients: 14,
      },
    ],
    attendanceSnapshot: [
      { label: 'On-Time Check-ins', value: '92%', variant: 'success' },
      { label: 'Overbooked Slots', value: 4, variant: 'warning' },
      { label: 'Idle Hours', value: '18h', helperText: 'Can be optimized' },
    ],
  };
}

export function getMockCustomerReport(params?: ReportFilterParams): CustomerReportData {
  return {
    dateRange: range(params),
    metrics: [
      { label: 'Total Customers', value: 426 },
      { label: 'New Customers', value: 58, trend: '+22%', variant: 'success' },
      { label: 'Repeat Customers', value: 91 },
      { label: 'Retention Rate', value: '41%' },
      { label: 'Average Spend', value: formatReportCurrency(2860) },
    ],
    newVsRepeat: [
      { label: 'New', count: 58, percentage: 39 },
      { label: 'Repeat', count: 91, percentage: 61 },
    ],
    topCustomers: [
      {
        customerId: 'cust-001',
        name: 'Priya Sharma',
        phone: '+919876500001',
        visits: 5,
        totalSpent: 42200,
        lastVisit: '2026-06-18',
      },
      {
        customerId: 'cust-002',
        name: 'Kavya Rao',
        phone: '+919876500104',
        visits: 2,
        totalSpent: 38000,
        lastVisit: '2026-06-17',
      },
      {
        customerId: 'cust-003',
        name: 'Aisha Khan',
        phone: '+919876500103',
        visits: 6,
        totalSpent: 28600,
        lastVisit: '2026-06-15',
      },
    ],
    customerSources: [
      { status: 'Website', count: 54, percentage: 37 },
      { status: 'Walk-In', count: 42, percentage: 29 },
      { status: 'Referral', count: 26, percentage: 18 },
      { status: 'Phone', count: 14, percentage: 9 },
      { status: 'WhatsApp', count: 10, percentage: 7 },
    ],
    retentionSummary: [
      { label: 'Second Visit Rate', value: '46%', variant: 'success' },
      { label: 'Dormant Customers', value: 31, variant: 'warning' },
      { label: 'Win-back Opportunities', value: 18, helperText: 'High spend, inactive 60+ days' },
    ],
  };
}
