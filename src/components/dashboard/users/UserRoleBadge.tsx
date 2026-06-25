import { getRoleLabel, ROLE_BADGE_STYLES } from '@/lib/dashboard-permissions';
import type { SalonRole } from '@/types/auth';

export default function UserRoleBadge({ role }: { role: SalonRole }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${ROLE_BADGE_STYLES[role]}`}
    >
      {getRoleLabel(role)}
    </span>
  );
}
