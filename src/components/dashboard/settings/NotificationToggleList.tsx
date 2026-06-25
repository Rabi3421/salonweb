'use client';

import type { NotificationPreferences } from '@/types/settings';

const labels: Array<[keyof NotificationPreferences, string]> = [
  ['appointmentAlerts', 'Appointment alerts'],
  ['enquiryAlerts', 'Enquiry alerts'],
  ['paymentAlerts', 'Payment alerts'],
  ['emailNotifications', 'Email notifications'],
  ['whatsappNotifications', 'WhatsApp notifications'],
];

export default function NotificationToggleList({
  value,
  disabled,
  onChange,
}: {
  value: NotificationPreferences;
  disabled: boolean;
  onChange: (value: NotificationPreferences) => void;
}) {
  return (
    <div className="space-y-3">
      {labels.map(([key, label]) => (
        <label
          key={key}
          className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3"
        >
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <input
            type="checkbox"
            checked={value[key]}
            disabled={disabled}
            onChange={(event) => onChange({ ...value, [key]: event.target.checked })}
            className="rounded border-gray-300 text-primary focus:ring-primary"
          />
        </label>
      ))}
    </div>
  );
}
