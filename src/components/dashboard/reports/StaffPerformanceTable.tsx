import { formatReportCurrency } from '@/lib/report-utils';
import type { StaffPerformancePoint } from '@/types/reports';

export default function StaffPerformanceTable({ staff }: { staff: StaffPerformancePoint[] }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 p-5">
        <h2 className="text-sm font-semibold text-gray-900">Staff Performance</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {[
                'Staff',
                'Role',
                'Appointments',
                'Completed',
                'Revenue',
                'Rating',
                'Repeat Clients',
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-medium text-gray-500">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {staff.map((item) => (
              <tr key={item.staffId} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-medium text-gray-900">{item.staffName}</td>
                <td className="px-4 py-3 text-gray-600">{item.role}</td>
                <td className="px-4 py-3 text-gray-600">{item.appointments}</td>
                <td className="px-4 py-3 text-gray-600">{item.completedServices}</td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {formatReportCurrency(item.revenue)}
                </td>
                <td className="px-4 py-3 text-gray-600">{item.rating ?? '-'}</td>
                <td className="px-4 py-3 text-gray-600">{item.repeatClients ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
