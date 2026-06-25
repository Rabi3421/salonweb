# Dashboard Phase 4 — Customers Module

## Routes Created

| Route | Description | Roles |
|-------|-------------|-------|
| `/dashboard/customers` | Customer list with search/filters | Owner, Manager, Receptionist, Stylist (assigned), Accountant (billing) |
| `/dashboard/customers/new` | Create customer form | Owner, Manager, Receptionist |
| `/dashboard/customers/[id]` | Customer detail/profile | Owner, Manager, Receptionist, Stylist (limited), Accountant (financial) |

## Role Access

| Feature | Owner | Manager | Receptionist | Stylist | Accountant |
|---------|-------|---------|-------------|---------|------------|
| List all | Yes | Yes | Yes | Assigned only | All (billing view) |
| Create | Yes | Yes | Yes | No | No |
| View profile | Full | Full | Full | Limited | Financial only |
| View financials | Yes | Yes | Limited | No | Yes |
| View notes/allergies | Yes | Yes | Yes | Yes | No |
| Edit | Yes | Yes | Yes | No | No |
| Call/WhatsApp | Yes | Yes | Yes | Yes | No |

## Backend Endpoints Expected

- `GET /api/salon/customers` — List with search/status/source
- `POST /api/salon/customers` — Create
- `GET /api/salon/customers/[id]` — Detail with visits
- `PATCH /api/salon/customers/[id]` — Update

## Mock Data

8 demo customers with realistic profiles, visit history, preferences, allergies, and dues. Stylist sees only 4 assigned customers.

## Next Phase

Phase 5: Services + Packages module.
