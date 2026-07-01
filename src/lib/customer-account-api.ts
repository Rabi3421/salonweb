import { apiGet, apiPost } from '@/lib/api-client';
import type { CustomerAccount, CustomerDashboardData } from '@/types/customer-account';

export type CustomerLoginPayload = {
  email: string;
  password: string;
};

export async function loginCustomer(payload: CustomerLoginPayload): Promise<CustomerAccount> {
  const res = await apiPost<{ customer: CustomerAccount }>(
    '/api/salon/public/customers/login',
    payload
  );
  if (!res.data?.customer) throw new Error('Login failed. No customer returned.');
  return res.data.customer;
}

export async function logoutCustomer(): Promise<void> {
  await apiPost('/api/salon/public/customers/logout', {});
}

export async function getCurrentCustomer(): Promise<CustomerAccount | null> {
  try {
    const res = await apiGet<{ customer: CustomerAccount }>('/api/salon/public/customers/me');
    return res.data?.customer ?? null;
  } catch {
    return null;
  }
}

export async function getCustomerDashboard(): Promise<CustomerDashboardData> {
  const res = await apiGet<CustomerDashboardData>('/api/salon/public/customers/dashboard');
  if (!res.data) throw new Error('Customer dashboard is unavailable.');
  return res.data;
}
