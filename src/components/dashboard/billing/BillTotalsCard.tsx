import { formatCurrency } from '@/lib/billing-utils';

export default function BillTotalsCard({
  subtotal,
  discountTotal,
  taxTotal,
  grandTotal,
  paidAmount = 0,
}: {
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  paidAmount?: number;
}) {
  const dueAmount = Math.max(0, grandTotal - paidAmount);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">Totals</h2>
      <div className="space-y-2 text-sm">
        <Row label="Subtotal" value={formatCurrency(subtotal)} />
        <Row label="Discount" value={`-${formatCurrency(discountTotal)}`} />
        <Row label="Tax" value={formatCurrency(taxTotal)} />
        <div className="border-t border-gray-100 pt-2">
          <Row label="Grand Total" value={formatCurrency(grandTotal)} strong />
          <Row label="Paid" value={formatCurrency(paidAmount)} />
          <Row label="Due" value={formatCurrency(dueAmount)} strong className="text-amber-600" />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  className = 'text-gray-900',
}: {
  label: string;
  value: string;
  strong?: boolean;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={`${strong ? 'font-bold' : 'font-medium'} ${className}`}>{value}</span>
    </div>
  );
}
