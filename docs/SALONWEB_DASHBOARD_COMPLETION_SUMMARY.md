# Salonweb Dashboard — Completion Summary

## Project Architecture

**salonweb** is a Next.js 15 frontend project serving two purposes:
1. **Public salon website** — 13 marketing/info pages with luxury pink theme
2. **Staff dashboard** — 40 role-based operational pages for salon management

It connects to **salonbackend** (Next.js 16 on port 3000) via REST APIs, sending `x-salon-id` header with every request. The active salon is configured via `NEXT_PUBLIC_SALON_ID` in `.env.local`.

## Completed Modules

### Public Website (Phase 0–10)
- Home, Services, About, Gallery, Contact, Book Appointment
- Team, Packages, Reviews, FAQs
- Privacy Policy, Terms, Cancellation Policy
- SEO: robots.txt, sitemap.xml, JSON-LD structured data
- Dynamic tenant data layer (src/data/public-site-data.ts)

### Dashboard Auth (Phase 1)
- `/login` — Split-panel SaaS login with mock role selector
- JWT httpOnly cookie auth via salonbackend
- DashboardAuthGuard, DashboardContext, DashboardShell
- Mock mode for UI development without backend

### Dashboard Overview (Phase 2)
- `/dashboard` — Role-aware stats, quick actions, activity feed
- Different data/layout per role

### Appointments (Phase 3)
- List with filters, calendar view, create form, detail with status flow
- 7-status appointment lifecycle: requested → confirmed → checked_in → in_service → completed

### Customers (Phase 4)
- List with search/filters, create form, detail with visits/preferences/financials
- Role-based financial visibility

### Services & Packages (Phase 5)
- Service CRUD with categories, pricing, duration, staff assignment
- Package CRUD with included services, tags, highlights, validity

### Staff (Phase 6)
- Staff list with role/status filters, create form, detail with schedule/services
- Working days/hours configuration

### Billing & Payments (Phase 7)
- Bill creation with line items (services, products, custom)
- Payment recording with multiple methods
- Bill status flow: draft → sent → paid → overdue → cancelled
- Payments list with totals and method breakdown

### Enquiries (Phase 8)
- Enquiry list with source/status/priority filters
- Detail with timeline, notes, follow-up scheduling
- Manual enquiry creation

### Reports (Phase 9)
- Revenue report with chart and breakdown
- Appointment report with status/service analysis
- Staff performance report
- Customer insights report

### Settings & Users (Phase 10)
- Profile, business info, booking preferences, notification settings
- User management: list, create, detail, toggle status, reset password

### Inventory (Phase 11)
- Product list with stock state alerts (in stock / low / out of stock / expiring)
- Product create form with supplier info
- Product detail with pricing, stock adjustment form, movement history

## Total Routes: 56
- 13 public + 2 SEO + 1 login + 40 dashboard

## Tech Stack
- Next.js 15.5, React 19, TypeScript
- Tailwind CSS 3.4 with CSS variables
- Fraunces + DM Sans fonts
- No external UI library — custom components throughout

## Mock Mode

Set `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true` in `.env.local` to enable:
- Mock role selector on login page (owner/manager/receptionist/stylist/accountant)
- All modules load realistic demo data
- "Demo data" badges visible on pages
- Create/edit forms show demo success messages

When disabled, all data comes from salonbackend APIs only.

## Backend Integration Steps

1. Build all 46 API endpoints in salonbackend (see `docs/DASHBOARD_BACKEND_API_REQUIREMENTS.md`)
2. Implement salon-scoped auth middleware reading `x-salon-id` header
3. Set `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=false` in salonweb
4. Start salonbackend on port 3000
5. Start salonweb on port 4028
6. Test each module: login → overview → appointments → customers → etc.

## API Client Configuration
- Base URL: `NEXT_PUBLIC_API_BASE_URL` (default: `http://localhost:3000`)
- Salon ID: `NEXT_PUBLIC_SALON_ID` sent as `x-salon-id` header
- Auth: `credentials: 'include'` for httpOnly cookie
- Content-Type: `application/json`

## Files Structure

```
src/
├── app/
│   ├── dashboard/         # 40 dashboard pages
│   ├── login/             # Auth page
│   ├── (public pages)     # 13 public routes
│   ├── robots.ts          # SEO
│   └── sitemap.ts         # SEO
├── components/
│   ├── dashboard/         # Dashboard UI components
│   │   ├── appointments/
│   │   ├── billing/
│   │   ├── customers/
│   │   ├── enquiries/
│   │   ├── inventory/
│   │   ├── overview/
│   │   ├── reports/
│   │   ├── services/
│   │   ├── settings/
│   │   ├── staff/
│   │   └── users/
│   └── ui/               # Shared UI primitives
├── lib/
│   ├── api-client.ts      # Centralized fetch with x-salon-id
│   ├── dashboard-auth.ts  # Auth helpers + mock users
│   ├── dashboard-permissions.ts  # Nav + route access matrix
│   ├── *-api.ts           # Module API helpers (13 files)
│   ├── *-utils.ts         # Module utility helpers
│   └── env.ts             # Environment variables
├── types/                 # TypeScript interfaces (14 files)
└── data/                  # Static fallback data
```

## Pending Backend Work
- All 46 API endpoints need implementation in salonbackend
- Salon-scoped middleware for multi-tenant isolation
- Role-based access control on backend
- File upload support for avatars/images (optional)
- Expenses module (frontend nav placeholder exists)
