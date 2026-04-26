'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Shield, User, Mail, Lock, ChevronRight, Globe, Cpu } from 'lucide-react';

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center relative p-6 selection:bg-fuchsia-500/30">
      <div className="scanline"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 bg-fuchsia-500/20 border border-fuchsia-500/50 items-center justify-center rounded-sm mb-6">
            <Cpu className="text-fuchsia-400 size-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase digital-font mb-2">Request Core Access</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Join the institutional nexus intelligence network</p>
        </div>

        <div className="hud-card p-10 border-t-4 border-t-fuchsia-600">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full bg-slate-900/50 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full bg-slate-900/50 border border-white/5 rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Institutional Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                <input 
                  type="email" 
                  placeholder="j.doe@institution.com" 
                  className="w-full bg-slate-900/50 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                <input 
                  type="password" 
                  placeholder="••••••••••••" 
                  className="w-full bg-slate-900/50 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-fuchsia-500/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="p-4 bg-fuchsia-500/5 border border-fuchsia-500/20 rounded-sm">
              <div className="flex items-start gap-3">
                <Shield className="size-4 text-fuchsia-400 mt-1 shrink-0" />
                <p className="text-[10px] text-slate-400 leading-relaxed font-light italic">
                  By requesting access, you agree to the <span className="text-fuchsia-400 font-bold uppercase cursor-pointer">Nexus Protocols</span> and the storage of neural telemetry on encrypted nodes.
                </p>
              </div>
            </div>

            <Link href="/dashboard" className="block">
              <button className="w-full py-4 bg-fuchsia-600 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-fuchsia-500 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95">
                Initialize Provisioning <ChevronRight size={14} />
              </button>
            </Link>
          </form>
        </div>

        <p className="text-center mt-10 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          Already provisioned? <Link href="/auth/login" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors">Resume Session</Link>
        </p>
      </motion.div>

      <div className="absolute bottom-10 flex items-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all">
         <div className="text-[10px] font-black tracking-widest">ZERVE_INFRA</div>
         <div className="text-[10px] font-black tracking-widest">RSA_PROTECT</div>
         <div className="text-[10px] font-black tracking-widest">AES_256</div>
      </div>
    </div>
  );
}
