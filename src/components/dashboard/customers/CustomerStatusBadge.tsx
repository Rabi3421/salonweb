import { CUSTOMER_STATUS_LABELS, CUSTOMER_STATUS_STYLES } from '@/lib/customer-utils';
import type { CustomerStatus } from '@/types/customers';

export default function CustomerStatusBadge({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${CUSTOMER_STATUS_STYLES[status]}`}
    >
      {CUSTOMER_STATUS_LABELS[status]}
    </span>
  );
}
