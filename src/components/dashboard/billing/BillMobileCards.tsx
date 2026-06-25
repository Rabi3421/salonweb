import Link from 'next/link';
import BillStatusBadge from '@/components/dashboard/billing/BillStatusBadge';
import { formatCurrency } from '@/lib/billing-utils';
import type { SalonBill } from '@/types/billing';

export default function BillMobileCards({ bills }: { bills: SalonBill[] }) {
  return (
    <div className="md:hidden divide-y divide-gray-100">
      {bills.map((bill) => (
        <Link key={bill.id} href={`/dashboard/billing/${bill.id}`} className="block px-4 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{bill.billNo}</p>
              <p className="text-xs text-gray-500">{bill.customer.name}</p>
            </div>
            <BillStatusBadge status={bill.status} />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
            <span className="text-gray-500">Total {formatCurrency(bill.grandTotal)}</span>
            <span className="text-green-600">Paid {formatCurrency(bill.paidAmount)}</span>
            <span className="text-amber-600">Due {formatCurrency(bill.dueAmount)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
