import type { StaffRoleType, StaffStatus } from '@/types/staff';

interface StaffFiltersProps {
  search: string;
  role: string;
  status: string;
  specialty: string;
  specialties: string[];
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpecialtyChange: (value: string) => void;
  onClear: () => void;
}

const roles: { value: StaffRoleType; label: string }[] = [
  { value: 'owner', label: 'Owner' },
  { value: 'manager', label: 'Manager' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'stylist', label: 'Stylist' },
  { value: 'accountant', label: 'Accountant' },
];

const statuses: { value: StaffStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'on_leave', label: 'On Leave' },
];

export default function StaffFilters({
  search,
  role,
  status,
  specialty,
  specialties,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onSpecialtyChange,
  onClear,
}: StaffFiltersProps) {
  const inputClass =
    'px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_160px_160px_180px_auto] gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, phone, email, designation..."
          className={`${inputClass} placeholder:text-gray-400`}
        />
        <select
          value={role}
          onChange={(event) => onRoleChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All roles</option>
          {roles.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All statuses</option>
          {statuses.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <select
          value={specialty}
          onChange={(event) => onSpecialtyChange(event.target.value)}
          className={inputClass}
        >
          <option value="">All specialties</option>
          {specialties.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onClear}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
