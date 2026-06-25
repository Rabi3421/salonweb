# Dashboard Phase 8 - Enquiries and Leads

## Scope

Phase 8 adds enquiry and lead management to the salon dashboard in `salonweb`.

Implemented:

- `/dashboard/enquiries`
- `/dashboard/enquiries/[enquiryId]`

Not implemented:

- Backend route handlers
- Superadmin pages
- Public website redesign
- Reports, settings, inventory, or expenses modules

## Role Access

| Role         | List | Detail | Update Status | Add Note | Convert |
| ------------ | ---- | ------ | ------------- | -------- | ------- |
| Owner        | Yes  | Yes    | Yes           | Yes      | Yes     |
| Manager      | Yes  | Yes    | Yes           | Yes      | Yes     |
| Receptionist | Yes  | Yes    | Yes           | Yes      | Yes     |
| Stylist      | No   | No     | No            | No       | No      |
| Accountant   | No   | No     | No            | No       | No      |

Stylist and accountant users do not see the Enquiries navigation item. Direct route access is blocked by `RoutePermissionGuard`.

## Data Model

Types are defined in `src/types/enquiries.ts`.

Core entities:

- `SalonEnquiry`
- `EnquiryFollowUpNote`

Supported enquiry types:

- `contact`
- `appointment_request`
- `support`
- `package_interest`
- `bridal_enquiry`

Supported statuses:

- `new`
- `contacted`
- `follow_up`
- `converted`
- `closed`
- `lost`

Supported priorities:

- `low`
- `normal`
- `high`
- `urgent`

Supported sources:

- `website`
- `services_page`
- `contact_page`
- `book_appointment_page`
- `phone`
- `whatsapp`
- `walk_in`
- `referral`

## Status Flow

Recommended transitions:

- `new` -> `contacted`, `follow_up`, `closed`
- `contacted` -> `follow_up`, `converted`, `lost`, `closed`
- `follow_up` -> `contacted`, `converted`, `lost`, `closed`
- `converted` -> no normal action
- `closed` / `lost` -> `follow_up`

## API Contract

`src/lib/enquiries-api.ts` expects these salonbackend endpoints:

- `GET /api/salon/enquiries`
- `GET /api/salon/enquiries/:enquiryId`
- `PATCH /api/salon/enquiries/:enquiryId`
- `POST /api/salon/enquiries/:enquiryId/notes`
- `POST /api/salon/enquiries/:enquiryId/convert-to-appointment`

The existing API client sends `x-salon-id` from `NEXT_PUBLIC_SALON_ID`.

## Mock Mode

Mock mode is enabled only when `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`.

Mock mode supports:

- Listing realistic website, phone, and WhatsApp leads
- Opening enquiry detail pages
- Updating status, priority, assignee, and next follow-up
- Adding follow-up notes
- Mock converting an enquiry to converted status

When mock mode is disabled and salonbackend is unavailable, the UI shows `ErrorState`.

## Components Added

Components live under `src/components/dashboard/enquiries`.

- `EnquiryStatusBadge`
- `EnquiryTypeBadge`
- `EnquiryPriorityBadge`
- `EnquiryFilters`
- `EnquirySummaryCards`
- `EnquiriesTable`
- `EnquiryMobileCards`
- `EnquiryContactCard`
- `EnquiryDetailsCard`
- `EnquiryStatusPanel`
- `EnquiryNotesPanel`
- `EnquiryConversionPanel`

## Page Behavior

`/dashboard/enquiries`:

- Shows summary cards for new leads, appointment requests, follow-ups due, converted, and high priority.
- Supports search, type, status, priority, source, and date filters.
- Shows desktop table and mobile cards.
- Includes view, call, and WhatsApp actions.

`/dashboard/enquiries/[enquiryId]`:

- Shows lead identity, badges, contact actions, contact details, request details, follow-up notes, status management, and conversion panel.
- Conversion is API-ready and mock-success only until salonbackend implements the conversion endpoint.

## Public Website Impact

No public website routes or components were modified in this phase.

## Backend Impact

No `salonbackend` files were modified. No API routes were created in `salonweb`.

## Recommended Next Phase

For MVP selling focus, build Reports before Inventory so salon owners can see lead conversion, bookings, billing, and collections. Inventory can follow once operational reporting is reliable.
