'use client';

import React, { useState } from 'react';
import type { ConvertEnquiryPayload, SalonEnquiry } from '@/types/enquiries';

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function EnquiryConversionPanel({
  enquiry,
  submitting,
  onSubmit,
}: {
  enquiry: SalonEnquiry;
  submitting: boolean;
  onSubmit: (payload: ConvertEnquiryPayload) => Promise<void>;
}) {
  const [createCustomer, setCreateCustomer] = useState(true);
  const [createAppointment, setCreateAppointment] = useState(true);
  const [serviceName, setServiceName] = useState(enquiry.preferredService ?? '');
  const [appointmentDate, setAppointmentDate] = useState(enquiry.preferredDate ?? '');
  const [appointmentTime, setAppointmentTime] = useState(enquiry.preferredTime ?? '');
  const [stylistId, setStylistId] = useState('');
  const [notes, setNotes] = useState('');
  const isConverted = enquiry.status === 'converted';

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      createCustomer,
      createAppointment,
      serviceName: serviceName || undefined,
      appointmentDate: appointmentDate || undefined,
      appointmentTime: appointmentTime || undefined,
      stylistId: stylistId || undefined,
      notes: notes || undefined,
    });
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">Convert Lead</h2>
      {isConverted ? (
        <p className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
          This enquiry is already converted.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={createCustomer}
                onChange={(event) => setCreateCustomer(event.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              Create customer
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={createAppointment}
                onChange={(event) => setCreateAppointment(event.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              Create appointment
            </label>
          </div>
          <input
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
            placeholder="Service name"
            className={inputClass}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={appointmentDate}
              onChange={(event) => setAppointmentDate(event.target.value)}
              className={inputClass}
            />
            <input
              value={appointmentTime}
              onChange={(event) => setAppointmentTime(event.target.value)}
              placeholder="Appointment time"
              className={inputClass}
            />
          </div>
          <input
            value={stylistId}
            onChange={(event) => setStylistId(event.target.value)}
            placeholder="Stylist ID optional"
            className={inputClass}
          />
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Conversion notes optional"
            rows={3}
            className={`${inputClass} resize-none`}
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? 'Converting...' : 'Convert Enquiry'}
          </button>
        </form>
      )}
    </section>
  );
}
