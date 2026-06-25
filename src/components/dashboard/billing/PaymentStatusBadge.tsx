import StatusBadge from '@/components/dashboard/StatusBadge';
import { getPaymentStatusLabel, getPaymentStatusVariant } from '@/lib/billing-utils';
import type { PaymentStatus } from '@/types/billing';

export default function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <StatusBadge label={getPaymentStatusLabel(status)} variant={getPaymentStatusVariant(status)} />
  );
}
