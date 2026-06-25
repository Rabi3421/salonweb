'use client';

import { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import PaymentModeBreakdownCard from '@/components/dashboard/reports/PaymentModeBreakdownCard';
import ReportDateRangeFilter from '@/components/dashboard/reports/ReportDateRangeFilter';
import ReportHeader from '@/components/dashboard/reports/ReportHeader';
import ReportMetricCards from '@/components/dashboard/reports/ReportMetricCards';
import SimpleBarList from '@/components/dashboard/reports/SimpleBarList';
import SimpleTrendTable from '@/components/dashboard/reports/SimpleTrendTable';
import TopCustomersCard from '@/components/dashboard/reports/TopCustomersCard';
import TopServicesCard from '@/components/dashboard/reports/TopServicesCard';
import { getRevenueReport } from '@/lib/reports-api';
import { formatReportCurrency } from '@/lib/report-utils';
import type { ReportFilterParams, RevenueReportData } from '@/types/reports';

export default function RevenueReportPage() {
  return (
    <RoutePermissionGuard>
      <RevenueReportContent />
    </RoutePermissionGuard>
  );
}

function RevenueReportContent() {
  const [filters, setFilters] = useState<ReportFilterParams>({ period: 'month' });
  const [report, setReport] = useState<RevenueReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        setReport(await getRevenueReport(filters));
        setError('');
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  if (loading) return <DashboardLoading message="Loading revenue report..." />;
  if (error || !report) return <DashboardError message={error || 'Revenue report unavailable.'} />;

  return (
    <div className="max-w-6xl space-y-6">
      <ReportHeader
        title="Revenue Report"
        subtitle="Collections, pending dues, payment modes and top revenue drivers."
        dateRange={report.dateRange}
      />
      <ReportDateRangeFilter filters={filters} onChange={setFilters} />
      <ReportMetricCards metrics={report.metrics} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SimpleBarList
          title="Daily Revenue"
          items={report.dailyRevenue.map((item) => ({
            label: item.date,
            value: formatReportCurrency(item.total),
            percentage:
              (item.total / Math.max(...report.dailyRevenue.map((point) => point.total))) * 100,
            helper: `Due ${formatReportCurrency(item.due)}`,
          }))}
        />
        <PaymentModeBreakdownCard items={report.paymentModeBreakdown} />
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TopServicesCard title="Service Revenue Ranking" services={report.serviceRevenue} />
        <TopServicesCard title="Package Revenue Ranking" services={report.packageRevenue} />
      </div>
      <ReportMetricCards metrics={report.dueSummary} />
      <TopCustomersCard customers={report.topCustomers} />
      <SimpleTrendTable
        title="Daily Revenue Details"
        headers={['Date', 'Total', 'Cash', 'UPI', 'Card', 'Due']}
        rows={report.dailyRevenue.map((item) => [
          item.date,
          formatReportCurrency(item.total),
          formatReportCurrency(item.cash),
          formatReportCurrency(item.upi),
          formatReportCurrency(item.card),
          formatReportCurrency(item.due),
        ])}
      />
    </div>
  );
}
