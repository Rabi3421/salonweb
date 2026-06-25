'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import BillFilters from '@/components/dashboard/billing/BillFilters';
import BillingSummaryCards from '@/components/dashboard/billing/BillingSummaryCards';
import BillMobileCards from '@/components/dashboard/billing/BillMobileCards';
import BillsTable from '@/components/dashboard/billing/BillsTable';
import { getBills } from '@/lib/billing-api';
import { canCreateBill, canRecordPayment, filterBills } from '@/lib/billing-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { BillStatus, PaymentMode, SalonBill } from '@/types/billing';

export default function BillingPage() {
  return (
    <RoutePermissionGuard>
      <BillingContent />
    </RoutePermissionGuard>
  );
}

function BillingContent() {
  const user = useDashboardUser();
  const [bills, setBills] = useState<SalonBill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setBills(await getBills());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterBills(bills, {
    search,
    status: (status || undefined) as BillStatus | undefined,
    paymentMode: (paymentMode || undefined) as PaymentMode | undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  function clearFilters() {
    setSearch('');
    setStatus('');
    setPaymentMode('');
    setDateFrom('');
    setDateTo('');
  }

  if (loading) return <DashboardLoading message="Loading bills..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-gray-900">Billing</h1>
            {isMockModeEnabled() ? (
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-semibold">
                Demo data
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            Create bills, track dues, and manage salon collections.
          </p>
        </div>
        {canCreateBill(user.role) ? (
          <Link
            href="/dashboard/billing/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={16} className="text-white" />
            Create Bill
          </Link>
        ) : null}
      </div>

      <BillingSummaryCards bills={bills} />
      <BillFilters
        search={search}
        status={status}
        paymentMode={paymentMode}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onPaymentModeChange={setPaymentMode}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onClear={clearFilters}
      />

      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No bills found"
          description="Try adjusting filters or create a new bill."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <BillsTable bills={filtered} canRecordPayment={canRecordPayment(user.role)} />
          <BillMobileCards bills={filtered} />
        </div>
      )}
    </div>
  );
}
