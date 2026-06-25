import type { SalonRole } from '@/types/auth';
import type {
  InventoryProduct,
  InventoryProductStatus,
  InventoryProductCategory,
  StockAdjustmentType,
} from '@/types/inventory';

export const INVENTORY_STATUS_LABELS: Record<InventoryProductStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  discontinued: 'Discontinued',
};

export const INVENTORY_STATUS_STYLES: Record<InventoryProductStatus, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-500 border-gray-200',
  discontinued: 'bg-red-50 text-red-600 border-red-200',
};

export const STOCK_STATE_STYLES: Record<string, string> = {
  in_stock: 'bg-green-50 text-green-700 border-green-200',
  low_stock: 'bg-amber-50 text-amber-700 border-amber-200',
  out_of_stock: 'bg-red-50 text-red-600 border-red-200',
};

export const ADJUSTMENT_TYPE_LABELS: Record<StockAdjustmentType, string> = {
  stock_in: 'Stock In',
  stock_out: 'Stock Out',
  correction: 'Correction',
  damaged: 'Damaged',
  expired: 'Expired',
  used_in_service: 'Used in Service',
  retail_sale: 'Retail Sale',
};

export function getInventoryStatusLabel(status: InventoryProductStatus): string {
  return INVENTORY_STATUS_LABELS[status] ?? status;
}

export function getInventoryStatusVariant(
  status: InventoryProductStatus
): 'success' | 'default' | 'error' {
  if (status === 'active') return 'success';
  if (status === 'discontinued') return 'error';
  return 'default';
}

export function getStockState(
  product: InventoryProduct
): 'in_stock' | 'low_stock' | 'out_of_stock' {
  if (product.currentStock <= 0) return 'out_of_stock';
  if (product.currentStock <= product.minStockLevel) return 'low_stock';
  return 'in_stock';
}

export function getStockStateLabel(product: InventoryProduct): string {
  const state = getStockState(product);
  if (state === 'out_of_stock') return 'Out of Stock';
  if (state === 'low_stock') return 'Low Stock';
  return 'In Stock';
}

export function getStockStateVariant(product: InventoryProduct): string {
  return STOCK_STATE_STYLES[getStockState(product)];
}

export function getAdjustmentTypeLabel(type: StockAdjustmentType): string {
  return ADJUSTMENT_TYPE_LABELS[type] ?? type;
}

export function formatInventoryCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateStockValue(product: InventoryProduct): number {
  return product.currentStock * product.purchasePrice;
}

export function getInventoryCategoryOptions(): {
  value: InventoryProductCategory;
  label: string;
}[] {
  return [
    { value: 'Hair Care', label: 'Hair Care' },
    { value: 'Skin Care', label: 'Skin Care' },
    { value: 'Nail Care', label: 'Nail Care' },
    { value: 'Makeup', label: 'Makeup' },
    { value: 'Tools', label: 'Tools' },
    { value: 'Consumables', label: 'Consumables' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Other', label: 'Other' },
  ];
}

export function filterInventoryProducts(
  products: InventoryProduct[],
  filters: { search?: string; category?: string; status?: string; stockState?: string }
): InventoryProduct[] {
  return products.filter((p) => {
    if (filters.status && p.status !== filters.status) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.stockState) {
      const state = getStockState(p);
      if (state !== filters.stockState) return false;
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !(p.brand ?? '').toLowerCase().includes(q) &&
        !(p.sku ?? '').toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}

export function canViewInventory(role: SalonRole): boolean {
  return ['owner', 'manager', 'accountant'].includes(role);
}

export function canCreateInventoryProduct(role: SalonRole): boolean {
  return role === 'owner';
}

export function canEditInventoryProduct(role: SalonRole): boolean {
  return role === 'owner';
}

export function canAdjustStock(role: SalonRole): boolean {
  return ['owner', 'manager'].includes(role);
}

export function canViewInventoryValue(role: SalonRole): boolean {
  return ['owner', 'accountant'].includes(role);
}

export function buildSupplierCallLink(phone: string): string {
  return `tel:${phone}`;
}

export function buildSupplierWhatsAppLink(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  const num = clean.startsWith('91') ? clean : `91${clean}`;
  return `https://wa.me/${num}`;
}

export function isExpiringSoon(expiryDate: string): boolean {
  const expiry = new Date(expiryDate);
  const now = new Date();
  const diffDays = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays > 0 && diffDays <= 30;
}

export function isExpired(expiryDate: string): boolean {
  return new Date(expiryDate) < new Date();
}
