import type { StaffSnapshot } from '@/types/dashboard-overview';

export default function StaffSnapshotCard({ staff }: { staff: StaffSnapshot }) {
  if (!staff.totalStaff) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Staff Today</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-gray-900">{staff.availableToday}</p>
          <p className="text-[10px] text-gray-500">Available</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-primary">{staff.busyNow}</p>
          <p className="text-[10px] text-gray-500">Busy</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-gray-900">{staff.totalStaff}</p>
          <p className="text-[10px] text-gray-500">Total Staff</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-amber-600">{staff.onLeave}</p>
          <p className="text-[10px] text-gray-500">On Leave</p>
        </div>
      </div>
    </div>
  );
}
