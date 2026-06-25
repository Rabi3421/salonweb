'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import AppointmentStatusBadge from '@/components/dashboard/appointments/AppointmentStatusBadge';
import { getAppointments, getMockAppointments } from '@/lib/appointments-api';
import {
  canManageAppointments,
  canCreateAppointment,
  STATUS_LABELS,
} from '@/lib/appointment-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonAppointment, AppointmentStatus } from '@/types/appointments';

const ALL_STATUSES: AppointmentStatus[] = [
  'requested',
  'confirmed',
  'checked_in',
  'in_service',
  'completed',
  'cancelled',
  'no_show',
];

export default function AppointmentsListPage() {
  const user = useDashboardUser();
  const [appointments, setAppointments] = useState<SalonAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  if (!canManageAppointments(user.role)) return <PermissionDenied />;

  useEffect(() => {
    async function load() {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (e) {
        if (isMockModeEnabled()) {
          setAppointments(getMockAppointments(user.role));
        } else {
          setError((e as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.role]);

  const filtered = appointments.filter((a) => {
    if (statusFilter && a.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !a.customer.name.toLowerCase().includes(q) &&
        !a.customer.phone.includes(q) &&
        !a.services.some((s) => s.name.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });

  const counts = {
    requested: appointments.filter((a) => a.status === 'requested').length,
    confirmed: appointments.filter((a) => a.status === 'confirmed').length,
    in_service: appointments.filter((a) => a.status === 'in_service').length,
    completed: appointments.filter((a) => a.status === 'completed').length,
  };

  if (loading) return <DashboardLoading message="Loading appointments..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage bookings, walk-ins, confirmations and service flow.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/dashboard/appointments/calendar"
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Icon name="CalendarIcon" size={16} className="text-gray-500" />
            Calendar
          </Link>
          {canCreateAppointment(user.role) ? (
            <Link
              href="/dashboard/appointments/new"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Icon name="PlusIcon" size={16} className="text-white" />
              New Appointment
            </Link>
          ) : null}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Requested', value: counts.requested, color: 'text-amber-600' },
          { label: 'Confirmed', value: counts.confirmed, color: 'text-blue-600' },
          { label: 'In Service', value: counts.in_service, color: 'text-indigo-600' },
          { label: 'Completed', value: counts.completed, color: 'text-green-600' },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">{c.label}</p>
            <p className={`text-2xl font-bold mt-1 ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer, phone, service..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All statuses</option>
          {ALL_STATUSES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No appointments found"
          description="Try adjusting your filters or create a new appointment."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-500">Time</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Services</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Stylist</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">{apt.startTime}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{apt.customer.name}</p>
                      <p className="text-xs text-gray-400">{apt.customer.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {apt.services.map((s) => s.name).join(', ')}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{apt.stylist?.name ?? '—'}</td>
                    <td className="px-4 py-3">
                      <AppointmentStatusBadge status={apt.status} />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      ₹{apt.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/appointments/${apt.id}`}
                        className="text-xs font-medium text-primary hover:text-primary/80"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((apt) => (
              <Link
                key={apt.id}
                href={`/dashboard/appointments/${apt.id}`}
                className="block px-4 py-3 hover:bg-gray-50/50"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{apt.startTime}</span>
                  <AppointmentStatusBadge status={apt.status} />
                </div>
                <p className="text-sm font-medium text-gray-900">{apt.customer.name}</p>
                <p className="text-xs text-gray-500">
                  {apt.services.map((s) => s.name).join(', ')} · {apt.stylist?.name ?? 'Unassigned'}
                </p>
                <p className="text-xs font-medium text-primary mt-1">
                  ₹{apt.totalAmount.toLocaleString('en-IN')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isMockModeEnabled() ? (
        <p className="text-center text-[10px] text-amber-500 font-medium">Demo data</p>
      ) : null}
    </div>
  );
}
