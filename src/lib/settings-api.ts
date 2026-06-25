import { apiGet, apiPatch, apiPost } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import { getPublicSiteDataAsync } from '@/lib/public-site-data';
import { ROLE_PERMISSIONS } from '@/lib/settings-utils';
import type {
  CreateSalonUserPayload,
  SalonDashboardUser,
  SalonSettings,
  UpdateSalonUserPayload,
  UpdateSettingsPayload,
  UserListParams,
} from '@/types/settings';

const MOCK_SETTINGS: SalonSettings = {
  profile: {
    salonName: 'Demo Salon',
    logo: '/favicon.ico',
    email: 'hello@roseluxe.in',
    phone: '+91 98765 00001',
    website: 'https://roseluxe.in',
    description: 'Premium salon services for hair, skin, nails and bridal styling.',
  },
  business: {
    address: '22 Park Street',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700016',
    gstNumber: '19ABCDE1234F1Z5',
    openingHours: '10:00',
    closingHours: '20:00',
    weeklyOff: ['Monday'],
  },
  booking: {
    slotDuration: 30,
    advanceBookingDays: 30,
    cancellationWindow: 6,
    autoConfirm: false,
    allowWalkIns: true,
  },
  notifications: {
    appointmentAlerts: true,
    enquiryAlerts: true,
    paymentAlerts: true,
    emailNotifications: true,
    whatsappNotifications: true,
  },
  updatedAt: new Date().toISOString(),
};

let MOCK_USERS: SalonDashboardUser[] = [
  makeUser('user-001', 'Ananya Sharma', 'owner', '+919876500001', 'owner@roseluxe.in', true, 42),
  makeUser('user-002', 'Meera Kapoor', 'manager', '+919876500002', 'manager@roseluxe.in', true, 31),
  makeUser(
    'user-003',
    'Riya Patel',
    'receptionist',
    '+919876500003',
    'reception@roseluxe.in',
    true,
    58
  ),
  makeUser('user-004', 'Sana Khan', 'stylist', '+919876500004', 'sana@roseluxe.in', true, 18),
  makeUser(
    'user-005',
    'Kavya Mehta',
    'accountant',
    '+919876500005',
    'accounts@roseluxe.in',
    true,
    22
  ),
  makeUser('user-006', 'Nisha Rao', 'stylist', '+919876500006', 'nisha@roseluxe.in', true, 15),
  makeUser('user-007', 'Anu Thomas', 'stylist', '+919876500007', 'anu@roseluxe.in', false, 6),
  makeUser('user-008', 'Ira Sen', 'stylist', '+919876500008', 'ira@roseluxe.in', true, 11),
];

