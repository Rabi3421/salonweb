'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { STATUS_LABELS } from '@/lib/appointment-utils';
import type { AppointmentStatus } from '@/types/appointments';

interface AppointmentStatusActionsProps {
  allowed: AppointmentStatus[];
  onUpdate: (status: AppointmentStatus) => Promise<void>;
}

export default function AppointmentStatusActions({
  allowed,
  onUpdate,
}: AppointmentStatusActionsProps) {
  const [loading, setLoading] = useState(false);

  if (allowed.length === 0) return null;

  async function handleUpdate(status: AppointmentStatus) {
    setLoading(true);
    await onUpdate(status);
    setLoading(false);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {allowed.map((s) => {
        const isDestructive = s === 'cancelled' || s === 'no_show';
        return (
          <button
            key={s}
            type="button"
            disabled={loading}
            onClick={() => handleUpdate(s)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors disabled:opacity-50 ${
              isDestructive
                ? 'border-red-200 text-red-600 hover:bg-red-50'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-primary/30'
            }`}
          >
            {STATUS_LABELS[s]}
          </button>
        );
      })}
    </div>
  );
}
