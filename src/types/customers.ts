export type CustomerGender = 'female' | 'male' | 'other' | 'not_specified';
export type CustomerStatus = 'active' | 'inactive' | 'blocked';
export type CustomerSource =
  | 'dashboard'
  | 'website'
  | 'phone'
  | 'whatsapp'
  | 'walk_in'
  | 'referral';

export interface CustomerPreference {
  favoriteServices: string[];
  preferredStylistId?: string;
  preferredStylistName?: string;
  notes?: string;
  allergies?: string;
  hairSkinNotes?: string;
}

export interface CustomerVisit {
  id: string;
  date: string;
  services: string[];
  stylistName?: string;
  amount?: number;
  status: string;
}

export interface SalonCustomer {
  id: string;
  customerNo?: string;
  name: string;
  phone: string;
  email?: string;
  gender?: CustomerGender;
  dateOfBirth?: string;
  anniversaryDate?: string;
  address?: string;
  city?: string;
  status: CustomerStatus;
  source: CustomerSource;
  preferences?: CustomerPreference;
  totalVisits: number;
  totalSpent: number;
  dueAmount: number;
  lastVisitAt?: string;
  nextAppointmentAt?: string;
  visits?: CustomerVisit[];
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerListParams {
  search?: string;
  status?: CustomerStatus;
  source?: CustomerSource;
  page?: number;
  limit?: number;
}

export interface CreateCustomerPayload {
  name: string;
  phone: string;
  email?: string;
  gender?: CustomerGender;
  dateOfBirth?: string;
  anniversaryDate?: string;
  address?: string;
  city?: string;
  source: CustomerSource;
  notes?: string;
  allergies?: string;
  hairSkinNotes?: string;
  favoriteServices?: string[];
}

export type UpdateCustomerPayload = Partial<CreateCustomerPayload>;
