import { apiGet, apiPost, apiPatch, apiDelete } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type {
  SalonService,
  ServiceListParams,
  CreateServicePayload,
  UpdateServicePayload,
  ServiceStatus,
  SalonPackage,
  PackageListParams,
  CreatePackagePayload,
  UpdatePackagePayload,
  PackageStatus,
} from '@/types/services';

// ── Service API ──

export async function getServices(params?: ServiceListParams): Promise<SalonService[]> {
  if (isMockModeEnabled()) return getMockServices();
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v));
    });
  }
  const q = qs.toString();
  const res = await apiGet<{ services: SalonService[] }>(
    `/api/salon/services${q ? `?${q}` : ''}`
  );
  return res.data?.services ?? [];
}

export async function getServiceById(serviceId: string): Promise<SalonService | null> {
  if (isMockModeEnabled()) return getMockServiceById(serviceId);
  const res = await apiGet<{ service: SalonService }>(`/api/salon/services/${serviceId}`);
  return res.data?.service ?? null;
}

export async function createService(payload: CreateServicePayload): Promise<SalonService | null> {
  if (isMockModeEnabled()) return createMockService(payload);
  const res = await apiPost<{ service: SalonService }>('/api/salon/services', payload);
  return res.data?.service ?? null;
}

export async function updateService(
  serviceId: string,
  payload: UpdateServicePayload
): Promise<SalonService | null> {
  if (isMockModeEnabled()) return updateMockService(serviceId, payload);
  const res = await apiPatch<{ service: SalonService }>(
    `/api/salon/services/${serviceId}`,
    payload
  );
  return res.data?.service ?? null;
}

export async function deleteService(serviceId: string): Promise<void> {
  if (isMockModeEnabled()) return;
  await apiDelete(`/api/salon/services/${serviceId}`);
}

export async function toggleServiceStatus(
  serviceId: string,
  status: ServiceStatus
): Promise<SalonService | null> {
  return updateService(serviceId, { status });
}

// ── Package API ──

export async function getPackages(params?: PackageListParams): Promise<SalonPackage[]> {
  if (isMockModeEnabled()) return getMockPackages();
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v));
    });
  }
  const q = qs.toString();
  const res = await apiGet<{ packages: SalonPackage[] }>(
    `/api/salon/packages${q ? `?${q}` : ''}`
  );
  return res.data?.packages ?? [];
}

export async function getPackageById(packageId: string): Promise<SalonPackage | null> {
  if (isMockModeEnabled()) return getMockPackageById(packageId);
  const res = await apiGet<{ package: SalonPackage }>(`/api/salon/packages/${packageId}`);
  return res.data?.package ?? null;
}

export async function createPackage(payload: CreatePackagePayload): Promise<SalonPackage | null> {
  if (isMockModeEnabled()) return createMockPackage(payload);
  const res = await apiPost<{ package: SalonPackage }>('/api/salon/packages', payload);
  return res.data?.package ?? null;
}

export async function updatePackage(
  packageId: string,
  payload: UpdatePackagePayload
): Promise<SalonPackage | null> {
  if (isMockModeEnabled()) return updateMockPackage(packageId, payload);
  const res = await apiPatch<{ package: SalonPackage }>(
    `/api/salon/packages/${packageId}`,
    payload
  );
  return res.data?.package ?? null;
}

export async function deletePackage(packageId: string): Promise<void> {
  if (isMockModeEnabled()) return;
  await apiDelete(`/api/salon/packages/${packageId}`);
}

export async function togglePackageStatus(
  packageId: string,
  status: PackageStatus
): Promise<SalonPackage | null> {
  return updatePackage(packageId, { status });
}

// ── Mock Service Data ──

