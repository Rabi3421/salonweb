# Dashboard Phase 9 - Reports

## Scope

Phase 9 adds frontend report pages to the salon dashboard in `salonweb`.

Implemented routes:

- `/dashboard/reports`
- `/dashboard/reports/revenue`
- `/dashboard/reports/appointments`
- `/dashboard/reports/staff`
- `/dashboard/reports/customers`

Not implemented:

- Settings
- Inventory
- Expenses
- Backend report route handlers
- Superadmin pages
- Public website changes

## Role Access

| Role         | Hub | Revenue | Appointments | Staff | Customers |
| ------------ | --- | ------- | ------------ | ----- | --------- |
| Owner        | Yes | Yes     | Yes          | Yes   | Yes       |
| Manager      | Yes | No      | Yes          | No    | Yes       |
| Accountant   | Yes | Yes     | No           | No    | No        |
| Receptionist | No  | No      | No           | No    | No        |
| Stylist      | No  | No      | No           | No    | No        |

Direct route access is enforced by `RoutePermissionGuard` and `dashboard-permissions.ts`.

## Data Model

Types are defined in `src/types/reports.ts`.

Core data shapes:

- `RevenueReportData`
- `AppointmentReportData`
- `StaffReportData`
- `CustomerReportData`
- `ReportMetric`
- `ReportDateRange`
- `ReportFilterParams`

Report views use simple metric cards, tables and CSS bar lists instead of a chart library.

## API Endpoints Expected

`src/lib/reports-api.ts` expects these salonbackend endpoints:

- `GET /api/salon/reports/revenue`
- `GET /api/salon/reports/appointments`
- `GET /api/salon/reports/staff`
- `GET /api/salon/reports/customers`

The existing API client sends `x-salon-id` from `NEXT_PUBLIC_SALON_ID`.

## Mock Mode

Mock mode is used only when `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`.

Mock reports include:

- Daily revenue for recent days
- Payment mode breakdown
- Service and package revenue
- Appointment status and source breakdown
- Staff performance for six staff members
- Customer sources, retention and top customers

When mock mode is disabled and salonbackend is unavailable, report pages show `ErrorState`.

## Components Added

Components live under `src/components/dashboard/reports`.

- `ReportHeader`
- `ReportDateRangeFilter`
- `ReportMetricCards`
- `SimpleBarList`
- `SimpleTrendTable`
- `ReportAccessCard`
- `PaymentModeBreakdownCard`
- `TopServicesCard`
- `TopCustomersCard`
- `StaffPerformanceTable`
- `AppointmentStatusBreakdownCard`

## Page Behavior

Reports hub:

- Shows role-aware report cards.
- Owner sees all reports.
- Manager sees appointment and customer reports.
- Accountant sees revenue report.
- Inventory, expense and marketing reports are shown as coming soon without routes.

Revenue report:

- Shows total revenue, today collection, pending dues, average bill value and payment count.
- Shows daily revenue, payment mode breakdown, service/package revenue, dues and top customers.

Appointment report:

- Shows appointment totals, completed, cancelled, no-shows and conversion rate.
- Shows status breakdown, source breakdown, daily trend, top services and cancellation summary.

Staff report:

- Owner-only.
- Shows staff totals, services completed, staff revenue, average rating, performance table, top performer and workload summary.

Customer report:

- Owner and manager.
- Shows customer totals, new/repeat customers, retention, average spend, source breakdown and top customers.

## Next Recommended Phase

Build Settings + Users/Roles next if the MVP needs salon-specific configuration and permission control. Build Inventory after settings, once the operational foundation is configurable.

## Public Website Impact

No public website routes or components were modified.

## Backend Impact

No `salonbackend` files were modified. No API routes were created in `salonweb`.
