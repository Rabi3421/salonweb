'use client';

import { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import SettingsFormActions from '@/components/dashboard/settings/SettingsFormActions';
import SettingsSectionCard from '@/components/dashboard/settings/SettingsSectionCard';
import { getSettings, updateSettings } from '@/lib/settings-api';
import { canEditSettings } from '@/lib/settings-utils';
import type { BookingRules } from '@/types/settings';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500';

export default function BookingSettingsPage() {
  return (
    <RoutePermissionGuard>
      <BookingSettingsContent />
    </RoutePermissionGuard>
  );
}

function BookingSettingsContent() {
  const user = useDashboardUser();
  const canEdit = canEditSettings(user.role);
  const [booking, setBooking] = useState<BookingRules | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings()
      .then((data) => setBooking(data.booking))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!booking) return;
    setSaving(true);
    try {
      const updated = await updateSettings({ booking });
      setBooking(updated.booking);
      setMessage('Booking settings saved.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading booking settings..." />;
  if (error || !booking)
    return <DashboardError message={error || 'Booking settings unavailable.'} />;

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      <Header
        title="Booking Settings"
        subtitle="Appointment slots, advance window and booking rules."
        message={message}
      />
      <SettingsSectionCard title="Booking Rules">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NumberInput
            disabled={!canEdit}
            label="Slot duration (min)"
            value={booking.slotDuration}
            onChange={(value) => setBooking({ ...booking, slotDuration: value })}
          />
          <NumberInput
            disabled={!canEdit}
            label="Advance booking days"
            value={booking.advanceBookingDays}
            onChange={(value) => setBooking({ ...booking, advanceBookingDays: value })}
          />
          <NumberInput
            disabled={!canEdit}
            label="Cancellation window (hrs)"
            value={booking.cancellationWindow}
            onChange={(value) => setBooking({ ...booking, cancellationWindow: value })}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Toggle
            disabled={!canEdit}
            label="Auto-confirm appointments"
            checked={booking.autoConfirm}
            onChange={(value) => setBooking({ ...booking, autoConfirm: value })}
          />
          <Toggle
            disabled={!canEdit}
            label="Allow walk-ins"
            checked={booking.allowWalkIns}
            onChange={(value) => setBooking({ ...booking, allowWalkIns: value })}
          />
        </div>
      </SettingsSectionCard>
      <SettingsFormActions canEdit={canEdit} submitting={saving} />
    </form>
  );
}

function Header({
  title,
  subtitle,
  message,
}: {
  title: string;
  subtitle: string;
  message: string;
}) {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
      {message ? <p className="mt-2 text-sm font-medium text-primary">{message}</p> : null}
    </div>
  );
}

function NumberInput({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  disabled: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        type="number"
        min="0"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={inputClass}
      />
    </label>
  );
}

function Toggle({
  label,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
      {label}
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="rounded border-gray-300 text-primary focus:ring-primary"
      />
    </label>
  );
}
