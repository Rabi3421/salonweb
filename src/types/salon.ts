export type SalonEnquiryType = 'contact' | 'demo_request' | 'appointment_request' | 'support';

export type SalonEnquiryPayload = {
  type: SalonEnquiryType;
  name: string;
  phone?: string;
  email?: string;
  message: string;
  source?: string;
};

export type SalonBasicInfo = {
  salonId: string;
  name: string;
  slug: string;
  businessType: string;
  city: string;
  state: string;
  websiteStatus: string;
  accountStatus: string;
};

export type SalonUser = {
  _id: string;
  salonId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
};
