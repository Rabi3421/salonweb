import { getEnquiryTypeLabel } from '@/lib/enquiry-utils';
import type { EnquiryType } from '@/types/enquiries';

export default function EnquiryTypeBadge({ type }: { type: EnquiryType }) {
  return (
    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      {getEnquiryTypeLabel(type)}
    </span>
  );
}
