import { apiGet, apiPatch, apiPost } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import { getMockServices } from '@/lib/services-api';
import { getStaffInitials } from '@/lib/staff-utils';
import type { SalonRole } from '@/types/auth';
import type {
  CreateStaffPayload,
  SalonStaffMember,
  StaffListParams,
  StaffWorkingDay,
  UpdateStaffPayload,
} from '@/types/staff';

const defaultWorkingDays: StaffWorkingDay[] = [
  {
    day: 'Monday',
    isWorking: true,
    startTime: '10:00',
    endTime: '19:00',
    breakStart: '14:00',
    breakEnd: '14:30',
  },
  {
    day: 'Tuesday',
    isWorking: true,
    startTime: '10:00',
    endTime: '19:00',
    breakStart: '14:00',
    breakEnd: '14:30',
  },
  {
    day: 'Wednesday',
    isWorking: true,
    startTime: '10:00',
    endTime: '19:00',
    breakStart: '14:00',
    breakEnd: '14:30',
  },
  {
    day: 'Thursday',
    isWorking: true,
    startTime: '10:00',
    endTime: '19:00',
    breakStart: '14:00',
    breakEnd: '14:30',
  },
  {
    day: 'Friday',
    isWorking: true,
    startTime: '10:00',
    endTime: '19:00',
    breakStart: '14:00',
    breakEnd: '14:30',
  },
  {
    day: 'Saturday',
    isWorking: true,
    startTime: '10:00',
    endTime: '20:00',
    breakStart: '14:30',
    breakEnd: '15:00',
  },
  { day: 'Sunday', isWorking: false, startTime: '10:00', endTime: '18:00' },
];

const services = getMockServices();
const servicePick = (ids: string[]) =>
  services
    .filter((service) => ids.includes(service.id))
    .map((service) => ({
      id: service.id,
      name: service.name,
      category: service.category,
      price: service.price,
    }));

const MOCK_STAFF: SalonStaffMember[] = [
  {
    id: 'staff-001',
    staffNo: 'STF-001',
    name: 'Ananya Sharma',
    email: 'ananya@roseluxe.in',
    phone: '+919876543211',
    role: 'stylist',
    designation: 'Senior Hair Stylist',
    status: 'active',
    employmentType: 'full_time',
    initials: 'AS',
    experience: '8+ Years',
    specialties: ['Hair Styling', 'Hair Spa', 'Hair Care'],
    assignedServices: servicePick(['svc-001', 'svc-002']),
    workingDays: defaultWorkingDays,
    joiningDate: '2021-04-10',
    salary: 42000,
    commissionPercent: 12,
    address: 'Bodakdev, Ahmedabad',
    emergencyContactName: 'Rohit Sharma',
    emergencyContactPhone: '+919876543291',
    notes: 'Strong repeat-client retention for premium hair styling.',
    appointmentsToday: 4,
    completedServicesThisMonth: 86,
    revenueThisMonth: 164000,
    rating: 4.9,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-10',
  },
  {
    id: 'staff-002',
    staffNo: 'STF-002',
    name: 'Meera Kapoor',
    email: 'meera@roseluxe.in',
    phone: '+919876543212',
    role: 'stylist',
    designation: 'Bridal Makeup Artist',
    status: 'active',
    employmentType: 'full_time',
    initials: 'MK',
    experience: '10+ Years',
    specialties: ['Bridal Makeup', 'Party Makeup', 'Draping'],
    assignedServices: servicePick(['svc-008', 'svc-009']),
    workingDays: defaultWorkingDays,
    joiningDate: '2020-02-18',
    salary: 52000,
    commissionPercent: 15,
    emergencyContactName: 'Dev Kapoor',
    emergencyContactPhone: '+919876543292',
    appointmentsToday: 2,
    completedServicesThisMonth: 41,
    revenueThisMonth: 238000,
    rating: 5,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-10',
  },
  {
    id: 'staff-003',
    staffNo: 'STF-003',
    name: 'Riya Patel',
    email: 'riya@roseluxe.in',
    phone: '+919876543213',
    role: 'stylist',
    designation: 'Nail Artist',
    status: 'active',
    employmentType: 'part_time',
    initials: 'RP',
    experience: '5+ Years',
    specialties: ['Nail Art', 'Manicure', 'Pedicure'],
    assignedServices: servicePick(['svc-006', 'svc-007']),
    workingDays: defaultWorkingDays.map((day) => ({
      ...day,
      startTime: '11:00',
      endTime: '18:00',
    })),
    joiningDate: '2022-08-01',
    salary: 28000,
    commissionPercent: 10,
    appointmentsToday: 5,
    completedServicesThisMonth: 96,
    revenueThisMonth: 92000,
    rating: 4.8,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-10',
  },
  {
    id: 'staff-004',
    staffNo: 'STF-004',
    name: 'Sana Khan',
    email: 'sana@roseluxe.in',
    phone: '+919876543214',
    role: 'stylist',
    designation: 'Skin & Facial Expert',
    status: 'active',
    employmentType: 'full_time',
    initials: 'SK',
    experience: '7+ Years',
    specialties: ['Facials', 'Cleanup', 'Skin Glow Treatments'],
    assignedServices: servicePick(['svc-004', 'svc-005']),
    workingDays: defaultWorkingDays,
    joiningDate: '2021-11-15',
    salary: 38000,
    commissionPercent: 12,
    appointmentsToday: 3,
    completedServicesThisMonth: 74,
    revenueThisMonth: 128000,
    rating: 4.9,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-10',
  },
  {
    id: 'staff-005',
    staffNo: 'STF-005',
    name: 'Kavya Mehta',
    email: 'kavya@roseluxe.in',
    phone: '+919876543215',
    role: 'stylist',
    designation: 'Hair Color Specialist',
    status: 'on_leave',
    employmentType: 'freelance',
    initials: 'KM',
    experience: '6+ Years',
    specialties: ['Global Color', 'Highlights', 'Balayage'],
    assignedServices: servicePick(['svc-003']),
    workingDays: defaultWorkingDays,
    joiningDate: '2023-01-20',
    salary: 0,
    commissionPercent: 22,
    appointmentsToday: 0,
    completedServicesThisMonth: 28,
    revenueThisMonth: 112000,
    rating: 4.7,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-10',
  },
  {
    id: 'staff-006',
    staffNo: 'STF-006',
    name: 'Nisha Rao',
    email: 'nisha@roseluxe.in',
    phone: '+919876543216',
    role: 'manager',
    designation: 'Salon Experience Manager',
    status: 'active',
    employmentType: 'full_time',
    initials: 'NR',
    experience: '9+ Years',
    specialties: ['Client Care', 'Consultation', 'Appointment Experience'],
    assignedServices: [],
    workingDays: defaultWorkingDays,
    joiningDate: '2019-09-01',
    salary: 56000,
    commissionPercent: 5,
    appointmentsToday: 1,
    completedServicesThisMonth: 18,
    revenueThisMonth: 0,
    rating: 4.9,
    createdAt: '2024-01-10',
    updatedAt: '2024-06-10',
  },
];

