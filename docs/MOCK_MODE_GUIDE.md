# Mock Mode Guide

## Enabling Mock Mode
Set in `.env.local`:
```env
NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true
```
Restart salonweb dev server after changing.

## What Mock Mode Does
- Login page shows a role selector (owner/manager/receptionist/stylist/accountant) instead of requiring real credentials
- All dashboard API calls return built-in demo data — no backend needed
- "Demo data" badges appear on dashboard pages
- Create/edit/delete forms show demo success messages
- No real data is created or modified

## Disabling Mock Mode (Live Backend)
Set in `.env.local`:
```env
NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=false
```
Restart salonweb dev server after changing.

Requires:
- salonbackend running on the URL in `NEXT_PUBLIC_API_BASE_URL`
- Demo data seeded (`npm run seed:salon-demo` in salonbackend)
- Valid `NEXT_PUBLIC_SALON_ID` matching a salon in the database

## Behavior When Backend is Down (Mock OFF)
- Login page shows an error message on submit
- Dashboard pages show ErrorState component
- No fake data appears — users see clear error messages
- This is intentional: live mode should not silently show demo data

## How It Works Internally
Every API helper function checks `isMockModeEnabled()` at the top:
```typescript
export async function getServices() {
  if (isMockModeEnabled()) return getMockServices();
  // ... real API call
}
```
When mock mode is ON, the function returns mock data immediately without making any network request. This prevents browser extension interference and CORS issues during development.

## Warning
**Do not use mock mode in production.** Mock mode is for UI development only. All mock data is hardcoded and does not reflect real business data.
