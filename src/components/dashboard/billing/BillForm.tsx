'use client';

import React, { useMemo, useState } from 'react';
import BillLineItemsEditor from '@/components/dashboard/billing/BillLineItemsEditor';
import BillTotalsCard from '@/components/dashboard/billing/BillTotalsCard';
import { calculateBillTotals } from '@/lib/billing-utils';
import type { BillLineItem, BillSource, CreateBillPayload } from '@/types/billing';
import type { SalonPackage, SalonService } from '@/types/services';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400';

export default function BillForm({
  services,
  packages,
  submitting,
  onSubmit,
}: {
  services: SalonService[];
  packages: SalonPackage[];
  submitting: boolean;
  onSubmit: (payload: CreateBillPayload) => Promise<void>;
}) {
  const [customer, setCustomer] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    source: 'walk_in' as BillSource,
    appointmentId: '',
    notes: '',
  });
  const [items, setItems] = useState<BillLineItem[]>([]);
  const [discountTotal, setDiscountTotal] = useState('');
  const [taxTotal, setTaxTotal] = useState('');

  const totals = useMemo(
    () =>
      calculateBillTotals(
        items,
        discountTotal ? Number(discountTotal) : 0,
        taxTotal ? Number(taxTotal) : undefined
      ),
    [items, discountTotal, taxTotal]
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      customerName: customer.customerName,
      customerPhone: customer.customerPhone,
      customerEmail: customer.customerEmail || undefined,
      source: customer.source,
      appointmentId: customer.appointmentId || undefined,
      items,
      discountTotal: totals.discountTotal,
      taxTotal: totals.taxTotal,
      notes: customer.notes || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-900">Customer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Customer Name *">
            <input
              required
              value={customer.customerName}
              onChange={(event) =>
                setCustomer((prev) => ({ ...prev, customerName: event.target.value }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="Phone *">
            <input
              required
              value={customer.customerPhone}
              onChange={(event) =>
                setCustomer((prev) => ({ ...prev, customerPhone: event.target.value }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={customer.customerEmail}
              onChange={(event) =>
                setCustomer((prev) => ({ ...prev, customerEmail: event.target.value }))
              }
              className={inputClass}
            />
          </Field>
          <Field label="Source">
            <select
              value={customer.source}
              onChange={(event) =>
                setCustomer((prev) => ({ ...prev, source: event.target.value as BillSource }))
              }
              className={inputClass}
            >
              <option value="appointment">Appointment</option>
              <option value="walk_in">Walk-in</option>
              <option value="manual">Manual</option>
            </select>
          </Field>
          <Field label="Appointment ID">
            <input
              value={customer.appointmentId}
              onChange={(event) =>
                setCustomer((prev) => ({ ...prev, appointmentId: event.target.value }))
              }
              className={inputClass}
              placeholder="Optional"
            />
          </Field>
        </div>
      </section>

      <BillLineItemsEditor
        items={items}
        services={services}
        packages={packages}
        onChange={setItems}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">Adjustments & Notes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Discount Total">
              <input
                type="number"
                min="0"
                value={discountTotal}
                onChange={(event) => setDiscountTotal(event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Tax Total">
              <input
                type="number"
                min="0"
                value={taxTotal}
                onChange={(event) => setTaxTotal(event.target.value)}
                className={inputClass}
                placeholder="Auto if blank"
              />
            </Field>
          </div>
          <Field label="Notes">
            <textarea
              value={customer.notes}
              onChange={(event) => setCustomer((prev) => ({ ...prev, notes: event.target.value }))}
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </Field>
        </section>
        <BillTotalsCard {...totals} />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting || items.length === 0}
          className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Creating...' : 'Create Bill'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
