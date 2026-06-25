# Dashboard Phase 5 — Services + Packages Management

## Routes Created

### Services
- `/dashboard/services` — List all salon services with search, category filter, status filter
- `/dashboard/services/new` — Create new service (owner only)
- `/dashboard/services/[serviceId]/edit` — Edit existing service (owner only)

### Packages
- `/dashboard/packages` — List all packages as cards with search and status filter
- `/dashboard/packages/new` — Create new package (owner only)
- `/dashboard/packages/[packageId]/edit` — Edit existing package (owner only)

## Role Access

| Feature | Owner | Manager | Receptionist | Stylist | Accountant |
|---------|-------|---------|--------------|---------|------------|
| View Services | ✅ | ✅ | ✅ | ✅ | ❌ |
| Create Service | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Service | ✅ | ❌ | ❌ | ❌ | ❌ |
| Toggle Service Status | ✅ | ❌ | ❌ | ❌ | ❌ |
| View Packages | ✅ | ✅ | ✅ | ❌ | ❌ |
| Create Package | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Package | ✅ | ❌ | ❌ | ❌ | ❌ |
| Toggle Package Status | ✅ | ❌ | ❌ | ❌ | ❌ |

## Data Models

### SalonService
- id, slug, name, category, description, price, duration, status
- image, assignedStaffIds, assignedStaffNames, isFeatured
- createdAt, updatedAt

### SalonPackage
- id, slug, name, description, price, status
- tag, bestFor, includedServiceIds, includedServices
- validityDays, isHighlighted
- createdAt, updatedAt

## API Endpoints Expected

### Services
- `GET /api/salon/services` — List services
- `POST /api/salon/services` — Create service
- `GET /api/salon/services/:id` — Get service by ID
- `PATCH /api/salon/services/:id` — Update service
- `DELETE /api/salon/services/:id` — Delete service

### Packages
- `GET /api/salon/packages` — List packages
- `POST /api/salon/packages` — Create package
- `GET /api/salon/packages/:id` — Get package by ID
- `PATCH /api/salon/packages/:id` — Update package
- `DELETE /api/salon/packages/:id` — Delete package

## Mock Mode

When `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`:
- 10 mock services based on public website service data
- 5 mock packages based on public website package data
- Create/edit forms show demo success messages
- "Demo data" badge shown on list pages

When mock mode disabled and backend unavailable:
- ErrorState shown with appropriate message

## Files Created

### Types
- `src/types/services.ts`

### API + Mock Data
- `src/lib/services-api.ts`

### Utilities
- `src/lib/service-utils.ts`

### Components
- `src/components/dashboard/services/ServiceStatusBadge.tsx`
- `src/components/dashboard/services/PackageStatusBadge.tsx`

### Pages
- `src/app/dashboard/services/page.tsx`
- `src/app/dashboard/services/new/page.tsx`
- `src/app/dashboard/services/[serviceId]/edit/page.tsx`
- `src/app/dashboard/packages/page.tsx`
- `src/app/dashboard/packages/new/page.tsx`
- `src/app/dashboard/packages/[packageId]/edit/page.tsx`

### Updated
- `src/lib/dashboard-permissions.ts` — Enabled Services/Packages nav

## Navigation Update

- Services: visible to owner, manager, receptionist, stylist (removed comingSoon)
- Packages: visible to owner, manager, receptionist (removed comingSoon)
- Accountant cannot see either nav item

## Next Phase

Phase 6: Staff Management Module
