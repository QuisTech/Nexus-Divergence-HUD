'use client';

import React from 'react';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { Terminal, Shield, Lock, Activity } from 'lucide-react';

export default function ModulePlaceholder({ title, description }: { title: string, description: string }) {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] text-center">
        <div className="relative mb-8">
           <div className="absolute -inset-10 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
           <Terminal size={64} className="text-cyan-500 relative z-10 opacity-50" />
        </div>
        <h1 className="text-3xl font-black digital-font uppercase tracking-tighter mb-4 text-white">
          {title} <span className="text-cyan-400">Restricted</span>
        </h1>
        <p className="text-slate-500 max-w-md mx-auto uppercase text-[10px] font-bold tracking-[0.3em] leading-relaxed">
          {description} // PROVISIONING_REQUIRED // ACCESS_LEVEL_04_ONLY
        </p>
        <div className="mt-10 flex gap-4">
           <div className="px-4 py-2 bg-slate-900 border border-white/5 text-[8px] font-black uppercase tracking-widest text-slate-500">Node_ID: 0x48A2</div>
           <div className="px-4 py-2 bg-slate-900 border border-white/5 text-[8px] font-black uppercase tracking-widest text-slate-500">Status: Encrypted</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
