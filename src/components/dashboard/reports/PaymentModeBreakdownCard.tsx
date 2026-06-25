import { formatReportCurrency } from '@/lib/report-utils';
import type { PaymentModeBreakdown } from '@/types/reports';

export default function PaymentModeBreakdownCard({ items }: { items: PaymentModeBreakdown[] }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Payment Mode Breakdown</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.mode}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium capitalize text-gray-700">
                {item.mode.replace('_', ' ')}
              </span>
              <span className="text-gray-500">
                {formatReportCurrency(item.amount)} · {item.count}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
