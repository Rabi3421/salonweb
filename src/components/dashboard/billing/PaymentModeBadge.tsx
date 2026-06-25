import { getPaymentModeLabel } from '@/lib/billing-utils';
import type { PaymentMode } from '@/types/billing';

export default function PaymentModeBadge({ mode }: { mode: PaymentMode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
      {getPaymentModeLabel(mode)}
    </span>
  );
}
