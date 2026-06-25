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
import InventoryStatusBadge from '@/components/dashboard/inventory/InventoryStatusBadge';
import StockStateBadge from '@/components/dashboard/inventory/StockStateBadge';
import { getInventoryProducts } from '@/lib/inventory-api';
import {
  canViewInventory,
  canCreateInventoryProduct,
  canViewInventoryValue,
  filterInventoryProducts,
  formatInventoryCurrency,
  getStockState,
  getInventoryCategoryOptions,
  isExpiringSoon,
} from '@/lib/inventory-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { InventoryProduct } from '@/types/inventory';

export default function InventoryListPage() {
  const user = useDashboardUser();
  if (!canViewInventory(user.role)) return <PermissionDenied />;

  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [stockStateFilter, setStockStateFilter] = useState('');
  const showCreate = canCreateInventoryProduct(user.role);
  const showValue = canViewInventoryValue(user.role);

  useEffect(() => {
    async function load() {
      try {
        const data = await getInventoryProducts();
        setProducts(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = filterInventoryProducts(products, {
    search,
    category: categoryFilter,
    status: statusFilter,
    stockState: stockStateFilter,
  });

  const lowStockCount = products.filter((p) => getStockState(p) === 'low_stock').length;
  const outOfStockCount = products.filter((p) => getStockState(p) === 'out_of_stock').length;
  const expiringSoonCount = products.filter(
    (p) => p.expiryDate && isExpiringSoon(p.expiryDate)
  ).length;
  const totalValue = products.reduce((s, p) => s + p.stockValue, 0);

  if (loading) return <DashboardLoading message="Loading inventory..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Track salon products, stock levels, low stock alerts and product value.
          </p>
        </div>
        {showCreate && (
          <Link
            href="/dashboard/inventory/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={16} className="text-white" />
            Add Product
          </Link>
        )}
      </div>

      {/* Summary Cards */}
      <div className={`grid grid-cols-2 ${showValue ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-3`}>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total Products</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Low Stock</p>
          <p
            className={`text-2xl font-bold mt-1 ${lowStockCount > 0 ? 'text-amber-600' : 'text-gray-900'}`}
          >
            {lowStockCount}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Out of Stock</p>
          <p
            className={`text-2xl font-bold mt-1 ${outOfStockCount > 0 ? 'text-red-600' : 'text-gray-900'}`}
          >
            {outOfStockCount}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Expiring Soon</p>
          <p
            className={`text-2xl font-bold mt-1 ${expiringSoonCount > 0 ? 'text-amber-600' : 'text-gray-900'}`}
          >
            {expiringSoonCount}
          </p>
        </div>
        {showValue && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">Inventory Value</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {formatInventoryCurrency(totalValue)}
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, brand, SKU..."
          className="flex-1 min-w-[200px] px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All categories</option>
          {getInventoryCategoryOptions().map((c) => (
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
          <option value="discontinued">Discontinued</option>
        </select>
        <select
          value={stockStateFilter}
          onChange={(e) => setStockStateFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All stock levels</option>
          <option value="in_stock">In Stock</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No products found"
          description="Try adjusting your filters or add a new product."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-500">Product</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Stock</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Min</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Stock State</th>
                  {showValue && (
                    <>
                      <th className="px-4 py-3 font-medium text-gray-500">Price</th>
                      <th className="px-4 py-3 font-medium text-gray-500">Value</th>
                    </>
                  )}
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{p.name}</p>
                      <p className="text-xs text-gray-400">
                        {p.brand ?? '—'} · {p.sku ?? '—'}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-semibold ${p.currentStock <= 0 ? 'text-red-600' : p.currentStock <= p.minStockLevel ? 'text-amber-600' : 'text-gray-900'}`}
                      >
                        {p.currentStock}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">{p.unit}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.minStockLevel}</td>
                    <td className="px-4 py-3">
                      <StockStateBadge product={p} />
                    </td>
                    {showValue && (
                      <>
                        <td className="px-4 py-3 text-gray-600">
                          {formatInventoryCurrency(p.purchasePrice)}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {formatInventoryCurrency(p.stockValue)}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-3">
                      <InventoryStatusBadge status={p.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/dashboard/inventory/${p.id}`}
                        className="text-xs font-medium text-primary hover:text-primary/80"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {filtered.map((p) => (
              <Link
                key={p.id}
                href={`/dashboard/inventory/${p.id}`}
                className="block px-4 py-3 hover:bg-gray-50/50"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <p className="text-xs text-gray-400">
                      {p.brand ?? '—'} · {p.category}
                    </p>
                  </div>
                  <StockStateBadge product={p} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">
                    Stock: <span className="font-semibold">{p.currentStock}</span> {p.unit}
                  </span>
                  {showValue && (
                    <span className="text-xs text-gray-500">
                      {formatInventoryCurrency(p.stockValue)}
                    </span>
                  )}
                </div>
              </Link>
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
