'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import {
  getCustomerDashboard,
  logoutCustomer,
} from '@/lib/customer-account-api';
import type {
  CustomerDashboardAppointment,
  CustomerDashboardData,
} from '@/types/customer-account';

const statusStyles: Record<string, string> = {
  requested: 'bg-amber-50 text-amber-700 border-amber-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  checked_in: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  in_service: 'bg-purple-50 text-purple-700 border-purple-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
  no_show: 'bg-slate-50 text-slate-600 border-slate-200',
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(value: string) {
  if (!value) return 'Not scheduled';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function serviceSummary(appointment: CustomerDashboardAppointment) {
  if (!appointment.services.length) return 'Service details pending';
  if (appointment.services.length === 1) return appointment.services[0].name;
  return `${appointment.services[0].name} + ${appointment.services.length - 1} more`;
}

export default function CustomerDashboardPage() {
  const router = useRouter();
  const { brand } = usePublicSiteData();
  const [data, setData] = useState<CustomerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    getCustomerDashboard()
      .then(setData)
      .catch((err: Error) => {
        if (err.message.toLowerCase().includes('login')) {
          router.replace('/account/login');
          return;
        }
        setError(err.message || 'Unable to load your dashboard.');
      })
      .finally(() => setLoading(false));
  }, [router]);

  const nextAppointment = useMemo(
    () => data?.upcomingAppointments[0] ?? null,
    [data?.upcomingAppointments]
  );

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logoutCustomer();
    } finally {
      router.replace('/');
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-secondary border-t-primary" />
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-5">
        <div className="max-w-md rounded-3xl border border-red-100 bg-white p-7 text-center shadow-lg">
          <Icon name="ExclamationTriangleIcon" size={34} className="mx-auto text-red-500" />
          <h1 className="mt-4 text-2xl font-bold text-gray-900">Dashboard unavailable</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">{error || 'Please sign in again.'}</p>
          <Link
            href="/account/login"
            className="mt-6 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8f5] text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white">
              <Icon name="SparklesIcon" size={18} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{brand.name}</p>
              <p className="text-xs text-gray-500">Customer dashboard</p>
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/book-appointment"
              className="rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              Book Appointment
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-2xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              {loggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="rounded-[2rem] bg-[#1f2933] p-6 text-white shadow-xl shadow-pink-100/50 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-100">
              Welcome back
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight">
              {data.customer.name || 'Your beauty profile'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Your bookings, preferences, visit history, and salon updates stay connected to this
              profile at {data.salon.name || brand.name}.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <StatCard label="Appointments" value={data.stats.totalAppointments} icon="CalendarDaysIcon" />
              <StatCard label="Completed" value={data.stats.completedAppointments} icon="CheckCircleIcon" />
              <StatCard label="Total spent" value={formatCurrency(data.stats.totalSpent)} icon="CurrencyRupeeIcon" />
            </div>
          </div>

          <ProfileCard data={data} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <Panel title="Next appointment" actionHref="/book-appointment" actionLabel="Book new">
              {nextAppointment ? (
                <NextAppointment appointment={nextAppointment} />
              ) : (
                <EmptyBlock
                  icon="CalendarDaysIcon"
                  title="No upcoming appointment"
                  detail="Book your next visit and it will appear here."
                  href="/book-appointment"
                  label="Book Appointment"
                />
              )}
            </Panel>

            <Panel title="Recent appointments">
              {data.recentAppointments.length ? (
                <div className="divide-y divide-border">
                  {data.recentAppointments.map((appointment) => (
                    <AppointmentRow key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <EmptyBlock
                  icon="ClockIcon"
                  title="No visit history yet"
                  detail="Your booking requests and completed visits will be listed here."
                />
              )}
            </Panel>
          </div>

          <div className="space-y-6">
            <Panel title="Quick actions">
              <div className="grid gap-3">
                <ActionLink href="/book-appointment" icon="CalendarPlusIcon" title="Book another visit" />
                <ActionLink href="/services" icon="SparklesIcon" title="Explore services" />
                <ActionLink href="/packages" icon="GiftIcon" title="View packages" />
                <ActionLink href="/contact" icon="ChatBubbleLeftRightIcon" title="Contact salon" />
              </div>
            </Panel>

            <Panel title="Preferences">
              <div className="space-y-4 text-sm">
                <InfoLine label="Preferred stylist" value={data.customer.preferredStylistName || 'Not selected'} />
                <InfoLine
                  label="Favorite services"
                  value={
                    data.customer.favoriteServices.length
                      ? data.customer.favoriteServices.join(', ')
                      : 'Not added yet'
                  }
                />
                <InfoLine label="Allergies" value={data.customer.allergies || 'None shared'} />
                <InfoLine label="Hair / skin notes" value={data.customer.hairSkinNotes || 'None shared'} />
              </div>
            </Panel>

            <Panel title="Account">
              <div className="space-y-4 text-sm">
                <InfoLine label="Customer ID" value={data.customer.customerNo || data.customer.id} />
                <InfoLine label="Email" value={data.customer.email} />
                <InfoLine label="Phone" value={data.customer.phone || 'Not added'} />
                <InfoLine label="Due amount" value={formatCurrency(data.stats.dueAmount)} />
              </div>
            </Panel>
          </div>
        </section>
      </div>
    </main>
  );
}

function StatCard({ label, value, icon }: { label: string; value: React.ReactNode; icon: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
      <Icon name={icon} size={20} className="text-primary" />
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-slate-300">{label}</p>
    </div>
  );
}

function ProfileCard({ data }: { data: CustomerDashboardData }) {
  return (
    <div className="rounded-[2rem] border border-border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-secondary text-2xl font-bold text-primary">
          {(data.customer.name || data.customer.email || 'C').charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{data.customer.name || 'Customer'}</p>
          <p className="mt-1 text-sm text-gray-500">{data.customer.email}</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <SmallMetric label="Visits" value={data.stats.totalVisits || data.stats.completedAppointments} />
        <SmallMetric label="Due" value={formatCurrency(data.stats.dueAmount)} />
      </div>
      <div className="mt-5 rounded-3xl bg-muted p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Next visit
        </p>
        <p className="mt-2 text-sm font-semibold text-gray-800">
          {data.upcomingAppointments[0]
            ? `${formatDate(data.upcomingAppointments[0].date)} at ${data.upcomingAppointments[0].startTime}`
            : 'Not booked yet'}
        </p>
      </div>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border p-4">
      <p className="text-lg font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}

function Panel({
  title,
  actionHref,
  actionLabel,
  children,
}: {
  title: string;
  actionHref?: string;
  actionLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-border bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {actionHref && actionLabel ? (
          <Link href={actionHref} className="text-sm font-semibold text-primary">
            {actionLabel}
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function NextAppointment({ appointment }: { appointment: CustomerDashboardAppointment }) {
  return (
    <div className="rounded-3xl border border-primary/15 bg-secondary/60 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">{appointment.appointmentNo}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900">{serviceSummary(appointment)}</h3>
          <p className="mt-2 text-sm text-gray-600">
            {formatDate(appointment.date)} at {appointment.startTime}
          </p>
        </div>
        <StatusPill status={appointment.status} />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <SmallMetric label="Stylist" value={appointment.stylistName || 'Assigned soon'} />
        <SmallMetric label="Duration" value={`${appointment.services.reduce((sum, item) => sum + item.duration, 0)} min`} />
        <SmallMetric label="Amount" value={formatCurrency(appointment.totalAmount)} />
      </div>
    </div>
  );
}

function AppointmentRow({ appointment }: { appointment: CustomerDashboardAppointment }) {
  return (
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-gray-900">{serviceSummary(appointment)}</p>
        <p className="mt-1 text-sm text-gray-500">
          {formatDate(appointment.date)} · {appointment.startTime || 'Time pending'} ·{' '}
          {appointment.appointmentNo}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm font-semibold text-gray-900">{formatCurrency(appointment.totalAmount)}</p>
        <StatusPill status={appointment.status} />
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
        statusStyles[status] ?? 'border-slate-200 bg-slate-50 text-slate-600'
      }`}
    >
      {status.replace(/_/g, ' ')}
    </span>
  );
}

function EmptyBlock({
  icon,
  title,
  detail,
  href,
  label,
}: {
  icon: string;
  title: string;
  detail: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-7 text-center">
      <Icon name={icon} size={32} className="mx-auto text-primary" />
      <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">{detail}</p>
      {href && label ? (
        <Link
          href={href}
          className="mt-5 inline-flex rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white"
        >
          {label}
        </Link>
      ) : null}
    </div>
  );
}

function ActionLink({ href, icon, title }: { href: string; icon: string; title: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-3xl border border-border px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-primary/30 hover:bg-secondary/60"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Icon name={icon} size={18} />
      </span>
      {title}
      <Icon name="ArrowRightIcon" size={16} className="ml-auto text-gray-400" />
    </Link>
  );
}

function InfoLine({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-gray-500">{label}</span>
      <span className="max-w-[60%] text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
}
