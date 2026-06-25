'use client';

import React, { useEffect, useState } from 'react';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import OverviewHeader from '@/components/dashboard/overview/OverviewHeader';
import OverviewStatsGrid from '@/components/dashboard/overview/OverviewStatsGrid';
import TodayAppointmentsCard from '@/components/dashboard/overview/TodayAppointmentsCard';
import QuickActionsCard from '@/components/dashboard/overview/QuickActionsCard';
import RevenueSnapshotCard from '@/components/dashboard/overview/RevenueSnapshotCard';
import StaffSnapshotCard from '@/components/dashboard/overview/StaffSnapshotCard';
import AlertsCard from '@/components/dashboard/overview/AlertsCard';
import RecentEnquiriesCard from '@/components/dashboard/overview/RecentEnquiriesCard';
import { getDashboardOverview } from '@/lib/dashboard-overview';
import type { DashboardOverviewData } from '@/types/dashboard-overview';

export default function DashboardOverviewPage() {
  const user = useDashboardUser();
  const [data, setData] = useState<DashboardOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardOverview(user.role)
      .then((d) => setData(d))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user.role]);

  if (loading) return <DashboardLoading message="Loading overview..." />;
  if (error) return <DashboardError message={error} onRetry={() => window.location.reload()} />;
  if (!data) return <DashboardError message="No overview data available." />;

  const showFinance = user.role === 'owner' || user.role === 'accountant';
  const showStaff = user.role === 'owner' || user.role === 'manager';
  const showEnquiries =
    user.role === 'owner' || user.role === 'manager' || user.role === 'receptionist';

  return (
    <div className="space-y-6 max-w-6xl">
      <OverviewHeader user={user} salonName={data.salonName} isDemoData={data.isDemoData} />

      <OverviewStatsGrid stats={data.stats} />

      {data.alerts.length > 0 ? <AlertsCard alerts={data.alerts} /> : null}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TodayAppointmentsCard appointments={data.todayAppointments} />
          {showEnquiries ? <RecentEnquiriesCard enquiries={data.recentEnquiries} /> : null}
        </div>

        <div className="space-y-6">
          <QuickActionsCard actions={data.quickActions} />
          {showFinance ? <RevenueSnapshotCard revenue={data.revenueSummary} /> : null}
          {showStaff ? <StaffSnapshotCard staff={data.staffSnapshot} /> : null}
        </div>
      </div>
    </div>
  );
}
