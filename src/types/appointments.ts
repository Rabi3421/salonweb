export type AppointmentStatus =
  | 'requested'
  | 'confirmed'
  | 'checked_in'
  | 'in_service'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export type AppointmentSource = 'dashboard' | 'website' | 'phone' | 'whatsapp' | 'walk_in';

export interface AppointmentCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export interface AppointmentService {
  id: string;
  name: string;
  price: number;
  duration: number;
  category?: string;
}

export interface AppointmentStylist {
  id: string;
  name: string;
  role?: string;
}

export interface SalonAppointment {
  id: string;
  appointmentNo?: string;
  customer: AppointmentCustomer;
  services: AppointmentService[];
  stylist?: AppointmentStylist;
  date: string;
  startTime: string;
  endTime?: string;
  status: AppointmentStatus;
  source: AppointmentSource;
  notes?: string;
  internalNotes?: string;
  totalAmount: number;
  paidAmount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AppointmentListParams {
  date?: string;
  status?: AppointmentStatus;
  stylistId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateAppointmentPayload {
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  existingCustomerId?: string;
  serviceIds?: string[];
  services?: string[];
  stylistId?: string;
  date: string;
  startTime: string;
  notes?: string;
  source: AppointmentSource;
}

export interface UpdateAppointmentStatusPayload {
  status: AppointmentStatus;
  note?: string;
}
