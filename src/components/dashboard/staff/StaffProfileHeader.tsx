import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import StaffStatusBadge from '@/components/dashboard/staff/StaffStatusBadge';
import { buildStaffCallLink, buildStaffWhatsAppLink, getStaffRoleLabel } from '@/lib/staff-utils';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffProfileHeader({
  staff,
  canEdit,
}: {
  staff: SalonStaffMember;
  canEdit: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg font-bold">{staff.initials}</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{staff.name}</h1>
              <StaffStatusBadge status={staff.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {staff.staffNo ?? staff.id} · {staff.designation} · {getStaffRoleLabel(staff.role)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={buildStaffCallLink(staff.phone)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Icon name="PhoneIcon" size={15} />
            Call
          </a>
          <a
            href={buildStaffWhatsAppLink(staff.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={15} />
            WhatsApp
          </a>
          {canEdit ? (
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-sm font-medium text-primary"
            >
              <Icon name="PencilSquareIcon" size={15} className="text-primary" />
              Edit
            </button>
          ) : null}
          <Link
            href="/dashboard/staff"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            <Icon name="ArrowLeftIcon" size={15} />
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
