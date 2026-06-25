'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import PermissionDenied from '@/components/dashboard/PermissionDenied';
import { createInventoryProduct } from '@/lib/inventory-api';
import { canCreateInventoryProduct, getInventoryCategoryOptions } from '@/lib/inventory-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { InventoryProductCategory, InventoryProductStatus } from '@/types/inventory';

export default function NewInventoryProductPage() {
  const user = useDashboardUser();
  if (!canCreateInventoryProduct(user.role)) return <PermissionDenied />;

  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: 'Hair Care' as InventoryProductCategory,
    sku: '',
    barcode: '',
    description: '',
    unit: 'pcs',
    currentStock: '',
    minStockLevel: '',
    maxStockLevel: '',
    purchasePrice: '',
    sellingPrice: '',
    status: 'active' as InventoryProductStatus,
    expiryDate: '',
    supplierName: '',
    supplierPhone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; text: string } | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      await createInventoryProduct({
        name: form.name,
        brand: form.brand || undefined,
        category: form.category,
        sku: form.sku || undefined,
        barcode: form.barcode || undefined,
        description: form.description || undefined,
        unit: form.unit,
        currentStock: Number(form.currentStock),
        minStockLevel: Number(form.minStockLevel),
        maxStockLevel: form.maxStockLevel ? Number(form.maxStockLevel) : undefined,
        purchasePrice: Number(form.purchasePrice),
        sellingPrice: form.sellingPrice ? Number(form.sellingPrice) : undefined,
        status: form.status,
        expiryDate: form.expiryDate || undefined,
        supplierName: form.supplierName || undefined,
        supplierPhone: form.supplierPhone || undefined,
      });
      setResult({
        success: true,
        text: isMockModeEnabled()
          ? 'Product added successfully (demo mode).'
          : 'Product added successfully.',
      });
    } catch (err) {
      setResult({ success: false, text: (err as Error).message });
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400';

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/inventory"
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-500">Add a new product to salon inventory.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        {result?.success ? (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={28} className="text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{result.text}</h3>
            <div className="flex gap-3 justify-center mt-4">
              <Link
                href="/dashboard/inventory"
                className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Icon name="ArrowLeftIcon" size={14} className="text-primary" />
                Back to Inventory
              </Link>
              <button
                type="button"
                onClick={() => {
                  setResult(null);
                  setForm({
                    name: '',
                    brand: '',
                    category: 'Hair Care',
                    sku: '',
                    barcode: '',
                    description: '',
                    unit: 'pcs',
                    currentStock: '',
                    minStockLevel: '',
                    maxStockLevel: '',
                    purchasePrice: '',
                    sellingPrice: '',
                    status: 'active',
                    expiryDate: '',
                    supplierName: '',
                    supplierPhone: '',
                  });
                }}
                className="text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Add Another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {result && !result.success && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                {result.text}
              </div>
            )}

            {/* Basic Info */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Product Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Product name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="e.g. L'Oréal"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {getInventoryCategoryOptions().map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Unit *</label>
                <input
                  type="text"
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  required
                  placeholder="e.g. bottle, jar, pcs"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">SKU</label>
                <input
                  type="text"
                  name="sku"
                  value={form.sku}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Barcode</label>
                <input
                  type="text"
                  name="barcode"
                  value={form.barcode}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={2}
                placeholder="Optional product description"
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Stock Info */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">
              Stock & Pricing
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Current Stock *
                </label>
                <input
                  type="number"
                  name="currentStock"
                  value={form.currentStock}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="0"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Min Stock *
                </label>
                <input
                  type="number"
                  name="minStockLevel"
                  value={form.minStockLevel}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g. 5"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Max Stock</label>
                <input
                  type="number"
                  name="maxStockLevel"
                  value={form.maxStockLevel}
                  onChange={handleChange}
                  min="0"
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Purchase Price (₹) *
                </label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={form.purchasePrice}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g. 850"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Selling Price (₹)
                </label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  min="0"
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="discontinued">Discontinued</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Supplier */}
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">
              Supplier
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Supplier Name
                </label>
                <input
                  type="text"
                  name="supplierName"
                  value={form.supplierName}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Supplier Phone
                </label>
                <input
                  type="tel"
                  name="supplierPhone"
                  value={form.supplierPhone}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white font-semibold py-3 rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? 'Adding...' : 'Add Product'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
