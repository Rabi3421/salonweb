import { apiGet, apiPatch, apiPost } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonRole } from '@/types/auth';
import type {
  AddEnquiryNotePayload,
  ConvertEnquiryPayload,
  EnquiryPriority,
  EnquirySource,
  EnquiryStatus,
  EnquiryType,
  EnquiryListParams,
  EnquiryFollowUpNote,
  SalonEnquiry,
  UpdateEnquiryPayload,
} from '@/types/enquiries';

function buildQuery(params?: object): string {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') qs.set(key, String(value));
    });
  }
  const query = qs.toString();
  return query ? `?${query}` : '';
}

function normalizeStatus(status: unknown): EnquiryStatus {
  const value = String(status ?? 'new');
  if (value === 'in_progress') return 'contacted';
  if (value === 'resolved' || value === 'spam') return 'closed';
  if (['new', 'contacted', 'follow_up', 'converted', 'closed', 'lost'].includes(value)) {
    return value as EnquiryStatus;
  }
  return 'new';
}

function normalizePriority(priority: unknown): EnquiryPriority {
  const value = String(priority ?? 'normal');
  if (value === 'medium') return 'normal';
  if (['low', 'normal', 'high', 'urgent'].includes(value)) return value as EnquiryPriority;
  return 'normal';
}

function normalizeSource(source: unknown): EnquirySource {
  const value = String(source ?? 'website');
  if (value === 'salon_website' || value === 'unknown') return 'website';
  if (
    [
      'website',
      'services_page',
      'contact_page',
      'book_appointment_page',
      'phone',
      'whatsapp',
      'walk_in',
      'referral',
    ].includes(value)
  ) {
    return value as EnquirySource;
  }
  return 'website';
}

function normalizeType(type: unknown): EnquiryType {
  const value = String(type ?? 'contact');
  if (value === 'demo_request' || value === 'platform_lead') return 'contact';
  if (
    ['contact', 'appointment_request', 'support', 'package_interest', 'bridal_enquiry'].includes(
      value
    )
  ) {
    return value as EnquiryType;
  }
  return 'contact';
}

function normalizeFollowUpNotes(enquiry: Record<string, unknown>): EnquiryFollowUpNote[] {
  if (Array.isArray(enquiry.followUpNotes)) {
    return enquiry.followUpNotes as EnquiryFollowUpNote[];
  }

  const internalNotes = Array.isArray(enquiry.internalNotes) ? enquiry.internalNotes : [];
  return internalNotes.map((note, index) => {
    const item = note as Record<string, unknown>;
    return {
      id: `${String(enquiry.id ?? enquiry.enquiryId ?? 'note')}-${index}`,
      note: String(item.note ?? ''),
      createdBy: String(item.addedBy ?? item.addedByEmail ?? 'Team'),
      createdAt: String(item.addedAt ?? enquiry.updatedAt ?? new Date().toISOString()),
    };
  });
}

function normalizeEnquiry(enquiry: SalonEnquiry | null | undefined): SalonEnquiry | null {
  if (!enquiry) return null;
  const raw = enquiry as unknown as Record<string, unknown>;

  return {
    ...enquiry,
    enquiryNo: enquiry.enquiryNo ?? String(raw.enquiryId ?? ''),
    type: normalizeType(raw.type),
    status: normalizeStatus(raw.status),
    priority: normalizePriority(raw.priority),
    source: normalizeSource(raw.source),
    followUpNotes: normalizeFollowUpNotes(raw),
  };
}

const now = new Date();
const iso = (daysOffset: number, hour = 10) => {
  const date = new Date(now);
  date.setDate(now.getDate() + daysOffset);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
};

