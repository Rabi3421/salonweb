'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import StaffFilters from '@/components/dashboard/staff/StaffFilters';
import StaffSummaryCards from '@/components/dashboard/staff/StaffSummaryCards';
import StaffTable from '@/components/dashboard/staff/StaffTable';
import StaffMobileCards from '@/components/dashboard/staff/StaffMobileCards';
import { getStaff } from '@/lib/staff-api';
import { canCreateStaff, canEditStaff, filterStaff } from '@/lib/staff-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonStaffMember, StaffRoleType, StaffStatus } from '@/types/staff';

export default function StaffListPage() {
  return (
    <RoutePermissionGuard>
      <StaffListContent />
    </RoutePermissionGuard>
  );
}

function StaffListContent() {
  const user = useDashboardUser();
  const [staff, setStaff] = useState<SalonStaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [specialty, setSpecialty] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setStaff(await getStaff());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const specialties = useMemo(
    () => Array.from(new Set(staff.flatMap((member) => member.specialties))).sort(),
    [staff]
  );

  const filtered = filterStaff(staff, {
    search,
    role: (role || undefined) as StaffRoleType | undefined,
    status: (status || undefined) as StaffStatus | undefined,
  }).filter((member) => (specialty ? member.specialties.includes(specialty) : true));

  function clearFilters() {
    setSearch('');
    setRole('');
    setStatus('');
    setSpecialty('');
  }

  if (loading) return <DashboardLoading message="Loading staff..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Staff</h1>
            {isMockModeEnabled() ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-semibold">
                Demo data
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage stylists, specialists, roles, schedules and service assignments.
          </p>
        </div>
        {canCreateStaff(user.role) ? (
          <Link
            href="/dashboard/staff/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={16} className="text-white" />
            Add Staff
          </Link>
        ) : null}
      </div>

      <StaffSummaryCards staff={staff} />

      <StaffFilters
        search={search}
        role={role}
        status={status}
        specialty={specialty}
        specialties={specialties}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onStatusChange={setStatus}
        onSpecialtyChange={setSpecialty}
        onClear={clearFilters}
      />

      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No staff found"
          description="Try adjusting your filters or add a new staff member."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <StaffTable staff={filtered} canEdit={canEditStaff(user.role)} />
          <StaffMobileCards staff={filtered} />
        </div>
      )}
    </div>
  );
}
