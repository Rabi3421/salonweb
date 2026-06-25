# Dashboard Phase-by-Phase Build Plan

## Prerequisites

Before starting dashboard phases:
- salonbackend must have salon auth APIs (`/api/salon/auth/login`, `/me`, `/logout`)
- salonbackend must have the relevant module APIs for each phase
- salonweb public website must remain untouched

---

## Phase 1 — Auth UI + Dashboard Shell

**Build:**
- `/login` page with email/password form
- Protected `/dashboard` layout with auth check
- `DashboardShell` — sidebar + topbar + mobile nav
- Role-aware sidebar menu (shows only allowed modules)
- Logout functionality
- `PermissionDenied` component
- `src/lib/dashboard-auth.ts` — login/logout/me
- `src/lib/dashboard-permissions.ts` — role checks

**Do NOT build:** Module pages, API calls for appointments/customers/etc.

**Backend required:** `POST /api/salon/auth/login`, `POST /api/salon/auth/logout`, `GET /api/salon/auth/me`

---

## Phase 2 — Role-Based Overview

**Build:**
- `/dashboard` page with role-specific overview cards
- Owner: revenue, appointments, customers, alerts
- Manager: today appointments, confirmations, enquiries
- Receptionist: today queue, walk-in button, pending
- Stylist: my schedule, next client
- Accountant: collection, dues, expenses
- Use fallback/mock data if backend overview API not ready

**Backend required:** `GET /api/salon/dashboard/overview`

---

## Phase 3 — Appointments

**Build:**
- `/dashboard/appointments` — list with filters
- `/dashboard/appointments/calendar` — calendar view
- `/dashboard/appointments/new` — create appointment form
- `/dashboard/appointments/[id]` — detail with status actions
- Status flow: requested → confirmed → checked_in → in_service → completed
- Stylist assignment, customer selection, service selection

**Backend required:** Appointment CRUD + status APIs

---

## Phase 4 — Customers

**Build:**
- `/dashboard/customers` — list with search
- `/dashboard/customers/new` — create customer
- `/dashboard/customers/[id]` — profile, history, notes
- WhatsApp/call shortcuts

**Backend required:** Customer CRUD APIs

---

## Phase 5 — Services + Packages

**Build:**
- `/dashboard/services` — list, create, edit, toggle active
- `/dashboard/packages` — list, create, edit
- Category management

**Backend required:** Service and Package CRUD APIs

---

## Phase 6 — Staff

**Build:**
- `/dashboard/staff` — list
- `/dashboard/staff/new` — add staff member
- `/dashboard/staff/[id]` — profile, schedule, services assigned

**Backend required:** Staff CRUD APIs

---

## Phase 7 — Billing/POS/Payments

**Build:**
- `/dashboard/billing` — bill list
- `/dashboard/billing/new` — create bill from appointment
- `/dashboard/billing/[id]` — bill detail, payment collection
- `/dashboard/payments` — payment list
- Payment modes: cash, UPI, card
- Partial payments, dues tracking

**Backend required:** Bill and Payment APIs

---

## Phase 8 — Inventory (Later)

**Build:**
- `/dashboard/inventory` — product list
- Stock management, low-stock alerts
- Stock adjustments

**Backend required:** Inventory APIs

---

## Phase 9 — Enquiries/Leads

**Build:**
- `/dashboard/enquiries` — website enquiry list
- `/dashboard/enquiries/[id]` — detail, notes, follow-up
- Convert enquiry to appointment

**Backend required:** Enquiry APIs (partially exist already)

---

## Phase 10 — Reports

**Build:**
- `/dashboard/reports` — report hub
- Revenue, appointments, staff, customer reports
- Date range filtering

**Backend required:** Report APIs

---

## Phase 11 — Settings + User Management

**Build:**
- `/dashboard/settings` — salon profile
- `/dashboard/settings/users` — user list, create, edit roles
- Opening hours, booking rules

**Backend required:** Settings and User APIs

---

## Phase 12 — Final Dashboard QA

**Check:**
- All routes work for each role
- Permission denied shows correctly
- Mobile sidebar works
- Forms have loading/success/error states
- No public website breakage
- `npm run build` passes

---

## Validation Per Phase

Every phase must:
1. Run `npm run lint` — zero errors
2. Run `npm run build` — zero errors
3. Not break any existing public website page
4. Not modify salonbackend
5. Not create superadmin routes