function buildQuery(params?: StaffListParams): string {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') qs.set(key, String(value));
    });
  }
  const query = qs.toString();
  return query ? `?${query}` : '';
}

export async function getStaff(params?: StaffListParams): Promise<SalonStaffMember[]> {
  if (isMockModeEnabled()) return getMockStaff();
  const res = await apiGet<{ staff: SalonStaffMember[] }>(
    `/api/salon/staff${buildQuery(params)}`
  );
  return res.data?.staff ?? [];
}

export async function getStaffMemberById(staffId: string): Promise<SalonStaffMember | null> {
  if (isMockModeEnabled()) return getMockStaffMemberById(staffId);
  const res = await apiGet<{ staffMember: SalonStaffMember }>(`/api/salon/staff/${staffId}`);
  return res.data?.staffMember ?? null;
}

export async function createStaff(payload: CreateStaffPayload): Promise<SalonStaffMember | null> {
  if (isMockModeEnabled()) return createMockStaff(payload);
  const res = await apiPost<{ staffMember: SalonStaffMember }>('/api/salon/staff', payload);
  return res.data?.staffMember ?? null;
}

export async function updateStaff(
  staffId: string,
  payload: UpdateStaffPayload
): Promise<SalonStaffMember | null> {
  if (isMockModeEnabled()) return updateMockStaff(staffId, payload);
  const res = await apiPatch<{ staffMember: SalonStaffMember }>(`/api/salon/staff/${staffId}`, payload);
  return res.data?.staffMember ?? null;
}

export function getMockStaff(_role?: SalonRole): SalonStaffMember[] {
  return MOCK_STAFF;
}

export function getMockStaffMemberById(id: string): SalonStaffMember | null {
  return MOCK_STAFF.find((member) => member.id === id) ?? null;
}

export function createMockStaff(payload: CreateStaffPayload): SalonStaffMember {
  const assignedServices = services
    .filter((service) => payload.assignedServiceIds.includes(service.id))
    .map((service) => ({
      id: service.id,
      name: service.name,
      category: service.category,
      price: service.price,
    }));

  return {
    id: `staff-mock-${Date.now()}`,
    staffNo: `STF-${Math.floor(Math.random() * 900 + 100)}`,
    ...payload,
    initials: getStaffInitials(payload.name),
    assignedServices,
    appointmentsToday: 0,
    completedServicesThisMonth: 0,
    revenueThisMonth: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function updateMockStaff(id: string, payload: UpdateStaffPayload): SalonStaffMember | null {
  const existing = getMockStaffMemberById(id);
  if (!existing) return null;
  return { ...existing, ...payload, updatedAt: new Date().toISOString() };
}
