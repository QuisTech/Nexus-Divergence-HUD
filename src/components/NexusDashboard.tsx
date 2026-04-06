'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar as RechartRadar,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Zap, 
  Globe, 
  Target,
  Settings,
  Share2,
  Terminal,
  Radar as LucideRadar,
  Maximize2,
  Cpu,
  Layers,
  Crosshair
} from 'lucide-react';

export default function NexusDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [systemUptime, setSystemUptime] = useState('00:00:00');

  useEffect(() => {
    fetch('/api/nexus')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err instanceof Error ? err.message : 'Nexus system offline');
        setLoading(false);
      });

    const timer = setInterval(() => {
      const now = new Date();
      setSystemUptime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return (
    <div className="flex h-screen items-center justify-center bg-[#020617] font-mono text-cyan-400">
      <div className="text-center">
        <motion.div 
          animate={{ opacity: [0.2, 1, 0.2] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-4xl font-black mb-4 tracking-[0.5em]"
        >
          ANALYZING_NEXUS
        </motion.div>
        <div className="h-1 w-64 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          ></motion.div>
        </div>
        <div className="mt-4 text-[10px] text-slate-500 tracking-widest uppercase">Initializing Sub-Surface Correlation Engine v4.8...</div>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="flex h-screen items-center justify-center bg-[#020617] text-fuchsia-500 font-mono">
      <div className="text-center">
        <AlertTriangle size={64} className="mx-auto mb-6 opacity-80 animate-pulse" />
        <h2 className="text-3xl font-black mb-4 tracking-tighter uppercase">Nexus_System_Offline</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">{error}</p>
        <button onClick={() => window.location.reload()} className="px-8 py-3 bg-fuchsia-900/20 border border-fuchsia-500/50 hover:bg-fuchsia-900/40 transition-all font-bold tracking-widest uppercase text-xs">
          Re-Establish Connection
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 lg:p-8 bg-[#020617] text-slate-50 relative selection:bg-cyan-500/30 selection:text-white">
      <div className="scanline"></div>
      
      {/* HUD Header - Optimized for High Fidelity */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-cyan-900/40 pb-6 mb-10 relative">
        <div className="flex items-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 to-fuchsia-600 rounded-full opacity-10 blur-xl group-hover:opacity-30 transition-opacity"></div>
            <div className="h-16 w-16 bg-slate-950 border border-cyan-500/40 flex items-center justify-center relative backdrop-blur-md">
               <Crosshair className="text-cyan-400 animate-pulse" size={32} />
               <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-500"></div>
               <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-fuchsia-500"></div>
            </div>
          </div>
          <div>
             <h1 className="text-4xl font-black tracking-tighter uppercase leading-none mb-2 digital-font italic">
                The Nexus <span className="text-cyan-400">Engine</span>
             </h1>
             <div className="flex flex-wrap items-center text-[10px] text-slate-500 font-mono tracking-[0.2em] uppercase" style={{ gap: '32px' }}>
               <div className="border border-cyan-900/30 px-4 py-1 bg-cyan-950/20 whitespace-nowrap">
                 SYS_VERSION:&nbsp;<span className="text-cyan-400">4.8.2</span>
               </div>
               <div className="border border-cyan-900/30 px-4 py-1 bg-cyan-950/20 flex items-center gap-3 whitespace-nowrap" style={{ gap: '12px' }}>
                 <span className="h-1.5 w-1.5 bg-fuchsia-500 animate-ping rounded-full"></span> 
                 STATUS:&nbsp;<span className="text-cyan-400">OPTIMIZED</span>
               </div>
               <div className="border border-cyan-900/30 px-4 py-1 bg-cyan-950/20 whitespace-nowrap">
                 SYNC:&nbsp;<span className="text-cyan-400">LATENCY_3MS</span>
               </div>
             </div>
          </div>
        </div>

        <div className="flex items-center font-mono" style={{ gap: '48px' }}>
           <div className="text-right border-r border-cyan-900/40 pr-10">
             <div className="text-[10px] text-slate-500 uppercase mb-1 tracking-widest">System Time</div>
             <div className="text-3xl font-black text-cyan-400 tracking-tighter glow-text-cyan">{systemUptime}</div>
           </div>
           <div className="flex" style={{ gap: '20px' }}>
              <button className="p-3 border border-cyan-500/20 hover:bg-cyan-500/10 transition-all text-cyan-400 active:scale-95 group relative">
                 <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Settings size={20} />
              </button>
              <button className="p-3 border border-cyan-500/20 hover:bg-cyan-500/10 transition-all text-cyan-500 active:scale-95 group relative">
                 <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Share2 size={20} />
              </button>
           </div>
        </div>
      </div>

      {/* Main Grid Layout - Industry Density */}
      <div className="grid grid-cols-12 gap-10 relative z-10" suppressHydrationWarning>
        
        {/* Left Control Panel / Sidebar Stats */}
        <div className="col-span-12 lg:col-span-3 space-y-10">
           <div className="hud-card p-10 border-l-4 border-l-cyan-500 group">
              <div className="flex justify-between items-center mb-8">
                 <div className="text-[12px] uppercase font-bold text-cyan-400 tracking-[0.3em] digital-font flex items-center gap-3">
                   <LucideRadar size={16} className="animate-spin-slow" /> LIVE_INTENSITY
                 </div>
              </div>
              <div className="text-7xl font-black mb-6 glow-text-cyan transition-all group-hover:tracking-tight origin-left">
                {data.correlation}
              </div>
              <div className="text-[11px] text-slate-500 font-mono flex justify-between items-center pt-5 border-t border-white/5 uppercase tracking-widest">
                <span>Correlation Index</span>
                <span className="text-cyan-500 font-bold px-3 py-1 bg-cyan-500/10 border border-cyan-500/20">0.824 FIXED</span>
              </div>
           </div>

           <div className="hud-card p-10 border-l-4 border-l-fuchsia-600 bg-fuchsia-950/10 group">
              <div className="flex justify-between items-center mb-8 text-fuchsia-400">
                 <div className="text-[12px] uppercase font-bold tracking-[0.3em] digital-font flex items-center gap-3">
                   <AlertTriangle size={16} /> DIVERGENCE_ALERT
                 </div>
                 <span className="text-[11px] px-3 py-1 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-sm">LVL_04</span>
              </div>
              <h3 className="text-4xl font-black mb-6 tracking-tighter leading-tight group-hover:glow-text-fuchsia transition-all">ANOMALY_SPIKE</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light italic opacity-80 border-l-2 border-fuchsia-500/20 pl-4">
                 "Predicted odds detected divergence of 4.2x above historical alpha baseline. Immediate hedging advised."
              </p>
           </div>
        </div>

        {/* Center Primary Visualization - Epic Scale */}
        <div className="col-span-12 lg:col-span-6 space-y-10">
           <div className="hud-card p-12 min-h-[640px] flex flex-col relative group">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-500/30"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-fuchsia-500/30"></div>
              
              <div className="absolute top-10 right-10 flex text-[12px] text-cyan-400/70 uppercase digital-font font-bold" style={{ gap: '64px' }}>
                 <div className="flex items-center whitespace-nowrap" style={{ gap: '14px' }}>
                   <div className="h-2.5 w-2.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div> S&P_INDEX
                 </div>
                 <div className="flex items-center whitespace-nowrap" style={{ gap: '14px' }}>
                   <div className="h-2.5 w-2.5 bg-fuchsia-500 rounded-full shadow-[0_0_8px_rgba(217,70,239,0.6)]"></div> POLY_MARKET
                 </div>
              </div>

              <div className="flex-1 flex flex-col pt-4">
                 <h3 className="text-md font-black text-slate-400 uppercase mb-16 flex items-center gap-8 tracking-[0.3em]">
                   <span className="text-cyan-500">&gt;&gt;</span>&nbsp;&nbsp;PRIMARY_YIELD_CONVERGENCE&nbsp;&nbsp;<span className="flex-1 h-[1px] bg-cyan-900/40"></span>
                 </h3>
                 <div style={{ height: '420px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={data.financeData}>
                          <defs>
                             <linearGradient id="glowCyan" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="6 6" stroke="#ffffff03" vertical={false} />
                          <XAxis dataKey="date" hide />
                          <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                          <Tooltip 
                             cursor={{ stroke: '#06b6d4', strokeWidth: 1.5 }}
                             contentStyle={{ background: '#020617', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '0px', padding: '12px' }}
                             itemStyle={{ color: '#06b6d4', textTransform: 'uppercase', fontSize: '10px' }}
                          />
                          <Area 
                            type="step" 
                            dataKey="value" 
                            stroke="#06b6d4" 
                            strokeWidth={3} 
                            fill="url(#glowCyan)"
                            animationDuration={2500}
                          />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Secondary Analytics */}
        <div className="col-span-12 lg:col-span-3 space-y-10">
           <div className="hud-card p-6 h-[240px] relative">
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40"></div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-4 flex items-center justify-between tracking-widest">
                 <span>Magnitude Scan</span>
                 <div className="h-[1px] w-12 bg-white/10"></div>
              </div>
              <div className="h-[160px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.divergence}>
                       <Bar dataKey="score" radius={[2, 2, 0, 0]}>
                          {data.divergence.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={index > 25 ? '#d946ef' : '#1e293b'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="hud-card p-6 h-[240px] flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-fuchsia-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
              <div className="text-[10px] font-bold text-slate-500 uppercase digital-font tracking-[0.2em]">Memory Core Status</div>
              <div className="flex-1 flex flex-col justify-center gap-4">
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-slate-400">Context Buffers</span>
                    <span className="text-xs font-mono text-cyan-400 font-black">STABLE</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-slate-400">Backboard Sync</span>
                    <span className="text-xs font-mono text-fuchsia-500 font-black">ENCRYPTED</span>
                 </div>
                 <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-mono text-slate-400">Neural Weighting</span>
                    <span className="text-xs font-mono text-slate-500 italic">v4.82 (LFG)</span>
                 </div>
              </div>
              <div className="text-[9px] text-fuchsia-500 font-mono tracking-widest mt-2 animate-pulse">
                &gt; DATA_PACKET_LOSS_0%
              </div>
           </div>

           <div className="hud-card p-8 min-h-[300px] relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/20"></div>
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-8 flex items-center justify-between digital-font tracking-[0.2em]">
                 <span className="flex items-center gap-2"><Globe size={14} className="text-cyan-400" /> Global Correlation Map</span>
                 <div className="h-2 w-2 bg-cyan-500 rounded-full animate-ping"></div>
              </div>
              <div style={{ height: '200px', width: '100%' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                      { subject: 'Finance', A: 120, fullMark: 150 },
                      { subject: 'Social', A: 98, fullMark: 150 },
                      { subject: 'Sentiment', A: 86, fullMark: 150 },
                      { subject: 'Yields', A: 99, fullMark: 150 },
                      { subject: 'Crypto', A: 85, fullMark: 150 },
                    ]}>
                      <PolarGrid stroke="#ffffff20" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                      <RechartRadar name="Nexus" dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.7} />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

      </div>

      {/* Grid Background Effect removed from here, moved to globals.css ::before */}
    </div>
  );
}
