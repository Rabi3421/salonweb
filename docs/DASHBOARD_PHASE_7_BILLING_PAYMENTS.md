# Dashboard Phase 7 - Billing, POS, and Payments

## Scope

Phase 7 adds the salon dashboard billing workspace in `salonweb`.

Implemented:

- `/dashboard/billing`
- `/dashboard/billing/new`
- `/dashboard/billing/[billId]`
- `/dashboard/payments`

Not implemented in this phase:

- Reports pages
- Settings pages
- Inventory pages
- Expenses pages
- Superadmin pages
- Backend route handlers
- Public website changes

## Route Access

Billing and payment pages are salon dashboard routes protected by `RoutePermissionGuard`.

| Route                         | Owner | Manager | Receptionist | Stylist | Accountant |
| ----------------------------- | ----- | ------- | ------------ | ------- | ---------- |
| `/dashboard/billing`          | Yes   | Yes     | Yes          | No      | Yes        |
| `/dashboard/billing/new`      | Yes   | No      | Yes          | No      | Yes        |
| `/dashboard/billing/[billId]` | Yes   | Yes     | Yes          | No      | Yes        |
| `/dashboard/payments`         | Yes   | Yes     | Yes          | No      | Yes        |

Managers can view billing and payments but cannot create bills or record payments. Stylists cannot access billing or payments.

## Navigation

The Finance section now exposes:

- Billing
- Payments

The existing Finance placeholders remain untouched:

- Expenses remains coming soon.

The existing Insights and Admin placeholders remain untouched:

- Reports remains coming soon.
- Settings remains coming soon.

## Data Model

Types are defined in `src/types/billing.ts`.

Core entities:

- `SalonBill`
- `SalonPayment`
- `BillLineItem`
- `BillCustomer`

Supported status values:

- Bill: `draft`, `unpaid`, `partially_paid`, `paid`, `cancelled`, `refunded`
- Payment: `pending`, `completed`, `failed`, `refunded`

Supported payment modes:

- `cash`
- `upi`
- `card`
- `bank_transfer`
- `wallet`
- `other`

Supported bill sources:

- `appointment`
- `walk_in`
- `manual`

## API Client Contract

`src/lib/billing-api.ts` is the frontend API wrapper. It calls salonbackend through the existing API client, which attaches the configured salon ID using the existing tenant header behavior.

Expected backend endpoints:

- `GET /api/salon/bills`
- `GET /api/salon/bills/:billId`
- `POST /api/salon/bills`
- `PATCH /api/salon/bills/:billId`
- `POST /api/salon/bills/:billId/payments`
- `GET /api/salon/payments`
- `POST /api/salon/payments`

These endpoints should validate tenant ownership server-side using the salon ID sent by `salonweb`.

## Mock Mode

When `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`, the billing API wrapper falls back to local mock data if salonbackend is unavailable.

Mock mode supports:

- Bill listing
- Bill detail
- Bill creation
- Payment listing
- Recording a payment against a bill
- Updating bill paid and due amounts after mock payment recording

Mock data is for dashboard development only and must not be treated as persistent storage.

## UI Components

Billing components live under `src/components/dashboard/billing`.

Main components:

- `BillingSummaryCards`
- `BillFilters`
- `BillsTable`
- `BillMobileCards`
- `BillForm`
- `BillLineItemsEditor`
- `BillTotalsCard`
- `BillStatusBadge`
- `RecordPaymentForm`
- `ReceiptPreview`
- `PaymentFilters`
- `PaymentsTable`
- `PaymentMobileCards`
- `PaymentStatusBadge`
- `PaymentModeBadge`

## Page Behavior

`/dashboard/billing`:

- Shows total billed, collected, due, paid bill count, and overdue/unpaid count.
- Supports search, status, payment mode, and date filters.
- Shows desktop table and mobile cards.
- Shows Create Bill only for owner, receptionist, and accountant.

`/dashboard/billing/new`:

- Creates manual, walk-in, or appointment-linked bills.
- Uses existing service and package API wrappers to populate line items.
- Calculates subtotal, discount, tax, grand total, paid amount, and due amount.

`/dashboard/billing/[billId]`:

- Shows bill details, customer contact actions, line items, payment history, totals, and receipt preview.
- Allows payment recording for owner, receptionist, and accountant only when the bill has due amount.
- Supports copying a text receipt.

`/dashboard/payments`:

- Shows collection totals by cash, UPI, card, and pending or failed count.
- Supports search, mode, status, and date filters.
- Links each payment back to its bill detail route.

## Appointment Integration

This phase did not change appointment pages or appointment creation flows.

The billing model supports `appointmentId` so backend integration can later create bills from completed appointments or associate a bill with an appointment.

## Backend Integration Notes

When salonbackend endpoints are connected, the backend should:

- Validate `x-salon-id` against an active salon.
- Ensure returned bills and payments belong to the active salon.
- Recalculate totals server-side instead of trusting frontend totals.
- Enforce role permissions server-side.
- Store immutable payment records and audit bill status changes.
- Prevent overpayment unless an explicit credit/refund model exists.
- Use backend-generated bill and payment numbers.

## Phase 8 Candidates

Recommended next steps:

- Add salonbackend bill and payment models.
- Add salonbackend billing and payment APIs.
- Connect appointment completion to bill generation.
- Add receipt PDF or print layout support.
- Add refund and cancellation workflows.
- Add reports only when the reporting phase starts.
