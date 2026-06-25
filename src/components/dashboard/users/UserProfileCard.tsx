import UserRoleBadge from '@/components/dashboard/users/UserRoleBadge';
import UserStatusBadge from '@/components/dashboard/users/UserStatusBadge';
import { formatSettingsDate } from '@/lib/settings-utils';
import type { SalonDashboardUser } from '@/types/settings';

export default function UserProfileCard({ user }: { user: SalonDashboardUser }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-500">{user.phone}</p>
        </div>
        <div className="flex gap-2">
          <UserRoleBadge role={user.role} />
          <UserStatusBadge isActive={user.isActive} />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Info label="Last login" value={formatSettingsDate(user.lastLoginAt)} />
        <Info label="Created" value={formatSettingsDate(user.createdAt)} />
        <Info label="Logins" value={String(user.activitySummary.logins)} />
        <Info label="Bills created" value={String(user.activitySummary.billsCreated)} />
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}