function makeUser(
  id: string,
  name: string,
  role: SalonDashboardUser['role'],
  phone: string,
  email: string,
  isActive: boolean,
  appointmentsHandled: number
): SalonDashboardUser {
  return {
    id,
    name,
    phone,
    email,
    role,
    isActive,
    lastLoginAt: new Date(Date.now() - appointmentsHandled * 3600000).toISOString(),
    permissions: ROLE_PERMISSIONS[role],
    activitySummary: {
      logins: appointmentsHandled + 4,
      appointmentsHandled,
      billsCreated:
        role === 'receptionist' || role === 'owner' ? Math.floor(appointmentsHandled / 2) : 0,
      notes: `${name} has ${isActive ? 'active' : 'inactive'} dashboard access.`,
    },
    createdAt: '2026-06-01T10:00:00.000Z',
    updatedAt: new Date().toISOString(),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformBackendSettings(raw: any): SalonSettings {
  const bh = raw.businessHours ?? [];
  const weeklyOff = bh.filter((d: { isOpen?: boolean }) => !d.isOpen).map((d: { day: string }) => d.day);
  const openDay = bh.find((d: { isOpen?: boolean }) => d.isOpen);
  return {
    profile: {
      salonName: raw.businessName ?? raw.displayName ?? '',
      logo: raw.logo ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
      website: '',
      description: raw.description ?? '',
    },
    business: {
      address: raw.address ?? '',
      city: raw.city ?? '',
      state: raw.state ?? '',
      pincode: raw.pincode ?? '',
      gstNumber: '',
      openingHours: openDay?.openTime ?? '10:00',
      closingHours: openDay?.closeTime ?? '20:00',
      weeklyOff,
    },
    booking: {
      slotDuration: raw.bookingRules?.slotIntervalMinutes ?? 30,
      advanceBookingDays: raw.bookingRules?.advanceBookingDays ?? 30,
      cancellationWindow: raw.bookingRules?.cancellationWindowHours ?? 4,
      autoConfirm: !(raw.bookingRules?.requireApproval ?? true),
      allowWalkIns: raw.bookingRules?.allowWalkIns ?? true,
    },
    notifications: {
      appointmentAlerts: raw.notifications?.appointmentConfirmation ?? true,
      enquiryAlerts: raw.notifications?.enquiryAlert ?? true,
      paymentAlerts: raw.notifications?.paymentReceipt ?? true,
      emailNotifications: raw.notifications?.emailEnabled ?? true,
      whatsappNotifications: raw.notifications?.whatsappEnabled ?? false,
    },
    updatedAt: raw.updatedAt ?? new Date().toISOString(),
  };
}

function transformUpdatePayload(payload: UpdateSettingsPayload): Record<string, unknown> {
  const flat: Record<string, unknown> = {};
  if (payload.profile) {
    if (payload.profile.salonName !== undefined) flat.businessName = payload.profile.salonName;
    if (payload.profile.email !== undefined) flat.email = payload.profile.email;
    if (payload.profile.phone !== undefined) flat.phone = payload.profile.phone;
    if (payload.profile.logo !== undefined) flat.logo = payload.profile.logo;
    if (payload.profile.description !== undefined) flat.description = payload.profile.description;
  }
  if (payload.business) {
    if (payload.business.address !== undefined) flat.address = payload.business.address;
    if (payload.business.city !== undefined) flat.city = payload.business.city;
    if (payload.business.state !== undefined) flat.state = payload.business.state;
    if (payload.business.pincode !== undefined) flat.pincode = payload.business.pincode;
  }
  if (payload.booking) {
    flat.bookingRules = {
      ...(payload.booking.slotDuration !== undefined && { slotIntervalMinutes: payload.booking.slotDuration }),
      ...(payload.booking.advanceBookingDays !== undefined && { advanceBookingDays: payload.booking.advanceBookingDays }),
      ...(payload.booking.cancellationWindow !== undefined && { cancellationWindowHours: payload.booking.cancellationWindow }),
      ...(payload.booking.autoConfirm !== undefined && { requireApproval: !payload.booking.autoConfirm }),
      ...(payload.booking.allowWalkIns !== undefined && { allowWalkIns: payload.booking.allowWalkIns }),
    };
  }
  if (payload.notifications) {
    flat.notifications = {
      ...(payload.notifications.appointmentAlerts !== undefined && { appointmentConfirmation: payload.notifications.appointmentAlerts }),
      ...(payload.notifications.enquiryAlerts !== undefined && { enquiryAlert: payload.notifications.enquiryAlerts }),
      ...(payload.notifications.paymentAlerts !== undefined && { paymentReceipt: payload.notifications.paymentAlerts }),
      ...(payload.notifications.emailNotifications !== undefined && { emailEnabled: payload.notifications.emailNotifications }),
      ...(payload.notifications.whatsappNotifications !== undefined && { whatsappEnabled: payload.notifications.whatsappNotifications }),
    };
  }
  return flat;
}

export async function getSettings(): Promise<SalonSettings> {
  if (isMockModeEnabled()) {
    const siteData = await getPublicSiteDataAsync();
    return {
      ...MOCK_SETTINGS,
      profile: {
        ...MOCK_SETTINGS.profile,
        salonName: siteData.brand.fullName,
        email: siteData.contact.email,
        phone: siteData.contact.phone,
        description: siteData.brand.shortDescription,
      },
      business: {
        ...MOCK_SETTINGS.business,
        address: siteData.contact.address,
        city: siteData.contact.city,
        state: siteData.contact.state,
      },
    };
  }
  const res = await apiGet<{ settings: Record<string, unknown> }>('/api/salon/settings');
  if (!res.data?.settings) throw new Error('No settings returned.');
  return transformBackendSettings(res.data.settings);
}

export async function updateSettings(payload: UpdateSettingsPayload): Promise<SalonSettings> {
  if (isMockModeEnabled()) {
    Object.assign(MOCK_SETTINGS.profile, payload.profile);
    Object.assign(MOCK_SETTINGS.business, payload.business);
    Object.assign(MOCK_SETTINGS.booking, payload.booking);
    Object.assign(MOCK_SETTINGS.notifications, payload.notifications);
    MOCK_SETTINGS.updatedAt = new Date().toISOString();
    return MOCK_SETTINGS;
  }
  const flat = transformUpdatePayload(payload);
  const res = await apiPatch<{ settings: Record<string, unknown> }>('/api/salon/settings', flat);
  if (!res.data?.settings) throw new Error('No settings returned.');
  return transformBackendSettings(res.data.settings);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function enrichUser(raw: any): SalonDashboardUser {
  const role = raw.role ?? 'stylist';
  return {
    ...raw,
    permissions: raw.permissions ?? ROLE_PERMISSIONS[role as SalonDashboardUser['role']] ?? [],
    activitySummary: raw.activitySummary ?? { logins: 0, appointmentsHandled: 0, billsCreated: 0 },
  };
}

export async function getUsers(_params?: UserListParams): Promise<SalonDashboardUser[]> {
  if (isMockModeEnabled()) return MOCK_USERS;
  const res = await apiGet<{ users: Record<string, unknown>[] }>('/api/salon/users');
  return (res.data?.users ?? []).map(enrichUser);
}

export async function createUser(
  payload: CreateSalonUserPayload
): Promise<SalonDashboardUser | null> {
  if (isMockModeEnabled()) {
    const user = makeUser(
      `user-mock-${Date.now()}`,
      payload.name,
      payload.role,
      payload.phone,
      payload.email,
      payload.isActive,
      0
    );
    MOCK_USERS = [user, ...MOCK_USERS];
    return user;
  }
  const res = await apiPost<{ user: Record<string, unknown> }>('/api/salon/users', payload);
  return res.data?.user ? enrichUser(res.data.user) : null;
}

export async function getUserById(userId: string): Promise<SalonDashboardUser | null> {
  if (isMockModeEnabled()) return MOCK_USERS.find((user) => user.id === userId) ?? null;
  const res = await apiGet<{ user: Record<string, unknown> }>(`/api/salon/users/${userId}`);
  return res.data?.user ? enrichUser(res.data.user) : null;
}

export async function updateUser(
  userId: string,
  payload: UpdateSalonUserPayload
): Promise<SalonDashboardUser | null> {
  if (isMockModeEnabled()) {
    const existing = MOCK_USERS.find((user) => user.id === userId);
    if (!existing) return null;
    const updated = {
      ...existing,
      ...payload,
      permissions: payload.role ? ROLE_PERMISSIONS[payload.role] : existing.permissions,
      updatedAt: new Date().toISOString(),
    };
    MOCK_USERS = MOCK_USERS.map((user) => (user.id === userId ? updated : user));
    return updated;
  }
  const res = await apiPatch<{ user: Record<string, unknown> }>(`/api/salon/users/${userId}`, payload);
  return res.data?.user ? enrichUser(res.data.user) : null;
}
