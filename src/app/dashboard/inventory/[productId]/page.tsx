'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import InventoryStatusBadge from '@/components/dashboard/inventory/InventoryStatusBadge';
import StockStateBadge from '@/components/dashboard/inventory/StockStateBadge';
import {
  getInventoryProductById,
  createStockAdjustment,
  getMockStockAdjustments,
} from '@/lib/inventory-api';
import {
  canViewInventory,
  canAdjustStock,
  canViewInventoryValue,
  formatInventoryCurrency,
  getAdjustmentTypeLabel,
  buildSupplierCallLink,
  buildSupplierWhatsAppLink,
  isExpiringSoon,
  isExpired,
  ADJUSTMENT_TYPE_LABELS,
} from '@/lib/inventory-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { InventoryProduct, StockAdjustment, StockAdjustmentType } from '@/types/inventory';

export default function InventoryProductDetailPage() {
  const user = useDashboardUser();
  if (!canViewInventory(user.role)) return <PermissionDenied />;

  const params = useParams<{ productId: string }>();
  const [product, setProduct] = useState<InventoryProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const showValue = canViewInventoryValue(user.role);
  const showAdjust = canAdjustStock(user.role);

  const [adjustForm, setAdjustForm] = useState({
    type: 'stock_in' as StockAdjustmentType,
    quantity: '',
    reason: '',
    note: '',
  });
  const [adjusting, setAdjusting] = useState(false);
  const [adjustResult, setAdjustResult] = useState<{ success: boolean; text: string } | null>(null);

  const [movements, setMovements] = useState<StockAdjustment[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getInventoryProductById(params.productId);
        setProduct(data);
        if (isMockModeEnabled()) {
          setMovements(getMockStockAdjustments(params.productId));
        }
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.productId]);

  async function handleAdjustSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;
    setAdjusting(true);
    setAdjustResult(null);
    try {
      const adj = await createStockAdjustment({
        productId: product.id,
        type: adjustForm.type,
        quantity: Number(adjustForm.quantity),
        reason: adjustForm.reason,
        note: adjustForm.note || undefined,
      });

      if (adj) {
        setProduct((p) =>
          p
            ? {
                ...p,
                currentStock: adj.newStock,
                stockValue: adj.newStock * p.purchasePrice,
                lastStockUpdateAt: adj.adjustedAt,
              }
            : p
        );
        setMovements((prev) => [adj, ...prev]);
      }

      setAdjustResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Stock adjusted successfully (demo mode).'
          : 'Stock adjusted successfully.',
      });
      setAdjustForm({ type: 'stock_in', quantity: '', reason: '', note: '' });
    } catch (err) {
      setAdjustResult({ success: false, text: (err as Error).message });
    } finally {
      setAdjusting(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading product..." />;
  if (error) return <DashboardError message={error} />;
  if (!product) return <DashboardError message="Product not found." />;

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400';

  const expiryWarning = product.expiryDate
    ? isExpired(product.expiryDate)
      ? 'expired'
      : isExpiringSoon(product.expiryDate)
        ? 'expiring'
        : null
    : null;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/inventory"
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>
              <InventoryStatusBadge status={product.status} />
              <StockStateBadge product={product} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {product.productNo ?? product.sku ?? product.id}
              {product.brand && ` · ${product.brand}`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Product Info */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Category</span>
              <span className="text-gray-900 font-medium">{product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Unit</span>
              <span className="text-gray-900">{product.unit}</span>
            </div>
            {product.sku && (
              <div className="flex justify-between">
                <span className="text-gray-500">SKU</span>
                <span className="text-gray-900 font-mono text-xs">{product.sku}</span>
              </div>
            )}
            {product.barcode && (
              <div className="flex justify-between">
                <span className="text-gray-500">Barcode</span>
                <span className="text-gray-900 font-mono text-xs">{product.barcode}</span>
              </div>
            )}
            {product.description && (
              <p className="text-gray-600 pt-1 border-t border-gray-100">{product.description}</p>
            )}
            {product.expiryDate && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Expiry</span>
                <span
                  className={`font-medium ${expiryWarning === 'expired' ? 'text-red-600' : expiryWarning === 'expiring' ? 'text-amber-600' : 'text-gray-900'}`}
                >
                  {new Date(product.expiryDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                  {expiryWarning === 'expired' && ' (Expired)'}
                  {expiryWarning === 'expiring' && ' (Soon)'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stock Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Stock</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p
                className={`text-2xl font-bold ${product.currentStock <= 0 ? 'text-red-600' : product.currentStock <= product.minStockLevel ? 'text-amber-600' : 'text-gray-900'}`}
              >
                {product.currentStock}
              </p>
              <p className="text-[10px] text-gray-500">Current Stock</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-gray-900">{product.minStockLevel}</p>
              <p className="text-[10px] text-gray-500">Min Level</p>
            </div>
            {product.maxStockLevel && (
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-gray-900">{product.maxStockLevel}</p>
                <p className="text-[10px] text-gray-500">Max Level</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-xs font-bold text-gray-900">
                {product.lastStockUpdateAt
                  ? new Date(product.lastStockUpdateAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })
                  : '—'}
              </p>
              <p className="text-[10px] text-gray-500">Last Updated</p>
            </div>
          </div>
        </div>

        {/* Pricing/Value */}
        {showValue && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Pricing & Value</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Purchase Price</span>
                <span className="text-gray-900 font-medium">
                  {formatInventoryCurrency(product.purchasePrice)}
                </span>
              </div>
              {product.sellingPrice && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Selling Price</span>
                  <span className="text-gray-900 font-medium">
                    {formatInventoryCurrency(product.sellingPrice)}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-100">
                <span className="text-gray-500 font-medium">Stock Value</span>
                <span className="text-green-600 font-bold">
                  {formatInventoryCurrency(product.stockValue)}
                </span>
              </div>
              {product.sellingPrice && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Margin</span>
                  <span className="text-gray-900 font-medium">
                    {formatInventoryCurrency(product.sellingPrice - product.purchasePrice)} (
                    {Math.round(
                      ((product.sellingPrice - product.purchasePrice) / product.purchasePrice) * 100
                    )}
                    %)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Supplier */}
        {(product.supplierName || product.supplierPhone) && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Supplier</h3>
            <div className="space-y-3 text-sm">
              {product.supplierName && (
                <div className="flex items-center gap-3">
                  <Icon name="BuildingStorefrontIcon" size={14} className="text-gray-400" />
                  <span className="text-gray-700">{product.supplierName}</span>
                </div>
              )}
              {product.supplierPhone && (
                <div className="flex items-center gap-3">
                  <Icon name="PhoneIcon" size={14} className="text-gray-400" />
                  <span className="text-gray-700">{product.supplierPhone}</span>
                </div>
              )}
              {product.supplierPhone && (
                <div className="flex gap-2 pt-2">
                  <a
                    href={buildSupplierCallLink(product.supplierPhone)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <Icon name="PhoneIcon" size={14} className="text-gray-400" />
                    Call
                  </a>
                  <a
                    href={buildSupplierWhatsAppLink(product.supplierPhone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    <Icon name="ChatBubbleLeftRightIcon" size={14} className="text-gray-400" />
                    WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stock Adjustment Form */}
      {showAdjust && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Adjust Stock</h3>
          {adjustResult?.success && (
            <div className="rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700 mb-4">
              {adjustResult.text}
            </div>
          )}
          {adjustResult && !adjustResult.success && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 mb-4">
              {adjustResult.text}
            </div>
          )}
          <form onSubmit={handleAdjustSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Type *</label>
                <select
                  value={adjustForm.type}
                  onChange={(e) =>
                    setAdjustForm((p) => ({
                      ...p,
                      type: e.target.value as StockAdjustmentType,
                    }))
                  }
                  className={inputClass}
                >
                  {(Object.keys(ADJUSTMENT_TYPE_LABELS) as StockAdjustmentType[]).map((t) => (
                    <option key={t} value={t}>
                      {getAdjustmentTypeLabel(t)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Quantity *</label>
                <input
                  type="number"
                  value={adjustForm.quantity}
                  onChange={(e) => setAdjustForm((p) => ({ ...p, quantity: e.target.value }))}
                  required
                  min="1"
                  placeholder="e.g. 5"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason *</label>
                <input
                  type="text"
                  value={adjustForm.reason}
                  onChange={(e) => setAdjustForm((p) => ({ ...p, reason: e.target.value }))}
                  required
                  placeholder="Why?"
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Note</label>
              <input
                type="text"
                value={adjustForm.note}
                onChange={(e) => setAdjustForm((p) => ({ ...p, note: e.target.value }))}
                placeholder="Optional"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={adjusting}
              className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {adjusting ? 'Saving...' : 'Record Adjustment'}
            </button>
          </form>
        </div>
      )}

      {/* Stock Movement Preview */}
      {movements.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Stock Movements</h3>
          <div className="space-y-3">
            {movements.slice(0, 10).map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between text-sm border-b border-gray-50 pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{getAdjustmentTypeLabel(m.type)}</p>
                  <p className="text-xs text-gray-400">
                    {m.reason} · {m.adjustedBy ?? '—'} ·{' '}
                    {new Date(m.adjustedAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${m.type === 'stock_in' || m.type === 'correction' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {m.type === 'stock_in' || m.type === 'correction' ? '+' : '-'}
                    {m.quantity}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {m.previousStock} → {m.newStock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>
          Added:{' '}
          {new Date(product.createdAt).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </span>
        {isMockModeEnabled() && (
          <>
            <span>·</span>
            <span className="text-amber-500 font-medium">Demo data</span>
          </>
        )}
      </div>
    </div>
  );
}
