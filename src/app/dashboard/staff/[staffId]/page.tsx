'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import { Card } from '@/components/dashboard/staff/StaffInfoCard';
import StaffInfoCard from '@/components/dashboard/staff/StaffInfoCard';
import StaffPerformanceCard from '@/components/dashboard/staff/StaffPerformanceCard';
import StaffProfileHeader from '@/components/dashboard/staff/StaffProfileHeader';
import StaffScheduleCard from '@/components/dashboard/staff/StaffScheduleCard';
import StaffServicesCard from '@/components/dashboard/staff/StaffServicesCard';
import { getStaffMemberById } from '@/lib/staff-api';
import {
  canEditStaff,
  canViewStaffFinancials,
  canViewStaffPrivateDetails,
  formatStaffCurrency,
  formatStaffPhone,
} from '@/lib/staff-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffDetailPage() {
  return (
    <RoutePermissionGuard>
      <StaffDetailContent />
    </RoutePermissionGuard>
  );
}

function StaffDetailContent() {
  const params = useParams<{ staffId: string }>();
  const user = useDashboardUser();
  const [staff, setStaff] = useState<SalonStaffMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getStaffMemberById(params.staffId);
        if (!data) {
          setError('Staff member not found.');
        } else {
          setStaff(data);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.staffId]);

  if (loading) return <DashboardLoading message="Loading staff profile..." />;
  if (error || !staff) return <DashboardError message={error || 'Staff member not found.'} />;

  const showFinancials = canViewStaffFinancials(user.role);
  const showPrivate = canViewStaffPrivateDetails(user.role);

  return (
    <div className="space-y-6 max-w-6xl">
      {isMockModeEnabled() ? (
        <p className="text-[10px] text-amber-500 font-medium">Demo data</p>
      ) : null}
      <StaffProfileHeader staff={staff} canEdit={canEditStaff(user.role)} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <StaffInfoCard staff={staff} />
          <StaffServicesCard staff={staff} />
          <StaffScheduleCard staff={staff} />
        </div>
        <div className="space-y-6">
          <StaffPerformanceCard staff={staff} showRevenue={showFinancials} />
          {showPrivate ? (
            <Card title="Private & Financial Details">
              <div className="space-y-4">
                <Info label="Salary" value={formatStaffCurrency(staff.salary)} />
                <Info
                  label="Commission"
                  value={
                    staff.commissionPercent !== undefined ? `${staff.commissionPercent}%` : '—'
                  }
                />
                <Info label="Emergency Contact" value={staff.emergencyContactName ?? '—'} />
                <Info
                  label="Emergency Phone"
                  value={
                    staff.emergencyContactPhone
                      ? formatStaffPhone(staff.emergencyContactPhone)
                      : '—'
                  }
                />
                <Info label="Private Notes" value={staff.notes ?? '—'} />
              </div>
            </Card>
          ) : null}
          <Card title="Upcoming Appointments">
            <div className="space-y-3">
              {['11:30 AM · Hair Styling', '2:00 PM · Consultation', '5:15 PM · Follow-up'].map(
                (item) => (
                  <div key={item} className="rounded-xl bg-gray-50 px-3 py-2">
                    <p className="text-sm font-medium text-gray-800">{item}</p>
                    <p className="text-xs text-gray-400">Schedule preview</p>
                  </div>
                )
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900 mt-1">{value}</p>
    </div>
  );
}
