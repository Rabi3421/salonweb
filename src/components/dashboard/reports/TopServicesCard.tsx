import { formatReportCurrency } from '@/lib/report-utils';
import type { ServiceRevenuePoint } from '@/types/reports';

export default function TopServicesCard({
  title,
  services,
}: {
  title: string;
  services: ServiceRevenuePoint[];
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">{title}</h2>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.serviceName} className="rounded-xl bg-gray-50 p-3">
            <div className="flex justify-between gap-4">
              <div>
                <p className="font-medium text-gray-900">{service.serviceName}</p>
                <p className="text-xs text-gray-400">
                  {service.category} · {service.bookings} bookings
                </p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {formatReportCurrency(service.revenue)}
              </p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${service.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
