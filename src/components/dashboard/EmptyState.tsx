import Icon from '@/components/ui/AppIcon';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
}

export default function DashboardEmpty({
  title = 'No data yet',
  description,
  icon = 'InboxIcon',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Icon name={icon} size={28} className="text-gray-400" />
      </div>
      <p className="text-sm font-medium text-gray-700">{title}</p>
      {description ? <p className="text-xs text-gray-500 mt-1 max-w-xs">{description}</p> : null}
    </div>
  );
}
