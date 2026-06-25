'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import PackageStatusBadge from '@/components/dashboard/services/PackageStatusBadge';
import { getPackages, togglePackageStatus } from '@/lib/services-api';
import {
  canViewPackage,
  canCreatePackage,
  canEditPackage,
  filterPackages,
  formatServicePrice,
} from '@/lib/service-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonPackage } from '@/types/services';

export default function PackagesListPage() {
  const user = useDashboardUser();
  if (!canViewPackage(user.role)) return <PermissionDenied />;

  const [packages, setPackages] = useState<SalonPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const showEdit = canEditPackage(user.role);
  const showCreate = canCreatePackage(user.role);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPackages();
        setPackages(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterPackages(packages, { search, status: statusFilter });

  const activeCount = packages.filter((p) => p.status === 'active').length;
  const highlightedCount = packages.filter((p) => p.isHighlighted).length;
  const avgPrice =
    packages.length > 0
      ? Math.round(packages.reduce((s, p) => s + p.price, 0) / packages.length)
      : 0;

  async function handleToggleStatus(pkg: SalonPackage) {
    const newStatus = pkg.status === 'active' ? 'inactive' : 'active';
    await togglePackageStatus(pkg.id, newStatus);
    setPackages((prev) => prev.map((p) => (p.id === pkg.id ? { ...p, status: newStatus } : p)));
  }

  if (loading) return <DashboardLoading message="Loading packages..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Packages</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage bundled beauty packages, pricing and included services.
          </p>
        </div>
        {showCreate && (
          <Link
            href="/dashboard/packages/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={16} className="text-white" />
            Add Package
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{packages.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Highlighted</p>
          <p className="text-2xl font-bold text-primary mt-1">{highlightedCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg Price</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatServicePrice(avgPrice)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search packages..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Package Cards */}
      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No packages found"
          description="Try adjusting your filters or add a new package."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
                pkg.isHighlighted ? 'border-primary/30 ring-1 ring-primary/10' : 'border-gray-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-gray-900">{pkg.name}</h3>
                      {pkg.isHighlighted && (
                        <Icon name="StarIcon" size={14} className="text-amber-400" />
                      )}
                    </div>
                    {pkg.tag && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                        {pkg.tag}
                      </span>
                    )}
                  </div>
                  <PackageStatusBadge status={pkg.status} />
                </div>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{pkg.description}</p>

                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatServicePrice(pkg.price)}
                  </span>
                  {pkg.validityDays && (
                    <span className="text-xs text-gray-400">/ {pkg.validityDays} days</span>
                  )}
                </div>

                {pkg.bestFor && (
                  <p className="text-xs text-gray-500 mb-2">
                    <span className="font-medium text-gray-600">Best for:</span> {pkg.bestFor}
                  </p>
                )}

                {pkg.includedServices.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-600 mb-1.5">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {pkg.includedServices.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {showEdit && (
                <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/30">
                  <Link
                    href={`/dashboard/packages/${pkg.id}/edit`}
                    className="text-xs font-medium text-primary hover:text-primary/80"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(pkg)}
                    className={`text-xs font-medium ${
                      pkg.status === 'active'
                        ? 'text-amber-600 hover:text-amber-700'
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    {pkg.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isMockModeEnabled() && (
        <p className="text-center text-[10px] text-amber-500 font-medium">Demo data</p>
      )}
    </div>
  );
}
