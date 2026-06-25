'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import BillStatusBadge from '@/components/dashboard/billing/BillStatusBadge';
import BillTotalsCard from '@/components/dashboard/billing/BillTotalsCard';
import PaymentModeBadge from '@/components/dashboard/billing/PaymentModeBadge';
import PaymentStatusBadge from '@/components/dashboard/billing/PaymentStatusBadge';
import ReceiptPreview from '@/components/dashboard/billing/ReceiptPreview';
import RecordPaymentForm from '@/components/dashboard/billing/RecordPaymentForm';
import { getBillById, getPayments, recordBillPayment } from '@/lib/billing-api';
import {
  buildBillingCallLink,
  buildBillingWhatsAppLink,
  buildReceiptText,
  canRecordPayment,
  formatCurrency,
} from '@/lib/billing-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { RecordPaymentPayload, SalonBill, SalonPayment } from '@/types/billing';

export default function BillDetailPage() {
  return (
    <RoutePermissionGuard>
      <BillDetailContent />
    </RoutePermissionGuard>
  );
}

function BillDetailContent() {
  const params = useParams<{ billId: string }>();
  const user = useDashboardUser();
  const { brand } = usePublicSiteData();
  const [bill, setBill] = useState<SalonBill | null>(null);
  const [payments, setPayments] = useState<SalonPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [billData, paymentData] = await Promise.all([
          getBillById(params.billId),
          getPayments(),
        ]);
        if (!billData) setError('Bill not found.');
        setBill(billData);
        setPayments(paymentData.filter((payment) => payment.billId === params.billId));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.billId]);

  async function handleRecordPayment(payload: RecordPaymentPayload) {
    if (!bill) return;
    setSubmitting(true);
    setResult('');
    try {
      const payment = await recordBillPayment(bill.id, payload);
      if (payment) setPayments((prev) => [payment, ...prev]);
      const paidAmount = bill.paidAmount + payload.amount;
      const dueAmount = Math.max(0, bill.grandTotal - paidAmount);
      setBill({
        ...bill,
        paidAmount,
        dueAmount,
        paymentMode: payload.mode,
        status: dueAmount === 0 ? 'paid' : 'partially_paid',
        updatedAt: new Date().toISOString(),
      });
      setResult('Payment recorded successfully.');
    } catch (err) {
      setResult((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading bill..." />;
  if (error || !bill) return <DashboardError message={error || 'Bill not found.'} />;

  const allowPayment = canRecordPayment(user.role) && bill.dueAmount > 0;

  return (
    <div className="space-y-6 max-w-6xl">
      {isMockModeEnabled() ? (
        <p className="text-[10px] text-amber-500 font-medium">Demo data</p>
      ) : null}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{bill.billNo}</h1>
              <BillStatusBadge status={bill.status} />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created {new Date(bill.createdAt).toLocaleString('en-IN')} · {bill.source}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {allowPayment ? (
              <a
                href="#record-payment"
                className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium"
              >
                Record Payment
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(buildReceiptText(bill, brand.fullName));
                setResult('Receipt text copied.');
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Receipt
            </button>
            <Link
              href="/dashboard/billing"
              className="px-4 py-2 rounded-xl bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-medium text-primary">
          {result}
        </div>
      ) : null}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <div className="space-y-6">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Customer</h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="font-medium text-gray-900">{bill.customer.name}</p>
                <p className="text-sm text-gray-500">{bill.customer.phone}</p>
                {bill.customer.email ? (
                  <p className="text-sm text-gray-400">{bill.customer.email}</p>
                ) : null}
              </div>
              <div className="flex gap-2">
                <a
                  href={buildBillingCallLink(bill.customer.phone)}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700"
                >
                  Call
                </a>
                <a
                  href={buildBillingWhatsAppLink(bill.customer.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-700"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Line Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-4 py-3 text-gray-500 font-medium">Item</th>
                    <th className="px-4 py-3 text-gray-500 font-medium">Type</th>
                    <th className="px-4 py-3 text-gray-500 font-medium">Qty</th>
                    <th className="px-4 py-3 text-gray-500 font-medium">Unit</th>
                    <th className="px-4 py-3 text-gray-500 font-medium">Discount</th>
                    <th className="px-4 py-3 text-gray-500 font-medium">Tax</th>
                    <th className="px-4 py-3 text-gray-500 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {bill.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-gray-500">{item.type}</td>
                      <td className="px-4 py-3 text-gray-500">{item.quantity}</td>
                      <td className="px-4 py-3 text-gray-500">{formatCurrency(item.unitPrice)}</td>
                      <td className="px-4 py-3 text-gray-500">
                        {formatCurrency(item.discount ?? 0)}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{item.taxRate ?? 0}%</td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {formatCurrency(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Payment History</h2>
            <div className="space-y-3">
              {payments.length ? (
                payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl bg-gray-50 p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">{payment.paymentNo}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(payment.paidAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <PaymentModeBadge mode={payment.mode} />
                      <PaymentStatusBadge status={payment.status} />
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No payments recorded yet.</p>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <BillTotalsCard
            subtotal={bill.subtotal}
            discountTotal={bill.discountTotal}
            taxTotal={bill.taxTotal}
            grandTotal={bill.grandTotal}
            paidAmount={bill.paidAmount}
          />
          {allowPayment ? (
            <section
              id="record-payment"
              className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
            >
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Record Payment</h2>
              <RecordPaymentForm
                billId={bill.id}
                dueAmount={bill.dueAmount}
                onSubmit={handleRecordPayment}
                submitting={submitting}
              />
            </section>
          ) : null}
          <ReceiptPreview bill={bill} />
        </div>
      </div>
    </div>
  );
}
