'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import { createAppointment } from '@/lib/appointments-api';
import { getServices } from '@/lib/services-api';
import { getStaff } from '@/lib/staff-api';
import { getCustomers } from '@/lib/customers-api';
import { canCreateAppointment } from '@/lib/appointment-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { AppointmentSource } from '@/types/appointments';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00',
];

const SOURCES: { value: AppointmentSource; label: string }[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'walk_in', label: 'Walk-In' },
  { value: 'website', label: 'Website' },
];

type ServiceOption = { id: string; name: string; price: number; duration: number; category: string };
type StaffOption = { id: string; name: string; designation?: string };
type CustomerOption = { id: string; name: string; phone: string; email?: string };

export default function NewAppointmentPage() {
  const user = useDashboardUser();
  if (!canCreateAppointment(user.role)) return <PermissionDenied />;

  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  const [staffOptions, setStaffOptions] = useState<StaffOption[]>([]);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [customerMode, setCustomerMode] = useState<'existing' | 'new'>('existing');

  const [form, setForm] = useState({
    existingCustomerId: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceId: '',
    stylistId: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '',
    source: 'dashboard' as AppointmentSource,
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    getServices().then((svcs) =>
      setServiceOptions(
        svcs.map((s) => ({
          id: s.id,
          name: s.name,
          price: s.price,
          duration: s.duration,
          category: s.category,
        }))
      )
    ).catch(() => {});
    getStaff().then((st) =>
      setStaffOptions(st.map((s) => ({ id: s.id, name: s.name, designation: s.designation })))
    ).catch(() => {});
    getCustomers().then((c) =>
      setCustomerOptions(
        c.map((cu) => ({ id: cu.id, name: cu.name, phone: cu.phone, email: cu.email }))
      )
    ).catch(() => {});
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const payload: Record<string, unknown> = {
        date: form.date,
        startTime: form.startTime,
        source: form.source,
        notes: form.notes || undefined,
      };

      if (customerMode === 'existing' && form.existingCustomerId) {
        payload.existingCustomerId = form.existingCustomerId;
      } else {
        payload.customerName = form.customerName;
        payload.customerPhone = form.customerPhone;
        payload.customerEmail = form.customerEmail || undefined;
      }

      if (form.serviceId) {
        payload.serviceIds = [form.serviceId];
      }

      if (form.stylistId) {
        payload.stylistId = form.stylistId;
      }

      await createAppointment(payload as unknown as Parameters<typeof createAppointment>[0]);
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Appointment created successfully (demo mode).'
          : 'Appointment created successfully.',
      });
    } catch (err) {
      setResult({ success: false, text: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400';

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/appointments"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">New Appointment</h1>
          <p className="text-sm text-gray-500">Create a new booking or walk-in entry.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {result?.success ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={28} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.text}</h3>
            <Link
              href="/dashboard/appointments"
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-primary hover:text-primary/80"
            >
              <Icon name="ArrowLeftIcon" size={14} className="text-primary" />
              Back to Appointments
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {result && !result.success && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            )}

            {/* Customer selection */}
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setCustomerMode('existing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${customerMode === 'existing' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-600'}`}
              >
                Existing Customer
              </button>
              <button
                type="button"
                onClick={() => setCustomerMode('new')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${customerMode === 'new' ? 'border-primary bg-primary/10 text-primary' : 'border-gray-200 text-gray-600'}`}
              >
                New Customer
              </button>
            </div>

            {customerMode === 'existing' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Select Customer *
                </label>
                <select
                  name="existingCustomerId"
                  value={form.existingCustomerId}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Choose customer...</option>
                  {customerOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.phone}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    required
                    placeholder="Full name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={form.customerPhone}
                    onChange={handleChange}
                    required
                    placeholder="98765 43210"
                    className={inputClass}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Service *</label>
              <select
                name="serviceId"
                value={form.serviceId}
                onChange={handleChange}
                required
                className={`${inputClass} appearance-none`}
              >
                <option value="">Select service...</option>
                {serviceOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — ₹{s.price} ({s.duration} min)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Time *</label>
                <select
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                  className={`${inputClass} appearance-none`}
                >
                  <option value="">Select time...</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
                <select
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none`}
                >
                  {SOURCES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Assign Stylist
              </label>
              <select
                name="stylistId"
                value={form.stylistId}
                onChange={handleChange}
                className={`${inputClass} appearance-none`}
              >
                <option value="">Auto-assign</option>
                {staffOptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} {s.designation ? `— ${s.designation}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special requests..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? 'Creating...' : 'Create Appointment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
