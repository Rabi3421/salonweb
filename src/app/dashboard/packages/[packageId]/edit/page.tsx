'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import { getPackageById, updatePackage, getServices, getMockServices } from '@/lib/services-api';
import { canEditPackage } from '@/lib/service-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonPackage, PackageStatus } from '@/types/services';

export default function EditPackagePage() {
  const user = useDashboardUser();
  if (!canEditPackage(user.role)) return <PermissionDenied />;

  const params = useParams<{ packageId: string }>();
  const [pkg, setPkg] = useState<SalonPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    status: 'active' as PackageStatus,
    tag: '',
    bestFor: '',
    includedServices: [] as string[],
    validityDays: '',
    isHighlighted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPackageById(params.packageId);
        if (data) {
          setPkg(data);
          setForm({
            name: data.name,
            description: data.description,
            price: String(data.price),
            status: data.status,
            tag: data.tag ?? '',
            bestFor: data.bestFor ?? '',
            includedServices: data.includedServices ?? [],
            validityDays: data.validityDays ? String(data.validityDays) : '',
            isHighlighted: data.isHighlighted ?? false,
          });
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }

    async function loadServiceNames() {
      try {
        const svcs = await getServices();
        setServiceOptions(svcs.map((s) => s.name));
      } catch {
        if (isMockModeEnabled()) {
          setServiceOptions(getMockServices().map((s) => s.name));
        }
      }
    }

    load();
    loadServiceNames();
  }, [params.packageId]);

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

  function toggleService(name: string) {
    setForm((p) => ({
      ...p,
      includedServices: p.includedServices.includes(name)
        ? p.includedServices.filter((s) => s !== name)
        : [...p.includedServices, name],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      await updatePackage(params.packageId, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        status: form.status,
        tag: form.tag || undefined,
        bestFor: form.bestFor || undefined,
        includedServices: form.includedServices,
        validityDays: form.validityDays ? Number(form.validityDays) : undefined,
        isHighlighted: form.isHighlighted,
      });
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Package updated successfully (demo mode).'
          : 'Package updated successfully.',
      });
    } catch (err) {
      setResult({ success: false, text: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading package..." />;
  if (error) return <DashboardError message={error} />;
  if (!pkg) return <DashboardError message="Package not found." />;

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400';

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/packages"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Edit Package</h1>
          <p className="text-sm text-gray-500">{pkg.name}</p>
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
                href="/dashboard/packages"
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Icon name="ArrowLeftIcon" size={14} className="text-primary" />
                Back to Packages
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {result && !result.success && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
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
                  className={inputClass}
                />
              </div>
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={form.tag}
                  onChange={handleChange}
                  placeholder="e.g. Most Popular"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Best For</label>
                <input
                  type="text"
                  name="bestFor"
                  value={form.bestFor}
                  onChange={handleChange}
                  placeholder="e.g. Bride-to-be"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Validity (days)
                </label>
                <input
                  type="number"
                  name="validityDays"
                  value={form.validityDays}
                  onChange={handleChange}
                  min="1"
                  className={inputClass}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isHighlighted"
                    checked={form.isHighlighted}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="text-sm text-gray-700">Highlighted package</span>
                </label>
              </div>
            </div>

            {serviceOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Included Services
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => toggleService(name)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                        form.includedServices.includes(name)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
