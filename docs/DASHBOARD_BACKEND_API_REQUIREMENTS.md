# Dashboard Backend API Requirements

All endpoints require `x-salon-id` header. Auth endpoints set/read httpOnly JWT cookies.

## Auth

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| POST | `/api/salon/auth/login` | `dashboard-auth.ts` → `loginSalonUser()` | Staff login with email/password |
| POST | `/api/salon/auth/logout` | `dashboard-auth.ts` → `logoutSalonUser()` | Clear auth session |
| GET | `/api/salon/auth/me` | `dashboard-auth.ts` → `getCurrentSalonUser()` | Get current authenticated user |

## Dashboard Overview

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/dashboard/overview` | `dashboard-overview.ts` → `getDashboardOverview()` | Role-aware overview stats |

## Appointments

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/appointments` | `appointments-api.ts` → `getAppointments()` | List appointments with filters |
| GET | `/api/salon/appointments/:id` | `appointments-api.ts` → `getAppointmentById()` | Get appointment detail |
| POST | `/api/salon/appointments` | `appointments-api.ts` → `createAppointment()` | Create new appointment |
| PATCH | `/api/salon/appointments/:id/status` | `appointments-api.ts` → `updateAppointmentStatus()` | Update appointment status |

## Customers

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/customers` | `customers-api.ts` → `getCustomers()` | List customers with filters |
| GET | `/api/salon/customers/:id` | `customers-api.ts` → `getCustomerById()` | Get customer detail |
| POST | `/api/salon/customers` | `customers-api.ts` → `createCustomer()` | Create new customer |
| PATCH | `/api/salon/customers/:id` | `customers-api.ts` → `updateCustomer()` | Update customer |

## Services

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/services` | `services-api.ts` → `getServices()` | List services with filters |
| GET | `/api/salon/services/:id` | `services-api.ts` → `getServiceById()` | Get service detail |
| POST | `/api/salon/services` | `services-api.ts` → `createService()` | Create service |
| PATCH | `/api/salon/services/:id` | `services-api.ts` → `updateService()` | Update service |
| DELETE | `/api/salon/services/:id` | `services-api.ts` → `deleteService()` | Delete service |

## Packages

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/packages` | `services-api.ts` → `getPackages()` | List packages |
| GET | `/api/salon/packages/:id` | `services-api.ts` → `getPackageById()` | Get package detail |
| POST | `/api/salon/packages` | `services-api.ts` → `createPackage()` | Create package |
| PATCH | `/api/salon/packages/:id` | `services-api.ts` → `updatePackage()` | Update package |
| DELETE | `/api/salon/packages/:id` | `services-api.ts` → `deletePackage()` | Delete package |

## Staff

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/staff` | `staff-api.ts` → `getStaffMembers()` | List staff with filters |
| GET | `/api/salon/staff/:id` | `staff-api.ts` → `getStaffMemberById()` | Get staff detail |
| POST | `/api/salon/staff` | `staff-api.ts` → `createStaffMember()` | Create staff member |
| PATCH | `/api/salon/staff/:id` | `staff-api.ts` → `updateStaffMember()` | Update staff member |

## Billing

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/bills` | `billing-api.ts` → `getBills()` | List bills with filters |
| GET | `/api/salon/bills/:id` | `billing-api.ts` → `getBillById()` | Get bill detail |
| POST | `/api/salon/bills` | `billing-api.ts` → `createBill()` | Create new bill |
| PATCH | `/api/salon/bills/:id` | `billing-api.ts` → `updateBill()` | Update bill (payment, status) |

## Enquiries

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/enquiries` | `enquiries-api.ts` → `getEnquiries()` | List enquiries with filters |
| GET | `/api/salon/enquiries/:id` | `enquiries-api.ts` → `getEnquiryById()` | Get enquiry detail |
| PATCH | `/api/salon/enquiries/:id` | `enquiries-api.ts` → `updateEnquiry()` | Update status/notes/followup |
| POST | `/api/salon/enquiries/manual` | `enquiries-api.ts` → `createManualEnquiry()` | Create manual enquiry |

## Reports

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/reports/revenue` | `reports-api.ts` → `getRevenueReport()` | Revenue report data |
| GET | `/api/salon/reports/appointments` | `reports-api.ts` → `getAppointmentReport()` | Appointment report data |
| GET | `/api/salon/reports/staff` | `reports-api.ts` → `getStaffReport()` | Staff performance data |
| GET | `/api/salon/reports/customers` | `reports-api.ts` → `getCustomerReport()` | Customer report data |

## Settings

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/settings` | `settings-api.ts` → `getSalonSettings()` | Get salon settings |
| PATCH | `/api/salon/settings` | `settings-api.ts` → `updateSalonSettings()` | Update salon settings |

## Users

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/users` | `settings-api.ts` → `getSalonUsers()` | List dashboard users |
| POST | `/api/salon/users` | `settings-api.ts` → `createSalonUser()` | Create new user |
| GET | `/api/salon/users/:id` | `settings-api.ts` → `getSalonUserById()` | Get user detail |
| PATCH | `/api/salon/users/:id` | `settings-api.ts` → `updateSalonUser()` | Update user |
| PATCH | `/api/salon/users/:id/toggle` | `settings-api.ts` → `toggleSalonUserStatus()` | Toggle active/inactive |
| POST | `/api/salon/users/:id/reset-password` | `settings-api.ts` → `resetSalonUserPassword()` | Reset user password |

## Inventory

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| GET | `/api/salon/inventory/products` | `inventory-api.ts` → `getInventoryProducts()` | List inventory products |
| GET | `/api/salon/inventory/products/:id` | `inventory-api.ts` → `getInventoryProductById()` | Get product detail |
| POST | `/api/salon/inventory/products` | `inventory-api.ts` → `createInventoryProduct()` | Create product |
| PATCH | `/api/salon/inventory/products/:id` | `inventory-api.ts` → `updateInventoryProduct()` | Update product |
| POST | `/api/salon/inventory/adjustments` | `inventory-api.ts` → `createStockAdjustment()` | Record stock adjustment |

## Public Enquiries (Website Forms)

| Method | Endpoint | Frontend Helper | Purpose |
|--------|----------|-----------------|---------|
| POST | `/api/salon/enquiries` | `salon-api.ts` → `createSalonEnquiry()` | Salon enquiry from website |
| POST | `/api/enquiries` | `salon-api.ts` → `createPlatformEnquiry()` | Platform enquiry from website |

## Total: 46 endpoints across 13 modules
