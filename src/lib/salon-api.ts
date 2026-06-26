import { apiPost } from '@/lib/api-client';

export type SalonEnquiryPayload = {
  type: 'contact' | 'demo_request' | 'appointment_request' | 'support';
  name: string;
  phone?: string;
  email?: string;
  message: string;
  source?: string;
};

export function createSalonEnquiry(payload: SalonEnquiryPayload) {
  return apiPost<{ enquiryId: string }>('/api/salon/enquiries', payload);
}

export function createPlatformEnquiry(payload: SalonEnquiryPayload) {
  return apiPost<{ enquiryId: string }>('/api/enquiries', payload);
}

export type PublicAppointmentPayload = {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  services: Array<{
    id?: string;
    name: string;
    price: number;
    duration: number;
    category?: string;
  }>;
  date: string;
  startTime: string;
  notes?: string;
};

export function createSalonAppointment(payload: PublicAppointmentPayload) {
  return apiPost<{ appointmentNo: string }>('/api/salon/public/appointments', payload);
}

export type CustomerAccountSignupPayload = {
  email: string;
  password: string;
};

export type CustomerAccountSignupResponse = {
  customer: {
    id: string;
    customerNo: string;
    name: string;
    phone: string;
    email: string;
    salonId: string;
    hasAccount: boolean;
  };
};

export function createCustomerAccount(payload: CustomerAccountSignupPayload) {
  return apiPost<CustomerAccountSignupResponse>('/api/salon/public/customers/register', payload);
}
