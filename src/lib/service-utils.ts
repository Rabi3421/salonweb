import type { SalonRole } from '@/types/auth';
import type {
  ServiceStatus,
  PackageStatus,
  ServiceCategory,
  SalonService,
  SalonPackage,
} from '@/types/services';

export const SERVICE_STATUS_LABELS: Record<ServiceStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
};

export const SERVICE_STATUS_STYLES: Record<ServiceStatus, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200',
};

export const PACKAGE_STATUS_LABELS: Record<PackageStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
};

export const PACKAGE_STATUS_STYLES: Record<PackageStatus, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200',
};

export function getServiceStatusLabel(status: ServiceStatus): string {
  return SERVICE_STATUS_LABELS[status] ?? status;
}

export function getServiceStatusVariant(status: ServiceStatus): 'success' | 'default' {
  return status === 'active' ? 'success' : 'default';
}

export function getPackageStatusLabel(status: PackageStatus): string {
  return PACKAGE_STATUS_LABELS[status] ?? status;
}

export function getPackageStatusVariant(status: PackageStatus): 'success' | 'default' {
  return status === 'active' ? 'success' : 'default';
}

export function formatServicePrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatServiceDuration(duration: number): string {
  if (duration < 60) return `${duration} min`;
  const hrs = Math.floor(duration / 60);
  const mins = duration % 60;
  if (mins === 0) return `${hrs} hr`;
  return `${hrs} hr ${mins} min`;
}

export function getServiceCategoryOptions(): { value: ServiceCategory; label: string }[] {
  return [
    { value: 'Hair', label: 'Hair' },
    { value: 'Skin', label: 'Skin' },
    { value: 'Nails', label: 'Nails' },
    { value: 'Makeup', label: 'Makeup' },
    { value: 'Bridal', label: 'Bridal' },
    { value: 'Spa', label: 'Spa' },
    { value: 'Other', label: 'Other' },
  ];
}

export function filterServices(
  services: SalonService[],
  filters: { search?: string; category?: string; status?: string }
): SalonService[] {
  return services.filter((s) => {
    if (filters.status && s.status !== filters.status) return false;
    if (filters.category && s.category !== filters.category) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.description.toLowerCase().includes(q))
        return false;
    }
    return true;
  });
}

export function filterPackages(
  packages: SalonPackage[],
  filters: { search?: string; status?: string; highlighted?: boolean }
): SalonPackage[] {
  return packages.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.highlighted !== undefined && p.isHighlighted !== filters.highlighted) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q))
        return false;
    }
    return true;
  });
}

export function canViewService(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist', 'stylist'].includes(role);
}

export function canCreateService(role: SalonRole): boolean {
  return role === 'owner';
}

export function canEditService(role: SalonRole): boolean {
  return role === 'owner';
}

export function canViewPackage(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist'].includes(role);
}

export function canCreatePackage(role: SalonRole): boolean {
  return role === 'owner';
}

export function canEditPackage(role: SalonRole): boolean {
  return role === 'owner';
}
