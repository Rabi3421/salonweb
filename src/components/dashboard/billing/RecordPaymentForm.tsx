'use client';

import React, { useState } from 'react';
import type { PaymentMode, RecordPaymentPayload } from '@/types/billing';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function RecordPaymentForm({
  billId,
  dueAmount,
  onSubmit,
  submitting,
}: {
  billId: string;
  dueAmount: number;
  onSubmit: (payload: RecordPaymentPayload) => Promise<void>;
  submitting: boolean;
}) {
  const [amount, setAmount] = useState(String(dueAmount));
  const [mode, setMode] = useState<PaymentMode>('cash');
  const [referenceNo, setReferenceNo] = useState('');
  const [notes, setNotes] = useState('');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      billId,
      amount: Number(amount),
      mode,
      referenceNo: referenceNo || undefined,
      notes: notes || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="number"
          min="1"
          max={dueAmount}
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className={inputClass}
        />
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as PaymentMode)}
          className={inputClass}
        >
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
          <option value="card">Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="wallet">Wallet</option>
          <option value="other">Other</option>
        </select>
      </div>
      <input
        value={referenceNo}
        onChange={(event) => setReferenceNo(event.target.value)}
        placeholder="Reference no. optional"
        className={inputClass}
      />
      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        placeholder="Notes optional"
        rows={2}
        className={`${inputClass} resize-none`}
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
      >
        {submitting ? 'Recording...' : 'Record Payment'}
      </button>
    </form>
  );
}
