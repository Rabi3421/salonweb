import { Card } from '@/components/dashboard/staff/StaffInfoCard';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffScheduleCard({ staff }: { staff: SalonStaffMember }) {
  return (
    <Card title="Working Schedule">
      <div className="space-y-2">
        {staff.workingDays.map((day) => (
          <div
            key={day.day}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 rounded-xl bg-gray-50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 w-24">{day.day}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                  day.isWorking ? 'bg-green-50 text-green-700' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {day.isWorking ? 'Working' : 'Off'}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {day.isWorking
                ? `${day.startTime} - ${day.endTime}${day.breakStart ? ` · Break ${day.breakStart} - ${day.breakEnd}` : ''}`
                : 'Not available'}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
