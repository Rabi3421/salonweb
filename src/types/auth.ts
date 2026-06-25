export type SalonRole = 'owner' | 'manager' | 'receptionist' | 'stylist' | 'accountant';

export interface SalonAuthUser {
  id: string;
  name: string;
  email: string;
  role: SalonRole;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  salonId: string;
}

export interface SalonLoginPayload {
  email: string;
  password: string;
}

export interface SalonAuthResponse {
  user: SalonAuthUser;
}

export interface SalonSession {
  user: SalonAuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
