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

export default function StaffMobileCards({ staff }: { staff: SalonStaffMember[] }) {
  return (
    <div className="md:hidden divide-y divide-gray-100">
      {staff.map((member) => (
        <div key={member.id} className="px-4 py-4">
          <Link href={`/dashboard/staff/${member.id}`} className="block">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary text-xs font-bold">{member.initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.designation}</p>
                  </div>
                  <StaffStatusBadge status={member.status} />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {getStaffRoleLabel(member.role)} · {formatStaffPhone(member.phone)}
                </p>
                <p className="text-xs text-gray-500 mt-2 line-clamp-1">
                  {member.assignedServices.map((service) => service.name).join(', ') ||
                    'No services assigned'}
                </p>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-3 mt-3 ml-13">
            <a
              href={buildStaffCallLink(member.phone)}
              className="text-xs font-medium text-gray-500 flex items-center gap-1"
            >
              <Icon name="PhoneIcon" size={13} />
              Call
            </a>
            <a
              href={buildStaffWhatsAppLink(member.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-gray-500 flex items-center gap-1"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={13} />
              WhatsApp
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
