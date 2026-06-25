import type { SalonStaffMember } from '@/types/staff';

export default function StaffSummaryCards({ staff }: { staff: SalonStaffMember[] }) {
  const availableToday = staff.filter(
    (member) => member.status === 'active' && member.appointmentsToday !== undefined
  ).length;
  const specialists = staff.filter(
    (member) => member.role === 'stylist' || member.specialties.length > 0
  ).length;
  const cards = [
    { label: 'Total Staff', value: staff.length, className: 'text-gray-900' },
    {
      label: 'Active Staff',
      value: staff.filter((member) => member.status === 'active').length,
      className: 'text-green-600',
    },
    { label: 'Available Today', value: availableToday, className: 'text-primary' },
    {
      label: 'On Leave',
      value: staff.filter((member) => member.status === 'on_leave').length,
      className: 'text-amber-600',
    },
    { label: 'Stylists/Specialists', value: specialists, className: 'text-gray-900' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className={`text-2xl font-bold mt-1 ${card.className}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
