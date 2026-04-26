'use client';

import React from 'react';
import { 
  Bell, 
  Search, 
  Command, 
  Wifi, 
  Activity,
  Globe
} from 'lucide-react';

export function Navbar() {
  return (
    <header className="h-16 border-b border-cyan-900/30 bg-slate-950/20 backdrop-blur-md flex items-center justify-between px-8 z-40">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search nexus index..." 
            className="bg-slate-900/50 border border-white/5 rounded-sm pl-10 pr-12 py-2 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-cyan-500/50 transition-all w-64"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-slate-800 border border-white/5">
            <Command className="size-2 text-slate-500" />
            <span className="text-[8px] text-slate-500 font-black">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6 border-r border-white/5 pr-8">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zerve_Live</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi className="size-3 text-cyan-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">3ms Latency</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-white/5 rounded-sm transition-colors group">
            <Bell className="size-5 text-slate-400 group-hover:text-cyan-400" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-fuchsia-500 rounded-full border-2 border-slate-950"></span>
          </button>
          <button className="p-2 hover:bg-white/5 rounded-sm transition-colors group">
            <Globe className="size-5 text-slate-400 group-hover:text-cyan-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
