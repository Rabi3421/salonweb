'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { SalonUnavailablePage } from '@/components/SalonUnavailablePage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000';
const SALON_ID = process.env.NEXT_PUBLIC_SALON_ID ?? '';
const POLL_INTERVAL = 30_000;

type BlockedContact = { phone: string; email: string; address: string } | null;

export function SalonStatusGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [blocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [salonName, setSalonName] = useState('');
  const [contact, setContact] = useState<BlockedContact>(null);

  const checkStatus = useCallback(async () => {
    if (!API_BASE_URL || !SALON_ID) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/salon/public/site-data`, {
        headers: { 'x-salon-id': SALON_ID },
        cache: 'no-store',
      });
      if (res.status === 403) {
        const json = await res.json().catch(() => ({}));
        if (json.blocked) {
          setBlocked(true);
          setMessage(json.message || 'This salon is temporarily unavailable.');
          setSalonName(json.salonName || '');
          setContact(json.contact ?? null);
          return;
        }
      }
      setBlocked(false);
    } catch {
      // network error — don't block, just skip
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [pathname, checkStatus]);

  useEffect(() => {
    const id = setInterval(checkStatus, POLL_INTERVAL);
    return () => clearInterval(id);
  }, [checkStatus]);

  if (blocked) {
    return <SalonUnavailablePage message={message} salonName={salonName} contact={contact} />;
  }

  return <>{children}</>;
}