let MOCK_ENQUIRIES: SalonEnquiry[] = [
  {
    id: 'enq-001',
    enquiryNo: 'ENQ-2026-001',
    type: 'appointment_request',
    status: 'new',
    priority: 'high',
    source: 'services_page',
    name: 'Priya Sharma',
    phone: '+919876500101',
    email: 'priya.sharma@example.com',
    preferredService: 'Keratin Hair Spa',
    preferredDate: '2026-06-26',
    preferredTime: '4:00 PM',
    message: 'Interested in keratin treatment this week. Please confirm available slots.',
    assignedTo: 'Riya Patel',
    followUpNotes: [],
    nextFollowUpAt: iso(0, 16),
    createdAt: iso(0, 9),
    updatedAt: iso(0, 9),
  },
  {
    id: 'enq-002',
    enquiryNo: 'ENQ-2026-002',
    type: 'contact',
    status: 'contacted',
    priority: 'normal',
    source: 'contact_page',
    name: 'Neha Mehta',
    phone: '+919876500102',
    email: 'neha.mehta@example.com',
    message: 'Do you have membership plans for monthly facials and waxing?',
    assignedTo: 'Meera Kapoor',
    followUpNotes: [
      {
        id: 'note-001',
        note: 'Called and explained monthly maintenance package. She asked for package details on WhatsApp.',
        createdBy: 'Meera Kapoor',
        createdAt: iso(-1, 12),
        nextFollowUpAt: iso(1, 11),
        statusAfterNote: 'follow_up',
      },
    ],
    nextFollowUpAt: iso(1, 11),
    createdAt: iso(-1, 10),
    updatedAt: iso(-1, 12),
  },
  {
    id: 'enq-003',
    enquiryNo: 'ENQ-2026-003',
    type: 'appointment_request',
    status: 'follow_up',
    priority: 'urgent',
    source: 'book_appointment_page',
    name: 'Aisha Khan',
    phone: '+919876500103',
    email: 'aisha.k@example.com',
    preferredService: 'Party Makeup',
    preferredDate: '2026-06-25',
    preferredTime: '6:00 PM',
    message: 'Need party makeup tomorrow evening. Please confirm stylist availability.',
    assignedTo: 'Riya Patel',
    followUpNotes: [],
    nextFollowUpAt: iso(0, 13),
    createdAt: iso(-1, 18),
    updatedAt: iso(-1, 18),
  },
  {
    id: 'enq-004',
    enquiryNo: 'ENQ-2026-004',
    type: 'bridal_enquiry',
    status: 'contacted',
    priority: 'urgent',
    source: 'website',
    name: 'Kavya Rao',
    phone: '+919876500104',
    email: 'kavya.rao@example.com',
    preferredService: 'Bridal Makeup Package',
    preferredDate: '2026-08-14',
    preferredTime: '9:00 AM',
    message: 'Looking for bridal makeup, pre-bridal grooming, and family makeup for wedding day.',
    assignedTo: 'Ananya Sharma',
    followUpNotes: [],
    nextFollowUpAt: iso(2, 15),
    createdAt: iso(-2, 16),
    updatedAt: iso(-2, 17),
  },
  {
    id: 'enq-005',
    enquiryNo: 'ENQ-2026-005',
    type: 'package_interest',
    status: 'converted',
    priority: 'high',
    source: 'services_page',
    name: 'Meenal Jain',
    phone: '+919876500105',
    preferredService: 'Hair Spa Package',
    preferredDate: '2026-06-24',
    preferredTime: '3:00 PM',
    message: 'Asked for hair spa package and booked an appointment.',
    assignedTo: 'Riya Patel',
    followUpNotes: [],
    convertedAppointmentId: 'apt-105',
    convertedCustomerId: 'cust-105',
    createdAt: iso(-3, 11),
    updatedAt: iso(-2, 14),
  },
  {
    id: 'enq-006',
    enquiryNo: 'ENQ-2026-006',
    type: 'appointment_request',
    status: 'new',
    priority: 'normal',
    source: 'website',
    name: 'Riya Shah',
    phone: '+919876500106',
    preferredService: 'Nail Art',
    preferredDate: '2026-06-27',
    preferredTime: '5:00 PM',
    message: 'Interested in nail extensions and gel polish.',
    followUpNotes: [],
    createdAt: iso(0, 11),
    updatedAt: iso(0, 11),
  },
  {
    id: 'enq-007',
    enquiryNo: 'ENQ-2026-007',
    type: 'contact',
    status: 'follow_up',
    priority: 'normal',
    source: 'phone',
    name: 'Sonal Gupta',
    phone: '+919876500107',
    message: 'Missed call. Called back once, no answer.',
    assignedTo: 'Front Desk',
    followUpNotes: [],
    nextFollowUpAt: iso(0, 18),
    createdAt: iso(0, 12),
    updatedAt: iso(0, 12),
  },
  {
    id: 'enq-008',
    enquiryNo: 'ENQ-2026-008',
    type: 'support',
    status: 'new',
    priority: 'low',
    source: 'whatsapp',
    name: 'Tanya Malhotra',
    phone: '+919876500108',
    message: 'Asked on WhatsApp whether gift cards are available.',
    followUpNotes: [],
    createdAt: iso(-1, 19),
    updatedAt: iso(-1, 19),
  },
];