const MOCK_SERVICES: SalonService[] = [
  {
    id: 'svc-001',
    slug: 'hair-styling',
    name: 'Hair Styling',
    category: 'Hair',
    description:
      'From elegant updos to trendy cuts, our expert stylists create looks that turn heads.',
    price: 1500,
    duration: 60,
    status: 'active',
    isFeatured: true,
    assignedStaffNames: ['Ananya Sharma'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-002',
    slug: 'hair-spa',
    name: 'Hair Spa',
    category: 'Hair',
    description: 'Deep conditioning and nourishing treatments for silky, healthy hair.',
    price: 2500,
    duration: 45,
    status: 'active',
    assignedStaffNames: ['Ananya Sharma'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-003',
    slug: 'hair-color',
    name: 'Hair Color',
    category: 'Hair',
    description: 'Global color, highlights, balayage and creative color by experts.',
    price: 3000,
    duration: 90,
    status: 'active',
    assignedStaffNames: ['Kavya Mehta'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-004',
    slug: 'facial-treatment',
    name: 'Facial Treatment',
    category: 'Skin',
    description: 'Rejuvenating facials using premium products for radiant, glowing skin.',
    price: 2000,
    duration: 45,
    status: 'active',
    isFeatured: true,
    assignedStaffNames: ['Sana Khan'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-005',
    slug: 'cleanup',
    name: 'Cleanup',
    category: 'Skin',
    description: 'Quick cleansing and brightening for fresh, clear skin.',
    price: 800,
    duration: 30,
    status: 'active',
    assignedStaffNames: ['Sana Khan'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-006',
    slug: 'manicure-pedicure',
    name: 'Manicure & Pedicure',
    category: 'Nails',
    description: 'Pamper your hands and feet with our luxurious nail care treatments.',
    price: 800,
    duration: 60,
    status: 'active',
    isFeatured: true,
    assignedStaffNames: ['Riya Patel'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-007',
    slug: 'nail-art',
    name: 'Nail Art',
    category: 'Nails',
    description: 'Express your style with custom nail art designs by our creative artists.',
    price: 1200,
    duration: 30,
    status: 'active',
    assignedStaffNames: ['Riya Patel'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-008',
    slug: 'bridal-makeup',
    name: 'Bridal Makeup',
    category: 'Bridal',
    description: 'Make your special day unforgettable with our premium bridal packages.',
    price: 12000,
    duration: 180,
    status: 'active',
    isFeatured: true,
    assignedStaffNames: ['Meera Kapoor'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-009',
    slug: 'party-makeup',
    name: 'Party Makeup',
    category: 'Makeup',
    description: 'Soft glam, bold or natural — perfect looks for every occasion.',
    price: 3000,
    duration: 60,
    status: 'active',
    assignedStaffNames: ['Meera Kapoor'],
    createdAt: '2024-01-10',
  },
  {
    id: 'svc-010',
    slug: 'waxing-threading',
    name: 'Waxing & Threading',
    category: 'Other',
    description: 'Clean, gentle and precise grooming services.',
    price: 200,
    duration: 30,
    status: 'inactive',
    createdAt: '2024-02-15',
  },
];

export function getMockServices(): SalonService[] {
  return MOCK_SERVICES;
}

export function getMockServiceById(id: string): SalonService | null {
  return MOCK_SERVICES.find((s) => s.id === id) ?? null;
}

export function createMockService(payload: CreateServicePayload): SalonService {
  return {
    id: `svc-mock-${Date.now()}`,
    name: payload.name,
    category: payload.category,
    description: payload.description,
    price: payload.price,
    duration: payload.duration,
    status: payload.status,
    isFeatured: payload.isFeatured,
    createdAt: new Date().toISOString(),
  };
}

export function updateMockService(id: string, payload: UpdateServicePayload): SalonService | null {
  const existing = getMockServiceById(id);
  if (!existing) return null;
  return { ...existing, ...payload, updatedAt: new Date().toISOString() };
}

// ── Mock Package Data ──

const MOCK_PACKAGES: SalonPackage[] = [
  {
    id: 'pkg-001',
    slug: 'bridal-glow',
    name: 'Bridal Glow Package',
    description: 'Complete bridal preparation with premium treatments for the perfect glow.',
    price: 18999,
    status: 'active',
    tag: 'Most Popular',
    bestFor: 'Bride-to-be',
    isHighlighted: true,
    includedServices: [
      'Premium Facial',
      'Hair Spa',
      'Manicure & Pedicure',
      'Bridal Trial',
      'Final Bridal Makeup',
    ],
    validityDays: 90,
    createdAt: '2024-01-10',
  },
  {
    id: 'pkg-002',
    slug: 'monthly-grooming',
    name: 'Monthly Grooming Package',
    description: 'Essential grooming services bundled for monthly self-care routine.',
    price: 4999,
    status: 'active',
    bestFor: 'Monthly self-care',
    includedServices: ['Cleanup', 'Threading', 'Waxing', 'Hair Spa', 'Basic Manicure'],
    validityDays: 30,
    createdAt: '2024-01-10',
  },
  {
    id: 'pkg-003',
    slug: 'party-ready',
    name: 'Party Ready Package',
    description: 'Get event-ready with styling, makeup and finishing touches.',
    price: 6999,
    status: 'active',
    bestFor: 'Events & functions',
    includedServices: ['Party Makeup', 'Hairstyling', 'Nail Polish', 'Draping Support'],
    createdAt: '2024-01-10',
  },
  {
    id: 'pkg-004',
    slug: 'hair-care',
    name: 'Hair Care Package',
    description: 'Nourish and restore your hair with spa and consultation services.',
    price: 3999,
    status: 'active',
    bestFor: 'Hair nourishment',
    includedServices: ['Hair Spa', 'Blow Dry', 'Scalp Consultation', 'Smooth Finish Styling'],
    validityDays: 30,
    createdAt: '2024-01-10',
  },
  {
    id: 'pkg-005',
    slug: 'nail-care',
    name: 'Nail Care Package',
    description: 'Complete hands and feet care with premium polish and shaping.',
    price: 2499,
    status: 'inactive',
    bestFor: 'Hands & feet',
    includedServices: ['Manicure', 'Pedicure', 'Nail Shaping', 'Premium Polish'],
    createdAt: '2024-02-15',
  },
];

export function getMockPackages(): SalonPackage[] {
  return MOCK_PACKAGES;
}

export function getMockPackageById(id: string): SalonPackage | null {
  return MOCK_PACKAGES.find((p) => p.id === id) ?? null;
}

export function createMockPackage(payload: CreatePackagePayload): SalonPackage {
  return {
    id: `pkg-mock-${Date.now()}`,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    status: payload.status,
    tag: payload.tag,
    bestFor: payload.bestFor,
    includedServices: payload.includedServices ?? [],
    validityDays: payload.validityDays,
    isHighlighted: payload.isHighlighted,
    createdAt: new Date().toISOString(),
  };
}

export function updateMockPackage(id: string, payload: UpdatePackagePayload): SalonPackage | null {
  const existing = getMockPackageById(id);
  if (!existing) return null;
  return { ...existing, ...payload, updatedAt: new Date().toISOString() };
}
