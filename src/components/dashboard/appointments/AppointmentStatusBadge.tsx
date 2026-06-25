import { STATUS_LABELS, STATUS_STYLES } from '@/lib/appointment-utils';
import type { AppointmentStatus } from '@/types/appointments';

export default function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
