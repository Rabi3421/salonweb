'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import RoutePermissionGuard from '@/components/dashboard/RoutePermissionGuard';
import DashboardLoading from '@/components/dashboard/LoadingState';
import DashboardError from '@/components/dashboard/ErrorState';
import EnquiryContactCard from '@/components/dashboard/enquiries/EnquiryContactCard';
import EnquiryConversionPanel from '@/components/dashboard/enquiries/EnquiryConversionPanel';
import EnquiryDetailsCard from '@/components/dashboard/enquiries/EnquiryDetailsCard';
import EnquiryNotesPanel from '@/components/dashboard/enquiries/EnquiryNotesPanel';
import EnquiryPriorityBadge from '@/components/dashboard/enquiries/EnquiryPriorityBadge';
import EnquiryStatusBadge from '@/components/dashboard/enquiries/EnquiryStatusBadge';
import EnquiryStatusPanel from '@/components/dashboard/enquiries/EnquiryStatusPanel';
import EnquiryTypeBadge from '@/components/dashboard/enquiries/EnquiryTypeBadge';
import {
  addEnquiryNote,
  convertEnquiryToAppointment,
  getEnquiryById,
  updateEnquiry,
} from '@/lib/enquiries-api';
import {
  buildEnquiryCallLink,
  buildEnquiryWhatsAppLink,
  getEnquirySourceLabel,
} from '@/lib/enquiry-utils';
import { isMockModeEnabled } from '@/lib/dashboard-auth';
import type {
  AddEnquiryNotePayload,
  ConvertEnquiryPayload,
  SalonEnquiry,
  UpdateEnquiryPayload,
} from '@/types/enquiries';

export default function EnquiryDetailPage() {
  return (
    <RoutePermissionGuard>
      <EnquiryDetailContent />
    </RoutePermissionGuard>
  );
}

function EnquiryDetailContent() {
  const params = useParams<{ enquiryId: string }>();
  const [enquiry, setEnquiry] = useState<SalonEnquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusSubmitting, setStatusSubmitting] = useState(false);
  const [noteSubmitting, setNoteSubmitting] = useState(false);
  const [conversionSubmitting, setConversionSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getEnquiryById(params.enquiryId);
        if (!data) {
          setError('Enquiry not found.');
          return;
        }
        setEnquiry(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.enquiryId]);

  async function handleUpdate(payload: UpdateEnquiryPayload) {
    if (!enquiry) return;
    setStatusSubmitting(true);
    setResult('');
    try {
      const updated = await updateEnquiry(enquiry.id, payload);
      if (updated) setEnquiry(updated);
      setResult('Enquiry updated successfully.');
    } catch (err) {
      setResult((err as Error).message);
    } finally {
      setStatusSubmitting(false);
    }
  }

  async function handleAddNote(payload: AddEnquiryNotePayload) {
    if (!enquiry) return;
    setNoteSubmitting(true);
    setResult('');
    try {
      const updated = await addEnquiryNote(enquiry.id, payload);
      if (updated) setEnquiry(updated);
      setResult('Follow-up note added.');
    } catch (err) {
      setResult((err as Error).message);
    } finally {
      setNoteSubmitting(false);
    }
  }

  async function handleConvert(payload: ConvertEnquiryPayload) {
    if (!enquiry) return;
    setConversionSubmitting(true);
    setResult('');
    try {
      const updated = await convertEnquiryToAppointment(enquiry.id, payload);
      if (updated) setEnquiry(updated);
      setResult(
        isMockModeEnabled()
          ? 'Enquiry converted successfully. Demo mode used mock data.'
          : 'Enquiry converted successfully.'
      );
    } catch (err) {
      setResult((err as Error).message);
    } finally {
      setConversionSubmitting(false);
    }
  }

  if (loading) return <DashboardLoading message="Loading enquiry..." />;
  if (error || !enquiry) return <DashboardError message={error || 'Enquiry not found.'} />;

  return (
    <div className="max-w-6xl space-y-6">
      {isMockModeEnabled() ? (
        <p className="text-[10px] font-medium text-amber-500">Demo data</p>
      ) : null}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{enquiry.enquiryNo ?? enquiry.id}</h1>
              <EnquiryStatusBadge status={enquiry.status} />
              <EnquiryPriorityBadge priority={enquiry.priority} />
              <EnquiryTypeBadge type={enquiry.type} />
              <span className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600">
                {getEnquirySourceLabel(enquiry.source)}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">{enquiry.name}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={buildEnquiryCallLink(enquiry.phone)}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white"
            >
              <Icon name="PhoneIcon" size={14} />
              Call
            </a>
            <a
              href={buildEnquiryWhatsAppLink(enquiry.phone)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={14} />
              WhatsApp
            </a>
            <Link
              href="/dashboard/enquiries"
              className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      {result ? (
        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-5 py-3 text-sm font-medium text-primary">
          {result}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <EnquiryContactCard enquiry={enquiry} />
          <EnquiryDetailsCard enquiry={enquiry} />
          <EnquiryNotesPanel
            enquiry={enquiry}
            submitting={noteSubmitting}
            onSubmit={handleAddNote}
          />
        </div>
        <div className="space-y-6">
          <EnquiryStatusPanel
            enquiry={enquiry}
            submitting={statusSubmitting}
            onSubmit={handleUpdate}
          />
          <EnquiryConversionPanel
            enquiry={enquiry}
            submitting={conversionSubmitting}
            onSubmit={handleConvert}
          />
        </div>
      </div>
    </div>
  );
}
