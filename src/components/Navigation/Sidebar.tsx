'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Settings, 
  Shield, 
  LogOut,
  Zap,
  BarChart3,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'nav-analytics', name: 'Analytics HUD', href: '/dashboard', icon: LayoutDashboard },
  { id: 'nav-trading', name: 'Trading Terminal', href: '/dashboard/trading', icon: TrendingUp },
  { id: 'nav-intel', name: 'Intelligence Hub', href: '/dashboard/intel', icon: Cpu },
  { id: 'nav-risk', name: 'Risk Control', href: '/dashboard/risk', icon: Shield },
];

const secondaryItems = [
  { id: 'nav-settings', name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-slate-950/50 backdrop-blur-xl border-r border-cyan-900/30 flex flex-col z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center rounded-sm">
          <Zap className="text-cyan-400 size-5" />
        </div>
        <span className="text-xl font-black tracking-tighter text-white uppercase digital-font">
          Nexus<span className="text-cyan-400">Core</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div id={item.id} className={cn(
                "group flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 relative overflow-hidden",
                isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-white/5"
              )}>
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"
                  />
                )}
                <item.icon className={cn("size-5", isActive ? "text-cyan-400" : "group-hover:text-cyan-400")} />
                <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
              </div>
            </Link>
          );
        })}

        <div className="pt-8 pb-4">
          <div className="px-4 text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] mb-4">System Management</div>
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div id={item.id} className={cn(
                  "group flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 relative overflow-hidden",
                  isActive ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                  <item.icon className="size-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="bg-slate-900/50 p-4 rounded-sm border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-600 p-[1px]">
              <div className="h-full w-full rounded-full bg-slate-950 flex items-center justify-center">
                <span className="text-xs font-black">JD</span>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Admin Access</div>
              <div className="text-xs font-bold text-white">John Doe</div>
            </div>
          </div>
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-2 py-2 text-[10px] text-slate-500 hover:text-white uppercase font-bold tracking-widest transition-colors">
              <LogOut className="size-3" /> Terminate Session
            </button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
