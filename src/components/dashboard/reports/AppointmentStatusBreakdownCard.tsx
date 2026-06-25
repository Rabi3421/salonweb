import type { AppointmentStatusBreakdown } from '@/types/reports';

export default function AppointmentStatusBreakdownCard({
  title,
  items,
}: {
  title: string;
  items: AppointmentStatusBreakdown[];
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.status}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-medium text-gray-700">{item.status}</span>
              <span className="text-gray-500">
                {item.count} · {item.percentage}%
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
