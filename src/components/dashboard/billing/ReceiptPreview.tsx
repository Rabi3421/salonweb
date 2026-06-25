'use client';

import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import { formatCurrency } from '@/lib/billing-utils';
import type { SalonBill } from '@/types/billing';

export default function ReceiptPreview({ bill }: { bill: SalonBill }) {
  const { brand } = usePublicSiteData();

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-900">Receipt Preview</h2>
        <button
          type="button"
          onClick={() => window.print()}
          className="text-xs font-medium text-primary"
        >
          Print
        </button>
      </div>
      <div className="rounded-xl border border-dashed border-gray-300 p-4 text-sm">
        <p className="font-bold text-gray-900">{brand.fullName}</p>
        <p className="text-xs text-gray-500">{bill.billNo}</p>
        <div className="my-3 border-t border-gray-100" />
        <p className="text-gray-700">Customer: {bill.customer.name}</p>
        <div className="mt-3 space-y-1">
          {bill.items.map((item) => (
            <div key={item.id} className="flex justify-between gap-3 text-xs">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>{formatCurrency(item.total)}</span>
            </div>
          ))}
        </div>
        <div className="my-3 border-t border-gray-100" />
        <div className="space-y-1 text-xs">
          <Row label="Total" value={formatCurrency(bill.grandTotal)} />
          <Row label="Paid" value={formatCurrency(bill.paidAmount)} />
          <Row label="Due" value={formatCurrency(bill.dueAmount)} />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}
