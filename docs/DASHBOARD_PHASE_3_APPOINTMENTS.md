# Dashboard Phase 3 — Appointments Module

## Routes Created

| Route | Description | Roles |
|-------|-------------|-------|
| `/dashboard/appointments` | Appointment list with filters | Owner, Manager, Receptionist, Stylist (own) |
| `/dashboard/appointments/calendar` | Day schedule view | Owner, Manager, Receptionist, Stylist (own) |
| `/dashboard/appointments/new` | Create appointment form | Owner, Manager, Receptionist |
| `/dashboard/appointments/[id]` | Appointment detail + status actions | Owner, Manager, Receptionist, Stylist (own) |

Accountant: No access (PermissionDenied shown).

## Status Flow

```
requested → confirmed → checked_in → in_service → completed
              ↘ cancelled    ↘ cancelled
              ↘ no_show
```

Stylist can only: confirmed/checked_in → in_service → completed.

## Backend Endpoints Expected

- `GET /api/salon/appointments` — List with query params
- `POST /api/salon/appointments` — Create
- `GET /api/salon/appointments/[id]` — Detail
- `PATCH /api/salon/appointments/[id]` — Update
- `PATCH /api/salon/appointments/[id]/status` — Status change

## Mock Mode

When `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`:
- 6 demo appointments with realistic data
- Status updates work in-memory
- Create appointment shows demo success
- "Demo data" badge visible

## Components

- `AppointmentStatusBadge` — Colored status pills
- `AppointmentStatusActions` — Role-aware status transition buttons

## Next Phase

Phase 4: Customers module — list, create, detail, history.
