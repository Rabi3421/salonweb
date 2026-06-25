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
import ServiceStatusBadge from '@/components/dashboard/services/ServiceStatusBadge';
import { getServices, toggleServiceStatus } from '@/lib/services-api';
import {
  canViewService,
  canCreateService,
  canEditService,
  filterServices,
  formatServicePrice,
  formatServiceDuration,
  getServiceCategoryOptions,
} from '@/lib/service-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonService } from '@/types/services';

export default function ServicesListPage() {
  const user = useDashboardUser();
  if (!canViewService(user.role)) return <PermissionDenied />;

  const [services, setServices] = useState<SalonService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const showEdit = canEditService(user.role);
  const showCreate = canCreateService(user.role);

  useEffect(() => {
    async function load() {
      try {
        const data = await getServices();
        setServices(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterServices(services, {
    search,
    category: categoryFilter,
    status: statusFilter,
  });

  const activeCount = services.filter((s) => s.status === 'active').length;
  const featuredCount = services.filter((s) => s.isFeatured).length;
  const categories = new Set(services.map((s) => s.category));
  const avgPrice =
    services.length > 0
      ? Math.round(services.reduce((s, v) => s + v.price, 0) / services.length)
      : 0;

  async function handleToggleStatus(svc: SalonService) {
    const newStatus = svc.status === 'active' ? 'inactive' : 'active';
    await toggleServiceStatus(svc.id, newStatus);
    setServices((prev) => prev.map((s) => (s.id === svc.id ? { ...s, status: newStatus } : s)));
  }

  if (loading) return <DashboardLoading message="Loading services..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Services</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage salon services, pricing, duration and availability.
          </p>
        </div>
        {showCreate && (
          <Link
            href="/dashboard/services/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={16} className="text-white" />
            Add Service
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{services.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Featured</p>
          <p className="text-2xl font-bold text-primary mt-1">{featuredCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Avg Price</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{formatServicePrice(avgPrice)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Categories</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{categories.size}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All categories</option>
          {getServiceCategoryOptions().map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
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

      {/* Table */}
      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No services found"
          description="Try adjusting your filters or add a new service."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-500">Service</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Price</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Duration</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Staff</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Featured</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((svc) => (
                  <tr key={svc.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{svc.name}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{svc.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                        {svc.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {formatServicePrice(svc.price)}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatServiceDuration(svc.duration)}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {svc.assignedStaffNames?.join(', ') || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <ServiceStatusBadge status={svc.status} />
                    </td>
                    <td className="px-4 py-3">
                      {svc.isFeatured ? (
                        <Icon name="StarIcon" size={16} className="text-amber-400" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {showEdit && (
                          <Link
                            href={`/dashboard/services/${svc.id}/edit`}
                            className="text-xs font-medium text-primary hover:text-primary/80"
                          >
                            Edit
                          </Link>
                        )}
                        {showEdit && (
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(svc)}
                            className={`text-xs font-medium ${svc.status === 'active' ? 'text-amber-600 hover:text-amber-700' : 'text-green-600 hover:text-green-700'}`}
                          >
                            {svc.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((svc) => (
              <div key={svc.id} className="px-4 py-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{svc.name}</p>
                    <p className="text-xs text-gray-400">
                      {svc.category} · {formatServiceDuration(svc.duration)}
                    </p>
                  </div>
                  <ServiceStatusBadge status={svc.status} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatServicePrice(svc.price)}
                  </span>
                  <div className="flex items-center gap-3">
                    {svc.isFeatured && (
                      <Icon name="StarIcon" size={14} className="text-amber-400" />
                    )}
                    {showEdit && (
                      <Link
                        href={`/dashboard/services/${svc.id}/edit`}
                        className="text-xs font-medium text-primary"
                      >
                        Edit
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMockModeEnabled() && (
        <p className="text-center text-[10px] text-amber-500 font-medium">Demo data</p>
      )}
    </div>
  );
}
