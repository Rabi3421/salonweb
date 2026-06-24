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
