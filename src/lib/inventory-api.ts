import { apiGet, apiPost, apiPatch } from '@/lib/api-client';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type {
  InventoryProduct,
  InventoryListParams,
  CreateInventoryProductPayload,
  UpdateInventoryProductPayload,
  CreateStockAdjustmentPayload,
  StockAdjustment,
} from '@/types/inventory';

// ── Product API ──

export async function getInventoryProducts(
  params?: InventoryListParams
): Promise<InventoryProduct[]> {
  if (isMockModeEnabled()) return getMockInventoryProducts();
  const qs = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== '') qs.set(k, String(v));
    });
  }
  const q = qs.toString();
  const res = await apiGet<{ products: InventoryProduct[] }>(
    `/api/salon/inventory/products${q ? `?${q}` : ''}`
  );
  return res.data?.products ?? [];
}

export async function getInventoryProductById(productId: string): Promise<InventoryProduct | null> {
  if (isMockModeEnabled()) return getMockInventoryProductById(productId);
  const res = await apiGet<{ product: InventoryProduct }>(
    `/api/salon/inventory/products/${productId}`
  );
  return res.data?.product ?? null;
}

export async function createInventoryProduct(
  payload: CreateInventoryProductPayload
): Promise<InventoryProduct | null> {
  if (isMockModeEnabled()) return createMockInventoryProduct(payload);
  const res = await apiPost<{ product: InventoryProduct }>(
    '/api/salon/inventory/products',
    payload
  );
  return res.data?.product ?? null;
}

export async function updateInventoryProduct(
  productId: string,
  payload: UpdateInventoryProductPayload
): Promise<InventoryProduct | null> {
  if (isMockModeEnabled()) return null;
  const res = await apiPatch<{ product: InventoryProduct }>(
    `/api/salon/inventory/products/${productId}`,
    payload
  );
  return res.data?.product ?? null;
}

export async function createStockAdjustment(
  payload: CreateStockAdjustmentPayload
): Promise<StockAdjustment | null> {
  if (isMockModeEnabled()) return createMockStockAdjustment(payload);
  const res = await apiPost<{ adjustment: StockAdjustment }>(
    '/api/salon/inventory/adjustments',
    payload
  );
  return res.data?.adjustment ?? null;
}

// ── Mock Data ──

