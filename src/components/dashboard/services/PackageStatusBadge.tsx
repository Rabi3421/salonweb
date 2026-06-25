import { PACKAGE_STATUS_LABELS, PACKAGE_STATUS_STYLES } from '@/lib/service-utils';
import type { PackageStatus } from '@/types/services';

export default function PackageStatusBadge({ status }: { status: PackageStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${PACKAGE_STATUS_STYLES[status]}`}
    >
      {PACKAGE_STATUS_LABELS[status]}
    </span>
  );
}
