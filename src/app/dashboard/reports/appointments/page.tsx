'use client';

import { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import AppointmentStatusBreakdownCard from '@/components/dashboard/reports/AppointmentStatusBreakdownCard';
import ReportDateRangeFilter from '@/components/dashboard/reports/ReportDateRangeFilter';
import ReportHeader from '@/components/dashboard/reports/ReportHeader';
import ReportMetricCards from '@/components/dashboard/reports/ReportMetricCards';
import SimpleBarList from '@/components/dashboard/reports/SimpleBarList';
import TopServicesCard from '@/components/dashboard/reports/TopServicesCard';
import { getAppointmentReport } from '@/lib/reports-api';
import type { AppointmentReportData, ReportFilterParams } from '@/types/reports';

export default function AppointmentReportPage() {
  return (
    <RoutePermissionGuard>
      <AppointmentReportContent />
    </RoutePermissionGuard>
  );
}

function AppointmentReportContent() {
  const [filters, setFilters] = useState<ReportFilterParams>({ period: 'month' });
  const [report, setReport] = useState<AppointmentReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        setReport(await getAppointmentReport(filters));
        setError('');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  if (loading) return <DashboardLoading message="Loading appointment report..." />;
  if (error || !report)
    return <DashboardError message={error || 'Appointment report unavailable.'} />;

  return (
    <div className="max-w-6xl space-y-6">
      <ReportHeader
        title="Appointment Report"
        subtitle="Track booking volume, sources, cancellations and service demand."
        dateRange={report.dateRange}
      />
      <ReportDateRangeFilter filters={filters} onChange={setFilters} />
      <ReportMetricCards metrics={report.metrics} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AppointmentStatusBreakdownCard
          title="Appointment Status Breakdown"
          items={report.statusBreakdown}
        />
        <AppointmentStatusBreakdownCard
          title="Appointment Source Breakdown"
          items={report.sourceBreakdown}
        />
      </div>
      <SimpleBarList
        title="Daily Appointment Trend"
        items={report.dailyAppointments.map((item) => ({
          label: item.date,
          value: item.total,
          percentage:
            (item.total / Math.max(...report.dailyAppointments.map((point) => point.total))) * 100,
          helper: `${item.completed} completed · ${item.cancelled} cancelled`,
        }))}
      />
      <TopServicesCard title="Top Services by Bookings" services={report.topServices} />
      <ReportMetricCards metrics={report.cancellationSummary} />
    </div>
  );
}
