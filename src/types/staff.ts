import type { SalonRole } from '@/types/auth';

export type StaffStatus = 'active' | 'inactive' | 'on_leave';
export type StaffRoleType = SalonRole;
export type StaffEmploymentType = 'full_time' | 'part_time' | 'freelance' | 'contract';

export interface StaffWorkingDay {
  day: string;
  isWorking: boolean;
  startTime: string;
  endTime: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface StaffAssignedService {
  id: string;
  name: string;
  category: string;
  price?: number;
}

export interface SalonStaffMember {
  id: string;
  staffNo?: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRoleType;
  designation: string;
  status: StaffStatus;
  employmentType: StaffEmploymentType;
  avatar?: string;
  initials: string;
  experience: string;
  specialties: string[];
  assignedServices: StaffAssignedService[];
  workingDays: StaffWorkingDay[];
  joiningDate?: string;
  salary?: number;
  commissionPercent?: number;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  appointmentsToday?: number;
  completedServicesThisMonth?: number;
  revenueThisMonth?: number;
  rating?: number;
  createdAt: string;
  updatedAt: string;
}

export interface StaffListParams {
  search?: string;
  role?: StaffRoleType;
  status?: StaffStatus;
  serviceId?: string;
  page?: number;
  limit?: number;
}

export interface CreateStaffPayload {
  name: string;
  email: string;
  phone: string;
  role: StaffRoleType;
  designation: string;
  employmentType: StaffEmploymentType;
  status: StaffStatus;
  experience: string;
  specialties: string[];
  assignedServiceIds: string[];
  workingDays: StaffWorkingDay[];
  joiningDate?: string;
  salary?: number;
  commissionPercent?: number;
  address?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

export type UpdateStaffPayload = Partial<CreateStaffPayload>;
