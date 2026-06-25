import { Card } from '@/components/dashboard/staff/StaffInfoCard';
import { formatStaffCurrency } from '@/lib/staff-utils';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffPerformanceCard({
  staff,
  showRevenue,
}: {
  staff: SalonStaffMember;
  showRevenue: boolean;
}) {
  const items = [
    { label: 'Today Appointments', value: staff.appointmentsToday ?? 0 },
    { label: 'Completed This Month', value: staff.completedServicesThisMonth ?? 0 },
    { label: 'Rating', value: staff.rating ? staff.rating.toFixed(1) : '—' },
    ...(showRevenue
      ? [{ label: 'Revenue This Month', value: formatStaffCurrency(staff.revenueThisMonth) }]
      : []),
  ];

  return (
    <Card title="Performance Snapshot">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.label} className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-lg font-bold text-gray-900 mt-1">{item.value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
