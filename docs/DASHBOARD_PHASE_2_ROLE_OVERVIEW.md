# Dashboard Phase 2 — Role-Based Overview

## Overview Sections by Role

| Section | Owner | Manager | Receptionist | Stylist | Accountant |
|---------|-------|---------|-------------|---------|------------|
| Stats Grid | Revenue + Appointments + Customers | Appointments + Staff + Enquiries | Queue + Confirmations + Walk-ins | My appointments + Services | Collection + Dues + Expenses |
| Today Appointments | All | All | All | Own only | Hidden |
| Alerts | All alerts | Operations alerts | Confirmation alerts | Hidden | Finance alerts |
| Quick Actions | Full set | Operations set | Front desk set | Service set | Finance set |
| Revenue Snapshot | Full | Hidden | Hidden | Hidden | Full |
| Staff Snapshot | Full | Full | Hidden | Hidden | Hidden |
| Recent Enquiries | Full | Full | Full | Hidden | Hidden |

## Data Source

- **Real API:** `GET /api/salon/dashboard/overview` — tried first
- **Mock fallback:** When `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true` and API fails, role-specific mock data is used
- **Demo badge:** Visible "Demo data" badge when using mock/fallback data
- **Error state:** Shown when API fails and mock mode is disabled

## Components Added

- `OverviewHeader` — Greeting, role badge, salon name, demo badge, date
- `OverviewStatsGrid` — Role-specific stat cards with colored dots and trend badges
- `TodayAppointmentsCard` — Compact appointment list with time, customer, service, stylist, status
- `QuickActionsCard` — 2x2 grid of role-specific actions (all "Coming soon" in Phase 2)
- `RevenueSnapshotCard` — Collection, dues, payment mode breakdown (owner/accountant only)
- `StaffSnapshotCard` — Available/busy/leave counts (owner/manager only)
- `AlertsCard` — Amber alert banners for attention items
- `RecentEnquiriesCard` — Latest enquiry list (owner/manager/receptionist)
- `DashboardContext` — React context for passing auth user to dashboard pages

## What Is Still Disabled

All nav module items remain "Coming soon":
Appointments, Customers, Enquiries, Services, Packages, Staff, Inventory, Billing, Payments, Expenses, Reports, Settings

Quick actions are disabled with "Coming soon" labels.

## Next Phase

Phase 3: Appointments module — list, calendar, create, detail, status flow.
