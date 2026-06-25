import type { SalonRole } from '@/types/auth';
import type {
  SalonStaffMember,
  StaffEmploymentType,
  StaffListParams,
  StaffRoleType,
  StaffStatus,
  StaffWorkingDay,
} from '@/types/staff';

const STATUS_LABELS: Record<StaffStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  on_leave: 'On Leave',
};

const ROLE_LABELS: Record<StaffRoleType, string> = {
  owner: 'Owner',
  manager: 'Manager',
  receptionist: 'Receptionist',
  stylist: 'Stylist',
  accountant: 'Accountant',
};

const EMPLOYMENT_LABELS: Record<StaffEmploymentType, string> = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  freelance: 'Freelance',
  contract: 'Contract',
};

export function getStaffStatusLabel(status: StaffStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getStaffStatusVariant(status: StaffStatus): 'success' | 'warning' | 'default' {
  if (status === 'active') return 'success';
  if (status === 'on_leave') return 'warning';
  return 'default';
}

export function getStaffRoleLabel(role: StaffRoleType): string {
  return ROLE_LABELS[role] ?? role;
}

export function getEmploymentTypeLabel(type: StaffEmploymentType): string {
  return EMPLOYMENT_LABELS[type] ?? type;
}

export function formatStaffPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '');
  if (digits.length === 12 && digits.startsWith('91'))
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return phone;
}

export function formatWorkingDays(workingDays: StaffWorkingDay[]): string {
  const days = workingDays.filter((day) => day.isWorking).map((day) => day.day.slice(0, 3));
  return days.length ? days.join(', ') : 'No working days';
}

export function getStaffInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function filterStaff(
  staff: SalonStaffMember[],
  filters: StaffListParams
): SalonStaffMember[] {
  return staff.filter((member) => {
    if (filters.role && member.role !== filters.role) return false;
    if (filters.status && member.status !== filters.status) return false;
    if (
      filters.serviceId &&
      !member.assignedServices.some((service) => service.id === filters.serviceId)
    )
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = [
        member.name,
        member.email,
        member.phone,
        member.designation,
        member.role,
        ...member.specialties,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function canCreateStaff(role: SalonRole): boolean {
  return role === 'owner';
}

export function canEditStaff(role: SalonRole): boolean {
  return role === 'owner';
}

export function canViewStaff(role: SalonRole): boolean {
  return ['owner', 'manager'].includes(role);
}

export function canViewStaffFinancials(role: SalonRole): boolean {
  return role === 'owner';
}

export function canViewStaffPrivateDetails(role: SalonRole): boolean {
  return role === 'owner';
}

export function buildStaffCallLink(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

export function buildStaffWhatsAppLink(phone: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
}

export function formatStaffCurrency(value?: number): string {
  return value === undefined ? '—' : `₹${value.toLocaleString('en-IN')}`;
}
