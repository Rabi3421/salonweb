import { apiGet, apiPatch, apiPost } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import { calculateBillTotals } from '@/lib/billing-utils';
import type { SalonRole } from '@/types/auth';
import type {
  BillListParams,
  CreateBillPayload,
  PaymentListParams,
  RecordPaymentPayload,
  SalonBill,
  SalonPayment,
} from '@/types/billing';

const makeItem = (
  id: string,
  type: 'service' | 'package' | 'product' | 'adjustment',
  name: string,
  quantity: number,
  unitPrice: number,
  discount = 0,
  taxRate = 0
) => {
  const taxable = quantity * unitPrice - discount;
  return {
    id,
    type,
    name,
    quantity,
    unitPrice,
    discount,
    taxRate,
    total: Math.round(taxable + taxable * (taxRate / 100)),
  };
};

let MOCK_BILLS: SalonBill[] = [
  {
    id: 'bill-001',
    billNo: 'BILL-2026-001',
    source: 'appointment',
    appointmentId: 'apt-001',
    customer: {
      id: 'cust-001',
      name: 'Priya Sharma',
      phone: '+919876500001',
      email: 'priya@example.com',
    },
    items: [makeItem('li-001', 'service', 'Bridal Makeup', 1, 12000, 0, 18)],
    subtotal: 12000,
    discountTotal: 0,
    taxTotal: 2160,
    grandTotal: 14160,
    paidAmount: 14160,
    dueAmount: 0,
    status: 'paid',
    paymentMode: 'upi',
    createdBy: 'Ananya Sharma',
    createdAt: '2026-06-24T09:30:00.000Z',
    updatedAt: '2026-06-24T09:45:00.000Z',
  },
  {
    id: 'bill-002',
    billNo: 'BILL-2026-002',
    source: 'manual',
    customer: { id: 'cust-002', name: 'Neha Patel', phone: '+919876500002' },
    items: [
      makeItem('li-002', 'service', 'Hair Color', 1, 3000, 0, 18),
      makeItem('li-003', 'service', 'Hair Spa', 1, 2500, 500, 18),
    ],
    subtotal: 5500,
    discountTotal: 500,
    taxTotal: 900,
    grandTotal: 5900,
    paidAmount: 3000,
    dueAmount: 2900,
    status: 'partially_paid',
    paymentMode: 'cash',
    createdBy: 'Riya Patel',
    createdAt: '2026-06-24T10:15:00.000Z',
    updatedAt: '2026-06-24T10:25:00.000Z',
  },
  {
    id: 'bill-003',
    billNo: 'BILL-2026-003',
    source: 'walk_in',
    customer: { name: 'Aisha Khan', phone: '+919876500003' },
    items: [makeItem('li-004', 'service', 'Facial Treatment', 1, 2000, 0, 18)],
    subtotal: 2000,
    discountTotal: 0,
    taxTotal: 360,
    grandTotal: 2360,
    paidAmount: 0,
    dueAmount: 2360,
    status: 'unpaid',
    createdBy: 'Front Desk',
    createdAt: '2026-06-24T11:00:00.000Z',
    updatedAt: '2026-06-24T11:00:00.000Z',
  },
  {
    id: 'bill-004',
    billNo: 'BILL-2026-004',
    source: 'appointment',
    customer: { name: 'Kavita Mehta', phone: '+919876500004' },
    items: [makeItem('li-005', 'service', 'Nail Art', 1, 1200, 0, 18)],
    subtotal: 1200,
    discountTotal: 0,
    taxTotal: 216,
    grandTotal: 1416,
    paidAmount: 0,
    dueAmount: 0,
    status: 'cancelled',
    createdBy: 'Front Desk',
    createdAt: '2026-06-23T14:00:00.000Z',
    updatedAt: '2026-06-23T14:20:00.000Z',
  },
  {
    id: 'bill-005',
    billNo: 'BILL-2026-005',
    source: 'walk_in',
    customer: { name: 'Riya Shah', phone: '+919876500005' },
    items: [makeItem('li-006', 'service', 'Manicure & Pedicure', 1, 800, 0, 18)],
    subtotal: 800,
    discountTotal: 0,
    taxTotal: 144,
    grandTotal: 944,
    paidAmount: 944,
    dueAmount: 0,
    status: 'paid',
    paymentMode: 'card',
    createdBy: 'Front Desk',
    createdAt: '2026-06-23T16:30:00.000Z',
    updatedAt: '2026-06-23T16:40:00.000Z',
  },
  {
    id: 'bill-006',
    billNo: 'BILL-2026-006',
    source: 'manual',
    customer: { name: 'Meenal Jain', phone: '+919876500006' },
    items: [makeItem('li-007', 'package', 'Bridal Glow Package', 1, 18999, 1000, 18)],
    subtotal: 18999,
    discountTotal: 1000,
    taxTotal: 3240,
    grandTotal: 21239,
    paidAmount: 10000,
    dueAmount: 11239,
    status: 'partially_paid',
    paymentMode: 'bank_transfer',
    createdBy: 'Nisha Rao',
    createdAt: '2026-06-22T12:00:00.000Z',
    updatedAt: '2026-06-22T12:10:00.000Z',
  },
];

