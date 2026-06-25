'use client';

import type { BusinessHours } from '@/types/settings';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-50 disabled:text-gray-500';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function BusinessHoursEditor({
  value,
  disabled,
  onChange,
}: {
  value: BusinessHours;
  disabled: boolean;
  onChange: (value: BusinessHours) => void;
}) {
  function toggleDay(day: string) {
    const weeklyOff = value.weeklyOff.includes(day)
      ? value.weeklyOff.filter((item) => item !== day)
      : [...value.weeklyOff, day];
    onChange({ ...value, weeklyOff });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          disabled={disabled}
          value={value.address}
          onChange={(event) => onChange({ ...value, address: event.target.value })}
          className={inputClass}
          placeholder="Address"
        />
        <input
          disabled={disabled}
          value={value.city}
          onChange={(event) => onChange({ ...value, city: event.target.value })}
          className={inputClass}
          placeholder="City"
        />
        <input
          disabled={disabled}
          value={value.state}
          onChange={(event) => onChange({ ...value, state: event.target.value })}
          className={inputClass}
          placeholder="State"
        />
        <input
          disabled={disabled}
          value={value.pincode}
          onChange={(event) => onChange({ ...value, pincode: event.target.value })}
          className={inputClass}
          placeholder="Pincode"
        />
        <input
          disabled={disabled}
          value={value.gstNumber ?? ''}
          onChange={(event) => onChange({ ...value, gstNumber: event.target.value })}
          className={inputClass}
          placeholder="GST number"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            disabled={disabled}
            type="time"
            value={value.openingHours}
            onChange={(event) => onChange({ ...value, openingHours: event.target.value })}
            className={inputClass}
          />
          <input
            disabled={disabled}
            type="time"
            value={value.closingHours}
            onChange={(event) => onChange({ ...value, closingHours: event.target.value })}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Weekly off</p>
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() => toggleDay(day)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                value.weeklyOff.includes(day)
                  ? 'border-primary/20 bg-primary/10 text-primary'
                  : 'border-gray-200 bg-gray-50 text-gray-600'
              } disabled:opacity-70`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
