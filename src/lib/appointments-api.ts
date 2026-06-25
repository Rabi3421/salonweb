import { apiGet, apiPost, apiPatch } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonRole } from '@/types/auth';
import type {
  SalonAppointment,
  AppointmentListParams,
  CreateAppointmentPayload,
  UpdateAppointmentStatusPayload,
} from '@/types/appointments';

// ── Real API calls ──

export async function getAppointments(params?: AppointmentListParams): Promise<SalonAppointment[]> {
  if (isMockModeEnabled()) return getMockAppointments();
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v));
    });
  }
  const q = qs.toString();
  const res = await apiGet<{ appointments: SalonAppointment[] }>(
    `/api/salon/appointments${q ? `?${q}` : ''}`
  );
  return res.data?.appointments ?? [];
}

export async function getAppointmentById(id: string): Promise<SalonAppointment | null> {
  if (isMockModeEnabled()) return getMockAppointmentById(id);
  const res = await apiGet<{ appointment: SalonAppointment }>(`/api/salon/appointments/${id}`);
  return res.data?.appointment ?? null;
}

export async function createAppointment(
  payload: CreateAppointmentPayload
): Promise<SalonAppointment | null> {
  if (isMockModeEnabled()) return null;
  const res = await apiPost<{ appointment: SalonAppointment }>(
    '/api/salon/appointments',
    payload
  );
  return res.data?.appointment ?? null;
}

export async function updateAppointmentStatus(
  id: string,
  payload: UpdateAppointmentStatusPayload
): Promise<void> {
  if (isMockModeEnabled()) return;
  await apiPatch(`/api/salon/appointments/${id}/status`, payload);
}

// ── Mock data ──

const today = new Date().toISOString().split('T')[0];

const MOCK_APPOINTMENTS: SalonAppointment[] = [
  {
    id: 'apt-001',
    appointmentNo: 'APT-001',
    customer: { id: 'c1', name: 'Priya Sharma', phone: '9876543210', email: 'priya@email.com' },
    services: [{ id: 's1', name: 'Hair Styling', price: 1500, duration: 60, category: 'Hair' }],
    stylist: { id: 'st1', name: 'Ananya Sharma', role: 'Senior Stylist' },
    date: today,
    startTime: '10:00 AM',
    status: 'confirmed',
    source: 'website',
    notes: 'Prefers minimal heat styling',
    totalAmount: 1500,
    createdAt: today,
  },
  {
    id: 'apt-002',
    appointmentNo: 'APT-002',
    customer: { id: 'c2', name: 'Neha Patel', phone: '9876543211' },
    services: [{ id: 's2', name: 'Facial Treatment', price: 2000, duration: 45, category: 'Skin' }],
    stylist: { id: 'st4', name: 'Sana Khan', role: 'Skin Expert' },
    date: today,
    startTime: '11:30 AM',
    status: 'checked_in',
    source: 'phone',
    totalAmount: 2000,
    createdAt: today,
  },
  {
    id: 'apt-003',
    appointmentNo: 'APT-003',
    customer: { id: 'c3', name: 'Aisha Khan', phone: '9876543212' },
    services: [
      { id: 's3', name: 'Bridal Makeup', price: 12000, duration: 180, category: 'Bridal' },
      { id: 's4', name: 'Hair Styling', price: 2000, duration: 60, category: 'Hair' },
    ],
    stylist: { id: 'st2', name: 'Meera Kapoor', role: 'Bridal Specialist' },
    date: today,
    startTime: '01:00 PM',
    status: 'requested',
    source: 'website',
    notes: 'Bridal trial requested first',
    totalAmount: 14000,
    createdAt: today,
  },
  {
    id: 'apt-004',
    appointmentNo: 'APT-004',
    customer: { id: 'c4', name: 'Kavita Mehta', phone: '9876543213' },
    services: [{ id: 's5', name: 'Nail Art', price: 1200, duration: 60, category: 'Nails' }],
    stylist: { id: 'st3', name: 'Riya Patel', role: 'Nail Artist' },
    date: today,
    startTime: '02:30 PM',
    status: 'confirmed',
    source: 'dashboard',
    totalAmount: 1200,
    createdAt: today,
  },
  {
    id: 'apt-005',
    appointmentNo: 'APT-005',
    customer: { id: 'c5', name: 'Riya Shah', phone: '9876543214' },
    services: [{ id: 's6', name: 'Hair Spa', price: 2500, duration: 45, category: 'Hair' }],
    stylist: { id: 'st1', name: 'Ananya Sharma', role: 'Senior Stylist' },
    date: today,
    startTime: '04:00 PM',
    status: 'requested',
    source: 'whatsapp',
    totalAmount: 2500,
    createdAt: today,
  },
  {
    id: 'apt-006',
    appointmentNo: 'APT-006',
    customer: { id: 'c6', name: 'Simran Kaur', phone: '9876543215' },
    services: [{ id: 's7', name: 'Party Makeup', price: 3000, duration: 90, category: 'Makeup' }],
    stylist: { id: 'st2', name: 'Meera Kapoor', role: 'Bridal Specialist' },
    date: today,
    startTime: '05:30 PM',
    status: 'in_service',
    source: 'walk_in',
    totalAmount: 3000,
    createdAt: today,
  },
];

export function getMockAppointments(role?: SalonRole): SalonAppointment[] {
  if (role === 'stylist') {
    return MOCK_APPOINTMENTS.filter((a) => a.stylist?.name === 'Ananya Sharma');
  }
  return MOCK_APPOINTMENTS;
}

export function getMockAppointmentById(id: string): SalonAppointment | null {
  return MOCK_APPOINTMENTS.find((a) => a.id === id) ?? null;
}
