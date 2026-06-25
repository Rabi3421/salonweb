import { getEnquiryStatusLabel, getEnquiryStatusVariant } from '@/lib/enquiry-utils';
import type { EnquiryStatus } from '@/types/enquiries';

export default function EnquiryStatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getEnquiryStatusVariant(status)}`}
    >
      {getEnquiryStatusLabel(status)}
    </span>
  );
}
