import type { BillStatus, PaymentMode } from '@/types/billing';

interface BillFiltersProps {
  search: string;
  status: string;
  paymentMode: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPaymentModeChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClear: () => void;
}

const statuses: { value: BillStatus; label: string }[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'partially_paid', label: 'Partially Paid' },
  { value: 'paid', label: 'Paid' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

const modes: { value: PaymentMode; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'other', label: 'Other' },
];

export default function BillFilters({
  search,
  status,
  paymentMode,
  dateFrom,
  dateTo,
  onSearchChange,
  onStatusChange,
  onPaymentModeChange,
  onDateFromChange,
  onDateToChange,
  onClear,
}: BillFiltersProps) {
  const inputClass =
    'px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search bill, customer, phone..."
          className={`${inputClass} md:col-span-2 placeholder:text-gray-400`}
        />
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All statuses</option>
          {statuses.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          value={paymentMode}
          onChange={(event) => onPaymentModeChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All modes</option>
          {modes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(event) => onDateFromChange(event.target.value)}
          className={inputClass}
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={dateTo}
            onChange={(event) => onDateToChange(event.target.value)}
            className={`${inputClass} min-w-0`}
          />
          <button
            type="button"
            onClick={onClear}
            className="px-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
