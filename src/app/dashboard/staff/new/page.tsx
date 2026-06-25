'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import StaffForm from '@/components/dashboard/staff/StaffForm';
import { createStaff } from '@/lib/staff-api';
import { getServices } from '@/lib/services-api';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { CreateStaffPayload } from '@/types/staff';
import type { SalonService } from '@/types/services';

export default function NewStaffPage() {
  return (
    <RoutePermissionGuard>
      <NewStaffContent />
    </RoutePermissionGuard>
  );
}

function NewStaffContent() {
  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setServices(await getServices());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSubmit(payload: CreateStaffPayload) {
    setSubmitting(true);
    setResult(null);
    setError('');
    try {
      await createStaff(payload);
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Staff member created successfully. Demo mode used mock data.'
          : 'Staff member created successfully.',
      });
    } catch (err) {
      setResult({ success: false, text: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading staff form..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/staff"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Add Staff</h1>
            {isMockModeEnabled() ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-semibold">
                Demo mode
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-500">
            Create a staff profile, schedule and service assignments.
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
              <Link href="/dashboard/staff" className="text-sm font-medium text-primary">
                Back to Staff
              </Link>
              <button
                type="button"
                onClick={() => setResult(null)}
                className="text-sm font-medium text-gray-600"
              >
                Add Another
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {!result?.success ? (
        <StaffForm services={services} onSubmit={handleSubmit} submitting={submitting} />
      ) : null}
    </div>
  );
}
