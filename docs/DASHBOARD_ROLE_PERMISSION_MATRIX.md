# Dashboard Role & Permission Matrix

## Role Definitions

### Owner
Full business control. Sees everything — revenue, staff, settings, reports, user management.

### Manager
Daily operations lead. Manages appointments, staff schedules, enquiries, and operational reports. Cannot change billing settings or manage user accounts.

### Receptionist
Front desk operator. Handles today's appointments, walk-ins, customer check-in/out, enquiry follow-up, and basic payment collection. Cannot access reports, staff management, or settings.

### Stylist
Service provider. Sees own appointments, today's schedule, assigned customer notes, and marks services as started/completed. Cannot access other staff data, billing, or settings.

### Accountant
Finance tracker. Manages bills, payments, dues, refunds, expenses, and financial reports. Limited customer view (billing only). Cannot access appointments, services, staff, or settings.

## Permission Matrix

| Module | Owner | Manager | Receptionist | Stylist | Accountant |
|--------|-------|---------|-------------|---------|------------|
| Overview | Full | Limited | Limited | Own only | Finance only |
| Appointments | Full | Full | Full | Own only | No access |
| Customers | Full | Full | Full | Assigned only | Billing view |
| Services | Full | Limited | View only | View only | No access |
| Packages | Full | Limited | View only | No access | No access |
| Staff | Full | View only | No access | No access | No access |
| Billing/POS | Full | Limited | Collect only | No access | Full |
| Payments | Full | View only | View only | No access | Full |
| Expenses | Full | No access | No access | No access | Full |
| Inventory | Full | Limited | No access | No access | No access |
| Enquiries | Full | Full | Full | No access | No access |
| Reports | Full | Operational | No access | Own only | Finance only |
| Settings | Full | No access | No access | No access | No access |
| User Management | Full | No access | No access | No access | No access |

## Per-Role Daily Workflows

### Owner
1. Check overview dashboard — revenue, appointments, alerts
2. Review staff performance and schedule
3. Approve/adjust service pricing or packages
4. Review financial reports
5. Manage user accounts and roles

### Manager
1. Check today's appointments and confirmations
2. Assign stylists to appointments
3. Handle walk-ins and schedule adjustments
4. Follow up on website enquiries
5. Review daily operational summary

### Receptionist
1. Check today's appointment queue
2. Greet and check-in arriving customers
3. Handle walk-in entries
4. Create new appointments from calls/WhatsApp
5. Collect payment after service completion
6. Convert website enquiries to appointments

### Stylist
1. Check own today schedule
2. View next client details and notes
3. Mark service as started
4. Mark service as completed
5. Add client notes for future visits

### Accountant
1. Review daily collection totals
2. Check payment mode breakdown (cash/UPI/card)
3. Track pending dues and follow up
4. Record expenses
5. Generate revenue and payment reports
