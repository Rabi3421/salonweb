import type { RecentEnquiry } from '@/types/dashboard-overview';

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700',
  in_progress: 'bg-amber-50 text-amber-700',
  resolved: 'bg-green-50 text-green-700',
};

export default function RecentEnquiriesCard({ enquiries }: { enquiries: RecentEnquiry[] }) {
  if (enquiries.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">Recent Enquiries</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {enquiries.map((enq) => (
          <div key={enq.id} className="px-5 py-3 flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-primary text-xs font-bold">{enq.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{enq.name}</p>
              <p className="text-xs text-gray-500">
                {enq.type} · {enq.createdAt}
              </p>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[enq.status] ?? 'bg-gray-100 text-gray-500'}`}
            >
              {enq.status.replace('_', ' ')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
