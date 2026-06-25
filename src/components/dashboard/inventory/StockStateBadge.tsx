import { getStockState, getStockStateLabel, STOCK_STATE_STYLES } from '@/lib/inventory-utils';
import type { InventoryProduct } from '@/types/inventory';

export default function StockStateBadge({ product }: { product: InventoryProduct }) {
  const state = getStockState(product);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${STOCK_STATE_STYLES[state]}`}
    >
      {getStockStateLabel(product)}
    </span>
  );
}
