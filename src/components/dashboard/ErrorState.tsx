import Icon from '@/components/ui/AppIcon';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function DashboardError({
  message = 'Something went wrong.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <Icon name="ExclamationTriangleIcon" size={28} className="text-red-500" />
      </div>
      <p className="text-sm text-gray-700 font-medium mb-1">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
