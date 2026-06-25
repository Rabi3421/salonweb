'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function PermissionDenied() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-10 max-w-md text-center">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <Icon name="ShieldExclamationIcon" size={28} className="text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 text-sm mb-6">
          You do not have permission to access this area. Contact the salon owner if you need
          access.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-2.5 rounded-xl text-sm hover:bg-primary/90 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-white" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
