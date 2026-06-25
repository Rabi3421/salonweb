'use client';

import { useEffect, useMemo, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import ReportDateRangeFilter from '@/components/dashboard/reports/ReportDateRangeFilter';
import ReportHeader from '@/components/dashboard/reports/ReportHeader';
import ReportMetricCards from '@/components/dashboard/reports/ReportMetricCards';
import SimpleBarList from '@/components/dashboard/reports/SimpleBarList';
import StaffPerformanceTable from '@/components/dashboard/reports/StaffPerformanceTable';
import { getStaffReport } from '@/lib/reports-api';
import { formatReportCurrency } from '@/lib/report-utils';
import type { ReportFilterParams, StaffReportData } from '@/types/reports';

export default function StaffReportPage() {
  return (
    <RoutePermissionGuard>
      <StaffReportContent />
    </RoutePermissionGuard>
  );
}

function StaffReportContent() {
  const [filters, setFilters] = useState<ReportFilterParams>({ period: 'month' });
  const [report, setReport] = useState<StaffReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        setReport(await getStaffReport(filters));
        setError('');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  const topPerformer = useMemo(
    () => report?.staffPerformance.slice().sort((a, b) => b.revenue - a.revenue)[0],
    [report]
  );

  if (loading) return <DashboardLoading message="Loading staff report..." />;
  if (error || !report) return <DashboardError message={error || 'Staff report unavailable.'} />;

  const maxRevenue = Math.max(...report.staffPerformance.map((item) => item.revenue));

  return (
    <div className="max-w-6xl space-y-6">
      <ReportHeader
        title="Staff Report"
        subtitle="Review staff workload, services completed, revenue and ratings."
        dateRange={report.dateRange}
      />
      <ReportDateRangeFilter filters={filters} onChange={setFilters} />
      <ReportMetricCards metrics={report.metrics} />
      {topPerformer ? (
        <section className="rounded-2xl border border-primary/20 bg-primary/10 p-5">
          <p className="text-xs font-medium uppercase text-primary">Top performer</p>
          <h2 className="mt-1 text-lg font-bold text-gray-900">{topPerformer.staffName}</h2>
          <p className="text-sm text-gray-600">
            {topPerformer.role} · {formatReportCurrency(topPerformer.revenue)} ·{' '}
            {topPerformer.completedServices} services
          </p>
        </section>
      ) : null}
      <StaffPerformanceTable staff={report.staffPerformance} />
      <SimpleBarList
        title="Staff Workload Summary"
        items={report.staffPerformance.map((item) => ({
          label: item.staffName,
          value: formatReportCurrency(item.revenue),
          percentage: maxRevenue ? (item.revenue / maxRevenue) * 100 : 0,
          helper: `${item.appointments} appointments · ${item.completedServices} completed`,
        }))}
      />
      {report.attendanceSnapshot ? <ReportMetricCards metrics={report.attendanceSnapshot} /> : null}
    </div>
  );
}
