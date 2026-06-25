# Dashboard Role Access — Final Matrix

## Nav Visibility

| Module | Owner | Manager | Receptionist | Stylist | Accountant |
|--------|-------|---------|--------------|---------|------------|
| Overview | ✅ | ✅ | ✅ | ✅ | ✅ |
| Appointments | ✅ | ✅ | ✅ | ✅ | ❌ |
| Customers | ✅ | ✅ | ✅ | ✅ | ✅ |
| Enquiries | ✅ | ✅ | ✅ | ❌ | ❌ |
| Services | ✅ | ✅ | ✅ | ✅ | ❌ |
| Packages | ✅ | ✅ | ✅ | ❌ | ❌ |
| Staff | ✅ | ✅ | ❌ | ❌ | ❌ |
| Users | ✅ | ✅ | ❌ | ❌ | ❌ |
| Inventory | ✅ | ✅ | ❌ | ❌ | ✅ |
| Billing | ✅ | ✅ | ✅ | ❌ | ✅ |
| Payments | ✅ | ✅ | ✅ | ❌ | ✅ |
| Expenses | 🔜 | ❌ | ❌ | ❌ | 🔜 |
| Reports | ✅ | ✅ | ❌ | ❌ | ✅ |
| Settings | ✅ | ✅ | ✅ | ❌ | ✅ |

## Route-Level Access

### Owner
Full access to all routes and actions.

### Manager
- Appointments: list, view, status changes
- Customers: list, view, create, edit
- Services: list, view (no create/edit)
- Packages: list, view (no create/edit)
- Staff: list, view (no create)
- Users: list, view (no create)
- Billing: list, view (no create)
- Payments: list, view
- Enquiries: list, view, update
- Reports: appointments, customers (no revenue, no staff)
- Settings: profile, business, booking (no notifications for accountant-only)
- Inventory: list, view, adjust stock (no create product)

### Receptionist
- Appointments: list, view, create, status changes
- Customers: list, view, create
- Services: list, view
- Packages: list, view
- Billing: list, view, create
- Payments: list, view
- Enquiries: list, view, update
- Settings: profile, business, booking, notifications

### Stylist
- Appointments: list, view (own), limited status changes
- Customers: list, view
- Services: list, view

### Accountant
- Customers: list, view (financial data visible)
- Billing: list, view
- Payments: list, view
- Reports: revenue only
- Settings: notifications only
- Inventory: list, view (value visible, no stock adjust)

## Create/Edit Restrictions

| Action | Owner | Manager | Receptionist | Stylist | Accountant |
|--------|-------|---------|--------------|---------|------------|
| Create appointment | ✅ | ✅ | ✅ | ❌ | ❌ |
| Create customer | ✅ | ✅ | ✅ | ❌ | ❌ |
| Create service | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit service | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create package | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit package | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create staff | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create user | ✅ | ❌ | ❌ | ❌ | ❌ |
| Create bill | ✅ | ❌ | ✅ | ❌ | ✅ |
| Create inventory product | ✅ | ❌ | ❌ | ❌ | ❌ |
| Adjust stock | ✅ | ✅ | ❌ | ❌ | ❌ |

## Sensitive Data Rules
- Customer financials (totalSpent, dueAmount): visible to owner, manager, accountant
- Staff salary/commission: visible to owner only
- Revenue reports: owner and accountant only
- Inventory stock value: owner and accountant only
- Passwords: never exposed, never logged, never stored in sessionStorage
