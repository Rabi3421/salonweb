import PaymentModeBadge from '@/components/dashboard/billing/PaymentModeBadge';
import PaymentStatusBadge from '@/components/dashboard/billing/PaymentStatusBadge';
import { formatCurrency } from '@/lib/billing-utils';
import type { SalonPayment } from '@/types/billing';

export default function PaymentMobileCards({ payments }: { payments: SalonPayment[] }) {
  return (
    <div className="md:hidden divide-y divide-gray-100">
      {payments.map((payment) => (
        <div key={payment.id} className="px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{payment.paymentNo}</p>
              <p className="text-xs text-gray-500">
                {payment.customerName} · {payment.billNo}
              </p>
            </div>
            <PaymentStatusBadge status={payment.status} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-900">
              {formatCurrency(payment.amount)}
            </span>
            <PaymentModeBadge mode={payment.mode} />
          </div>
        </div>
      ))}
    </div>
  );
}
