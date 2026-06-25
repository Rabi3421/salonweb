'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import UserProfileCard from '@/components/dashboard/users/UserProfileCard';
import UserRoleBadge from '@/components/dashboard/users/UserRoleBadge';
import { getUserById, updateUser } from '@/lib/settings-api';
import { canManageUsers, ROLE_PERMISSIONS } from '@/lib/settings-utils';
import type { SalonRole } from '@/types/auth';
import type { SalonDashboardUser } from '@/types/settings';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500';
const roles: SalonRole[] = ['owner', 'manager', 'receptionist', 'stylist', 'accountant'];

export default function UserDetailPage() {
  return (
    <RoutePermissionGuard>
      <UserDetailContent />
    </RoutePermissionGuard>
  );
}

function UserDetailContent() {
  const params = useParams<{ userId: string }>();
  const currentUser = useDashboardUser();
  const canEdit = canManageUsers(currentUser.role);
  const [user, setUser] = useState<SalonDashboardUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getUserById(params.userId)
      .then(setUser)
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [params.userId]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    try {
      const updated = await updateUser(user.id, user);
      if (updated) setUser(updated);
      setMessage('User updated successfully.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading user..." />;
  if (error || !user) return <DashboardError message={error || 'User not found.'} />;

  return (
    <form onSubmit={save} className="max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">User Detail</h1>
          <p className="text-sm text-gray-500">Profile, role, permissions and activity summary.</p>
        </div>
        <Link
          href="/dashboard/users"
          className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Back
        </Link>
      </div>
      {message ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-medium text-primary">
          {message}
        </div>
      ) : null}
      <UserProfileCard user={user} />
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Role Management</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            disabled={!canEdit}
            label="Name"
            value={user.name}
            onChange={(value) => setUser({ ...user, name: value })}
          />
          <Input
            disabled={!canEdit}
            label="Phone"
            value={user.phone}
            onChange={(value) => setUser({ ...user, phone: value })}
          />
          <Input
            disabled={!canEdit}
            label="Email"
            value={user.email}
            onChange={(value) => setUser({ ...user, email: value })}
          />
          <label>
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Role</span>
            <select
              disabled={!canEdit}
              value={user.role}
              onChange={(event) =>
                setUser({
                  ...user,
                  role: event.target.value as SalonRole,
                  permissions: ROLE_PERMISSIONS[event.target.value as SalonRole],
                })
              }
              className={inputClass}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <input
              disabled={!canEdit}
              type="checkbox"
              checked={user.isActive}
              onChange={(event) => setUser({ ...user, isActive: event.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Active user
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {user.permissions.map((permission) => (
            <span
              key={permission}
              className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
            >
              {permission}
            </span>
          ))}
        </div>
      </section>
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Activity Summary</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Metric label="Logins" value={user.activitySummary.logins} />
          <Metric label="Appointments handled" value={user.activitySummary.appointmentsHandled} />
          <Metric label="Bills created" value={user.activitySummary.billsCreated} />
        </div>
        <div className="mt-4">
          <UserRoleBadge role={user.role} />
        </div>
      </section>
      {canEdit ? (
        <button
          disabled={saving}
          className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
        >
          {saving ? 'Saving...' : 'Save User'}
        </button>
      ) : (
        <p className="text-xs text-gray-400">View-only access for your role.</p>
      )}
    </form>
  );
}

function Input({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-gray-900">{value}</p>
    </div>
  );
}
