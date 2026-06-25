# Dashboard Phase 6: Staff Management

This phase adds the salon dashboard staff management frontend inside `salonweb`.

## Routes Created

- `/dashboard/staff`
- `/dashboard/staff/new`
- `/dashboard/staff/[staffId]`

No backend routes were created in `salonweb`.

## Role Access

- `owner`: can view staff, create staff, and view private/financial details.
- `manager`: can view staff list and staff profiles, without salary/commission/private notes.
- `receptionist`: no staff module access in this phase.
- `stylist`: no staff module access in this phase.
- `accountant`: no staff module access in this phase.

Staff navigation is enabled only for `owner` and `manager`.

## Staff Data Model

Added `src/types/staff.ts` with:

- Staff status, role, and employment type unions
- Working schedule
- Assigned service references
- Staff profile model
- List/create/update payload types

## API Endpoints Expected

The frontend expects future backend endpoints:

- `GET /api/salon/staff`
- `POST /api/salon/staff`
- `GET /api/salon/staff/[staffId]`
- `PATCH /api/salon/staff/[staffId]`

Requests use the existing API client, which sends `x-salon-id` from `NEXT_PUBLIC_SALON_ID`.

## Mock Mode

Mock mode is enabled only when:

```env
NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true
```

In mock mode:

- Staff list uses realistic demo staff data.
- Staff profile opens demo IDs such as `staff-001`.
- New staff creation shows a demo success response.
- Staff pages show a small demo data/mode badge.

When mock mode is disabled and the backend API fails, staff pages show an error state.

## Components Added

Added reusable staff components under `src/components/dashboard/staff/`:

- `StaffStatusBadge`
- `StaffFilters`
- `StaffSummaryCards`
- `StaffTable`
- `StaffMobileCards`
- `StaffForm`
- `StaffProfileHeader`
- `StaffInfoCard`
- `StaffServicesCard`
- `StaffScheduleCard`
- `StaffPerformanceCard`

Also added `RoutePermissionGuard` for dashboard route access checks.

## Next Phase

Recommended next module: billing/POS/payments, depending on backend API readiness.
