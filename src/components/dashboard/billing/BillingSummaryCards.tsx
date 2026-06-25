import { formatCurrency } from '@/lib/billing-utils';
import type { SalonBill } from '@/types/billing';

export default function BillingSummaryCards({ bills }: { bills: SalonBill[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const paidToday = bills
    .filter((bill) => bill.status === 'paid' && bill.createdAt.slice(0, 10) === today)
    .reduce((sum, bill) => sum + bill.paidAmount, 0);
  const pendingDues = bills.reduce((sum, bill) => sum + bill.dueAmount, 0);
  const cards = [
    { label: 'Total Bills', value: bills.length, className: 'text-gray-900' },
    { label: 'Paid Today', value: formatCurrency(paidToday), className: 'text-green-600' },
    { label: 'Pending Dues', value: formatCurrency(pendingDues), className: 'text-amber-600' },
    {
      label: 'Partially Paid',
      value: bills.filter((bill) => bill.status === 'partially_paid').length,
      className: 'text-primary',
    },
    {
      label: 'Cancelled',
      value: bills.filter((bill) => bill.status === 'cancelled').length,
      className: 'text-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">{card.label}</p>
          <p className={`text-xl font-bold mt-1 ${card.className}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
