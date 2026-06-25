# Live Backend Integration QA

## Environment
```env
NEXT_PUBLIC_APP_NAME=Rosé Luxe Salon
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SALON_ID=SALON-2026-0001
NEXT_PUBLIC_SITE_URL=http://localhost:4028
NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=false
```

## Backend Setup
```bash
cd salonbackend
npm run dev                              # starts on :3000
npm run seed:salon-demo                  # seeds demo data
```

## Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Owner | `owner@demo-salon.com` | `Demo@12345` |

## Login Flow Checklist
- [ ] Open `http://localhost:4028/login`
- [ ] Enter owner credentials
- [ ] Verify redirect to `/dashboard`
- [ ] Verify overview loads with real data (not "Demo data" badge)
- [ ] Verify sidebar shows all owner modules
- [ ] Click user dropdown in header → Sign Out works

## Module Checklist
- [ ] `/dashboard` — overview with stats, appointments, enquiries
- [ ] `/dashboard/appointments` — list from real DB
- [ ] `/dashboard/customers` — list from real DB
- [ ] `/dashboard/services` — list from real DB
- [ ] `/dashboard/packages` — list from real DB
- [ ] `/dashboard/staff` — list from real DB
- [ ] `/dashboard/billing` — list from real DB
- [ ] `/dashboard/payments` — list from real DB
- [ ] `/dashboard/enquiries` — list from real DB
- [ ] `/dashboard/reports` — reports hub
- [ ] `/dashboard/settings` — settings from real DB
- [ ] `/dashboard/users` — user list from real DB
- [ ] `/dashboard/inventory` — inventory from real DB

## Response Compatibility Fixes Applied
1. **Staff API:** `getStaffMemberById`, `createStaff`, `updateStaff` now read `data.staffMember` (backend key) instead of `data.staff`
2. **Settings API:** Added `transformBackendSettings()` to convert backend flat fields to frontend grouped structure (`profile/business/booking/notifications`)
3. **Settings Update:** Added `transformUpdatePayload()` to convert frontend grouped payload to backend flat fields
4. **Users API:** Added `enrichUser()` to provide default `permissions` and `activitySummary` when backend doesn't include them

## Known Backend Limitations
- No file upload for avatars/gallery images
- No real-time notifications (WebSocket)
- Customer `totalVisits`/`totalSpent` not auto-aggregated from billing (uses stored values)
- Staff ↔ User link is not automatic (independent collections)
- Stylist assignment matching uses name fallback
