'use client';

import React, { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import EnquiryFilters from '@/components/dashboard/enquiries/EnquiryFilters';
import EnquiryMobileCards from '@/components/dashboard/enquiries/EnquiryMobileCards';
import EnquirySummaryCards from '@/components/dashboard/enquiries/EnquirySummaryCards';
import EnquiriesTable from '@/components/dashboard/enquiries/EnquiriesTable';
import { getEnquiries } from '@/lib/enquiries-api';
import { filterEnquiries } from '@/lib/enquiry-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type {
  EnquiryPriority,
  EnquirySource,
  EnquiryStatus,
  EnquiryType,
  SalonEnquiry,
} from '@/types/enquiries';

export default function EnquiriesPage() {
  return (
    <RoutePermissionGuard>
      <EnquiriesContent />
    </RoutePermissionGuard>
  );
}

function EnquiriesContent() {
  const [enquiries, setEnquiries] = useState<SalonEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [source, setSource] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setEnquiries(await getEnquiries());
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterEnquiries(enquiries, {
    search,
    type: (type || undefined) as EnquiryType | undefined,
    status: (status || undefined) as EnquiryStatus | undefined,
    priority: (priority || undefined) as EnquiryPriority | undefined,
    source: (source || undefined) as EnquirySource | undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  function clearFilters() {
    setSearch('');
    setType('');
    setStatus('');
    setPriority('');
    setSource('');
    setDateFrom('');
    setDateTo('');
  }

  if (loading) return <DashboardLoading message="Loading enquiries..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Enquiries</h1>
          {isMockModeEnabled() ? (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
              Demo data
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Track website leads, appointment requests and follow-ups.
        </p>
      </div>

      <EnquirySummaryCards enquiries={enquiries} />
      <EnquiryFilters
        search={search}
        type={type}
        status={status}
        priority={priority}
        source={source}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={setSearch}
        onTypeChange={setType}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
        onSourceChange={setSource}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onClear={clearFilters}
      />

      {filtered.length === 0 ? (
        <DashboardEmpty title="No enquiries found" description="Try adjusting filters." />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <EnquiriesTable enquiries={filtered} />
          <EnquiryMobileCards enquiries={filtered} />
        </div>
      )}
    </div>
  );
}
