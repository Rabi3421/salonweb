import Icon from '@/components/ui/AppIcon';

export default function AlertsCard({ alerts }: { alerts: string[] }) {
  if (alerts.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Attention Needed</h3>
      <div className="space-y-2">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-amber-50 border border-amber-100"
          >
            <Icon name="ExclamationTriangleIcon" size={14} className="text-amber-500 shrink-0" />
            <p className="text-xs text-amber-700">{alert}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
