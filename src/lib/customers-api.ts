import { apiGet, apiPost, apiPatch } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonRole } from '@/types/auth';
import type {
  SalonCustomer,
  CustomerListParams,
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/types/customers';

export async function getCustomers(params?: CustomerListParams): Promise<SalonCustomer[]> {
  if (isMockModeEnabled()) return getMockCustomers();
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v));
    });
  }
  const q = qs.toString();
  const res = await apiGet<{ customers: SalonCustomer[] }>(
    `/api/salon/customers${q ? `?${q}` : ''}`
  );
  return res.data?.customers ?? [];
}

export async function getCustomerById(id: string): Promise<SalonCustomer | null> {
  if (isMockModeEnabled()) return getMockCustomerById(id);
  const res = await apiGet<{ customer: SalonCustomer }>(`/api/salon/customers/${id}`);
  return res.data?.customer ?? null;
}

export async function createCustomer(
  payload: CreateCustomerPayload
): Promise<SalonCustomer | null> {
  if (isMockModeEnabled()) return null;
  const res = await apiPost<{ customer: SalonCustomer }>('/api/salon/customers', payload);
  return res.data?.customer ?? null;
}

export async function updateCustomer(
  id: string,
  payload: UpdateCustomerPayload
): Promise<SalonCustomer | null> {
  if (isMockModeEnabled()) return null;
  const res = await apiPatch<{ customer: SalonCustomer }>(`/api/salon/customers/${id}`, payload);
  return res.data?.customer ?? null;
}

// ── Mock data ──

const MOCK_CUSTOMERS: SalonCustomer[] = [
  {
    id: 'cust-001',
    customerNo: 'C-001',
    name: 'Priya Sharma',
    phone: '9876543210',
    email: 'priya@email.com',
    gender: 'female',
    dateOfBirth: '1995-03-15',
    status: 'active',
    source: 'website',
    preferences: {
      favoriteServices: ['Hair Styling', 'Hair Spa'],
      preferredStylistName: 'Ananya Sharma',
      notes: 'Prefers minimal heat styling',
    },
    totalVisits: 12,
    totalSpent: 18000,
    dueAmount: 0,
    lastVisitAt: '2026-06-20',
    visits: [
      {
        id: 'v1',
        date: '2026-06-20',
        services: ['Hair Styling'],
        stylistName: 'Ananya',
        amount: 1500,
        status: 'completed',
      },
      {
        id: 'v2',
        date: '2026-06-05',
        services: ['Hair Spa'],
        stylistName: 'Ananya',
        amount: 2500,
        status: 'completed',
      },
    ],
    createdAt: '2024-01-10',
  },
  {
    id: 'cust-002',
    customerNo: 'C-002',
    name: 'Neha Patel',
    phone: '9876543211',
    email: 'neha@email.com',
    gender: 'female',
    status: 'active',
    source: 'phone',
    preferences: { favoriteServices: ['Facial Treatment'], preferredStylistName: 'Sana Khan' },
    totalVisits: 8,
    totalSpent: 16000,
    dueAmount: 2000,
    lastVisitAt: '2026-06-18',
    visits: [
      {
        id: 'v3',
        date: '2026-06-18',
        services: ['Facial Treatment'],
        stylistName: 'Sana',
        amount: 2000,
        status: 'completed',
      },
    ],
    createdAt: '2024-03-22',
  },
  {
    id: 'cust-003',
    customerNo: 'C-003',
    name: 'Aisha Khan',
    phone: '9876543212',
    gender: 'female',
    status: 'active',
    source: 'website',
    preferences: {
      favoriteServices: ['Bridal Makeup', 'Hair Styling'],
      preferredStylistName: 'Meera Kapoor',
      notes: 'Bridal client - wedding in August',
      allergies: 'Sensitive to parabens',
    },
    totalVisits: 3,
    totalSpent: 35000,
    dueAmount: 12000,
    lastVisitAt: '2026-06-15',
    visits: [
      {
        id: 'v4',
        date: '2026-06-15',
        services: ['Bridal Makeup Trial'],
        stylistName: 'Meera',
        amount: 5000,
        status: 'completed',
      },
    ],
    createdAt: '2026-05-01',
  },
  {
    id: 'cust-004',
    customerNo: 'C-004',
    name: 'Kavita Mehta',
    phone: '9876543213',
    email: 'kavita@email.com',
    gender: 'female',
    status: 'active',
    source: 'walk_in',
    preferences: { favoriteServices: ['Nail Art', 'Manicure & Pedicure'] },
    totalVisits: 15,
    totalSpent: 22000,
    dueAmount: 0,
    lastVisitAt: '2026-06-22',
    createdAt: '2023-11-05',
  },
  {
    id: 'cust-005',
    customerNo: 'C-005',
    name: 'Riya Shah',
    phone: '9876543214',
    gender: 'female',
    status: 'active',
    source: 'whatsapp',
    preferences: {
      favoriteServices: ['Hair Spa', 'Cleanup'],
      preferredStylistName: 'Ananya Sharma',
    },
    totalVisits: 6,
    totalSpent: 9000,
    dueAmount: 0,
    lastVisitAt: '2026-06-10',
    createdAt: '2025-02-14',
  },
  {
    id: 'cust-006',
    customerNo: 'C-006',
    name: 'Simran Kaur',
    phone: '9876543215',
    email: 'simran@email.com',
    gender: 'female',
    status: 'inactive',
    source: 'referral',
    totalVisits: 2,
    totalSpent: 5000,
    dueAmount: 0,
    lastVisitAt: '2026-02-20',
    createdAt: '2025-12-01',
  },
  {
    id: 'cust-007',
    customerNo: 'C-007',
    name: 'Pooja Desai',
    phone: '9876543216',
    gender: 'female',
    status: 'active',
    source: 'dashboard',
    preferences: { favoriteServices: ['Party Makeup'] },
    totalVisits: 4,
    totalSpent: 12000,
    dueAmount: 3000,
    lastVisitAt: '2026-06-19',
    createdAt: '2025-08-10',
  },
  {
    id: 'cust-008',
    customerNo: 'C-008',
    name: 'Anjali Verma',
    phone: '9876543217',
    gender: 'female',
    status: 'active',
    source: 'phone',
    totalVisits: 20,
    totalSpent: 45000,
    dueAmount: 0,
    lastVisitAt: '2026-06-21',
    createdAt: '2023-06-15',
  },
];

export function getMockCustomers(role?: SalonRole): SalonCustomer[] {
  if (role === 'stylist') {
    return MOCK_CUSTOMERS.filter(
      (c) => c.preferences?.preferredStylistName === 'Ananya Sharma'
    ).slice(0, 4);
  }
  return MOCK_CUSTOMERS;
}

export function getMockCustomerById(id: string): SalonCustomer | null {
  return MOCK_CUSTOMERS.find((c) => c.id === id) ?? null;
}
