'use client';

import React, { useState } from 'react';
import EnquiryPriorityBadge from '@/components/dashboard/enquiries/EnquiryPriorityBadge';
import EnquiryStatusBadge from '@/components/dashboard/enquiries/EnquiryStatusBadge';
import {
  getEnquiryPriorityLabel,
  getEnquiryStatusLabel,
  getNextEnquiryStatuses,
} from '@/lib/enquiry-utils';
import type {
  EnquiryPriority,
  EnquiryStatus,
  SalonEnquiry,
  UpdateEnquiryPayload,
} from '@/types/enquiries';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

const priorities: EnquiryPriority[] = ['low', 'normal', 'high', 'urgent'];

export default function EnquiryStatusPanel({
  enquiry,
  submitting,
  onSubmit,
}: {
  enquiry: SalonEnquiry;
  submitting: boolean;
  onSubmit: (payload: UpdateEnquiryPayload) => Promise<void>;
}) {
  const nextStatuses = getNextEnquiryStatuses(enquiry.status);
  const [status, setStatus] = useState<EnquiryStatus | ''>(nextStatuses[0] ?? '');
  const [priority, setPriority] = useState<EnquiryPriority>(enquiry.priority);
  const [assignedTo, setAssignedTo] = useState(enquiry.assignedTo ?? '');
  const [nextFollowUpAt, setNextFollowUpAt] = useState(
    enquiry.nextFollowUpAt ? enquiry.nextFollowUpAt.slice(0, 16) : ''
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      status: status || enquiry.status,
      priority,
      assignedTo: assignedTo || undefined,
      nextFollowUpAt: nextFollowUpAt ? new Date(nextFollowUpAt).toISOString() : undefined,
    });
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Status Management</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <EnquiryStatusBadge status={enquiry.status} />
        <EnquiryPriorityBadge priority={enquiry.priority} />
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Next Status</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as EnquiryStatus)}
            className={inputClass}
            disabled={nextStatuses.length === 0}
          >
            {nextStatuses.length === 0 ? <option value="">No normal actions</option> : null}
            {nextStatuses.map((item) => (
              <option key={item} value={item}>
                {getEnquiryStatusLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Priority</span>
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value as EnquiryPriority)}
            className={inputClass}
          >
            {priorities.map((item) => (
              <option key={item} value={item}>
                {getEnquiryPriorityLabel(item)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Assigned To</span>
          <input
            value={assignedTo}
            onChange={(event) => setAssignedTo(event.target.value)}
            className={inputClass}
            placeholder="Front desk, manager, staff name..."
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Next Follow-Up</span>
          <input
            type="datetime-local"
            value={nextFollowUpAt}
            onChange={(event) => setNextFollowUpAt(event.target.value)}
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {submitting ? 'Updating...' : 'Update Status'}
        </button>
      </form>
    </section>
  );
}