let MOCK_PAYMENTS: SalonPayment[] = [
  {
    id: 'pay-001',
    paymentNo: 'PAY-2026-001',
    billId: 'bill-001',
    billNo: 'BILL-2026-001',
    customerName: 'Priya Sharma',
    amount: 14160,
    mode: 'upi',
    status: 'completed',
    referenceNo: 'UPI98231',
    collectedBy: 'Ananya Sharma',
    paidAt: '2026-06-24T09:45:00.000Z',
  },
  {
    id: 'pay-002',
    paymentNo: 'PAY-2026-002',
    billId: 'bill-002',
    billNo: 'BILL-2026-002',
    customerName: 'Neha Patel',
    amount: 3000,
    mode: 'cash',
    status: 'completed',
    collectedBy: 'Riya Patel',
    paidAt: '2026-06-24T10:25:00.000Z',
  },
  {
    id: 'pay-003',
    paymentNo: 'PAY-2026-003',
    billId: 'bill-005',
    billNo: 'BILL-2026-005',
    customerName: 'Riya Shah',
    amount: 944,
    mode: 'card',
    status: 'completed',
    referenceNo: 'CARD-4431',
    collectedBy: 'Front Desk',
    paidAt: '2026-06-23T16:40:00.000Z',
  },
  {
    id: 'pay-004',
    paymentNo: 'PAY-2026-004',
    billId: 'bill-006',
    billNo: 'BILL-2026-006',
    customerName: 'Meenal Jain',
    amount: 10000,
    mode: 'bank_transfer',
    status: 'pending',
    referenceNo: 'BANK-7781',
    collectedBy: 'Nisha Rao',
    paidAt: '2026-06-22T12:10:00.000Z',
  },
];

function buildQuery(params?: object): string {
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') qs.set(key, String(value));
    });
  }
  const query = qs.toString();
  return query ? `?${query}` : '';
}

export async function getBills(params?: BillListParams): Promise<SalonBill[]> {
  if (isMockModeEnabled()) return getMockBills();
  const res = await apiGet<{ bills: SalonBill[] }>(`/api/salon/bills${buildQuery(params)}`);
  return res.data?.bills ?? [];
}

export async function getBillById(billId: string): Promise<SalonBill | null> {
  if (isMockModeEnabled()) return getMockBillById(billId);
  const res = await apiGet<{ bill: SalonBill }>(`/api/salon/bills/${billId}`);
  return res.data?.bill ?? null;
}

export async function createBill(payload: CreateBillPayload): Promise<SalonBill | null> {
  if (isMockModeEnabled()) return createMockBill(payload);
  const res = await apiPost<{ bill: SalonBill }>('/api/salon/bills', payload);
  return res.data?.bill ?? null;
}

