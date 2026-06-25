'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { usePublicSiteData } from '@/components/PublicSiteDataProvider';
import type { SalonAuthUser } from '@/types/auth';
import { getNavigationForRole } from '@/lib/dashboard-permissions';

interface DashboardSidebarProps {
  user: SalonAuthUser;
}

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navGroups = getNavigationForRole(user.role);
  const { brand } = usePublicSiteData();

  return (
    <aside className="hidden lg:flex w-60 flex-col bg-white border-r border-gray-200 h-screen sticky top-0">
      {/* Brand */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <Icon name="SparklesIcon" size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{brand.name}</p>
            <p className="text-[10px] text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-3 mb-2">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(item.href);
                const disabled = item.comingSoon && item.href !== '/dashboard';
                return (
                  <div key={item.href}>
                    {disabled ? (
                      <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-400 cursor-not-allowed">
                        <Icon name={item.icon} size={18} className="text-gray-300" />
                        <span className="text-[13px] font-medium">{item.label}</span>
                        <span className="ml-auto text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                          Soon
                        </span>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-colors ${
                          isActive
                            ? 'bg-primary text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon
                          name={item.icon}
                          size={18}
                          className={isActive ? 'text-white' : 'text-gray-400'}
                        />
                        {item.label}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
