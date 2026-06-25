import type { SalonEnquiry } from '@/types/enquiries';

export default function EnquirySummaryCards({ enquiries }: { enquiries: SalonEnquiry[] }) {
  const now = Date.now();
  const summary = [
    ['New Leads', enquiries.filter((item) => item.status === 'new').length, 'text-primary'],
    [
      'Appointment Requests',
      enquiries.filter((item) => item.type === 'appointment_request').length,
      'text-blue-600',
    ],
    [
      'Follow-Ups Due',
      enquiries.filter(
        (item) => item.nextFollowUpAt && new Date(item.nextFollowUpAt).getTime() <= now
      ).length,
      'text-amber-600',
    ],
    ['Converted', enquiries.filter((item) => item.status === 'converted').length, 'text-green-600'],
    [
      'High Priority',
      enquiries.filter((item) => ['high', 'urgent'].includes(item.priority)).length,
      'text-red-600',
    ],
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {summary.map(([label, value, className]) => (
        <div key={label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-gray-500">{label}</p>
          <p className={`mt-1 text-xl font-bold ${className}`}>{value}</p>
        </div>
      ))}
    </div>
  );
}
