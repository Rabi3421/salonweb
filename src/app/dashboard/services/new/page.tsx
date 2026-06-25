'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import { createService } from '@/lib/services-api';
import { getStaff } from '@/lib/staff-api';
import { canCreateService, getServiceCategoryOptions } from '@/lib/service-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { ServiceCategory, ServiceStatus } from '@/types/services';

export default function NewServicePage() {
  const user = useDashboardUser();
  if (!canCreateService(user.role)) return <PermissionDenied />;

  const [staffOptions, setStaffOptions] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    category: 'Hair' as ServiceCategory,
    description: '',
    price: '',
    duration: '',
    status: 'active' as ServiceStatus,
    isFeatured: false,
    assignedStaff: [] as string[],
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    getStaff().then((st) => setStaffOptions(st.map((s) => s.name))).catch(() => {});
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  }

  function toggleStaff(name: string) {
    setForm((p) => ({
      ...p,
      assignedStaff: p.assignedStaff.includes(name)
        ? p.assignedStaff.filter((s) => s !== name)
        : [...p.assignedStaff, name],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      await createService({
        name: form.name,
        category: form.category,
        description: form.description,
        price: Number(form.price),
        duration: Number(form.duration),
        status: form.status,
        isFeatured: form.isFeatured,
      });
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Service created successfully (demo mode).'
          : 'Service created successfully.',
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
          href="/dashboard/services"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add Service</h1>
          <p className="text-sm text-gray-500">Create a new salon service.</p>
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
                href="/dashboard/services"
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Icon name="ArrowLeftIcon" size={14} className="text-primary" />
                Back to Services
              </Link>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setForm({
                    name: '',
                    category: 'Hair',
                    description: '',
                    price: '',
                    duration: '',
                    status: 'active',
                    isFeatured: false,
                    assignedStaff: [],
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
            {result && !result.success && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Service name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {getServiceCategoryOptions().map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe the service..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g. 1500"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Duration (min) *
                </label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                  min="5"
                  step="5"
                  placeholder="e.g. 60"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={form.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-gray-700">Featured service</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Assigned Staff
              </label>
              <div className="flex flex-wrap gap-2">
                {staffOptions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => toggleStaff(name)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      form.assignedStaff.includes(name)
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? 'Creating...' : 'Create Service'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
