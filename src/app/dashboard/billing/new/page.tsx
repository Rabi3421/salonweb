'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import BillForm from '@/components/dashboard/billing/BillForm';
import { createBill } from '@/lib/billing-api';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import { getPackages, getServices } from '@/lib/services-api';
import type { CreateBillPayload } from '@/types/billing';
import type { SalonPackage, SalonService } from '@/types/services';

export default function NewBillPage() {
  return (
    <RoutePermissionGuard>
      <NewBillContent />
    </RoutePermissionGuard>
  );
}

function NewBillContent() {
  const [services, setServices] = useState<SalonService[]>([]);
  const [packages, setPackages] = useState<SalonPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [serviceData, packageData] = await Promise.all([getServices(), getPackages()]);
        setServices(serviceData);
        setPackages(packageData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(payload: CreateBillPayload) {
    setSubmitting(true);
    setResult(null);
    try {
      await createBill(payload);
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Bill created successfully. Demo mode used mock data.'
          : 'Bill created successfully.',
      });
    } catch (err) {
      setResult({ success: false, text: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading bill form..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/billing"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Create Bill</h1>
            {isMockModeEnabled() ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-semibold">
                Demo mode
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-500">
            Create a simple POS-style bill for services or packages.
          </p>
        </div>
      </div>

      {result ? (
        <div
          className={`rounded-2xl border px-5 py-4 text-sm ${
            result.success
              ? 'bg-green-50 border-green-200 text-green-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          <p className="font-medium">{result.text}</p>
          {result.success ? (
            <div className="flex flex-wrap gap-3 mt-3">
              <Link href="/dashboard/billing" className="text-sm font-medium text-primary">
                Back to Billing
              </Link>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="text-sm font-medium text-gray-600"
              >
                Create Another
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {!result?.success ? (
        <BillForm
          services={services}
          packages={packages}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      ) : null}
    </div>
  );
}
