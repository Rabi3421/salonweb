import type { ReportMetric } from '@/types/reports';

const variantClasses: Record<string, string> = {
  default: 'text-gray-900',
  primary: 'text-primary',
  success: 'text-green-600',
  warning: 'text-amber-600',
  danger: 'text-red-600',
};

export default function ReportMetricCards({ metrics }: { metrics: ReportMetric[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <p className="text-xs text-gray-500">{metric.label}</p>
          <p className={`mt-1 text-xl font-bold ${variantClasses[metric.variant ?? 'default']}`}>
            {metric.value}
          </p>
          {metric.trend || metric.helperText ? (
            <p className="mt-1 text-xs text-gray-400">{metric.trend ?? metric.helperText}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
