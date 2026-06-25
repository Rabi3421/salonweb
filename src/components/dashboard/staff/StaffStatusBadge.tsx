import StatusBadge from '@/components/dashboard/StatusBadge';
import { getStaffStatusLabel, getStaffStatusVariant } from '@/lib/staff-utils';
import type { StaffStatus } from '@/types/staff';

export default function StaffStatusBadge({ status }: { status: StaffStatus }) {
  return (
    <StatusBadge label={getStaffStatusLabel(status)} variant={getStaffStatusVariant(status)} />
  );
}
