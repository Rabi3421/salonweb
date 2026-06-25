import Icon from '@/components/ui/AppIcon';
import type { RevenueSummary } from '@/types/dashboard-overview';

function fmtINR(n: number) {
  return '₹' + n.toLocaleString('en-IN');
}

export default function RevenueSnapshotCard({ revenue }: { revenue: RevenueSummary }) {
  if (!revenue.todayCollection && !revenue.monthCollection) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue Snapshot</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Today Collection</span>
          <span className="text-sm font-bold text-green-600">
            {fmtINR(revenue.todayCollection)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Monthly Collection</span>
          <span className="text-sm font-bold text-gray-900">{fmtINR(revenue.monthCollection)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Pending Dues</span>
          <span className="text-sm font-bold text-amber-600">{fmtINR(revenue.pendingDues)}</span>
        </div>
        {revenue.paymentModes.length > 0 ? (
          <div className="pt-3 border-t border-gray-100">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
              By Payment Mode
            </p>
            <div className="flex gap-3">
              {revenue.paymentModes.map((pm) => (
                <div key={pm.mode} className="flex-1 bg-gray-50 rounded-xl p-2.5 text-center">
                  <p className="text-xs font-bold text-gray-900">{fmtINR(pm.amount)}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{pm.mode}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
