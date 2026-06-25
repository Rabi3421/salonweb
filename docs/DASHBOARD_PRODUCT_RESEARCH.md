# Salon Dashboard — Product Research

## What The SaaS Provides

Each salon tenant gets:
1. **Premium public website** (completed) — 13 pages with booking forms
2. **Role-based salon dashboard** (to be built) — daily operations management
3. **Backend APIs** (in salonbackend) — data, auth, business logic

## Dashboard Modules

### MVP Modules (Build First)

| Module | Why It Matters |
|--------|---------------|
| **Auth** | Staff login with role-based access |
| **Overview** | Daily snapshot — appointments, revenue, alerts |
| **Appointments** | Core salon workflow — book, confirm, serve, complete |
| **Customers** | Client profiles, history, preferences, repeat tracking |
| **Services** | Service catalog with pricing, duration, staff assignment |
| **Packages** | Bundled service offerings |
| **Staff** | Team profiles, schedules, service assignments |
| **Billing/POS** | Bill generation, payment collection, receipts |
| **Payments** | Payment tracking, dues, refunds |
| **Enquiries** | Website leads, appointment requests, follow-up |
| **Reports** | Revenue, appointments, staff, customer analytics |
| **Settings** | Salon profile, hours, booking rules, user management |

### Later Advanced Features (Phase 2+)

| Feature | Notes |
|---------|-------|
| Expenses tracking | Rent, supplies, utility tracking |
| Inventory management | Product stock, low-stock alerts, purchase orders |
| Commission calculation | Staff earnings based on services |
| Marketing/SMS/WhatsApp campaigns | Promotional messages |
| Loyalty/membership system | Points, tier rewards |
| Online payment gateway | Razorpay/Stripe integration |
| Multi-branch support | Multiple locations under one owner |
| Website content CMS | Edit public website from dashboard |
| Customer app/portal | Client-facing booking portal |

## Public Website vs Dashboard

| Aspect | Public Website | Dashboard |
|--------|---------------|-----------|
| Purpose | Marketing, booking enquiries | Daily salon operations |
| Users | Potential and existing clients | Salon staff (owner, manager, stylist, receptionist, accountant) |
| Auth | None required | Role-based login required |
| Design | Luxury pink marketing theme | Clean professional SaaS UI |
| Data | Static fallback + future API | Real-time from backend APIs |
| Routes | `/`, `/services`, etc. | `/dashboard/*` |
