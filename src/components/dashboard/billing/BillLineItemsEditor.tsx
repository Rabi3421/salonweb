'use client';

import Icon from '@/components/ui/AppIcon';
import { calculateLineItemTotal } from '@/lib/billing-utils';
import type { BillLineItem, BillLineItemType } from '@/types/billing';
import type { SalonPackage, SalonService } from '@/types/services';

const inputClass =
  'w-full px-3 py-2 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

export default function BillLineItemsEditor({
  items,
  services,
  packages,
  onChange,
}: {
  items: BillLineItem[];
  services: SalonService[];
  packages: SalonPackage[];
  onChange: (items: BillLineItem[]) => void;
}) {
  function updateItem(index: number, patch: Partial<BillLineItem>) {
    const next = items.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      const updated = { ...item, ...patch };
      return { ...updated, total: calculateLineItemTotal(updated) };
    });
    onChange(next);
  }

  function addItem(preset?: { type: BillLineItemType; name: string; price: number }) {
    onChange([
      ...items,
      {
        id: `item-${Date.now()}`,
        type: preset?.type ?? 'service',
        name: preset?.name ?? '',
        quantity: 1,
        unitPrice: preset?.price ?? 0,
        discount: 0,
        taxRate: 18,
        total: Math.round((preset?.price ?? 0) * 1.18),
      },
    ]);
  }

  return (
    <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Line Items</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Add services, packages or manual adjustments.
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem()}
          className="px-3 py-2 rounded-xl bg-primary text-white text-sm font-medium"
        >
          Add Item
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {services.slice(0, 5).map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => addItem({ type: 'service', name: service.name, price: service.price })}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
          >
            + {service.name}
          </button>
        ))}
        {packages.slice(0, 3).map((pkg) => (
          <button
            key={pkg.id}
            type="button"
            onClick={() => addItem({ type: 'package', name: pkg.name, price: pkg.price })}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
          >
            + {pkg.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-[120px_1fr_90px_120px_110px_90px_90px_auto] gap-2 rounded-xl border border-gray-200 p-3"
          >
            <select
              value={item.type}
              onChange={(event) =>
                updateItem(index, { type: event.target.value as BillLineItemType })
              }
              className={inputClass}
            >
              <option value="service">Service</option>
              <option value="package">Package</option>
              <option value="product">Product</option>
              <option value="adjustment">Adjustment</option>
            </select>
            <input
              value={item.name}
              onChange={(event) => updateItem(index, { name: event.target.value })}
              placeholder="Item name"
              className={inputClass}
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(event) => updateItem(index, { quantity: Number(event.target.value) })}
              className={inputClass}
            />
            <input
              type="number"
              min="0"
              value={item.unitPrice}
              onChange={(event) => updateItem(index, { unitPrice: Number(event.target.value) })}
              className={inputClass}
            />
            <input
              type="number"
              min="0"
              value={item.discount ?? 0}
              onChange={(event) => updateItem(index, { discount: Number(event.target.value) })}
              className={inputClass}
            />
            <input
              type="number"
              min="0"
              value={item.taxRate ?? 0}
              onChange={(event) => updateItem(index, { taxRate: Number(event.target.value) })}
              className={inputClass}
            />
            <div className="px-3 py-2 rounded-xl bg-gray-50 text-sm font-semibold text-gray-900">
              ₹{item.total.toLocaleString('en-IN')}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center"
            >
              <Icon name="TrashIcon" size={15} className="text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
