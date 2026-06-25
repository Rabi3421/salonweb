import Icon from '@/components/ui/AppIcon';
import type { OverviewStat } from '@/types/dashboard-overview';

const VARIANT_DOT: Record<string, string> = {
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  info: 'bg-blue-500',
  default: 'bg-gray-300',
};

export default function OverviewStatsGrid({ stats }: { stats: OverviewStat[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name={stat.icon} size={20} className="text-primary" />
            </div>
            <div className="flex items-center gap-1.5">
              {stat.trend ? (
                <span className="text-[11px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {stat.trend}
                </span>
              ) : null}
              <div className={`w-2 h-2 rounded-full ${VARIANT_DOT[stat.variant ?? 'default']}`} />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
