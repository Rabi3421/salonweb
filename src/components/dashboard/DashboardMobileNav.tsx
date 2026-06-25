'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import type { SalonAuthUser } from '@/types/auth';
import { getNavigationForRole, getRoleLabel, ROLE_BADGE_STYLES } from '@/lib/dashboard-permissions';

interface DashboardMobileNavProps {
  user: SalonAuthUser;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function DashboardMobileNav({
  user,
  open,
  onClose,
  onLogout,
}: DashboardMobileNavProps) {
  const pathname = usePathname();
  const navGroups = getNavigationForRole(user.role);
  const badgeStyle = ROLE_BADGE_STYLES[user.role];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="SparklesIcon" size={14} className="text-white" />
            </div>
            <p className="text-sm font-bold text-gray-900">Dashboard</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <Icon name="XMarkIcon" size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-2">
                {group.title}
              </p>
              {group.items.map((item) => {
                const isActive =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(item.href);
                const disabled = item.comingSoon && item.href !== '/dashboard';
                return disabled ? (
                  <div
                    key={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400"
                  >
                    <Icon name={item.icon} size={18} className="text-gray-300" />
                    <span className="text-sm">{item.label}</span>
                    <span className="ml-auto text-[9px] bg-gray-100 px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size={18}
                      className={isActive ? 'text-white' : 'text-gray-400'}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm font-bold">{user.name.charAt(0)}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badgeStyle}`}
              >
                {getRoleLabel(user.role)}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            <Icon name="ArrowRightOnRectangleIcon" size={16} className="text-gray-400" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
