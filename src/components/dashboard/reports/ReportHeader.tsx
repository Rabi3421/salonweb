import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { ReportDateRange } from '@/types/reports';

export default function ReportHeader({
  title,
  subtitle,
  dateRange,
}: {
  title: string;
  subtitle: string;
  dateRange?: ReportDateRange;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {isMockModeEnabled() ? (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
            Demo data
          </span>
        ) : null}
      </div>
      <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
      {dateRange ? (
        <p className="mt-1 text-xs text-gray-400">
          {dateRange.label}: {dateRange.dateFrom} to {dateRange.dateTo}
        </p>
      ) : null}
    </div>
  );
}
