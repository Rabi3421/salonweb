import { apiGet, apiPost } from '@/lib/api-client';
import type { SalonAuthUser, SalonLoginPayload, SalonAuthResponse } from '@/types/auth';

export async function loginSalonUser(payload: SalonLoginPayload): Promise<SalonAuthUser> {
  const res = await apiPost<SalonAuthResponse>('/api/salon/auth/login', payload);
  if (!res.data?.user) throw new Error('Login failed. No user returned.');
  return res.data.user;
}

export async function logoutSalonUser(): Promise<void> {
  await apiPost('/api/salon/auth/logout', {});
}

export async function getCurrentSalonUser(): Promise<SalonAuthUser | null> {
  try {
    const res = await apiGet<{ user: SalonAuthUser }>('/api/salon/auth/me');
    return res.data?.user ?? null;
  } catch {
    return null;
  }
}

// Dev-only mock users for UI development when NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true
export const MOCK_USERS: Record<string, SalonAuthUser> = {
  owner: {
    id: 'mock-1',
    name: 'Ananya Sharma',
    email: 'owner@roseluxe.in',
    role: 'owner',
    isActive: true,
    salonId: 'SALON-2026-0001',
  },
  manager: {
    id: 'mock-2',
    name: 'Meera Kapoor',
    email: 'manager@roseluxe.in',
    role: 'manager',
    isActive: true,
    salonId: 'SALON-2026-0001',
  },
  receptionist: {
    id: 'mock-3',
    name: 'Riya Patel',
    email: 'reception@roseluxe.in',
    role: 'receptionist',
    isActive: true,
    salonId: 'SALON-2026-0001',
  },
  stylist: {
    id: 'mock-4',
    name: 'Sana Khan',
    email: 'stylist@roseluxe.in',
    role: 'stylist',
    isActive: true,
    salonId: 'SALON-2026-0001',
  },
  accountant: {
    id: 'mock-5',
    name: 'Kavya Mehta',
    email: 'accounts@roseluxe.in',
    role: 'accountant',
    isActive: true,
    salonId: 'SALON-2026-0001',
  },
};

export function isMockModeEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS === 'true';
}
