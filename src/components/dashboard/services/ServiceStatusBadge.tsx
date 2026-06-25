import { SERVICE_STATUS_LABELS, SERVICE_STATUS_STYLES } from '@/lib/service-utils';
import type { ServiceStatus } from '@/types/services';

export default function ServiceStatusBadge({ status }: { status: ServiceStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${SERVICE_STATUS_STYLES[status]}`}
    >
      {SERVICE_STATUS_LABELS[status]}
    </span>
  );
}
