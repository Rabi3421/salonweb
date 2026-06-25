'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import AppointmentStatusBadge from '@/components/dashboard/appointments/AppointmentStatusBadge';
import AppointmentStatusActions from '@/components/dashboard/appointments/AppointmentStatusActions';
import {
  getAppointmentById,
  getMockAppointmentById,
  updateAppointmentStatus,
} from '@/lib/appointments-api';
import {
  canManageAppointments,
  getNextAllowedStatuses,
  STATUS_LABELS,
} from '@/lib/appointment-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonAppointment, AppointmentStatus } from '@/types/appointments';

export default function AppointmentDetailPage() {
  const user = useDashboardUser();
  const params = useParams<{ appointmentId: string }>();
  const [appointment, setAppointment] = useState<SalonAppointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  if (!canManageAppointments(user.role)) return <PermissionDenied />;

  useEffect(() => {
    async function load() {
      try {
        const data = await getAppointmentById(params.appointmentId);
        if (!data && isMockModeEnabled()) {
          setAppointment(getMockAppointmentById(params.appointmentId));
        } else {
          setAppointment(data);
        }
      } catch (e) {
        if (isMockModeEnabled()) {
          setAppointment(getMockAppointmentById(params.appointmentId));
        } else {
          setError((e as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.appointmentId]);

  async function handleStatusUpdate(newStatus: AppointmentStatus) {
    if (!appointment) return;
    try {
      await updateAppointmentStatus(appointment.id, { status: newStatus });
      setAppointment((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch {
      if (isMockModeEnabled()) {
        setAppointment((prev) => (prev ? { ...prev, status: newStatus } : prev));
      }
    }
  }

  if (loading) return <DashboardLoading message="Loading appointment..." />;
  if (error) return <DashboardError message={error} />;
  if (!appointment) return <DashboardError message="Appointment not found." />;

  const allowed = getNextAllowedStatuses(appointment.status, user.role);

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/appointments"
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">
                {appointment.appointmentNo ?? appointment.id}
              </h1>
              <AppointmentStatusBadge status={appointment.status} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {appointment.date} · {appointment.startTime}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Customer */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">
                  {appointment.customer.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{appointment.customer.name}</p>
                <p className="text-xs text-gray-500">{appointment.customer.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`tel:${appointment.customer.phone}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                <Icon name="PhoneIcon" size={12} className="text-gray-400" />
                Call
              </a>
              <a
                href={`https://wa.me/91${appointment.customer.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                <Icon name="ChatBubbleLeftRightIcon" size={12} className="text-gray-400" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Services</h3>
          <div className="space-y-2 mb-4">
            {appointment.services.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.duration} min</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₹{s.price.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Total</span>
            <span className="text-lg font-bold text-primary">
              ₹{appointment.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Stylist */}
        {appointment.stylist ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Assigned Stylist</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">
                  {appointment.stylist.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{appointment.stylist.name}</p>
                <p className="text-xs text-gray-500">{appointment.stylist.role}</p>
              </div>
            </div>
          </div>
        ) : null}

        {/* Notes */}
        {appointment.notes ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Notes</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{appointment.notes}</p>
          </div>
        ) : null}
      </div>

      {/* Status actions */}
      {allowed.length > 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Update Status</h3>
          <p className="text-xs text-gray-500 mb-3">
            Current: <strong>{STATUS_LABELS[appointment.status]}</strong>
          </p>
          <AppointmentStatusActions allowed={allowed} onUpdate={handleStatusUpdate} />
        </div>
      ) : null}

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>Source: {appointment.source.replace('_', ' ')}</span>
        <span>·</span>
        <span>Created: {appointment.createdAt}</span>
        {isMockModeEnabled() ? (
          <>
            <span>·</span>
            <span className="text-amber-500 font-medium">Demo data</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
