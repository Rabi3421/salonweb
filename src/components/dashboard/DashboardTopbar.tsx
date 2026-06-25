'use client';

import React, { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { SalonAuthUser } from '@/types/auth';
import { getRoleLabel, ROLE_BADGE_STYLES } from '@/lib/dashboard-permissions';

interface DashboardTopbarProps {
  user: SalonAuthUser;
  onMenuToggle: () => void;
  onLogout: () => void;
}

export default function DashboardTopbar({ user, onMenuToggle, onLogout }: DashboardTopbarProps) {
  const badgeStyle = ROLE_BADGE_STYLES[user.role];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <Icon name="Bars3Icon" size={18} className="text-gray-600" />
          </button>
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400">Welcome back</p>
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((p) => !p)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <span
              className={`hidden sm:inline-flex text-[11px] font-semibold px-2.5 py-1 rounded-full border ${badgeStyle}`}
            >
              {getRoleLabel(user.role)}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-xs font-bold">{user.name.charAt(0)}</span>
            </div>
            <Icon
              name="ChevronDownIcon"
              size={14}
              className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl border border-gray-200 shadow-lg py-2 z-50">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Icon name="ArrowRightOnRectangleIcon" size={16} className="text-gray-400" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
