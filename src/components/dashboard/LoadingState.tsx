export default function DashboardLoading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
}
