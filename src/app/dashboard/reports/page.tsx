'use client';

import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import ReportAccessCard from '@/components/dashboard/reports/ReportAccessCard';
import ReportHeader from '@/components/dashboard/reports/ReportHeader';
import { getReportAccessForRole } from '@/lib/report-utils';

export default function ReportsPage() {
  return (
    <RoutePermissionGuard>
      <ReportsContent />
    </RoutePermissionGuard>
  );
}

function ReportsContent() {
  const user = useDashboardUser();
  const access = getReportAccessForRole(user.role);

  const cards = [
    {
      id: 'revenue',
      title: 'Revenue Report',
      description: 'Collections, dues, payment modes and service revenue.',
      metric: '₹2.28L',
      href: '/dashboard/reports/revenue',
      enabled: access.revenue,
    },
    {
      id: 'appointments',
      title: 'Appointment Report',
      description: 'Booking trends, completion, cancellations and service demand.',
      metric: '148 bookings',
      href: '/dashboard/reports/appointments',
      enabled: access.appointments,
    },
    {
      id: 'staff',
      title: 'Staff Report',
      description: 'Staff workload, services completed, revenue and ratings.',
      metric: '6 staff',
      href: '/dashboard/reports/staff',
      enabled: access.staff,
    },
    {
      id: 'customers',
      title: 'Customer Report',
      description: 'New vs repeat customers, retention and top spenders.',
      metric: '426 customers',
      href: '/dashboard/reports/customers',
      enabled: access.customers,
    },
  ].filter((card) => card.enabled);

  return (
    <div className="max-w-6xl space-y-6">
      <ReportHeader
        title="Reports"
        subtitle="Track revenue, appointments, staff performance and customer growth."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cards.map(({ id, ...card }) => (
          <ReportAccessCard key={id} {...card} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ReportAccessCard
          title="Inventory Report"
          description="Stock usage, low-stock alerts and product movement."
          metric="Coming later"
          enabled={false}
        />
        <ReportAccessCard
          title="Expense Report"
          description="Salon expenses, vendor payments and monthly burn."
          metric="Coming later"
          enabled={false}
        />
        <ReportAccessCard
          title="Marketing Report"
          description="Campaign source, lead quality and conversion attribution."
          metric="Coming later"
          enabled={false}
        />
      </div>
    </div>
  );
}
