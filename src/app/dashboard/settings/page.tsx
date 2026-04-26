'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { 
  User, Shield, Bell, Lock, Globe, Cpu, Zap, 
  Terminal, Database, Wifi, Fingerprint, Key
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const [role, setRole] = useState('ADMIN');
  const [activeTab, setActiveTab] = useState('PROFILE');

  const tabs = [
    { id: 'PROFILE', label: 'User Profile', icon: User },
    { id: 'SECURITY', label: 'Security & Keys', icon: Shield },
    { id: 'RBAC', label: 'Access Control', icon: Lock },
    { id: 'NODES', label: 'Node Management', icon: Cpu },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-end justify-between border-b border-white/5 pb-8">
          <div>
            <h1 className="text-3xl font-black digital-font uppercase tracking-tighter mb-2">System <span className="text-cyan-400">Settings</span></h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Configure institutional nexus parameters</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-1 rounded-sm border border-white/5">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm",
                  activeTab === tab.id ? "bg-cyan-500 text-slate-950" : "text-slate-500 hover:text-white"
                )}
              >
                <tab.icon size={14} />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {activeTab === 'PROFILE' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="hud-card p-8">
                  <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <User size={16} /> Identity_Data
                  </h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Legal Name</label>
                      <input type="text" defaultValue="Johnathan Doe" className="w-full bg-slate-900 border border-white/5 p-3 text-xs font-bold font-mono focus:border-cyan-500/40 outline-none" />
                    </div>
                    <div className="space-y-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Access Designation</label>
                      <div className="w-full bg-slate-900/30 border border-cyan-500/20 p-3 text-xs font-black text-cyan-400 font-mono">SENIOR_ANALYST_04</div>
                    </div>
                    <div className="col-span-2 space-y-4">
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">Institutional Email</label>
                      <input type="email" defaultValue="j.doe@zerve-institutional.com" className="w-full bg-slate-900 border border-white/5 p-3 text-xs font-bold font-mono focus:border-cyan-500/40 outline-none" />
                    </div>
                  </div>
                  <div className="mt-10 pt-8 border-t border-white/5 flex justify-end">
                    <button className="px-8 py-3 bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95">Update Identity</button>
                  </div>
                </div>

                <div className="hud-card p-8 bg-fuchsia-950/5">
                   <h3 className="text-xs font-black text-fuchsia-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <Fingerprint size={16} /> Biometric_Sync
                  </h3>
                  <div className="flex items-center justify-between p-6 bg-slate-950 border border-white/5 rounded-sm">
                    <div className="flex items-center gap-6">
                       <div className="h-12 w-12 bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center rounded-full">
                          <Zap className="text-fuchsia-400" />
                       </div>
                       <div>
                          <div className="text-xs font-bold text-white uppercase mb-1">Neural Telemetry Active</div>
                          <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Last Sync: 3 minutes ago</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                       Secure
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'RBAC' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="hud-card p-8">
                  <h3 className="text-xs font-black text-cyan-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <Lock size={16} /> Role_Based_Access_Control
                  </h3>
                  <div className="space-y-6">
                    {[
                      { role: 'ADMIN', desc: 'Full core access, system provisioning, and audit oversight.', current: role === 'ADMIN' },
                      { role: 'ANALYST', desc: 'Read-only access to correlation engine and intelligence hub.', current: role === 'ANALYST' },
                      { role: 'TRADER', desc: 'Execution access to trading terminal and liquidity pools.', current: role === 'TRADER' },
                    ].map((r) => (
                      <div 
                        key={r.role}
                        onClick={() => setRole(r.role)}
                        className={cn(
                          "p-6 border transition-all cursor-pointer relative overflow-hidden group",
                          r.current ? "bg-cyan-500/10 border-cyan-500/40" : "bg-slate-900/50 border-white/5 hover:border-white/10"
                        )}
                      >
                        <div className="flex items-start justify-between relative z-10">
                          <div>
                            <div className={cn("text-sm font-black digital-font mb-1", r.current ? "text-white" : "text-slate-400 group-hover:text-white")}>{r.role}</div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest max-w-md">{r.desc}</p>
                          </div>
                          {r.current && (
                            <div className="px-2 py-1 bg-cyan-500 text-slate-950 text-[8px] font-black uppercase tracking-widest">Active_Assignment</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar Stats */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="hud-card p-6">
               <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Security Intelligence</div>
               <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-slate-300">
                        <Shield size={14} className="text-cyan-500" /> Firewall
                     </div>
                     <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Nominal</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-slate-300">
                        <Wifi size={14} className="text-cyan-500" /> Uplink
                     </div>
                     <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">3ms Latency</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-tight text-slate-300">
                        <Key size={14} className="text-cyan-500" /> Encryption
                     </div>
                     <span className="text-[10px] text-fuchsia-500 font-black uppercase tracking-widest">AES_4096</span>
                  </div>
               </div>
               <div className="mt-8 p-4 bg-slate-900/50 border border-white/5 rounded-sm">
                  <div className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Global System Load</div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-cyan-500"
                        initial={{ width: '0%' }}
                        animate={{ width: '42%' }}
                     />
                  </div>
               </div>
            </div>

            <div className="hud-card p-6 border-l-4 border-l-cyan-500">
               <div className="flex items-center gap-3 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                  <Terminal size={14} /> Audit_Logs
               </div>
               <div className="space-y-4 font-mono text-[9px] text-slate-500">
                  <div className="flex gap-2">
                     <span className="text-cyan-500/50">09:54:12</span>
                     <span>SESSION_REESTABLISHED_NODE_04</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="text-cyan-500/50">09:52:05</span>
                     <span>DB_SYNC_COMPLETE_ZERVE_CLOUD</span>
                  </div>
                  <div className="flex gap-2">
                     <span className="text-cyan-500/50">09:48:33</span>
                     <span>ACCESS_TOKEN_ROTATED</span>
                  </div>
                  <div className="flex gap-2 text-fuchsia-400">
                     <span className="opacity-50">09:45:12</span>
                     <span>UNAUTHORIZED_PROBE_BLOCKED_SGP</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