const MOCK_PRODUCTS: InventoryProduct[] = [
  {
    id: 'inv-001',
    productNo: 'P-001',
    name: "L'Oréal Hair Spa Cream",
    brand: "L'Oréal",
    category: 'Hair Care',
    sku: 'LOR-HSC-500',
    description: 'Professional hair spa cream for deep conditioning treatment.',
    unit: 'jar (500ml)',
    currentStock: 8,
    minStockLevel: 5,
    maxStockLevel: 25,
    purchasePrice: 850,
    sellingPrice: 1200,
    stockValue: 6800,
    status: 'active',
    expiryDate: '2027-03-15',
    supplierName: 'Beauty Wholesale India',
    supplierPhone: '9876500001',
    lastStockUpdateAt: '2026-06-20',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-20',
  },
  {
    id: 'inv-002',
    productNo: 'P-002',
    name: 'Keratin Shampoo',
    brand: 'Matrix',
    category: 'Hair Care',
    sku: 'MTX-KS-1L',
    description: 'Keratin-infused shampoo for salon wash services.',
    unit: 'bottle (1L)',
    currentStock: 3,
    minStockLevel: 5,
    purchasePrice: 650,
    sellingPrice: 900,
    stockValue: 1950,
    status: 'active',
    supplierName: 'Beauty Wholesale India',
    supplierPhone: '9876500001',
    lastStockUpdateAt: '2026-06-18',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-18',
  },
  {
    id: 'inv-003',
    productNo: 'P-003',
    name: 'Hair Color Tube',
    brand: 'Wella',
    category: 'Hair Care',
    sku: 'WEL-HC-60',
    description: 'Professional permanent hair color tubes, assorted shades.',
    unit: 'tube (60g)',
    currentStock: 22,
    minStockLevel: 10,
    maxStockLevel: 50,
    purchasePrice: 380,
    stockValue: 8360,
    status: 'active',
    expiryDate: '2027-12-01',
    supplierName: 'Wella India Distributors',
    supplierPhone: '9876500002',
    lastStockUpdateAt: '2026-06-15',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-15',
  },
  {
    id: 'inv-004',
    productNo: 'P-004',
    name: 'Facial Kit',
    brand: 'VLCC',
    category: 'Skin Care',
    sku: 'VLCC-FK-PRO',
    description: 'Professional facial kit with 6-step treatment.',
    unit: 'kit',
    currentStock: 12,
    minStockLevel: 4,
    purchasePrice: 450,
    sellingPrice: 800,
    stockValue: 5400,
    status: 'active',
    expiryDate: '2026-07-10',
    supplierName: 'VLCC Salon Supply',
    supplierPhone: '9876500003',
    lastStockUpdateAt: '2026-06-22',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-22',
  },
  {
    id: 'inv-005',
    productNo: 'P-005',
    name: 'Cleanup Cream',
    brand: 'Cheryl',
    category: 'Skin Care',
    sku: 'CHR-CC-250',
    description: 'Brightening cleanup cream for daily facial services.',
    unit: 'tube (250ml)',
    currentStock: 2,
    minStockLevel: 5,
    purchasePrice: 320,
    stockValue: 640,
    status: 'active',
    lastStockUpdateAt: '2026-06-19',
    createdAt: '2024-08-10',
    updatedAt: '2026-06-19',
  },
  {
    id: 'inv-006',
    productNo: 'P-006',
    name: 'Nail Polish Set',
    brand: 'OPI',
    category: 'Nail Care',
    sku: 'OPI-NP-SET12',
    description: 'Professional nail polish set with 12 trending shades.',
    unit: 'set',
    currentStock: 6,
    minStockLevel: 3,
    purchasePrice: 2200,
    sellingPrice: 3500,
    stockValue: 13200,
    status: 'active',
    supplierName: 'Nail Art Supplies',
    supplierPhone: '9876500004',
    lastStockUpdateAt: '2026-06-10',
    createdAt: '2025-01-15',
    updatedAt: '2026-06-10',
  },
  {
    id: 'inv-007',
    productNo: 'P-007',
    name: 'Waxing Roll',
    brand: 'Rica',
    category: 'Consumables',
    sku: 'RCA-WR-100',
    description: 'Professional waxing strip roll, 100m.',
    unit: 'roll (100m)',
    currentStock: 0,
    minStockLevel: 3,
    purchasePrice: 550,
    stockValue: 0,
    status: 'active',
    supplierName: 'Salon Essentials Co.',
    supplierPhone: '9876500005',
    lastStockUpdateAt: '2026-06-05',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-05',
  },
  {
    id: 'inv-008',
    productNo: 'P-008',
    name: 'Threading Cotton',
    brand: "Lily's",
    category: 'Consumables',
    sku: 'LIL-TC-500',
    description: 'Premium threading cotton, 500m spool.',
    unit: 'spool (500m)',
    currentStock: 15,
    minStockLevel: 5,
    purchasePrice: 120,
    stockValue: 1800,
    status: 'active',
    lastStockUpdateAt: '2026-06-12',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-12',
  },
  {
    id: 'inv-009',
    productNo: 'P-009',
    name: 'Bridal Makeup Fixer',
    brand: 'MAC',
    category: 'Makeup',
    sku: 'MAC-FIX-100',
    description: 'Long-lasting makeup fixer spray for bridal sessions.',
    unit: 'bottle (100ml)',
    currentStock: 4,
    minStockLevel: 3,
    purchasePrice: 1800,
    sellingPrice: 2500,
    stockValue: 7200,
    status: 'active',
    expiryDate: '2026-07-05',
    supplierName: 'MAC Pro Distributors',
    supplierPhone: '9876500006',
    lastStockUpdateAt: '2026-06-21',
    createdAt: '2025-03-20',
    updatedAt: '2026-06-21',
  },
  {
    id: 'inv-010',
    productNo: 'P-010',
    name: 'Disposable Towels',
    brand: 'CleanWrap',
    category: 'Consumables',
    sku: 'CW-DT-100',
    description: 'Disposable salon towels, pack of 100.',
    unit: 'pack (100pcs)',
    currentStock: 20,
    minStockLevel: 5,
    maxStockLevel: 40,
    purchasePrice: 350,
    stockValue: 7000,
    status: 'active',
    lastStockUpdateAt: '2026-06-23',
    createdAt: '2024-06-01',
    updatedAt: '2026-06-23',
  },
  {
    id: 'inv-011',
    productNo: 'P-011',
    name: 'Developer Cream (6%)',
    brand: 'Wella',
    category: 'Hair Care',
    sku: 'WEL-DC-1L',
    description: 'Hydrogen peroxide developer for hair color mixing.',
    unit: 'bottle (1L)',
    currentStock: 5,
    minStockLevel: 4,
    purchasePrice: 280,
    stockValue: 1400,
    status: 'inactive',
    createdAt: '2024-06-01',
  },
  {
    id: 'inv-012',
    productNo: 'P-012',
    name: 'Pedicure Spa Salt',
    brand: 'Morgan Taylor',
    category: 'Nail Care',
    sku: 'MT-PSS-500',
    description: 'Relaxing spa salt for pedicure tub.',
    unit: 'jar (500g)',
    currentStock: 7,
    minStockLevel: 3,
    purchasePrice: 420,
    stockValue: 2940,
    status: 'discontinued',
    createdAt: '2024-10-15',
    updatedAt: '2026-05-01',
  },
];

