import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import BillStatusBadge from '@/components/dashboard/billing/BillStatusBadge';
import {
  buildBillingCallLink,
  buildBillingWhatsAppLink,
  formatCurrency,
} from '@/lib/billing-utils';
import type { SalonBill } from '@/types/billing';

export default function BillsTable({
  bills,
  canRecordPayment,
}: {
  bills: SalonBill[];
  canRecordPayment: boolean;
}) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-4 py-3 font-medium text-gray-500">Bill No</th>
            <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
            <th className="px-4 py-3 font-medium text-gray-500">Date</th>
            <th className="px-4 py-3 font-medium text-gray-500">Items</th>
            <th className="px-4 py-3 font-medium text-gray-500">Grand Total</th>
            <th className="px-4 py-3 font-medium text-gray-500">Paid</th>
            <th className="px-4 py-3 font-medium text-gray-500">Due</th>
            <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {bills.map((bill) => (
            <tr key={bill.id} className="hover:bg-gray-50/50">
              <td className="px-4 py-3 font-medium text-gray-900">{bill.billNo}</td>
              <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{bill.customer.name}</p>
                <p className="text-xs text-gray-400">{bill.customer.phone}</p>
              </td>
              <td className="px-4 py-3 text-gray-600">
                {new Date(bill.createdAt).toLocaleDateString('en-IN')}
              </td>
              <td className="px-4 py-3 text-xs text-gray-500">{bill.items.length} items</td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {formatCurrency(bill.grandTotal)}
              </td>
              <td className="px-4 py-3 text-green-600">{formatCurrency(bill.paidAmount)}</td>
              <td className="px-4 py-3 text-amber-600">{formatCurrency(bill.dueAmount)}</td>
              <td className="px-4 py-3">
                <BillStatusBadge status={bill.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/billing/${bill.id}`}
                    className="text-xs font-medium text-primary hover:text-primary/80"
                  >
                    View
                  </Link>
                  {canRecordPayment && bill.dueAmount > 0 ? (
                    <Link
                      href={`/dashboard/billing/${bill.id}`}
                      className="text-xs font-medium text-green-600"
                    >
                      Pay
                    </Link>
                  ) : null}
                  <a
                    href={buildBillingCallLink(bill.customer.phone)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="PhoneIcon" size={14} />
                  </a>
                  <a
                    href={buildBillingWhatsAppLink(bill.customer.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="ChatBubbleLeftRightIcon" size={14} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
