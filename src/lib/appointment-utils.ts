import type { AppointmentStatus, AppointmentService, SalonAppointment } from '@/types/appointments';
import type { SalonRole } from '@/types/auth';

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  requested: 'Requested',
  confirmed: 'Confirmed',
  checked_in: 'Checked In',
  in_service: 'In Service',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

export const STATUS_STYLES: Record<AppointmentStatus, string> = {
  requested: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  checked_in: 'bg-purple-50 text-purple-700 border-purple-200',
  in_service: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
  no_show: 'bg-gray-100 text-gray-500 border-gray-200',
};

export function getNextAllowedStatuses(
  status: AppointmentStatus,
  role: SalonRole
): AppointmentStatus[] {
  if (role === 'accountant') return [];

  const full: Record<AppointmentStatus, AppointmentStatus[]> = {
    requested: ['confirmed', 'cancelled'],
    confirmed: ['checked_in', 'cancelled', 'no_show'],
    checked_in: ['in_service', 'cancelled'],
    in_service: ['completed'],
    completed: [],
    cancelled: [],
    no_show: [],
  };

  if (role === 'stylist') {
    if (status === 'confirmed' || status === 'checked_in') return ['in_service'];
    if (status === 'in_service') return ['completed'];
    return [];
  }

  return full[status] ?? [];
}

export function calculateTotal(services: AppointmentService[]): number {
  return services.reduce((sum, s) => sum + s.price, 0);
}

export function canManageAppointments(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist', 'stylist'].includes(role);
}

export function canCreateAppointment(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist'].includes(role);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}
