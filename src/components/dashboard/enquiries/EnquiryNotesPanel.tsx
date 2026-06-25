'use client';

import React, { useState } from 'react';
import EnquiryStatusBadge from '@/components/dashboard/enquiries/EnquiryStatusBadge';
import {
  formatEnquiryDate,
  getEnquiryStatusLabel,
  getNextEnquiryStatuses,
} from '@/lib/enquiry-utils';
import type { AddEnquiryNotePayload, EnquiryStatus, SalonEnquiry } from '@/types/enquiries';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function EnquiryNotesPanel({
  enquiry,
  submitting,
  onSubmit,
}: {
  enquiry: SalonEnquiry;
  submitting: boolean;
  onSubmit: (payload: AddEnquiryNotePayload) => Promise<void>;
}) {
  const [note, setNote] = useState('');
  const [nextFollowUpAt, setNextFollowUpAt] = useState('');
  const [statusAfterNote, setStatusAfterNote] = useState<EnquiryStatus | ''>('');
  const nextStatuses = getNextEnquiryStatuses(enquiry.status);
  const followUpNotes = Array.isArray(enquiry.followUpNotes) ? enquiry.followUpNotes : [];

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      note,
      nextFollowUpAt: nextFollowUpAt ? new Date(nextFollowUpAt).toISOString() : undefined,
      statusAfterNote: statusAfterNote || undefined,
    });
    setNote('');
    setNextFollowUpAt('');
    setStatusAfterNote('');
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Follow-Up Notes</h2>
      <div className="mb-5 space-y-3">
        {followUpNotes.length ? (
          followUpNotes.map((item) => (
            <div key={item.id} className="rounded-xl bg-gray-50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-medium text-gray-500">
                  {item.createdBy} · {formatEnquiryDate(item.createdAt)}
                </p>
                {item.statusAfterNote ? <EnquiryStatusBadge status={item.statusAfterNote} /> : null}
              </div>
              <p className="mt-2 whitespace-pre-line text-sm text-gray-700">{item.note}</p>
              {item.nextFollowUpAt ? (
                <p className="mt-2 text-xs text-amber-600">
                  Next follow-up: {formatEnquiryDate(item.nextFollowUpAt)}
                </p>
              ) : null}
            </div>
          ))
        ) : (
          <p className="rounded-xl bg-gray-50 p-3 text-sm text-gray-500">No follow-up notes yet.</p>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          required
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Add call summary, WhatsApp response, next action..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="datetime-local"
            value={nextFollowUpAt}
            onChange={(event) => setNextFollowUpAt(event.target.value)}
            className={inputClass}
          />
          <select
            value={statusAfterNote}
            onChange={(event) => setStatusAfterNote(event.target.value as EnquiryStatus)}
            className={inputClass}
          >
            <option value="">Keep status</option>
            {nextStatuses.map((item) => (
              <option key={item} value={item}>
                {getEnquiryStatusLabel(item)}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? 'Adding...' : 'Add Note'}
        </button>
      </form>
    </section>
  );
}
