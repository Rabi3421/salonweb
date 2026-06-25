import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import StaffStatusBadge from '@/components/dashboard/staff/StaffStatusBadge';
import {
  buildStaffCallLink,
  buildStaffWhatsAppLink,
  formatStaffPhone,
  getStaffRoleLabel,
} from '@/lib/staff-utils';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffTable({
  staff,
  canEdit,
}: {
  staff: SalonStaffMember[];
  canEdit: boolean;
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-4 py-3 font-medium text-gray-500">Staff Member</th>
            <th className="px-4 py-3 font-medium text-gray-500">Role/Designation</th>
            <th className="px-4 py-3 font-medium text-gray-500">Phone</th>
            <th className="px-4 py-3 font-medium text-gray-500">Assigned Services</th>
            <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 font-medium text-gray-500">Today</th>
            <th className="px-4 py-3 font-medium text-gray-500">Rating</th>
            <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {staff.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50/50">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-bold">{member.initials}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">
                <p className="font-medium text-gray-700">{member.designation}</p>
                <p className="text-xs text-gray-400">{getStaffRoleLabel(member.role)}</p>
              </td>
              <td className="px-4 py-3 text-gray-600">{formatStaffPhone(member.phone)}</td>
              <td className="px-4 py-3 text-xs text-gray-500 max-w-[220px]">
                {member.assignedServices.map((service) => service.name).join(', ') || '—'}
              </td>
              <td className="px-4 py-3">
                <StaffStatusBadge status={member.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">{member.appointmentsToday ?? 0}</td>
              <td className="px-4 py-3 text-gray-700">
                {member.rating ? member.rating.toFixed(1) : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/staff/${member.id}`}
                    className="text-xs font-medium text-primary hover:text-primary/80"
                  >
                    View
                  </Link>
                  {canEdit ? <span className="text-xs text-gray-300">Edit</span> : null}
                  <a
                    href={buildStaffCallLink(member.phone)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="PhoneIcon" size={14} />
                  </a>
                  <a
                    href={buildStaffWhatsAppLink(member.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="ChatBubbleLeftRightIcon" size={14} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
