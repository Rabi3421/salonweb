'use client';

import { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import BusinessHoursEditor from '@/components/dashboard/settings/BusinessHoursEditor';
import SettingsFormActions from '@/components/dashboard/settings/SettingsFormActions';
import SettingsSectionCard from '@/components/dashboard/settings/SettingsSectionCard';
import { getSettings, updateSettings } from '@/lib/settings-api';
import { canEditSettings } from '@/lib/settings-utils';
import type { BusinessHours } from '@/types/settings';

export default function BusinessSettingsPage() {
  return (
    <RoutePermissionGuard>
      <BusinessSettingsContent />
    </RoutePermissionGuard>
  );
}

function BusinessSettingsContent() {
  const user = useDashboardUser();
  const canEdit = canEditSettings(user.role);
  const [business, setBusiness] = useState<BusinessHours | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings()
      .then((data) => setBusiness(data.business))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!business) return;
    setSaving(true);
    try {
      const updated = await updateSettings({ business });
      setBusiness(updated.business);
      setMessage('Business settings saved.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading business settings..." />;
  if (error || !business)
    return <DashboardError message={error || 'Business settings unavailable.'} />;

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      <Header
        title="Business Settings"
        subtitle="Address, GST, operating hours and weekly off."
        message={message}
      />
      <SettingsSectionCard title="Business Details">
        <BusinessHoursEditor value={business} disabled={!canEdit} onChange={setBusiness} />
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
