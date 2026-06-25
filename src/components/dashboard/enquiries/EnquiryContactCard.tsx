import { formatEnquiryDate, getEnquirySourceLabel } from '@/lib/enquiry-utils';
import type { SalonEnquiry } from '@/types/enquiries';

export default function EnquiryContactCard({ enquiry }: { enquiry: SalonEnquiry }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Lead Contact</h2>
      <div className="space-y-3 text-sm">
        <Row label="Name" value={enquiry.name} />
        <Row label="Phone" value={enquiry.phone} />
        <Row label="Email" value={enquiry.email ?? '-'} />
        <Row label="Source" value={getEnquirySourceLabel(enquiry.source)} />
        <Row label="Created" value={formatEnquiryDate(enquiry.createdAt)} />
        <Row label="Assigned To" value={enquiry.assignedTo ?? '-'} />
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-medium text-gray-900">{value}</span>
    </div>
  );
}
