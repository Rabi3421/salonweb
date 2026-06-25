import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import EnquiryPriorityBadge from '@/components/dashboard/enquiries/EnquiryPriorityBadge';
import EnquiryStatusBadge from '@/components/dashboard/enquiries/EnquiryStatusBadge';
import EnquiryTypeBadge from '@/components/dashboard/enquiries/EnquiryTypeBadge';
import {
  buildEnquiryCallLink,
  buildEnquiryWhatsAppLink,
  formatEnquiryDate,
  getEnquirySourceLabel,
} from '@/lib/enquiry-utils';
import type { SalonEnquiry } from '@/types/enquiries';

export default function EnquiryMobileCards({ enquiries }: { enquiries: SalonEnquiry[] }) {
  return (
    <div className="divide-y divide-gray-100 md:hidden">
      {enquiries.map((enquiry) => (
        <div key={enquiry.id} className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-gray-900">{enquiry.name}</p>
              <p className="text-xs text-gray-400">{enquiry.phone}</p>
            </div>
            <EnquiryStatusBadge status={enquiry.status} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <EnquiryTypeBadge type={enquiry.type} />
            <EnquiryPriorityBadge priority={enquiry.priority} />
            <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
              {getEnquirySourceLabel(enquiry.source)}
            </span>
          </div>
          <p className="mt-3 line-clamp-2 text-sm text-gray-600">{enquiry.message}</p>
          <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-gray-500">
            <div>
              <span className="block text-gray-400">Created</span>
              {formatEnquiryDate(enquiry.createdAt)}
            </div>
            <div>
              <span className="block text-gray-400">Follow-Up</span>
              {enquiry.nextFollowUpAt ? formatEnquiryDate(enquiry.nextFollowUpAt) : '-'}
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Link
              href={`/dashboard/enquiries/${enquiry.id}`}
              className="rounded-xl bg-primary px-3 py-2 text-xs font-medium text-white"
            >
              View
            </Link>
            <a
              href={buildEnquiryCallLink(enquiry.phone)}
              className="rounded-xl border border-gray-200 px-3 py-2 text-gray-500"
              aria-label={`Call ${enquiry.name}`}
            >
              <Icon name="PhoneIcon" size={14} />
            </a>
            <a
              href={buildEnquiryWhatsAppLink(enquiry.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-gray-200 px-3 py-2 text-gray-500"
              aria-label={`WhatsApp ${enquiry.name}`}
            >
              <Icon name="ChatBubbleLeftRightIcon" size={14} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