export async function getEnquiries(params?: EnquiryListParams): Promise<SalonEnquiry[]> {
  if (isMockModeEnabled()) return getMockEnquiries();
  const res = await apiGet<{ enquiries: SalonEnquiry[] }>(
    `/api/salon/enquiries${buildQuery(params)}`
  );
  return (res.data?.enquiries ?? [])
    .map((enquiry) => normalizeEnquiry(enquiry))
    .filter((enquiry): enquiry is SalonEnquiry => Boolean(enquiry));
}

export async function getEnquiryById(enquiryId: string): Promise<SalonEnquiry | null> {
  if (isMockModeEnabled()) return getMockEnquiryById(enquiryId);
  const res = await apiGet<{ enquiry: SalonEnquiry }>(`/api/salon/enquiries/${enquiryId}`);
  return normalizeEnquiry(res.data?.enquiry);
}

export async function updateEnquiry(
  enquiryId: string,
  payload: UpdateEnquiryPayload
): Promise<SalonEnquiry | null> {
  if (isMockModeEnabled()) return updateMockEnquiry(enquiryId, payload);
  const res = await apiPatch<{ enquiry: SalonEnquiry }>(
    `/api/salon/enquiries/${enquiryId}`,
    payload
  );
  return normalizeEnquiry(res.data?.enquiry);
}

export async function addEnquiryNote(
  enquiryId: string,
  payload: AddEnquiryNotePayload
): Promise<SalonEnquiry | null> {
  if (isMockModeEnabled()) return addMockEnquiryNote(enquiryId, payload);
  const res = await apiPost<{ enquiry: SalonEnquiry }>(
    `/api/salon/enquiries/${enquiryId}/notes`,
    payload
  );
  return normalizeEnquiry(res.data?.enquiry);
}

export async function convertEnquiryToAppointment(
  enquiryId: string,
  payload: ConvertEnquiryPayload
): Promise<SalonEnquiry | null> {
  if (isMockModeEnabled()) return convertMockEnquiry(enquiryId, payload);
  const res = await apiPost<{ enquiry: SalonEnquiry }>(
    `/api/salon/enquiries/${enquiryId}/convert-to-appointment`,
    payload
  );
  return normalizeEnquiry(res.data?.enquiry);
}

export function getMockEnquiries(_role?: SalonRole): SalonEnquiry[] {
  return MOCK_ENQUIRIES;
}

export function getMockEnquiryById(id: string): SalonEnquiry | null {
  return MOCK_ENQUIRIES.find((enquiry) => enquiry.id === id) ?? null;
}

export function updateMockEnquiry(id: string, payload: UpdateEnquiryPayload): SalonEnquiry | null {
  const existing = getMockEnquiryById(id);
  if (!existing) return null;
  const updated: SalonEnquiry = {
    ...existing,
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  MOCK_ENQUIRIES = MOCK_ENQUIRIES.map((enquiry) => (enquiry.id === id ? updated : enquiry));
  return updated;
}

export function addMockEnquiryNote(
  id: string,
  payload: AddEnquiryNotePayload
): SalonEnquiry | null {
  const existing = getMockEnquiryById(id);
  if (!existing) return null;
  const note = {
    id: `note-${Date.now()}`,
    note: payload.note,
    createdBy: 'Demo User',
    createdAt: new Date().toISOString(),
    nextFollowUpAt: payload.nextFollowUpAt,
    statusAfterNote: payload.statusAfterNote,
  };
  const updated: SalonEnquiry = {
    ...existing,
    status: payload.statusAfterNote ?? existing.status,
    nextFollowUpAt: payload.nextFollowUpAt ?? existing.nextFollowUpAt,
    followUpNotes: [note, ...(existing.followUpNotes ?? [])],
    updatedAt: new Date().toISOString(),
  };
  MOCK_ENQUIRIES = MOCK_ENQUIRIES.map((enquiry) => (enquiry.id === id ? updated : enquiry));
  return updated;
}

export function convertMockEnquiry(
  id: string,
  _payload: ConvertEnquiryPayload
): SalonEnquiry | null {
  return updateMockEnquiry(id, {
    status: 'converted',
    nextFollowUpAt: undefined,
  });
}
