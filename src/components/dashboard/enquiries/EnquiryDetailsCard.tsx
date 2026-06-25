import { getEnquirySourceLabel, getEnquiryTypeLabel } from '@/lib/enquiry-utils';
import type { SalonEnquiry } from '@/types/enquiries';

export default function EnquiryDetailsCard({ enquiry }: { enquiry: SalonEnquiry }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Request Details</h2>
      <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
        <Info label="Type" value={getEnquiryTypeLabel(enquiry.type)} />
        <Info label="Source Page" value={getEnquirySourceLabel(enquiry.source)} />
        <Info label="Preferred Service" value={enquiry.preferredService ?? '-'} />
        <Info
          label="Preferred Date/Time"
          value={[enquiry.preferredDate, enquiry.preferredTime].filter(Boolean).join(' · ') || '-'}
        />
      </div>
      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <p className="mb-1 text-xs font-medium uppercase text-gray-400">Message</p>
        <p className="whitespace-pre-line text-sm text-gray-700">{enquiry.message}</p>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}
