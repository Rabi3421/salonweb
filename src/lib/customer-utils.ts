import type { CustomerStatus } from '@/types/customers';
import type { SalonRole } from '@/types/auth';

export const CUSTOMER_STATUS_LABELS: Record<CustomerStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  blocked: 'Blocked',
};

export const CUSTOMER_STATUS_STYLES: Record<CustomerStatus, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200',
  blocked: 'bg-red-50 text-red-600 border-red-200',
};

export function getCustomerInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function formatCustomerDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function canCreateCustomer(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist'].includes(role);
}

export function canEditCustomer(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist'].includes(role);
}

export function canViewCustomerFinancials(role: SalonRole): boolean {
  return ['owner', 'manager', 'accountant'].includes(role);
}

export function canViewCustomerNotes(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist', 'stylist'].includes(role);
}

export function buildCallLink(phone: string): string {
  const clean = phone.replace(/[^0-9+]/g, '');
  return `tel:${clean.startsWith('+') ? clean : `+91${clean}`}`;
}

export function buildWhatsAppLink(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  const num = digits.startsWith('91') ? digits : `91${digits}`;
  return `https://wa.me/${num}`;
}
