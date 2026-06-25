import { Card } from '@/components/dashboard/staff/StaffInfoCard';
import type { SalonStaffMember } from '@/types/staff';

export default function StaffServicesCard({ staff }: { staff: SalonStaffMember }) {
  return (
    <Card title="Specialties & Assigned Services">
      <div className="space-y-4">
        <div>
          <p className="text-xs text-gray-500 mb-2">Specialties</p>
          <div className="flex flex-wrap gap-2">
            {staff.specialties.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-2">Assigned Services</p>
          <div className="space-y-2">
            {staff.assignedServices.length ? (
              staff.assignedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{service.name}</p>
                    <p className="text-xs text-gray-400">{service.category}</p>
                  </div>
                  {service.price ? (
                    <span className="text-sm font-semibold text-gray-700">
                      ₹{service.price.toLocaleString('en-IN')}
                    </span>
                  ) : null}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No services assigned.</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
