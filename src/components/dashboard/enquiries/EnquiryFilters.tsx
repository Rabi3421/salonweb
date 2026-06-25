import type { EnquiryPriority, EnquirySource, EnquiryStatus, EnquiryType } from '@/types/enquiries';

interface EnquiryFiltersProps {
  search: string;
  type: string;
  status: string;
  priority: string;
  source: string;
  dateFrom: string;
  dateTo: string;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onClear: () => void;
}

const types: { value: EnquiryType; label: string }[] = [
  { value: 'contact', label: 'Contact' },
  { value: 'appointment_request', label: 'Appointment' },
  { value: 'support', label: 'Support' },
  { value: 'package_interest', label: 'Package' },
  { value: 'bridal_enquiry', label: 'Bridal' },
];

const statuses: { value: EnquiryStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'follow_up', label: 'Follow-Up' },
  { value: 'converted', label: 'Converted' },
  { value: 'closed', label: 'Closed' },
  { value: 'lost', label: 'Lost' },
];

const priorities: { value: EnquiryPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const sources: { value: EnquirySource; label: string }[] = [
  { value: 'website', label: 'Website' },
  { value: 'services_page', label: 'Services' },
  { value: 'contact_page', label: 'Contact' },
  { value: 'book_appointment_page', label: 'Book Appt.' },
  { value: 'phone', label: 'Phone' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'walk_in', label: 'Walk-In' },
  { value: 'referral', label: 'Referral' },
];

export default function EnquiryFilters({
  search,
  type,
  status,
  priority,
  source,
  dateFrom,
  dateTo,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onPriorityChange,
  onSourceChange,
  onDateFromChange,
  onDateToChange,
  onClear,
}: EnquiryFiltersProps) {
  const inputClass =
    'px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-8">
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, phone, email, message..."
          className={`${inputClass} placeholder:text-gray-400 md:col-span-2`}
        />
        <select
          value={type}
          onChange={(event) => onTypeChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All types</option>
          {types.map((item) => (
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
        <select
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All priorities</option>
          {priorities.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          value={source}
          onChange={(event) => onSourceChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All sources</option>
          {sources.map((item) => (
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
            className="rounded-xl border border-gray-200 px-3 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
