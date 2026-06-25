import Link from 'next/link';
import UserRoleBadge from '@/components/dashboard/users/UserRoleBadge';
import UserStatusBadge from '@/components/dashboard/users/UserStatusBadge';
import { formatSettingsDate } from '@/lib/settings-utils';
import type { SalonDashboardUser } from '@/types/settings';

export default function UsersTable({ users }: { users: SalonDashboardUser[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {['Name', 'Role', 'Phone', 'Email', 'Status', 'Last Login', 'Actions'].map(
                (header) => (
                  <th key={header} className="px-4 py-3 font-medium text-gray-500">
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                <td className="px-4 py-3">
                  <UserRoleBadge role={user.role} />
                </td>
                <td className="px-4 py-3 text-gray-600">{user.phone}</td>
                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                <td className="px-4 py-3">
                  <UserStatusBadge isActive={user.isActive} />
                </td>
                <td className="px-4 py-3 text-gray-600">{formatSettingsDate(user.lastLoginAt)}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/users/${user.id}`}
                    className="text-xs font-medium text-primary"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
