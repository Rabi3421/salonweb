# Dashboard Phase 1 — Auth UI + Dashboard Shell

## Files Created

### Types
- `src/types/auth.ts` — SalonRole, SalonAuthUser, SalonLoginPayload, SalonSession
- `src/types/dashboard.ts` — DashboardNavItem, DashboardNavGroup, StatCardData, StatusVariant

### Helpers
- `src/lib/dashboard-auth.ts` — loginSalonUser, logoutSalonUser, getCurrentSalonUser, mock users
- `src/lib/dashboard-permissions.ts` — role labels, nav config, canAccessRoute, getNavigationForRole

### Components
- `src/components/dashboard/DashboardShell.tsx` — Main layout wrapper
- `src/components/dashboard/DashboardSidebar.tsx` — Role-aware sidebar with nav groups
- `src/components/dashboard/DashboardTopbar.tsx` — Top bar with user info
- `src/components/dashboard/DashboardMobileNav.tsx` — Slide-over mobile navigation
- `src/components/dashboard/DashboardAuthGuard.tsx` — Client-side auth check + redirect
- `src/components/dashboard/PermissionDenied.tsx` — Access denied card
- `src/components/dashboard/StatCard.tsx` — Reusable stat card
- `src/components/dashboard/StatusBadge.tsx` — Reusable status badge
- `src/components/dashboard/LoadingState.tsx` — Dashboard loading spinner
- `src/components/dashboard/ErrorState.tsx` — Dashboard error card
- `src/components/dashboard/EmptyState.tsx` — Dashboard empty state

### Pages
- `src/app/login/page.tsx` — Professional login page
- `src/app/dashboard/layout.tsx` — Auth guard wrapper
- `src/app/dashboard/page.tsx` — Placeholder overview

## Auth Endpoints Expected

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/salon/auth/login` | Staff login |
| POST | `/api/salon/auth/logout` | Logout |
| GET | `/api/salon/auth/me` | Get current user |

**Warning:** These APIs must be built in salonbackend before real login works.

## Role Keys
`owner`, `manager`, `receptionist`, `stylist`, `accountant`

## Mock Mode
Set `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true` in `.env.local` to enable mock login buttons on the login page. Mock mode uses sessionStorage and bypasses real API calls.

## Next Phase
Phase 2: Role-based overview dashboard with real/mock data cards per role.
