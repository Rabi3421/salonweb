export type ServiceStatus = 'active' | 'inactive';
export type ServiceCategory = 'Hair' | 'Skin' | 'Nails' | 'Makeup' | 'Bridal' | 'Spa' | 'Other';
export type PackageStatus = 'active' | 'inactive';

export interface SalonService {
  id: string;
  slug?: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: number;
  status: ServiceStatus;
  image?: string;
  assignedStaffIds?: string[];
  assignedStaffNames?: string[];
  isFeatured?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface ServiceListParams {
  search?: string;
  category?: ServiceCategory;
  status?: ServiceStatus;
  page?: number;
  limit?: number;
}

export interface CreateServicePayload {
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: number;
  status: ServiceStatus;
  isFeatured?: boolean;
  assignedStaffIds?: string[];
}

export type UpdateServicePayload = Partial<CreateServicePayload>;

export interface SalonPackage {
  id: string;
  slug?: string;
  name: string;
  description: string;
  price: number;
  status: PackageStatus;
  tag?: string;
  bestFor?: string;
  includedServiceIds?: string[];
  includedServices: string[];
  validityDays?: number;
  isHighlighted?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface PackageListParams {
  search?: string;
  status?: PackageStatus;
  page?: number;
  limit?: number;
}

export interface CreatePackagePayload {
  name: string;
  description: string;
  price: number;
  status: PackageStatus;
  tag?: string;
  bestFor?: string;
  includedServiceIds?: string[];
  includedServices?: string[];
  validityDays?: number;
  isHighlighted?: boolean;
}

export type UpdatePackagePayload = Partial<CreatePackagePayload>;
