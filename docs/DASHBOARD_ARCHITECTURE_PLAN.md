# Dashboard Architecture Plan

## Architecture Overview

```
salonbackend (port 3000)
├── Backend APIs (/api/salon/*)
├── Superadmin UI (/superadmin/*)
├── Models, middleware, auth
└── DO NOT modify from salonweb

salonweb (this project)
├── Public website (13 pages) ← COMPLETE
├── Salon dashboard (/dashboard/*) ← TO BUILD
├── Login page (/login)
├── Uses NEXT_PUBLIC_SALON_ID for tenant
└── API client sends x-salon-id header
```

## Public vs Dashboard Separation

| Aspect | Public Website | Dashboard |
|--------|---------------|-----------|
| Routes | `/`, `/services`, `/about`, etc. | `/login`, `/dashboard/*` |
| Layout | PublicLayout (Header + Footer) | DashboardShell (Sidebar + Topbar) |
| Auth | None | JWT cookie-based |
| Design | Luxury rose marketing theme | Clean professional SaaS |
| Components | `src/app/components/`, `src/components/` | `src/components/dashboard/` |

## Dashboard Route Structure

### Auth
| Route | Description | Roles |
|-------|-------------|-------|
| `/login` | Staff login | Public |

### Dashboard
| Route | Description | Roles |
|-------|-------------|-------|
| `/dashboard` | Role-based overview | All |
| `/dashboard/appointments` | Appointment list | Owner, Manager, Receptionist, Stylist (own) |
| `/dashboard/appointments/calendar` | Calendar view | Owner, Manager, Receptionist |
| `/dashboard/appointments/new` | Create appointment | Owner, Manager, Receptionist |
| `/dashboard/appointments/[id]` | Appointment detail | Owner, Manager, Receptionist, Stylist (own) |
| `/dashboard/customers` | Customer list | Owner, Manager, Receptionist, Accountant (billing) |
| `/dashboard/customers/new` | Create customer | Owner, Manager, Receptionist |
| `/dashboard/customers/[id]` | Customer profile | Owner, Manager, Receptionist |
| `/dashboard/services` | Service catalog | Owner, Manager |
| `/dashboard/services/new` | Create service | Owner |
| `/dashboard/services/[id]/edit` | Edit service | Owner |
| `/dashboard/packages` | Package list | Owner, Manager |
| `/dashboard/packages/new` | Create package | Owner |
| `/dashboard/packages/[id]/edit` | Edit package | Owner |
| `/dashboard/staff` | Staff list | Owner |
| `/dashboard/staff/new` | Add staff | Owner |
| `/dashboard/staff/[id]` | Staff profile | Owner |
| `/dashboard/billing` | Bill list | Owner, Accountant |
| `/dashboard/billing/new` | Create bill | Owner, Receptionist, Accountant |
| `/dashboard/billing/[id]` | Bill detail | Owner, Accountant |
| `/dashboard/payments` | Payment list | Owner, Accountant |
| `/dashboard/expenses` | Expense tracking | Owner, Accountant |
| `/dashboard/inventory` | Product inventory | Owner, Manager |
| `/dashboard/inventory/new` | Add product | Owner |
| `/dashboard/inventory/[id]` | Product detail | Owner |
| `/dashboard/enquiries` | Enquiry list | Owner, Manager, Receptionist |
| `/dashboard/enquiries/[id]` | Enquiry detail | Owner, Manager, Receptionist |
| `/dashboard/reports` | Reports hub | Owner, Manager (operational), Accountant (finance) |
| `/dashboard/reports/revenue` | Revenue report | Owner, Accountant |
| `/dashboard/reports/appointments` | Appointment report | Owner, Manager |
| `/dashboard/reports/staff` | Staff report | Owner |
| `/dashboard/reports/customers` | Customer report | Owner, Manager |
| `/dashboard/settings` | Salon settings | Owner |
| `/dashboard/settings/profile` | Salon profile | Owner |
| `/dashboard/settings/users` | User management | Owner |

## Backend API Dependency List

### Auth
- `POST /api/salon/auth/login`
- `POST /api/salon/auth/logout`
- `GET /api/salon/auth/me`

### Dashboard
- `GET /api/salon/dashboard/overview`

### Appointments
- `GET /api/salon/appointments`
- `POST /api/salon/appointments`
- `GET /api/salon/appointments/[id]`
- `PATCH /api/salon/appointments/[id]`
- `PATCH /api/salon/appointments/[id]/status`

### Customers
- `GET /api/salon/customers`
- `POST /api/salon/customers`
- `GET /api/salon/customers/[id]`
- `PATCH /api/salon/customers/[id]`

