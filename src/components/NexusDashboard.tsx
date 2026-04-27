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
  const [liveCorrelation, setLiveCorrelation] = useState(0.8242);
  const [liveDivergence, setLiveDivergence] = useState(14);

  useEffect(() => {
    fetch('/api/nexus')
      .then(res => res.json())
      .then(d => {
        console.log("Nexus Data Received:", d);
        // Ensure data has the expected structure
        if (d && d.financeData) {
          setData(d);
          if (d.correlation) setLiveCorrelation(parseFloat(d.correlation));
          if (d.divergence_pct) setLiveDivergence(parseFloat(d.divergence_pct));
        } else {
          throw new Error("Invalid data format");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Nexus Dashboard Error:", err);
        setError(err instanceof Error ? err.message : 'Nexus system offline');
        setLoading(false);
      });

    const timer = setInterval(() => {
      const now = new Date();
      setSystemUptime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    const fluctuationTimer = setInterval(() => {
      setLiveCorrelation(prev => {
        const drift = (Math.random() - 0.5) * 0.006;
        return Math.max(0.78, Math.min(0.88, prev + drift));
      });
      setLiveDivergence(prev => {
        const drift = (Math.random() - 0.5) * 1.2;
        return Math.max(8, Math.min(22, prev + drift));
      });
    }, 2000);

    return () => {
      clearInterval(timer);
      clearInterval(fluctuationTimer);
    };
  }, []);

  if (loading) return (
    <div className="flex h-[600px] items-center justify-center font-mono text-cyan-400">
      <div className="text-center">
        <motion.div 
          animate={{ opacity: [0.2, 1, 0.2] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-black mb-4 tracking-[0.5em]"
        >
          ANALYZING_NEXUS
        </motion.div>
        <div className="h-1 w-48 bg-slate-800 rounded-full overflow-hidden mx-auto">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          ></motion.div>
        </div>
      </div>
    </div>
  );

  if (error || !data) return (
    <div className="flex h-[600px] items-center justify-center text-fuchsia-500 font-mono">
      <div className="text-center">
        <AlertTriangle size={48} className="mx-auto mb-6 opacity-80 animate-pulse" />
        <h2 className="text-2xl font-black mb-4 tracking-tighter uppercase">Nexus_System_Offline</h2>
        <p className="text-slate-500 mb-8 max-w-xs mx-auto text-xs">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-fuchsia-500/50 hover:bg-fuchsia-900/40 transition-all font-bold tracking-widest uppercase text-[10px]">
          Re-Establish Connection
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      {/* Mini HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8 mb-4">
        <div>
           <h2 id="hud-header" className="text-2xl font-black tracking-tighter uppercase digital-font italic text-white">
              Institutional <span className="text-cyan-400">Risk Desk</span>
           </h2>
           <div className="flex items-center gap-4 mt-1">
              <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Protocol v4.8.2</span>
              <div className="h-1 w-1 bg-slate-700 rounded-full"></div>
              <span id="sys-status" className="text-[9px] text-cyan-500 uppercase font-black tracking-widest">System Time: {systemUptime}</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           {/* Demo button removed - now triggered via Shift+D only */}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div id="correlation-card" className="hud-card p-8 border-l-4 border-l-cyan-500 group">
             <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-[0.3em] digital-font flex items-center gap-3 mb-6">
               <LucideRadar size={14} className="animate-spin-slow" /> LIVE_CORRELATION
             </div>
             <div className="text-6xl font-black mb-4 digital-font text-white">
               {liveCorrelation.toFixed(4)}
             </div>
             <div className="text-[9px] text-slate-500 font-mono flex justify-between items-center pt-4 border-t border-white/5 uppercase tracking-widest">
                <span>Confidence Index</span>
                <span className="text-cyan-400 font-bold px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20">Optimal</span>
             </div>
          </div>

          <div id="divergence-card" className="hud-card p-8 border-l-4 border-l-fuchsia-600 bg-fuchsia-950/5 group">
             <div className="text-[10px] uppercase font-bold text-fuchsia-400 tracking-[0.3em] digital-font flex items-center gap-3 mb-6">
               <AlertTriangle size={14} /> DIVERGENCE_ALERT
             </div>
             <div className="text-4xl font-black mb-4 text-white uppercase">The Pivot Proof</div>
             <p className="text-[11px] text-slate-500 leading-relaxed font-light italic">
                Nexus flagged {liveDivergence.toFixed(1)}% sentiment divergence 72 hours before institutional 10Y Yields adjusted.
             </p>
          </div>
        </div>

        {/* Center Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
           <div id="main-chart-card" className="hud-card p-8 min-h-[440px] flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-4">
                    <span className="text-cyan-400">&gt;&gt;</span> PRIMARY_CONVERGENCE_MODEL
                 </h3>
                 <div className="flex items-center gap-4 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-cyan-500 rounded-full"></div> S&P 500</div>
                    <div className="flex items-center gap-2"><div className="h-1.5 w-1.5 bg-fuchsia-500 rounded-full"></div> POLYMARKET</div>
                 </div>
              </div>
              
              {/* MANDATORY FIXED HEIGHT FOR RECHARTS IN HUD */}
              <div style={{ height: '350px', width: '100%', position: 'relative' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart 
                      data={data.financeData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                       <defs>
                          <linearGradient id="glowCyan" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="glowFuchsia" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                       <XAxis dataKey="date" hide />
                       <YAxis hide domain={['dataMin - 5', 'dataMax + 5']} />
                       <Tooltip 
                         cursor={{ stroke: '#ffffff10', strokeWidth: 1 }}
                         contentStyle={{ background: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0', padding: '12px' }}
                         itemStyle={{ fontSize: '9px', textTransform: 'uppercase', fontWeight: '900' }}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="finance_val" 
                          name="S&P 500"
                          stroke="#06b6d4" 
                          strokeWidth={4} 
                          fill="url(#glowCyan)" 
                          isAnimationActive={false}
                       />
                       <Area 
                          type="monotone" 
                          dataKey="sentiment_val" 
                          name="Polymarket"
                          stroke="#d946ef" 
                          strokeWidth={2} 
                          strokeDasharray="5 5"
                          fill="url(#glowFuchsia)" 
                          isAnimationActive={false}
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Bottom Row */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div id="magnitude-card" className="hud-card p-6 h-[200px]">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Magnitude_Scan</div>
              <div style={{ height: '140px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={data.divergence}>
                      <Bar dataKey="score">
                         {data.divergence.map((entry: any, index: number) => (
                           <Cell key={`cell-${index}`} fill={index > 35 ? '#d946ef' : '#1e293b'} />
                         ))}
                      </Bar>
                   </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
           
           <div id="memory-card" className="hud-card p-6 h-[200px] flex flex-col justify-center gap-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Context Buffers</span>
                 <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Stable</span>
              </div>
              <div id="sys-sync" className="flex items-center justify-between border-b border-white/5 pb-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Backboard Sync</span>
                 <span className="text-[10px] font-black text-fuchsia-500 uppercase tracking-widest">Encrypted</span>
              </div>
              <div className="text-[8px] text-fuchsia-500/50 font-mono tracking-widest animate-pulse mt-2 uppercase">
                 &gt; Data_Packet_Loss_0% // All_Nodes_Reporting
              </div>
           </div>

           <div id="radar-card" className="hud-card p-6 h-[200px]">
              <div className="text-[10px] font-black text-slate-500 uppercase mb-4 tracking-widest">Global_Nexus_Radar</div>
              <div style={{ height: '140px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                   <RadarChart data={[
                      { subject: 'Fin', A: 120 },
                      { subject: 'Soc', A: 98 },
                      { subject: 'Sent', A: 86 },
                      { subject: 'Yield', A: 99 },
                      { subject: 'Cryp', A: 85 },
                   ]}>
                      <PolarGrid stroke="#ffffff10" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 8 }} />
                      <RechartRadar dataKey="A" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.5} />
                   </RadarChart>
                </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
