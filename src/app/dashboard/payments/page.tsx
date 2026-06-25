'use client';

import React, { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import PaymentFilters from '@/components/dashboard/billing/PaymentFilters';
import PaymentMobileCards from '@/components/dashboard/billing/PaymentMobileCards';
import PaymentsTable from '@/components/dashboard/billing/PaymentsTable';
import { getPayments } from '@/lib/billing-api';
import { filterPayments, formatCurrency } from '@/lib/billing-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { PaymentMode, PaymentStatus, SalonPayment } from '@/types/billing';

export default function PaymentsPage() {
  return (
    <RoutePermissionGuard>
      <PaymentsContent />
    </RoutePermissionGuard>
  );
}

function PaymentsContent() {
  const [payments, setPayments] = useState<SalonPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('');
  const [status, setStatus] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setPayments(await getPayments());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterPayments(payments, {
    search,
    mode: (mode || undefined) as PaymentMode | undefined,
    status: (status || undefined) as PaymentStatus | undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  const completed = payments.filter((payment) => payment.status === 'completed');
  const totals = {
    total: completed.reduce((sum, payment) => sum + payment.amount, 0),
    cash: completed
      .filter((payment) => payment.mode === 'cash')
      .reduce((sum, payment) => sum + payment.amount, 0),
    upi: completed
      .filter((payment) => payment.mode === 'upi')
      .reduce((sum, payment) => sum + payment.amount, 0),
    card: completed
      .filter((payment) => payment.mode === 'card')
      .reduce((sum, payment) => sum + payment.amount, 0),
    pendingFailed: payments.filter((payment) => ['pending', 'failed'].includes(payment.status))
      .length,
  };

  function clearFilters() {
    setSearch('');
    setMode('');
    setStatus('');
    setDateFrom('');
    setDateTo('');
  }

  if (loading) return <DashboardLoading message="Loading payments..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Payments</h1>
          {isMockModeEnabled() ? (
            <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 text-[10px] font-semibold">
              Demo data
            </span>
          ) : null}
        </div>
        <p className="text-sm text-gray-500 mt-0.5">
          Track collections, payment modes, dues and transaction references.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ['Total Collection', formatCurrency(totals.total), 'text-gray-900'],
          ['Cash', formatCurrency(totals.cash), 'text-green-600'],
          ['UPI', formatCurrency(totals.upi), 'text-primary'],
          ['Card', formatCurrency(totals.card), 'text-blue-600'],
          ['Pending/Failed', totals.pendingFailed, 'text-amber-600'],
        ].map(([label, value, className]) => (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">{label}</p>
            <p className={`text-xl font-bold mt-1 ${className}`}>{value}</p>
          </div>
        ))}
      </div>

      <PaymentFilters
        search={search}
        mode={mode}
        status={status}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={setSearch}
        onModeChange={setMode}
        onStatusChange={setStatus}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onClear={clearFilters}
      />

      {filtered.length === 0 ? (
        <DashboardEmpty title="No payments found" description="Try adjusting filters." />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <PaymentsTable payments={filtered} />
          <PaymentMobileCards payments={filtered} />
        </div>
      )}
    </div>
  );
}
