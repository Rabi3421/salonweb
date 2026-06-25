'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useDashboardUser } from '@/components/dashboard/DashboardContext';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import CustomerStatusBadge from '@/components/dashboard/customers/CustomerStatusBadge';
import { getCustomerById, getMockCustomerById } from '@/lib/customers-api';
import {
  canEditCustomer,
  canViewCustomerFinancials,
  canViewCustomerNotes,
  getCustomerInitials,
  formatCustomerDate,
  buildCallLink,
  buildWhatsAppLink,
} from '@/lib/customer-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type { SalonCustomer } from '@/types/customers';

export default function CustomerDetailPage() {
  const user = useDashboardUser();
  const params = useParams<{ customerId: string }>();
  const [customer, setCustomer] = useState<SalonCustomer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const showFinancials = canViewCustomerFinancials(user.role);
  const showNotes = canViewCustomerNotes(user.role);
  const showEdit = canEditCustomer(user.role);

  useEffect(() => {
    async function load() {
      try {
        const data = await getCustomerById(params.customerId);
        if (!data && isMockModeEnabled()) {
          setCustomer(getMockCustomerById(params.customerId));
        } else {
          setCustomer(data);
        }
      } catch (e) {
        if (isMockModeEnabled()) {
          setCustomer(getMockCustomerById(params.customerId));
        } else {
          setError((e as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.customerId]);

  if (loading) return <DashboardLoading message="Loading customer..." />;
  if (error) return <DashboardError message={error} />;
  if (!customer) return <DashboardError message="Customer not found." />;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customers"
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <Icon name="ArrowLeftIcon" size={16} className="text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold">{getCustomerInitials(customer.name)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{customer.name}</h1>
                <CustomerStatusBadge status={customer.status} />
              </div>
              <p className="text-sm text-gray-500">{customer.customerNo ?? customer.id}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={buildCallLink(customer.phone)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <Icon name="PhoneIcon" size={14} className="text-gray-400" />
            Call
          </a>
          <a
            href={buildWhatsAppLink(customer.phone)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <Icon name="ChatBubbleLeftRightIcon" size={14} className="text-gray-400" />
            WhatsApp
          </a>
          {showEdit ? (
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-400 cursor-not-allowed"
            >
              Edit
              <span className="text-[9px] bg-gray-100 px-1 py-0.5 rounded">Soon</span>
            </button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Contact */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Info</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Icon name="PhoneIcon" size={14} className="text-gray-400" />
              <span className="text-gray-700">{customer.phone}</span>
            </div>
            {customer.email ? (
              <div className="flex items-center gap-3">
                <Icon name="EnvelopeIcon" size={14} className="text-gray-400" />
                <span className="text-gray-700">{customer.email}</span>
              </div>
            ) : null}
            {customer.city ? (
              <div className="flex items-center gap-3">
                <Icon name="MapPinIcon" size={14} className="text-gray-400" />
                <span className="text-gray-700">{customer.city}</span>
              </div>
            ) : null}
            {customer.dateOfBirth ? (
              <div className="flex items-center gap-3">
                <Icon name="CakeIcon" size={14} className="text-gray-400" />
                <span className="text-gray-700">{formatCustomerDate(customer.dateOfBirth)}</span>
              </div>
            ) : null}
            <div className="flex items-center gap-3">
              <Icon name="TagIcon" size={14} className="text-gray-400" />
              <span className="text-gray-500 capitalize">{customer.source.replace('_', ' ')}</span>
            </div>
          </div>
        </div>

        {/* Visit summary */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Visit Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-gray-900">{customer.totalVisits}</p>
              <p className="text-[10px] text-gray-500">Total Visits</p>
            </div>
            {showFinancials ? (
              <>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-green-600">
                    ₹{customer.totalSpent.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-gray-500">Total Spent</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p
                    className={`text-lg font-bold ${customer.dueAmount > 0 ? 'text-amber-600' : 'text-gray-900'}`}
                  >
                    ₹{customer.dueAmount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-[10px] text-gray-500">Due Amount</p>
                </div>
              </>
            ) : null}
            <div className="bg-gray-50 rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-gray-900">
                {customer.lastVisitAt ? formatCustomerDate(customer.lastVisitAt) : '—'}
              </p>
              <p className="text-[10px] text-gray-500">Last Visit</p>
            </div>
          </div>
        </div>

        {/* Preferences */}
        {showNotes && customer.preferences ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Preferences</h3>
            {customer.preferences.favoriteServices?.length ? (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1.5">Favorite Services</p>
                <div className="flex flex-wrap gap-1.5">
                  {customer.preferences.favoriteServices.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {customer.preferences.preferredStylistName ? (
              <p className="text-sm text-gray-600 mb-2">
                <span className="text-gray-500">Preferred Stylist:</span>{' '}
                {customer.preferences.preferredStylistName}
              </p>
            ) : null}
            {customer.preferences.allergies ? (
              <div className="rounded-xl bg-amber-50 border border-amber-100 px-3 py-2 mb-2">
                <p className="text-xs text-amber-700">
                  <strong>Allergies:</strong> {customer.preferences.allergies}
                </p>
              </div>
            ) : null}
            {customer.preferences.notes ? (
              <p className="text-sm text-gray-600 mt-2">{customer.preferences.notes}</p>
            ) : null}
          </div>
        ) : null}

        {/* Visit History */}
        {customer.visits && customer.visits.length > 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Visits</h3>
            <div className="space-y-3">
              {customer.visits.map((v) => (
                <div key={v.id} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-gray-900">{v.services.join(', ')}</p>
                    <p className="text-xs text-gray-400">
                      {formatCustomerDate(v.date)} · {v.stylistName ?? 'N/A'}
                    </p>
                  </div>
                  {showFinancials && v.amount ? (
                    <span className="font-medium text-gray-900">
                      ₹{v.amount.toLocaleString('en-IN')}
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-400">
        <span>Created: {formatCustomerDate(customer.createdAt)}</span>
        {isMockModeEnabled() ? (
          <>
            <span>·</span>
            <span className="text-amber-500 font-medium">Demo data</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
