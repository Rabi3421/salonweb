import StatusBadge from '@/components/dashboard/StatusBadge';
import { getBillStatusLabel, getBillStatusVariant } from '@/lib/billing-utils';
import type { BillStatus } from '@/types/billing';

export default function BillStatusBadge({ status }: { status: BillStatus }) {
  return <StatusBadge label={getBillStatusLabel(status)} variant={getBillStatusVariant(status)} />;
}
