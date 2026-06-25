import type { SalonRole } from '@/types/auth';
import type {
  BillLineItem,
  BillListParams,
  BillStatus,
  PaymentListParams,
  PaymentMode,
  PaymentStatus,
  SalonBill,
  SalonPayment,
} from '@/types/billing';

const BILL_STATUS_LABELS: Record<BillStatus, string> = {
  draft: 'Draft',
  unpaid: 'Unpaid',
  partially_paid: 'Partially Paid',
  paid: 'Paid',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
};

const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: 'Pending',
  completed: 'Completed',
  failed: 'Failed',
  refunded: 'Refunded',
};

const PAYMENT_MODE_LABELS: Record<PaymentMode, string> = {
  cash: 'Cash',
  upi: 'UPI',
  card: 'Card',
  bank_transfer: 'Bank Transfer',
  wallet: 'Wallet',
  other: 'Other',
};

export function getBillStatusLabel(status: BillStatus): string {
  return BILL_STATUS_LABELS[status] ?? status;
}

export function getBillStatusVariant(
  status: BillStatus
): 'success' | 'warning' | 'error' | 'info' | 'default' {
  if (status === 'paid') return 'success';
  if (status === 'partially_paid' || status === 'unpaid') return 'warning';
  if (status === 'cancelled' || status === 'refunded') return 'error';
  if (status === 'draft') return 'info';
  return 'default';
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  return PAYMENT_STATUS_LABELS[status] ?? status;
}

export function getPaymentStatusVariant(
  status: PaymentStatus
): 'success' | 'warning' | 'error' | 'default' {
  if (status === 'completed') return 'success';
  if (status === 'pending') return 'warning';
  if (status === 'failed' || status === 'refunded') return 'error';
  return 'default';
}

export function getPaymentModeLabel(mode: PaymentMode): string {
  return PAYMENT_MODE_LABELS[mode] ?? mode;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateLineItemTotal(item: BillLineItem): number {
  const base = item.quantity * item.unitPrice;
  const afterDiscount = base - (item.discount ?? 0);
  const tax = afterDiscount * ((item.taxRate ?? 0) / 100);
  return Math.max(0, Math.round(afterDiscount + tax));
}

export function calculateBillTotals(items: BillLineItem[], discountTotal = 0, taxTotal?: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const lineDiscount = items.reduce((sum, item) => sum + (item.discount ?? 0), 0);
  const computedTax = items.reduce((sum, item) => {
    const taxable = item.quantity * item.unitPrice - (item.discount ?? 0);
    return sum + taxable * ((item.taxRate ?? 0) / 100);
  }, 0);
  const discount = discountTotal || lineDiscount;
  const tax = taxTotal ?? Math.round(computedTax);
  const grandTotal = Math.max(0, Math.round(subtotal - discount + tax));

  return { subtotal, discountTotal: discount, taxTotal: tax, grandTotal };
}

export function filterBills(bills: SalonBill[], filters: BillListParams): SalonBill[] {
  return bills.filter((bill) => {
    if (filters.status && bill.status !== filters.status) return false;
    if (filters.paymentMode && bill.paymentMode !== filters.paymentMode) return false;
    if (filters.dateFrom && bill.createdAt < filters.dateFrom) return false;
    if (filters.dateTo && bill.createdAt > filters.dateTo) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack = `${bill.billNo} ${bill.customer.name} ${bill.customer.phone}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function filterPayments(
  payments: SalonPayment[],
  filters: PaymentListParams
): SalonPayment[] {
  return payments.filter((payment) => {
    if (filters.mode && payment.mode !== filters.mode) return false;
    if (filters.status && payment.status !== filters.status) return false;
    if (filters.dateFrom && payment.paidAt < filters.dateFrom) return false;
    if (filters.dateTo && payment.paidAt > filters.dateTo) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const haystack =
        `${payment.paymentNo} ${payment.billNo} ${payment.customerName} ${payment.referenceNo ?? ''}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function canViewBilling(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
}

export function canCreateBill(role: SalonRole): boolean {
  return ['owner', 'receptionist', 'accountant'].includes(role);
}

export function canRecordPayment(role: SalonRole): boolean {
  return ['owner', 'receptionist', 'accountant'].includes(role);
}

export function canViewPaymentDetails(role: SalonRole): boolean {
  return ['owner', 'manager', 'receptionist', 'accountant'].includes(role);
}

export function canCancelBill(role: SalonRole): boolean {
  return ['owner', 'accountant'].includes(role);
}

export function buildReceiptText(bill: SalonBill, salonName = 'Salon'): string {
  const items = bill.items
    .map((item) => `${item.name} x${item.quantity} - ${formatCurrency(item.total)}`)
    .join('\n');

  return [
    salonName,
    `Bill: ${bill.billNo}`,
    `Customer: ${bill.customer.name}`,
    '',
    items,
    '',
    `Total: ${formatCurrency(bill.grandTotal)}`,
    `Paid: ${formatCurrency(bill.paidAmount)}`,
    `Due: ${formatCurrency(bill.dueAmount)}`,
  ].join('\n');
}

export function buildBillingCallLink(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}

export function buildBillingWhatsAppLink(phone: string): string {
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}`;
}
