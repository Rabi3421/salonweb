'use client';

import type { ReportFilterParams } from '@/types/reports';

export default function ReportDateRangeFilter({
  filters,
  onChange,
}: {
  filters: ReportFilterParams;
  onChange: (filters: ReportFilterParams) => void;
}) {
  const inputClass =
    'px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[180px_1fr_1fr]">
        <select
          value={filters.period ?? 'month'}
          onChange={(event) =>
            onChange({ ...filters, period: event.target.value as ReportFilterParams['period'] })
          }
          className={inputClass}
        >
          <option value="today">Today</option>
          <option value="week">Last 7 days</option>
          <option value="month">Last 30 days</option>
          <option value="quarter">Last 90 days</option>
          <option value="year">Last year</option>
          <option value="custom">Custom</option>
        </select>
        <input
          type="date"
          value={filters.dateFrom ?? ''}
          onChange={(event) =>
            onChange({ ...filters, period: 'custom', dateFrom: event.target.value })
          }
          className={inputClass}
        />
        <input
          type="date"
          value={filters.dateTo ?? ''}
          onChange={(event) =>
            onChange({ ...filters, period: 'custom', dateTo: event.target.value })
          }
          className={inputClass}
        />
      </div>
    </div>
  );
}
