import type { SalonAuthUser } from '@/types/auth';
import { getRoleLabel, ROLE_BADGE_STYLES } from '@/lib/dashboard-permissions';

interface OverviewHeaderProps {
  user: SalonAuthUser;
  salonName: string;
  isDemoData: boolean;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function OverviewHeader({ user, salonName, isDemoData }: OverviewHeaderProps) {
  const badgeStyle = ROLE_BADGE_STYLES[user.role];
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold text-gray-900">
          {getGreeting()}, {user.name}
        </h1>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeStyle}`}
          >
            {getRoleLabel(user.role)}
          </span>
          <span className="text-xs text-gray-400">{salonName}</span>
          {isDemoData ? (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
              Demo data
            </span>
          ) : null}
        </div>
      </div>
      <p className="text-xs text-gray-400">{today}</p>
    </div>
  );
}
