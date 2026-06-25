import Icon from '@/components/ui/AppIcon';
import type { TodayAppointment } from '@/types/dashboard-overview';

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-blue-50 text-blue-700',
  checked_in: 'bg-green-50 text-green-700',
  in_service: 'bg-purple-50 text-purple-700',
  completed: 'bg-gray-100 text-gray-500',
  pending: 'bg-amber-50 text-amber-700',
  cancelled: 'bg-red-50 text-red-600',
};

export default function TodayAppointmentsCard({
  appointments,
}: {
  appointments: TodayAppointment[];
}) {
  if (appointments.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Today&apos;s Appointments</h3>
        <span className="text-xs text-gray-400">{appointments.length} total</span>
      </div>
      <div className="divide-y divide-gray-100">
        {appointments.map((apt) => (
          <div key={apt.id} className="px-5 py-3 flex items-center gap-4">
            <div className="text-center shrink-0 w-14">
              <p className="text-xs font-bold text-gray-900">{apt.time}</p>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{apt.customerName}</p>
              <p className="text-xs text-gray-500">
                {apt.service} · {apt.stylistName}
              </p>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[apt.status] ?? STATUS_STYLES.pending}`}
            >
              {apt.status.replace('_', ' ')}
            </span>
            {apt.amount ? (
              <span className="text-xs font-medium text-gray-600 hidden sm:block">
                ₹{apt.amount.toLocaleString('en-IN')}
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
