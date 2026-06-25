import { getEnquiryPriorityLabel, getEnquiryPriorityVariant } from '@/lib/enquiry-utils';
import type { EnquiryPriority } from '@/types/enquiries';

export default function EnquiryPriorityBadge({ priority }: { priority: EnquiryPriority }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getEnquiryPriorityVariant(priority)}`}
    >
      {getEnquiryPriorityLabel(priority)}
    </span>
  );
}
