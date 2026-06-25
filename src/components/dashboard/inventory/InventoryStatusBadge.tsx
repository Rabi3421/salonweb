import { INVENTORY_STATUS_LABELS, INVENTORY_STATUS_STYLES } from '@/lib/inventory-utils';
import type { InventoryProductStatus } from '@/types/inventory';

export default function InventoryStatusBadge({ status }: { status: InventoryProductStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${INVENTORY_STATUS_STYLES[status]}`}
    >
      {INVENTORY_STATUS_LABELS[status]}
    </span>
  );
}
