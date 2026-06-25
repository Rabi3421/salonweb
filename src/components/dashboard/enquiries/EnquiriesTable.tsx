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

export default function EnquiriesTable({ enquiries }: { enquiries: SalonEnquiry[] }) {
  return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/50">
            <th className="px-4 py-3 font-medium text-gray-500">Lead</th>
            <th className="px-4 py-3 font-medium text-gray-500">Type</th>
            <th className="px-4 py-3 font-medium text-gray-500">Source</th>
            <th className="px-4 py-3 font-medium text-gray-500">Priority</th>
            <th className="px-4 py-3 font-medium text-gray-500">Status</th>
            <th className="px-4 py-3 font-medium text-gray-500">Preference</th>
            <th className="px-4 py-3 font-medium text-gray-500">Created</th>
            <th className="px-4 py-3 font-medium text-gray-500">Follow-Up</th>
            <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id} className="hover:bg-gray-50/50">
              <td className="px-4 py-3">
                <p className="font-medium text-gray-900">{enquiry.name}</p>
                <p className="text-xs text-gray-400">{enquiry.phone}</p>
              </td>
              <td className="px-4 py-3">
                <EnquiryTypeBadge type={enquiry.type} />
              </td>
              <td className="px-4 py-3 text-gray-600">{getEnquirySourceLabel(enquiry.source)}</td>
              <td className="px-4 py-3">
                <EnquiryPriorityBadge priority={enquiry.priority} />
              </td>
              <td className="px-4 py-3">
                <EnquiryStatusBadge status={enquiry.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">
                <p>{enquiry.preferredService ?? '-'}</p>
                {enquiry.preferredDate || enquiry.preferredTime ? (
                  <p className="text-xs text-gray-400">
                    {[enquiry.preferredDate, enquiry.preferredTime].filter(Boolean).join(' · ')}
                  </p>
                ) : null}
              </td>
              <td className="px-4 py-3 text-gray-500">{formatEnquiryDate(enquiry.createdAt)}</td>
              <td className="px-4 py-3 text-gray-500">
                {enquiry.nextFollowUpAt ? formatEnquiryDate(enquiry.nextFollowUpAt) : '-'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/enquiries/${enquiry.id}`}
                    className="text-xs font-medium text-primary hover:text-primary/80"
                  >
                    View
                  </Link>
                  <a
                    href={buildEnquiryCallLink(enquiry.phone)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label={`Call ${enquiry.name}`}
                  >
                    <Icon name="PhoneIcon" size={14} />
                  </a>
                  <a
                    href={buildEnquiryWhatsAppLink(enquiry.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600"
                    aria-label={`WhatsApp ${enquiry.name}`}
                  >
                    <Icon name="ChatBubbleLeftRightIcon" size={14} />
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
