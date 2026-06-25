# Dashboard Phase 10 - Settings, Users and Roles

## Scope

Phase 10 adds salon dashboard settings and user management in `salonweb`.

Implemented routes:

- `/dashboard/settings`
- `/dashboard/settings/profile`
- `/dashboard/settings/business`
- `/dashboard/settings/booking`
- `/dashboard/settings/notifications`
- `/dashboard/users`
- `/dashboard/users/new`
- `/dashboard/users/[userId]`

Not implemented:

- Inventory
- Expenses
- Marketing
- Loyalty
- Multi-branch
- Superadmin pages
- Backend route handlers
- Public website changes

## Settings Data Model

Types are defined in `src/types/settings.ts`.

- `SalonProfile`
- `BusinessHours`
- `BookingRules`
- `NotificationPreferences`
- `SalonSettings`

## Users Data Model

User and role types are defined in `src/types/settings.ts`.

- `SalonDashboardUser`
- `UserListParams`
- `CreateSalonUserPayload`
- `UpdateSalonUserPayload`

Supported roles:

- `owner`
- `manager`
- `receptionist`
- `stylist`
- `accountant`

## API Contract

`src/lib/settings-api.ts` expects:

- `GET /api/salon/settings`
- `PATCH /api/salon/settings`
- `GET /api/salon/users`
- `POST /api/salon/users`
- `GET /api/salon/users/:userId`
- `PATCH /api/salon/users/:userId`

The existing API client sends `x-salon-id` from `NEXT_PUBLIC_SALON_ID`.

## Role Access

Owner:

- Full settings access
- Full users access
- Can create and update users

Manager:

- View settings
- View users
- Cannot create or update users

Receptionist:

- Limited settings view
- No users module

Accountant:

- Notification settings view only
- No users module

Stylist:

- No settings access
- No users module

## Mock Mode

Mock mode is active only when `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`.

Mock data includes:

- Salon profile demo data
- Business hours demo data
- Booking rules demo data
- Notification preferences demo data
- Eight demo users across salon roles

When mock mode is disabled and salonbackend is unavailable, pages show `ErrorState`.

## Components Added

Settings components:

- `SettingsSectionCard`
- `SettingsFormActions`
- `BusinessHoursEditor`
- `NotificationToggleList`

User components:

- `UserRoleBadge`
- `UserStatusBadge`
- `UsersTable`
- `UserProfileCard`

## Navigation

Enabled:

- Settings
- Users

Kept disabled or not created:

- Inventory
- Expenses
- Marketing
- Loyalty
- Multi-branch

## Backend Impact

No `salonbackend` files were modified. No API routes were created in `salonweb`.

## Public Website Impact

No public website routes or components were modified.
