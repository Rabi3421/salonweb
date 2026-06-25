# Dashboard Phase 11 — Inventory / Product Stock Module

## Routes Created

- `/dashboard/inventory` — List all inventory products with search, filters, stock alerts
- `/dashboard/inventory/new` — Create new inventory product (owner only)
- `/dashboard/inventory/[productId]` — Product detail with stock info, pricing, supplier, stock adjustment form, movement history

## Role Access

| Feature | Owner | Manager | Receptionist | Stylist | Accountant |
|---------|-------|---------|--------------|---------|------------|
| View Inventory | ✅ | ✅ | ❌ | ❌ | ✅ |
| Create Product | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Product | ✅ | ❌ | ❌ | ❌ | ❌ |
| Adjust Stock | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Inventory Value | ✅ | ❌ | ❌ | ❌ | ✅ |
| Nav Visible | ✅ | ✅ | ❌ | ❌ | ✅ |

## Data Models

### InventoryProduct
- id, productNo, name, brand, category, sku, barcode, description
- unit, currentStock, minStockLevel, maxStockLevel
- purchasePrice, sellingPrice, stockValue
- status (active/inactive/discontinued)
- expiryDate, supplierName, supplierPhone
- lastStockUpdateAt, createdAt, updatedAt

### StockAdjustment
- id, productId, productName, type, quantity
- previousStock, newStock, reason, note
- adjustedBy, adjustedAt

### StockAdjustmentType
- stock_in, stock_out, correction, damaged, expired, used_in_service, retail_sale

## Stock State Logic
- **In Stock**: currentStock > minStockLevel
- **Low Stock**: currentStock > 0 && currentStock <= minStockLevel
- **Out of Stock**: currentStock <= 0
- **Expiring Soon**: expiryDate within 30 days

## API Endpoints Expected

### Products
- `GET /api/salon/inventory/products` — List products
- `POST /api/salon/inventory/products` — Create product
- `GET /api/salon/inventory/products/:id` — Get product by ID
- `PATCH /api/salon/inventory/products/:id` — Update product

### Stock Adjustments
- `POST /api/salon/inventory/adjustments` — Record stock adjustment

## Mock Mode

When `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`:
- 12 mock products with varied categories, stock states, expiry dates
- 5 mock stock adjustments for movement history
- Create/adjust forms show demo success messages
- "Demo data" badge shown on pages

When mock mode disabled and backend unavailable:
- ErrorState shown with appropriate message

## Files Created

### Types
- `src/types/inventory.ts`

### API + Mock Data
- `src/lib/inventory-api.ts`

### Utilities
- `src/lib/inventory-utils.ts`

### Components
- `src/components/dashboard/inventory/InventoryStatusBadge.tsx`
- `src/components/dashboard/inventory/StockStateBadge.tsx`

### Pages
- `src/app/dashboard/inventory/page.tsx`
- `src/app/dashboard/inventory/new/page.tsx`
- `src/app/dashboard/inventory/[productId]/page.tsx`

### Updated
- `src/lib/dashboard-permissions.ts` — Enabled Inventory nav, added route access rules

## Navigation Update

- Inventory: visible to owner, manager, accountant (removed comingSoon)
- Receptionist and stylist cannot see Inventory nav
- Expenses remains disabled with comingSoon

## Next Phase

Phase 12: Final Dashboard QA + Backend Integration Readiness
