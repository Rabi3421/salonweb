import Icon from '@/components/ui/AppIcon';
import type { QuickAction } from '@/types/dashboard-overview';

export default function QuickActionsCard({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            disabled={action.comingSoon}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-gray-200 text-left hover:bg-gray-50 hover:border-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15">
              <Icon name={action.icon} size={16} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-700 truncate">{action.label}</p>
              {action.comingSoon ? <p className="text-[9px] text-gray-400">Coming soon</p> : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