const MOCK_ADJUSTMENTS: StockAdjustment[] = [
  {
    id: 'adj-001',
    productId: 'inv-001',
    productName: "L'Oréal Hair Spa Cream",
    type: 'stock_in',
    quantity: 10,
    previousStock: 3,
    newStock: 13,
    reason: 'Monthly restock from supplier',
    adjustedBy: 'Ananya Sharma',
    adjustedAt: '2026-06-20T10:30:00Z',
  },
  {
    id: 'adj-002',
    productId: 'inv-001',
    productName: "L'Oréal Hair Spa Cream",
    type: 'used_in_service',
    quantity: 5,
    previousStock: 13,
    newStock: 8,
    reason: 'Used for client hair spa sessions',
    adjustedBy: 'Meera Kapoor',
    adjustedAt: '2026-06-22T14:00:00Z',
  },
  {
    id: 'adj-003',
    productId: 'inv-007',
    productName: 'Waxing Roll',
    type: 'stock_out',
    quantity: 3,
    previousStock: 3,
    newStock: 0,
    reason: 'Last rolls used, reorder needed',
    adjustedBy: 'Meera Kapoor',
    adjustedAt: '2026-06-05T16:00:00Z',
  },
  {
    id: 'adj-004',
    productId: 'inv-003',
    productName: 'Hair Color Tube',
    type: 'damaged',
    quantity: 2,
    previousStock: 24,
    newStock: 22,
    reason: 'Tubes leaked during storage',
    adjustedBy: 'Ananya Sharma',
    adjustedAt: '2026-06-15T11:00:00Z',
  },
  {
    id: 'adj-005',
    productId: 'inv-006',
    productName: 'Nail Polish Set',
    type: 'retail_sale',
    quantity: 1,
    previousStock: 7,
    newStock: 6,
    reason: 'Sold to walk-in customer',
    adjustedBy: 'Riya Patel',
    adjustedAt: '2026-06-10T15:30:00Z',
  },
];

export function getMockInventoryProducts(): InventoryProduct[] {
  return MOCK_PRODUCTS;
}

export function getMockInventoryProductById(id: string): InventoryProduct | null {
  return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
}

export function createMockInventoryProduct(
  payload: CreateInventoryProductPayload
): InventoryProduct {
  return {
    id: `inv-mock-${Date.now()}`,
    productNo: `P-${String(MOCK_PRODUCTS.length + 1).padStart(3, '0')}`,
    name: payload.name,
    brand: payload.brand,
    category: payload.category,
    sku: payload.sku,
    barcode: payload.barcode,
    description: payload.description,
    unit: payload.unit,
    currentStock: payload.currentStock,
    minStockLevel: payload.minStockLevel,
    maxStockLevel: payload.maxStockLevel,
    purchasePrice: payload.purchasePrice,
    sellingPrice: payload.sellingPrice,
    stockValue: payload.currentStock * payload.purchasePrice,
    status: payload.status,
    expiryDate: payload.expiryDate,
    supplierName: payload.supplierName,
    supplierPhone: payload.supplierPhone,
    createdAt: new Date().toISOString(),
  };
}

export function createMockStockAdjustment(payload: CreateStockAdjustmentPayload): StockAdjustment {
  const product = getMockInventoryProductById(payload.productId);
  const prevStock = product?.currentStock ?? 0;
  const isIncrease = payload.type === 'stock_in' || payload.type === 'correction';
  const newStock = isIncrease ? prevStock + payload.quantity : prevStock - payload.quantity;
  return {
    id: `adj-mock-${Date.now()}`,
    productId: payload.productId,
    productName: product?.name ?? 'Unknown Product',
    type: payload.type,
    quantity: payload.quantity,
    previousStock: prevStock,
    newStock: Math.max(0, newStock),
    reason: payload.reason,
    note: payload.note,
    adjustedBy: 'Current User',
    adjustedAt: new Date().toISOString(),
  };
}

export function getMockStockAdjustments(productId?: string): StockAdjustment[] {
  if (productId) return MOCK_ADJUSTMENTS.filter((a) => a.productId === productId);
  return MOCK_ADJUSTMENTS;
}
