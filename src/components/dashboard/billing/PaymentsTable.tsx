import PaymentModeBadge from '@/components/dashboard/billing/PaymentModeBadge';
import PaymentStatusBadge from '@/components/dashboard/billing/PaymentStatusBadge';
import { formatCurrency } from '@/lib/billing-utils';
import type { SalonPayment } from '@/types/billing';

export default function PaymentsTable({ payments }: { payments: SalonPayment[] }) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-4 py-3 font-medium text-gray-500">Payment No</th>
            <th className="px-4 py-3 font-medium text-gray-500">Bill No</th>
            <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
            <th className="px-4 py-3 font-medium text-gray-500">Amount</th>
            <th className="px-4 py-3 font-medium text-gray-500">Mode</th>
            <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 font-medium text-gray-500">Collected By</th>
            <th className="px-4 py-3 font-medium text-gray-500">Paid At</th>
            <th className="px-4 py-3 font-medium text-gray-500">Reference</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr key={payment.id} className="hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">{payment.paymentNo}</td>
              <td className="px-4 py-3 text-gray-600">{payment.billNo}</td>
              <td className="px-4 py-3 text-gray-900">{payment.customerName}</td>
              <td className="px-4 py-3 font-semibold text-gray-900">
                {formatCurrency(payment.amount)}
              </td>
              <td className="px-4 py-3">
                <PaymentModeBadge mode={payment.mode} />
              </td>
              <td className="px-4 py-3">
                <PaymentStatusBadge status={payment.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">{payment.collectedBy ?? '—'}</td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(payment.paidAt).toLocaleString('en-IN')}
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">{payment.referenceNo ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
