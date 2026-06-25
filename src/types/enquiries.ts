export type EnquiryType =
  | 'contact'
  | 'appointment_request'
  | 'support'
  | 'package_interest'
  | 'bridal_enquiry';

export type EnquiryStatus = 'new' | 'contacted' | 'follow_up' | 'converted' | 'closed' | 'lost';
export type EnquiryPriority = 'low' | 'normal' | 'high' | 'urgent';

export type EnquirySource =
  | 'website'
  | 'services_page'
  | 'contact_page'
  | 'book_appointment_page'
  | 'phone'
  | 'whatsapp'
  | 'walk_in'
  | 'referral';

export interface EnquiryFollowUpNote {
  id: string;
  note: string;
  createdBy: string;
  createdAt: string;
  nextFollowUpAt?: string;
  statusAfterNote?: EnquiryStatus;
}

export interface SalonEnquiry {
  id: string;
  enquiryNo?: string;
  type: EnquiryType;
  status: EnquiryStatus;
  priority: EnquiryPriority;
  source: EnquirySource;
  name: string;
  phone: string;
  email?: string;
  preferredService?: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
  assignedTo?: string;
  followUpNotes: EnquiryFollowUpNote[];
  nextFollowUpAt?: string;
  convertedAppointmentId?: string;
  convertedCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryListParams {
  search?: string;
  type?: EnquiryType;
  status?: EnquiryStatus;
  priority?: EnquiryPriority;
  source?: EnquirySource;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface UpdateEnquiryPayload {
  status?: EnquiryStatus;
  priority?: EnquiryPriority;
  assignedTo?: string;
  nextFollowUpAt?: string;
}

export interface AddEnquiryNotePayload {
  note: string;
  nextFollowUpAt?: string;
  statusAfterNote?: EnquiryStatus;
}

export interface ConvertEnquiryPayload {
  createCustomer: boolean;
  createAppointment: boolean;
  serviceName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  stylistId?: string;
  notes?: string;
}
