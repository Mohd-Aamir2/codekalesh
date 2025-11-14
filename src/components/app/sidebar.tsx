
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChartBig,
  Bell,
  Database,
  LayoutDashboard,
  Map,
  Settings,
  Shield,
  Wind,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/components/ui/sidebar';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/data-sources', label: 'Data Sources', icon: Database },
  { href: '/map-view', label: 'Map View', icon: Map },
  { href: '/reports', label: 'Reports', icon: BarChartBig },
  {
    href: '/mosquito-prediction',
    label: 'Mosquito Prediction',
    icon: Wind,
  },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className={cn(
            'flex items-center gap-2 p-2 transition-all duration-300',
            !open && 'justify-center'
          )}
        >
          <Shield className="h-8 w-8 text-primary" />
          <span
            className={cn(
              'text-xl font-bold text-white transition-opacity',
              !open && 'w-0 opacity-0'
            )}
          >
            Sentinel
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{
                    children: item.label,
                    className:
                      'bg-sidebar-background border-sidebar-border text-sidebar-foreground',
                  }}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
