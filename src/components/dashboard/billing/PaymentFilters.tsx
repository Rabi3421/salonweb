import type { PaymentMode, PaymentStatus } from '@/types/billing';

interface PaymentFiltersProps {
  search: string;
  mode: string;
  status: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onModeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClear: () => void;
}

const modes: { value: PaymentMode; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'wallet', label: 'Wallet' },
  { value: 'other', label: 'Other' },
];

const statuses: { value: PaymentStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
];

export default function PaymentFilters({
  search,
  mode,
  status,
  dateFrom,
  dateTo,
  onSearchChange,
  onModeChange,
  onStatusChange,
  onDateFromChange,
  onDateToChange,
  onClear,
}: PaymentFiltersProps) {
  const inputClass =
    'px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search payment, bill, customer..."
          className={`${inputClass} md:col-span-2`}
        />
        <select
          value={mode}
          onChange={(event) => onModeChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All modes</option>
          {modes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
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
