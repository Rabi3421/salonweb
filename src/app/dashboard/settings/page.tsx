'use client';

import Link from 'next/link';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import { canViewSettingsSection } from '@/lib/settings-utils';

const cards = [
  [
    'profile',
    'Profile Settings',
    'Salon name, logo, contact and description.',
    '/dashboard/settings/profile',
  ],
  [
    'business',
    'Business Settings',
    'Address, GST, hours and weekly off.',
    '/dashboard/settings/business',
  ],
  [
    'booking',
    'Booking Settings',
    'Slots, booking window and confirmation rules.',
    '/dashboard/settings/booking',
  ],
  [
    'notifications',
    'Notification Settings',
    'Appointment, enquiry, payment, email and WhatsApp alerts.',
    '/dashboard/settings/notifications',
  ],
];

export default function SettingsPage() {
  return (
    <RoutePermissionGuard>
      <SettingsContent />
    </RoutePermissionGuard>
  );
}

function SettingsContent() {
  const user = useDashboardUser();
  const visibleCards = cards.filter(([section]) => canViewSettingsSection(user.role, section));

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Manage salon configuration, booking rules and notifications.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visibleCards.map(([section, title, description, href]) => (
          <Link
            key={section}
            href={href}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:border-primary/30"
          >
            <h2 className="font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
            <span className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">
              Open
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
