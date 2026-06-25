export type BillStatus = 'draft' | 'unpaid' | 'partially_paid' | 'paid' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type PaymentMode = 'cash' | 'upi' | 'card' | 'bank_transfer' | 'wallet' | 'other';
export type BillSource = 'appointment' | 'walk_in' | 'manual';
export type BillLineItemType = 'service' | 'package' | 'product' | 'adjustment';

export interface BillCustomer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
}

export interface BillLineItem {
  id: string;
  type: BillLineItemType;
  name: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
  taxRate?: number;
  total: number;
}

export interface SalonBill {
  id: string;
  billNo: string;
  source: BillSource;
  appointmentId?: string;
  customer: BillCustomer;
  items: BillLineItem[];
  subtotal: number;
  discountTotal: number;
  taxTotal: number;
  grandTotal: number;
  paidAmount: number;
  dueAmount: number;
  status: BillStatus;
  paymentMode?: PaymentMode;
  notes?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalonPayment {
  id: string;
  paymentNo: string;
  billId: string;
  billNo: string;
  customerName: string;
  amount: number;
  mode: PaymentMode;
  status: PaymentStatus;
  referenceNo?: string;
  collectedBy?: string;
  paidAt: string;
  notes?: string;
}

export interface BillListParams {
  search?: string;
  status?: BillStatus;
  paymentMode?: PaymentMode;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface PaymentListParams {
  search?: string;
  mode?: PaymentMode;
  status?: PaymentStatus;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}

export interface CreateBillPayload {
  appointmentId?: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  source: BillSource;
  items: BillLineItem[];
  discountTotal?: number;
  taxTotal?: number;
  notes?: string;
}

export interface RecordPaymentPayload {
  billId: string;
  amount: number;
  mode: PaymentMode;
  referenceNo?: string;
  notes?: string;
}
