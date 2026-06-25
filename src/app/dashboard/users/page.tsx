'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import UsersTable from '@/components/dashboard/users/UsersTable';
import { getUsers } from '@/lib/settings-api';
import { canManageUsers, filterUsers } from '@/lib/settings-utils';
import type { SalonRole } from '@/types/auth';
import type { SalonDashboardUser } from '@/types/settings';

const inputClass =
  'rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';
const roles: SalonRole[] = ['owner', 'manager', 'receptionist', 'stylist', 'accountant'];

export default function UsersPage() {
  return (
    <RoutePermissionGuard>
      <UsersContent />
    </RoutePermissionGuard>
  );
}

function UsersContent() {
  const currentUser = useDashboardUser();
  const [users, setUsers] = useState<SalonDashboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterUsers(users, {
    search,
    role: (role || undefined) as SalonRole | undefined,
    status: (status || undefined) as 'active' | 'inactive' | undefined,
  });

  if (loading) return <DashboardLoading message="Loading users..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">Manage salon dashboard users and role access.</p>
        </div>
        {canManageUsers(currentUser.role) ? (
          <Link
            href="/dashboard/users/new"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            Add User
          </Link>
        ) : null}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className={`${inputClass} md:col-span-2`}
          />
          <select
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className={inputClass}
          >
            <option value="">All roles</option>
            {roles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={inputClass}
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <UsersTable users={filtered} />
    </div>
  );
}
