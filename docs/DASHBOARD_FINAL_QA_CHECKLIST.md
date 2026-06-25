# Dashboard Final QA Checklist

## Route Checklist

### Public Routes (13)
- [x] `/` — Home
- [x] `/services` — Services
- [x] `/about` — About
- [x] `/gallery` — Gallery
- [x] `/contact` — Contact
- [x] `/book-appointment` — Book Appointment
- [x] `/team` — Team
- [x] `/packages` — Packages
- [x] `/reviews` — Reviews
- [x] `/faqs` — FAQs
- [x] `/privacy-policy` — Privacy Policy
- [x] `/terms` — Terms
- [x] `/cancellation-policy` — Cancellation Policy

### SEO Routes
- [x] `/robots.txt`
- [x] `/sitemap.xml`

### Auth
- [x] `/login` — Login page with mock role selector

### Dashboard Routes (40)
- [x] `/dashboard` — Role-based overview
- [x] `/dashboard/appointments` — List
- [x] `/dashboard/appointments/calendar` — Calendar view
- [x] `/dashboard/appointments/new` — Create
- [x] `/dashboard/appointments/[appointmentId]` — Detail
- [x] `/dashboard/customers` — List
- [x] `/dashboard/customers/new` — Create
- [x] `/dashboard/customers/[customerId]` — Detail
- [x] `/dashboard/services` — List
- [x] `/dashboard/services/new` — Create
- [x] `/dashboard/services/[serviceId]/edit` — Edit
- [x] `/dashboard/packages` — List
- [x] `/dashboard/packages/new` — Create
- [x] `/dashboard/packages/[packageId]/edit` — Edit
- [x] `/dashboard/staff` — List
- [x] `/dashboard/staff/new` — Create
- [x] `/dashboard/staff/[staffId]` — Detail
- [x] `/dashboard/billing` — List
- [x] `/dashboard/billing/new` — Create
- [x] `/dashboard/billing/[billId]` — Detail
- [x] `/dashboard/payments` — List
- [x] `/dashboard/enquiries` — List
- [x] `/dashboard/enquiries/[enquiryId]` — Detail
- [x] `/dashboard/reports` — Hub
- [x] `/dashboard/reports/revenue` — Revenue report
- [x] `/dashboard/reports/appointments` — Appointment report
- [x] `/dashboard/reports/staff` — Staff report
- [x] `/dashboard/reports/customers` — Customer report
- [x] `/dashboard/settings` — Hub
- [x] `/dashboard/settings/profile` — Profile
- [x] `/dashboard/settings/business` — Business
- [x] `/dashboard/settings/booking` — Booking
- [x] `/dashboard/settings/notifications` — Notifications
- [x] `/dashboard/users` — List
- [x] `/dashboard/users/new` — Create
- [x] `/dashboard/users/[userId]` — Detail
- [x] `/dashboard/inventory` — List
- [x] `/dashboard/inventory/new` — Create
- [x] `/dashboard/inventory/[productId]` — Detail

## Role Access Checklist
- [x] Owner has full access to all routes
- [x] Manager cannot create services/packages/users
- [x] Receptionist cannot access staff/reports/inventory/users
- [x] Stylist can only access appointments/customers/services
- [x] Accountant can access billing/payments/reports(revenue)/settings(notifications)/inventory(value)
- [x] PermissionDenied renders for unauthorized route access

## Mobile Checklist
- [x] Sidebar hidden on mobile, hamburger visible
- [x] Mobile nav slide-out opens
- [x] Mobile nav closes on link click
- [x] Mobile nav closes on overlay click
- [x] Tables switch to card layout on mobile
- [x] Forms are responsive (grid → single column)

## Form Checklist
- [x] Required fields validated
- [x] Success state shows confirmation
- [x] Error state shows message
- [x] Loading state during submission
- [x] Back buttons navigate correctly
- [x] "Add Another" resets form

## Mock Mode Checklist
- [x] Login mock role selector appears when `NEXT_PUBLIC_ENABLE_DASHBOARD_MOCKS=true`
- [x] All modules show mock data when enabled
- [x] "Demo data" badge visible on mock pages
- [x] API failures fall back to mock data when enabled
- [x] No fake data appears when mock mode disabled
- [x] ErrorState shows when mock disabled and API fails

## Public Website No-Break Checklist
- [x] All 13 public routes build without errors
- [x] Public routes have no dashboard imports
- [x] Public layout/styles are independent of dashboard
- [x] SEO routes (robots.txt, sitemap.xml) build
