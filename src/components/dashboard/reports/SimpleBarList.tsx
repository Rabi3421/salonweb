export interface SimpleBarItem {
  label: string;
  value: string | number;
  percentage: number;
  helper?: string;
}

export default function SimpleBarList({ title, items }: { title: string; items: SimpleBarItem[] }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-sm font-semibold text-gray-900">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex justify-between gap-4 text-sm">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-500">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.min(100, item.percentage)}%` }}
              />
            </div>
            {item.helper ? <p className="mt-1 text-xs text-gray-400">{item.helper}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
