import type { SalonRole } from '@/types/auth';
import type {
  EnquiryListParams,
  EnquiryPriority,
  EnquirySource,
  EnquiryStatus,
  EnquiryType,
  SalonEnquiry,
} from '@/types/enquiries';

export function getEnquiryStatusLabel(status: EnquiryStatus): string {
  const labels: Record<EnquiryStatus, string> = {
    new: 'New',
    contacted: 'Contacted',
    follow_up: 'Follow-Up',
    converted: 'Converted',
    closed: 'Closed',
    lost: 'Lost',
  };
  return labels[status];
}

export function getEnquiryStatusVariant(status: EnquiryStatus): string {
  const variants: Record<EnquiryStatus, string> = {
    new: 'bg-primary/10 text-primary border-primary/20',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200',
    follow_up: 'bg-amber-50 text-amber-700 border-amber-200',
    converted: 'bg-green-50 text-green-700 border-green-200',
    closed: 'bg-gray-50 text-gray-600 border-gray-200',
    lost: 'bg-red-50 text-red-700 border-red-200',
  };
  return variants[status];
}

export function getEnquiryTypeLabel(type: EnquiryType): string {
  const labels: Record<EnquiryType, string> = {
    contact: 'Contact',
    appointment_request: 'Appointment Request',
    support: 'Support',
    package_interest: 'Package Interest',
    bridal_enquiry: 'Bridal Enquiry',
  };
  return labels[type];
}

export function getEnquiryPriorityLabel(priority: EnquiryPriority): string {
  const labels: Record<EnquiryPriority, string> = {
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    urgent: 'Urgent',
  };
  return labels[priority];
}

export function getEnquiryPriorityVariant(priority: EnquiryPriority): string {
  const variants: Record<EnquiryPriority, string> = {
    low: 'bg-gray-50 text-gray-600 border-gray-200',
    normal: 'bg-blue-50 text-blue-700 border-blue-200',
    high: 'bg-amber-50 text-amber-700 border-amber-200',
    urgent: 'bg-red-50 text-red-700 border-red-200',
  };
  return variants[priority];
}

export function getEnquirySourceLabel(source: EnquirySource): string {
  const labels: Record<EnquirySource, string> = {
    website: 'Website',
    services_page: 'Services Page',
    contact_page: 'Contact Page',
    book_appointment_page: 'Book Appointment',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    walk_in: 'Walk-In',
    referral: 'Referral',
  };
  return labels[source];
}

export function getNextEnquiryStatuses(status: EnquiryStatus): EnquiryStatus[] {
  const transitions: Record<EnquiryStatus, EnquiryStatus[]> = {
    new: ['contacted', 'follow_up', 'closed'],
    contacted: ['follow_up', 'converted', 'lost', 'closed'],
    follow_up: ['contacted', 'converted', 'lost', 'closed'],
    converted: [],
    closed: ['follow_up'],
    lost: ['follow_up'],
  };
  return transitions[status];
}

export function formatEnquiryDate(date?: string): string {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function filterEnquiries(
  enquiries: SalonEnquiry[],
  filters: EnquiryListParams
): SalonEnquiry[] {
  return enquiries.filter((enquiry) => {
    const search = filters.search?.toLowerCase().trim();
    const matchesSearch =
      !search ||
      [
        enquiry.enquiryNo,
        enquiry.name,
        enquiry.phone,
        enquiry.email,
        enquiry.message,
        enquiry.preferredService,
      ]
        .filter(Boolean)
        .some((value) => value?.toLowerCase().includes(search));
    const createdAt = new Date(enquiry.createdAt).getTime();
    const matchesFrom = !filters.dateFrom || createdAt >= new Date(filters.dateFrom).getTime();
    const matchesTo =
      !filters.dateTo || createdAt <= new Date(`${filters.dateTo}T23:59:59`).getTime();

    return (
      matchesSearch &&
      (!filters.type || enquiry.type === filters.type) &&
      (!filters.status || enquiry.status === filters.status) &&
      (!filters.priority || enquiry.priority === filters.priority) &&
      (!filters.source || enquiry.source === filters.source) &&
      matchesFrom &&
      matchesTo
    );
  });
}

export function canViewEnquiries(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist'].includes(role);
}

export function canUpdateEnquiry(role: SalonRole): boolean {
  return canViewEnquiries(role);
}

export function canConvertEnquiry(role: SalonRole): boolean {
  return canViewEnquiries(role);
}

export function buildEnquiryCallLink(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`;
}

export function buildEnquiryWhatsAppLink(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  return `https://wa.me/${digits}`;
}
