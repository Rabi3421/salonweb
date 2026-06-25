import type { SalonRole } from '@/types/auth';

export interface SalonProfile {
  salonName: string;
  logo?: string;
  email: string;
  phone: string;
  website?: string;
  description?: string;
}

export interface BusinessHours {
  address: string;
  city: string;
  state: string;
  pincode: string;
  gstNumber?: string;
  openingHours: string;
  closingHours: string;
  weeklyOff: string[];
}

export interface BookingRules {
  slotDuration: number;
  advanceBookingDays: number;
  cancellationWindow: number;
  autoConfirm: boolean;
  allowWalkIns: boolean;
}

export interface NotificationPreferences {
  appointmentAlerts: boolean;
  enquiryAlerts: boolean;
  paymentAlerts: boolean;
  emailNotifications: boolean;
  whatsappNotifications: boolean;
}

export interface SalonSettings {
  profile: SalonProfile;
  business: BusinessHours;
  booking: BookingRules;
  notifications: NotificationPreferences;
  updatedAt: string;
}

export type UpdateSettingsPayload = Partial<{
  profile: Partial<SalonProfile>;
  business: Partial<BusinessHours>;
  booking: Partial<BookingRules>;
  notifications: Partial<NotificationPreferences>;
}>;

export interface SalonDashboardUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: SalonRole;
  isActive: boolean;
  lastLoginAt?: string;
  permissions: string[];
  activitySummary: {
    logins: number;
    appointmentsHandled: number;
    billsCreated: number;
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserListParams {
  search?: string;
  role?: SalonRole;
  status?: 'active' | 'inactive';
}

export interface CreateSalonUserPayload {
  name: string;
  phone: string;
  email: string;
  role: SalonRole;
  password: string;
  isActive: boolean;
}

export type UpdateSalonUserPayload = Partial<Omit<CreateSalonUserPayload, 'password'>> & {
  password?: string;
};