### Services
- `GET /api/salon/services`
- `POST /api/salon/services`
- `GET /api/salon/services/[id]`
- `PATCH /api/salon/services/[id]`
- `DELETE /api/salon/services/[id]`

### Packages
- `GET /api/salon/packages`
- `POST /api/salon/packages`
- `PATCH /api/salon/packages/[id]`
- `DELETE /api/salon/packages/[id]`

### Staff
- `GET /api/salon/staff`
- `POST /api/salon/staff`
- `GET /api/salon/staff/[id]`
- `PATCH /api/salon/staff/[id]`

### Billing
- `GET /api/salon/bills`
- `POST /api/salon/bills`
- `GET /api/salon/bills/[id]`
- `PATCH /api/salon/bills/[id]`
- `POST /api/salon/bills/[id]/payments`

### Payments
- `GET /api/salon/payments`
- `POST /api/salon/payments`

### Expenses
- `GET /api/salon/expenses`
- `POST /api/salon/expenses`
- `PATCH /api/salon/expenses/[id]`

### Inventory
- `GET /api/salon/inventory/products`
- `POST /api/salon/inventory/products`
- `GET /api/salon/inventory/products/[id]`
- `PATCH /api/salon/inventory/products/[id]`
- `POST /api/salon/inventory/adjustments`

### Enquiries
- `GET /api/salon/enquiries`
- `GET /api/salon/enquiries/[id]`
- `PATCH /api/salon/enquiries/[id]`
- `POST /api/salon/enquiries/[id]/convert-to-appointment`

### Reports
- `GET /api/salon/reports/revenue`
- `GET /api/salon/reports/appointments`
- `GET /api/salon/reports/staff`
- `GET /api/salon/reports/customers`
- `GET /api/salon/reports/inventory`

### Settings
- `GET /api/salon/settings`
- `PATCH /api/salon/settings`
- `GET /api/salon/settings/users`
- `POST /api/salon/settings/users`
- `PATCH /api/salon/settings/users/[id]`

## Frontend Folder Structure

```
src/app/login/page.tsx

src/app/dashboard/
├── layout.tsx              ← DashboardShell wrapper
├── page.tsx                ← Role-based overview
├── appointments/
│   ├── page.tsx
│   ├── calendar/page.tsx
│   ├── new/page.tsx
│   └── [appointmentId]/page.tsx
├── customers/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [customerId]/page.tsx
├── services/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [serviceId]/edit/page.tsx
├── packages/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [packageId]/edit/page.tsx
├── staff/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [staffId]/page.tsx
├── billing/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [billId]/page.tsx
├── payments/page.tsx
├── expenses/page.tsx
├── inventory/
│   ├── page.tsx
│   ├── new/page.tsx
│   └── [productId]/page.tsx
├── enquiries/
│   ├── page.tsx
│   └── [enquiryId]/page.tsx
├── reports/
│   ├── page.tsx
│   ├── revenue/page.tsx
│   ├── appointments/page.tsx
│   ├── staff/page.tsx
│   └── customers/page.tsx
└── settings/
    ├── page.tsx
    ├── profile/page.tsx
    └── users/page.tsx

src/components/dashboard/
├── DashboardShell.tsx
├── DashboardSidebar.tsx
├── DashboardTopbar.tsx
├── DashboardMobileNav.tsx
├── RoleGuard.tsx
├── PermissionDenied.tsx
├── StatCard.tsx
├── StatusBadge.tsx
├── DataTable.tsx
├── EmptyState.tsx
├── LoadingState.tsx
└── ErrorState.tsx

src/lib/
├── dashboard-api.ts
├── dashboard-auth.ts
└── dashboard-permissions.ts

src/types/
├── auth.ts
├── dashboard.ts
├── appointments.ts
├── customers.ts
├── billing.ts
└── inventory.ts
```

## Dashboard UI Style Direction

| Aspect | Direction |
|--------|-----------|
| Background | Warm ivory `#FFF8F5` or light gray `#F9FAFB` |
| Cards | White with soft border and shadow |
| Accent | Rose pink `#E93D82` for CTAs and active states only |
| Text | Charcoal `#1F2933` for headings, gray for muted |
| Sidebar | White or dark charcoal with rose accent |
| Typography | DM Sans (body), Fraunces for headings if needed |
| Tables | Clean, compact, with hover states |
| Forms | Rounded inputs matching public site style |
| Spacing | Compact but readable — not marketing-level large |
| Icons | HeroIcons (already in project) |
