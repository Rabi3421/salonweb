import Link from 'next/link';

export default function ReportAccessCard({
  title,
  description,
  metric,
  href,
  enabled = true,
}: {
  title: string;
  description: string;
  metric: string;
  href?: string;
  enabled?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
          {enabled ? 'Available' : 'Soon'}
        </span>
      </div>
      <p className="mt-5 text-2xl font-bold text-gray-900">{metric}</p>
      {enabled && href ? (
        <Link
          href={href}
          className="mt-5 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          Open report
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-5 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400"
        >
          Coming soon
        </button>
      )}
    </div>
  );
}
