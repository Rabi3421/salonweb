'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import AppointmentStatusBadge from '@/components/dashboard/appointments/AppointmentStatusBadge';
import { getMockAppointments } from '@/lib/appointments-api';
import { canManageAppointments } from '@/lib/appointment-utils';
import type { SalonAppointment } from '@/types/appointments';

export default function AppointmentsCalendarPage() {
  const user = useDashboardUser();
  const [appointments, setAppointments] = useState<SalonAppointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  if (!canManageAppointments(user.role)) return <PermissionDenied />;

  useEffect(() => {
    setAppointments(getMockAppointments(user.role));
    setLoading(false);
  }, [user.role]);

  const filtered = appointments.filter((a) => a.date === selectedDate);

  if (loading) return <DashboardLoading message="Loading calendar..." />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Appointment Calendar</h1>
          <p className="text-sm text-gray-500 mt-0.5">Day schedule view</p>
        </div>
        <Link
          href="/dashboard/appointments"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Icon name="ListBulletIcon" size={16} className="text-gray-500" />
          List View
        </Link>
      </div>

      {/* Date selector */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <span className="ml-3 text-sm text-gray-500">
          {new Date(selectedDate).toLocaleDateString('en-IN', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </span>
      </div>

      {/* Timeline */}
      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No appointments for this date"
          description="Select a different date or create a new appointment."
          icon="CalendarIcon"
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((apt) => (
            <Link
              key={apt.id}
              href={`/dashboard/appointments/${apt.id}`}
              className="block bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-primary/20 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="text-center shrink-0 w-16 pt-1">
                  <p className="text-lg font-bold text-gray-900">{apt.startTime.split(' ')[0]}</p>
                  <p className="text-[10px] text-gray-400 uppercase">
                    {apt.startTime.split(' ')[1]}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">{apt.customer.name}</p>
                    <AppointmentStatusBadge status={apt.status} />
                  </div>
                  <p className="text-sm text-gray-500">
                    {apt.services.map((s) => s.name).join(', ')}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {apt.stylist?.name ?? 'Unassigned'} · ₹{apt.totalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <Icon name="ChevronRightIcon" size={16} className="text-gray-300 shrink-0 mt-2" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
