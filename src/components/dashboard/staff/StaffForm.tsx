'use client';

import React, { useMemo, useState } from 'react';
import type {
  CreateStaffPayload,
  StaffEmploymentType,
  StaffRoleType,
  StaffStatus,
} from '@/types/staff';
import type { SalonService } from '@/types/services';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const defaultWorkingDays = days.map((day) => ({
  day,
  isWorking: day !== 'Sunday',
  startTime: day === 'Sunday' ? '10:00' : '09:30',
  endTime: day === 'Sunday' ? '18:00' : '19:30',
  breakStart: day === 'Sunday' ? '' : '14:00',
  breakEnd: day === 'Sunday' ? '' : '14:30',
}));

const inputClass =
  'w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400';

interface StaffFormProps {
  services: SalonService[];
  onSubmit: (payload: CreateStaffPayload) => Promise<void>;
  submitting: boolean;
}

export default function StaffForm({ services, onSubmit, submitting }: StaffFormProps) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'stylist' as StaffRoleType,
    designation: '',
    employmentType: 'full_time' as StaffEmploymentType,
    status: 'active' as StaffStatus,
    experience: '',
    specialtiesText: '',
    assignedServiceIds: [] as string[],
    joiningDate: '',
    salary: '',
    commissionPercent: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    notes: '',
    workingDays: defaultWorkingDays,
  });

  const specialtySuggestions = useMemo(
    () => Array.from(new Set(services.map((service) => service.category))),
    [services]
  );

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleService(id: string) {
    setForm((prev) => ({
      ...prev,
      assignedServiceIds: prev.assignedServiceIds.includes(id)
        ? prev.assignedServiceIds.filter((serviceId) => serviceId !== id)
        : [...prev.assignedServiceIds, id],
    }));
  }

  function updateWorkingDay(index: number, field: string, value: string | boolean) {
    setForm((prev) => ({
      ...prev,
      workingDays: prev.workingDays.map((day, dayIndex) =>
        dayIndex === index ? { ...day, [field]: value } : day
      ),
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await onSubmit({
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      designation: form.designation,
      employmentType: form.employmentType,
      status: form.status,
      experience: form.experience,
      specialties: form.specialtiesText
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      assignedServiceIds: form.assignedServiceIds,
      workingDays: form.workingDays,
      joiningDate: form.joiningDate || undefined,
      salary: form.salary ? Number(form.salary) : undefined,
      commissionPercent: form.commissionPercent ? Number(form.commissionPercent) : undefined,
      address: form.address || undefined,
      emergencyContactName: form.emergencyContactName || undefined,
      emergencyContactPhone: form.emergencyContactPhone || undefined,
      notes: form.notes || undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Basic identity, role and employment details.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Name *">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Email *">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Phone *">
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Designation *">
            <input
              name="designation"
              value={form.designation}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Senior Hair Stylist"
            />
          </Field>
          <Field label="Role *">
            <select name="role" value={form.role} onChange={handleChange} className={inputClass}>
              <option value="manager">Manager</option>
              <option value="receptionist">Receptionist</option>
              <option value="stylist">Stylist</option>
              <option value="accountant">Accountant</option>
              <option value="owner">Owner</option>
            </select>
          </Field>
          <Field label="Employment Type *">
            <select
              name="employmentType"
              value={form.employmentType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="freelance">Freelance</option>
              <option value="contract">Contract</option>
            </select>
          </Field>
          <Field label="Status">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="on_leave">On Leave</option>
            </select>
          </Field>
          <Field label="Experience *">
            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="5+ Years"
            />
          </Field>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Services & Skills</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Assign services and list specialties for scheduling.
          </p>
        </div>
        <Field label="Specialties">
          <input
            name="specialtiesText"
            value={form.specialtiesText}
            onChange={handleChange}
            className={inputClass}
            placeholder="Hair Styling, Hair Spa, Bridal Makeup"
          />
        </Field>
        <div className="flex flex-wrap gap-2">
          {specialtySuggestions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  specialtiesText: prev.specialtiesText ? `${prev.specialtiesText}, ${item}` : item,
                }))
              }
              className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600 hover:bg-primary/10 hover:text-primary"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {services.map((service) => (
            <label
              key={service.id}
              className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5 text-sm"
            >
              <input
                type="checkbox"
                checked={form.assignedServiceIds.includes(service.id)}
                onChange={() => toggleService(service.id)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
              />
              <span className="flex-1">
                <span className="block font-medium text-gray-800">{service.name}</span>
                <span className="text-xs text-gray-400">{service.category}</span>
              </span>
            </label>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Working Schedule</h2>
          <p className="text-xs text-gray-500 mt-0.5">Set weekly availability and break timings.</p>
        </div>
        <div className="space-y-3">
          {form.workingDays.map((day, index) => (
            <div
              key={day.day}
              className="grid grid-cols-1 lg:grid-cols-[150px_1fr_1fr_1fr_1fr] gap-3 rounded-xl border border-gray-200 p-3"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={day.isWorking}
                  onChange={(event) => updateWorkingDay(index, 'isWorking', event.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20"
                />
                {day.day}
              </label>
              <input
                type="time"
                value={day.startTime}
                onChange={(event) => updateWorkingDay(index, 'startTime', event.target.value)}
                disabled={!day.isWorking}
                className={inputClass}
              />
              <input
                type="time"
                value={day.endTime}
                onChange={(event) => updateWorkingDay(index, 'endTime', event.target.value)}
                disabled={!day.isWorking}
                className={inputClass}
              />
              <input
                type="time"
                value={day.breakStart ?? ''}
                onChange={(event) => updateWorkingDay(index, 'breakStart', event.target.value)}
                disabled={!day.isWorking}
                className={inputClass}
              />
              <input
                type="time"
                value={day.breakEnd ?? ''}
                onChange={(event) => updateWorkingDay(index, 'breakEnd', event.target.value)}
                disabled={!day.isWorking}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Private Details</h2>
          <p className="text-xs text-gray-500 mt-0.5">Visible to owner role only after creation.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Joining Date">
            <input
              name="joiningDate"
              type="date"
              value={form.joiningDate}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Salary">
            <input
              name="salary"
              type="number"
              min="0"
              value={form.salary}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Commission %">
            <input
              name="commissionPercent"
              type="number"
              min="0"
              max="100"
              value={form.commissionPercent}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Emergency Contact Name">
            <input
              name="emergencyContactName"
              value={form.emergencyContactName}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Emergency Contact Phone">
            <input
              name="emergencyContactPhone"
              value={form.emergencyContactPhone}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
          <Field label="Address">
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className={inputClass}
            />
          </Field>
        </div>
        <Field label="Notes">
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </Field>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : 'Create Staff Member'}
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1.5">{label}</span>
      {children}
    </label>
  );
}
