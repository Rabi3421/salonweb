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
import type { SalonProfile } from '@/types/settings';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500';

export default function ProfileSettingsPage() {
  return (
    <RoutePermissionGuard>
      <ProfileSettingsContent />
    </RoutePermissionGuard>
  );
}

function ProfileSettingsContent() {
  const user = useDashboardUser();
  const canEdit = canEditSettings(user.role);
  const [profile, setProfile] = useState<SalonProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings()
      .then((data) => setProfile(data.profile))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const updated = await updateSettings({ profile });
      setProfile(updated.profile);
      setMessage('Profile settings saved.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading profile settings..." />;
  if (error || !profile)
    return <DashboardError message={error || 'Profile settings unavailable.'} />;

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      <Header
        title="Profile Settings"
        subtitle="Salon identity and contact information."
        message={message}
      />
      <SettingsSectionCard title="Salon Profile">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            disabled={!canEdit}
            label="Salon name"
            value={profile.salonName}
            onChange={(value) => setProfile({ ...profile, salonName: value })}
          />
          <Input
            disabled={!canEdit}
            label="Logo URL"
            value={profile.logo ?? ''}
            onChange={(value) => setProfile({ ...profile, logo: value })}
          />
          <Input
            disabled={!canEdit}
            label="Email"
            value={profile.email}
            onChange={(value) => setProfile({ ...profile, email: value })}
          />
          <Input
            disabled={!canEdit}
            label="Phone"
            value={profile.phone}
            onChange={(value) => setProfile({ ...profile, phone: value })}
          />
          <Input
            disabled={!canEdit}
            label="Website"
            value={profile.website ?? ''}
            onChange={(value) => setProfile({ ...profile, website: value })}
          />
        </div>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-gray-700">Description</span>
          <textarea
            disabled={!canEdit}
            rows={4}
            value={profile.description ?? ''}
            onChange={(event) => setProfile({ ...profile, description: event.target.value })}
            className={`${inputClass} resize-none`}
          />
        </label>
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

function Input({
  label,
  value,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}
