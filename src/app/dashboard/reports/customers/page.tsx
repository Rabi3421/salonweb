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
import TopCustomersCard from '@/components/dashboard/reports/TopCustomersCard';
import { getCustomerReport } from '@/lib/reports-api';
import type { CustomerReportData, ReportFilterParams } from '@/types/reports';

export default function CustomerReportPage() {
  return (
    <RoutePermissionGuard>
      <CustomerReportContent />
    </RoutePermissionGuard>
  );
}

function CustomerReportContent() {
  const [filters, setFilters] = useState<ReportFilterParams>({ period: 'month' });
  const [report, setReport] = useState<CustomerReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        setReport(await getCustomerReport(filters));
        setError('');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  if (loading) return <DashboardLoading message="Loading customer report..." />;
  if (error || !report) return <DashboardError message={error || 'Customer report unavailable.'} />;

  return (
    <div className="max-w-6xl space-y-6">
      <ReportHeader
        title="Customer Report"
        subtitle="Understand customer growth, retention, sources and top spenders."
        dateRange={report.dateRange}
      />
      <ReportDateRangeFilter filters={filters} onChange={setFilters} />
      <ReportMetricCards metrics={report.metrics} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SimpleBarList
          title="New vs Repeat Customers"
          items={report.newVsRepeat.map((item) => ({
            label: item.label,
            value: item.count,
            percentage: item.percentage,
            helper: `${item.percentage}% of customers`,
          }))}
        />
        <AppointmentStatusBreakdownCard
          title="Customer Source Breakdown"
          items={report.customerSources}
        />
      </div>
      <TopCustomersCard customers={report.topCustomers} />
      <ReportMetricCards metrics={report.retentionSummary} />
    </div>
  );
}
