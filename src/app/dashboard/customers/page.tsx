'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import DashboardEmpty from '@/components/dashboard/EmptyState';
import CustomerStatusBadge from '@/components/dashboard/customers/CustomerStatusBadge';
import { getCustomers, getMockCustomers } from '@/lib/customers-api';
import {
  canCreateCustomer,
  canViewCustomerFinancials,
  getCustomerInitials,
  formatCustomerDate,
  buildCallLink,
  buildWhatsAppLink,
} from '@/lib/customer-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonCustomer } from '@/types/customers';

export default function CustomersListPage() {
  const user = useDashboardUser();
  const [customers, setCustomers] = useState<SalonCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const showFinancials = canViewCustomerFinancials(user.role);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCustomers();
        setCustomers(data);
      } catch (e) {
        if (isMockModeEnabled()) {
          setCustomers(getMockCustomers(user.role));
        } else {
          setError((e as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.role]);

  const filtered = customers.filter((c) => {
    if (statusFilter && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !c.name.toLowerCase().includes(q) &&
        !c.phone.includes(q) &&
        !(c.email ?? '').toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const activeCount = customers.filter((c) => c.status === 'active').length;
  const withDues = customers.filter((c) => c.dueAmount > 0).length;
  const totalDues = customers.reduce((sum, c) => sum + c.dueAmount, 0);

  if (loading) return <DashboardLoading message="Loading customers..." />;
  if (error) return <DashboardError message={error} />;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage client profiles, preferences, visit history and follow-ups.
          </p>
        </div>
        {canCreateCustomer(user.role) ? (
          <Link
            href="/dashboard/customers/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Icon name="PlusIcon" size={16} className="text-white" />
            Add Customer
          </Link>
        ) : null}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{customers.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <p className="text-xs text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{activeCount}</p>
        </div>
        {showFinancials ? (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs text-gray-500">With Dues</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{withDues}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs text-gray-500">Total Dues</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                ₹{totalDues.toLocaleString('en-IN')}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs text-gray-500">Repeat Clients</p>
              <p className="text-2xl font-bold text-indigo-600 mt-1">
                {customers.filter((c) => c.totalVisits > 1).length}
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <p className="text-xs text-gray-500">Total Visits</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {customers.reduce((s, c) => s + c.totalVisits, 0)}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        >
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <DashboardEmpty
          title="No customers found"
          description="Try adjusting your filters or add a new customer."
        />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-4 py-3 font-medium text-gray-500">Customer</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Phone</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Visits</th>
                  {showFinancials ? (
                    <th className="px-4 py-3 font-medium text-gray-500">Spent / Due</th>
                  ) : (
                    <th className="px-4 py-3 font-medium text-gray-500">Last Visit</th>
                  )}
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary text-xs font-bold">
                            {getCustomerInitials(c.name)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.name}</p>
                          {c.email ? <p className="text-xs text-gray-400">{c.email}</p> : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{c.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{c.totalVisits}</td>
                    {showFinancials ? (
                      <td className="px-4 py-3">
                        <span className="text-gray-900 font-medium">
                          ₹{c.totalSpent.toLocaleString('en-IN')}
                        </span>
                        {c.dueAmount > 0 ? (
                          <span className="text-amber-600 text-xs ml-1">
                            (₹{c.dueAmount.toLocaleString('en-IN')} due)
                          </span>
                        ) : null}
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {c.lastVisitAt ? formatCustomerDate(c.lastVisitAt) : '—'}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <CustomerStatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/customers/${c.id}`}
                          className="text-xs font-medium text-primary hover:text-primary/80"
                        >
                          View
                        </Link>
                        <a
                          href={buildCallLink(c.phone)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Icon name="PhoneIcon" size={14} />
                        </a>
                        <a
                          href={buildWhatsAppLink(c.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Icon name="ChatBubbleLeftRightIcon" size={14} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-gray-100">
            {filtered.map((c) => (
              <Link
                key={c.id}
                href={`/dashboard/customers/${c.id}`}
                className="block px-4 py-3 hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-[10px] font-bold">
                      {getCustomerInitials(c.name)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{c.name}</p>
                    <p className="text-xs text-gray-500">{c.phone}</p>
                  </div>
                  <CustomerStatusBadge status={c.status} />
                </div>
                <p className="text-xs text-gray-400 ml-11">
                  {c.totalVisits} visits
                  {showFinancials ? ` · ₹${c.totalSpent.toLocaleString('en-IN')} spent` : ''}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {isMockModeEnabled() ? (
        <p className="text-center text-[10px] text-amber-500 font-medium">Demo data</p>
      ) : null}
    </div>
  );
}