export async function updateBill(
  billId: string,
  payload: Partial<CreateBillPayload>
): Promise<SalonBill | null> {
  if (isMockModeEnabled()) {
    const existing = getMockBillById(billId);
    return existing ? { ...existing, ...payload, updatedAt: new Date().toISOString() } : null;
  }
  const res = await apiPatch<{ bill: SalonBill }>(`/api/salon/bills/${billId}`, payload);
  return res.data?.bill ?? null;
}

export async function recordBillPayment(
  billId: string,
  payload: RecordPaymentPayload
): Promise<SalonPayment | null> {
  if (isMockModeEnabled()) return recordMockPayment(billId, payload);
  const res = await apiPost<{ payment: SalonPayment }>(
    `/api/salon/bills/${billId}/payments`,
    payload
  );
  return res.data?.payment ?? null;
}

export async function getPayments(params?: PaymentListParams): Promise<SalonPayment[]> {
  if (isMockModeEnabled()) return getMockPayments();
  const res = await apiGet<{ payments: SalonPayment[] }>(
    `/api/salon/payments${buildQuery(params)}`
  );
  return res.data?.payments ?? [];
}

export async function createPayment(payload: RecordPaymentPayload): Promise<SalonPayment | null> {
  if (isMockModeEnabled()) return recordMockPayment(payload.billId, payload);
  const res = await apiPost<{ payment: SalonPayment }>('/api/salon/payments', payload);
  return res.data?.payment ?? null;
}

export function getMockBills(_role?: SalonRole): SalonBill[] {
  return MOCK_BILLS;
}

export function getMockBillById(id: string): SalonBill | null {
  return MOCK_BILLS.find((bill) => bill.id === id) ?? null;
}

export function createMockBill(payload: CreateBillPayload): SalonBill {
  const totals = calculateBillTotals(payload.items, payload.discountTotal ?? 0, payload.taxTotal);
  const bill: SalonBill = {
    id: `bill-mock-${Date.now()}`,
    billNo: `BILL-2026-${String(MOCK_BILLS.length + 1).padStart(3, '0')}`,
    source: payload.source,
    appointmentId: payload.appointmentId,
    customer: {
      id: payload.customerId,
      name: payload.customerName,
      phone: payload.customerPhone,
      email: payload.customerEmail,
    },
    items: payload.items,
    ...totals,
    paidAmount: 0,
    dueAmount: totals.grandTotal,
    status: totals.grandTotal > 0 ? 'unpaid' : 'paid',
    notes: payload.notes,
    createdBy: 'Demo User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  MOCK_BILLS = [bill, ...MOCK_BILLS];
  return bill;
}

export function recordMockPayment(
  billId: string,
  payload: RecordPaymentPayload
): SalonPayment | null {
  const bill = getMockBillById(billId);
  if (!bill) return null;
  const amount = Math.min(payload.amount, bill.dueAmount);
  const payment: SalonPayment = {
    id: `pay-mock-${Date.now()}`,
    paymentNo: `PAY-2026-${String(MOCK_PAYMENTS.length + 1).padStart(3, '0')}`,
    billId,
    billNo: bill.billNo,
    customerName: bill.customer.name,
    amount,
    mode: payload.mode,
    status: 'completed',
    referenceNo: payload.referenceNo,
    collectedBy: 'Demo User',
    paidAt: new Date().toISOString(),
    notes: payload.notes,
  };
  MOCK_PAYMENTS = [payment, ...MOCK_PAYMENTS];
  MOCK_BILLS = MOCK_BILLS.map((existing) => {
    if (existing.id !== billId) return existing;
    const paidAmount = existing.paidAmount + amount;
    const dueAmount = Math.max(0, existing.grandTotal - paidAmount);
    return {
      ...existing,
      paidAmount,
      dueAmount,
      paymentMode: payload.mode,
      status: dueAmount === 0 ? 'paid' : 'partially_paid',
      updatedAt: new Date().toISOString(),
    };
  });
  return payment;
}

export function getMockPayments(_role?: SalonRole): SalonPayment[] {
  return MOCK_PAYMENTS;
}
