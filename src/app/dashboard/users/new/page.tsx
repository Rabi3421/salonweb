'use client';

import { useState } from 'react';
import Link from 'next/link';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import { createUser } from '@/lib/settings-api';
import type { SalonRole } from '@/types/auth';
import type { CreateSalonUserPayload } from '@/types/settings';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20';
const roles: SalonRole[] = ['owner', 'manager', 'receptionist', 'stylist', 'accountant'];

export default function NewUserPage() {
  return (
    <RoutePermissionGuard>
      <NewUserContent />
    </RoutePermissionGuard>
  );
}

function NewUserContent() {
  const [form, setForm] = useState<CreateSalonUserPayload>({
    name: '',
    phone: '',
    email: '',
    role: 'receptionist',
    password: '',
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      await createUser(form);
      setMessage('User created successfully.');
      setForm({
        name: '',
        phone: '',
        email: '',
        role: 'receptionist',
        password: '',
        isActive: true,
      });
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Add User</h1>
          <p className="text-sm text-gray-500">Create a dashboard user and assign a role.</p>
        </div>
        <Link
          href="/dashboard/users"
          className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          Back
        </Link>
      </div>
      {message ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-medium text-primary">
          {message}
        </div>
      ) : null}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Name"
            value={form.name}
            onChange={(value) => setForm({ ...form, name: value })}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(value) => setForm({ ...form, phone: value })}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(value) => setForm({ ...form, email: value })}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(value) => setForm({ ...form, password: value })}
          />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Role</span>
            <select
              value={form.role}
              onChange={(event) => setForm({ ...form, role: event.target.value as SalonRole })}
              className={inputClass}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) => setForm({ ...form, isActive: event.target.checked })}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            Active user
          </label>
        </div>
      </section>
      <button
        disabled={saving}
        className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
      >
        {saving ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}

function Input({
  label,
  value,
  type = 'text',
  onChange,
}: {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
    </label>
  );
}
