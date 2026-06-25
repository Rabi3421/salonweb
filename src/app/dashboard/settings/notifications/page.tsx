'use client';

import { useEffect, useState } from 'react';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardLoading from '@/components/dashboard/LoadingState';
import NotificationToggleList from '@/components/dashboard/settings/NotificationToggleList';
import SettingsFormActions from '@/components/dashboard/settings/SettingsFormActions';
import SettingsSectionCard from '@/components/dashboard/settings/SettingsSectionCard';
import { getSettings, updateSettings } from '@/lib/settings-api';
import { canEditSettings } from '@/lib/settings-utils';
import type { NotificationPreferences } from '@/types/settings';

export default function NotificationSettingsPage() {
  return (
    <RoutePermissionGuard>
      <NotificationSettingsContent />
    </RoutePermissionGuard>
  );
}

function NotificationSettingsContent() {
  const user = useDashboardUser();
  const canEdit = canEditSettings(user.role);
  const [notifications, setNotifications] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings()
      .then((data) => setNotifications(data.notifications))
      .catch((err) => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    if (!notifications) return;
    setSaving(true);
    try {
      const updated = await updateSettings({ notifications });
      setNotifications(updated.notifications);
      setMessage('Notification settings saved.');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading notification settings..." />;
  if (error || !notifications)
    return <DashboardError message={error || 'Notification settings unavailable.'} />;

  return (
    <form onSubmit={save} className="max-w-4xl space-y-6">
      <Header
        title="Notification Settings"
        subtitle="Control operational alerts and delivery channels."
        message={message}
      />
      <SettingsSectionCard title="Notifications">
        <NotificationToggleList
          value={notifications}
          disabled={!canEdit}
          onChange={setNotifications}
        />
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
