export type InventoryProductStatus = 'active' | 'inactive' | 'discontinued';

export type InventoryProductCategory =
  | 'Hair Care'
  | 'Skin Care'
  | 'Nail Care'
  | 'Makeup'
  | 'Tools'
  | 'Consumables'
  | 'Retail'
  | 'Other';

export type StockAdjustmentType =
  | 'stock_in'
  | 'stock_out'
  | 'correction'
  | 'damaged'
  | 'expired'
  | 'used_in_service'
  | 'retail_sale';

export interface InventoryProduct {
  id: string;
  productNo?: string;
  name: string;
  brand?: string;
  category: InventoryProductCategory;
  sku?: string;
  barcode?: string;
  description?: string;
  unit: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel?: number;
  purchasePrice: number;
  sellingPrice?: number;
  stockValue: number;
  status: InventoryProductStatus;
  expiryDate?: string;
  supplierName?: string;
  supplierPhone?: string;
  lastStockUpdateAt?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface StockAdjustment {
  id: string;
  productId: string;
  productName: string;
  type: StockAdjustmentType;
  quantity: number;
  previousStock: number;
  newStock: number;
  reason: string;
  note?: string;
  adjustedBy?: string;
  adjustedAt: string;
}

export interface InventoryListParams {
  search?: string;
  category?: InventoryProductCategory;
  status?: InventoryProductStatus;
  stockState?: 'low_stock' | 'in_stock' | 'out_of_stock';
  page?: number;
  limit?: number;
}

export interface CreateInventoryProductPayload {
  name: string;
  brand?: string;
  category: InventoryProductCategory;
  sku?: string;
  barcode?: string;
  description?: string;
  unit: string;
  currentStock: number;
  minStockLevel: number;
  maxStockLevel?: number;
  purchasePrice: number;
  sellingPrice?: number;
  status: InventoryProductStatus;
  expiryDate?: string;
  supplierName?: string;
  supplierPhone?: string;
}

export type UpdateInventoryProductPayload = Partial<CreateInventoryProductPayload>;

export interface CreateStockAdjustmentPayload {
  productId: string;
  type: StockAdjustmentType;
  quantity: number;
  reason: string;
  note?: string;
}
