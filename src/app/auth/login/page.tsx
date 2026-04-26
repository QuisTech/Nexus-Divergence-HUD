'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Zap, Shield, Key, ArrowRight, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center relative p-6 selection:bg-cyan-500/30">
      <div className="scanline"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex h-16 w-16 bg-cyan-500/20 border border-cyan-500/50 items-center justify-center rounded-sm mb-6">
            <Zap className="text-cyan-400 size-8" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter uppercase digital-font mb-2">Initialize Session</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Secure institutional gateway to Nexus Core</p>
        </div>

        <div className="hud-card p-10 border-t-4 border-t-cyan-500">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Access ID / Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                <input 
                  type="email" 
                  placeholder="name@institution.com" 
                  className="w-full bg-slate-900/50 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                  defaultValue="analyst@nexus.engine"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Security Key</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-600" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-slate-900/50 border border-white/5 rounded-sm pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                  defaultValue="password123"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="sr-only peer" />
                <div className="h-4 w-4 border border-white/10 rounded-sm bg-slate-900 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all flex items-center justify-center">
                  <div className="h-2 w-2 bg-slate-950 rounded-full opacity-0 peer-checked:opacity-100"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-300 uppercase tracking-widest transition-colors">Remember Node</span>
              </label>
              <a href="#" className="text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:text-cyan-300 transition-colors">Lost Key?</a>
            </div>

            <Link href="/dashboard" id="login-btn" className="block">
              <button className="w-full py-4 bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-[0.2em] hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95">
                Establish Connection <Shield size={14} />
              </button>
            </Link>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.5em] text-slate-600">
              <span className="bg-slate-950 px-4">Institutional SSO</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 border border-white/10 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
              <Shield size={14} /> Institutional
            </button>
            <button className="flex items-center justify-center gap-3 py-3 border border-white/10 hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
              <Mail size={14} /> Google
            </button>
          </div>
        </div>

        <p className="text-center mt-10 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          New to the engine? <Link href="/auth/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors">Request Access</Link>
        </p>
      </motion.div>

      <div className="absolute bottom-10 text-[8px] text-slate-700 font-mono tracking-[0.5em] uppercase pointer-events-none">
        ENCRYPTED_HANDSHAKE_ACTIVE // TLS_1.3 // RSA_4096
      </div>
    </div>
  );
}
