'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import { createCustomer } from '@/lib/customers-api';
import { canCreateCustomer } from '@/lib/customer-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { CustomerSource, CustomerGender } from '@/types/customers';

const SOURCES: { value: CustomerSource; label: string }[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'walk_in', label: 'Walk-In' },
  { value: 'website', label: 'Website' },
  { value: 'referral', label: 'Referral' },
];

const GENDERS: { value: CustomerGender; label: string }[] = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
  { value: 'not_specified', label: 'Prefer not to say' },
];

export default function NewCustomerPage() {
  const user = useDashboardUser();
  if (!canCreateCustomer(user.role)) return <PermissionDenied />;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'not_specified' as CustomerGender,
    dateOfBirth: '',
    anniversaryDate: '',
    address: '',
    city: '',
    source: 'dashboard' as CustomerSource,
    notes: '',
    allergies: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

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
      await createCustomer({
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth || undefined,
        anniversaryDate: form.anniversaryDate || undefined,
        address: form.address || undefined,
        city: form.city || undefined,
        source: form.source,
        notes: form.notes || undefined,
        allergies: form.allergies || undefined,
      });
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Customer created successfully (demo mode).'
          : 'Customer created successfully.',
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
          href="/dashboard/customers"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add Customer</h1>
          <p className="text-sm text-gray-500">Create a new client profile.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {result?.success ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={28} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.text}</h3>
            <div className="flex gap-3 justify-center mt-4">
              <Link
                href="/dashboard/customers"
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Icon name="ArrowLeftIcon" size={14} className="text-primary" />
                Back to Customers
              </Link>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setForm({
                    name: '',
                    phone: '',
                    email: '',
                    gender: 'not_specified',
                    dateOfBirth: '',
                    anniversaryDate: '',
                    address: '',
                    city: '',
                    source: 'dashboard',
                    notes: '',
                    allergies: '',
                  });
                }}
                className="text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Add Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {result && !result.success ? (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
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
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {GENDERS.map((g) => (
                    <option key={g.value} value={g.value}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Birthday</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Anniversary
                </label>
                <input
                  type="date"
                  name="anniversaryDate"
                  value={form.anniversaryDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Source</label>
                <select
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className={inputClass}
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Allergies</label>
              <input
                type="text"
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                placeholder="Any known allergies"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Any special notes..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? 'Creating...' : 'Create Customer'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
