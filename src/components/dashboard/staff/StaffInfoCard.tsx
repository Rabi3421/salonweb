import { formatStaffPhone, getEmploymentTypeLabel, getStaffRoleLabel } from '@/lib/staff-utils';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffInfoCard({ staff }: { staff: SalonStaffMember }) {
  const rows = [
    ['Email', staff.email],
    ['Phone', formatStaffPhone(staff.phone)],
    ['Role', getStaffRoleLabel(staff.role)],
    ['Designation', staff.designation],
    ['Employment', getEmploymentTypeLabel(staff.employmentType)],
    ['Experience', staff.experience],
    ['Joining Date', staff.joiningDate ?? '—'],
    ['Address', staff.address ?? '—'],
  ];

  return (
    <Card title="Profile">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rows.map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}
