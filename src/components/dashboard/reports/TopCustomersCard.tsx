import { formatReportCurrency } from '@/lib/report-utils';
import type { CustomerValuePoint } from '@/types/reports';

export default function TopCustomersCard({ customers }: { customers: CustomerValuePoint[] }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Top Customers</h2>
      <div className="space-y-3">
        {customers.map((customer) => (
          <div
            key={customer.customerId}
            className="flex justify-between gap-4 rounded-xl bg-gray-50 p-3"
          >
            <div>
              <p className="font-medium text-gray-900">{customer.name}</p>
              <p className="text-xs text-gray-400">
                {customer.phone} · {customer.visits} visits · Last {customer.lastVisit}
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatReportCurrency(customer.totalSpent)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
