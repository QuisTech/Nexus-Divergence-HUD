'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  ChevronRight,
  Activity,
  Cpu,
  BarChart3
} from 'lucide-react';

const features = [
  {
    title: "Correlation Engine",
    description: "Advanced multi-asset correlation analysis with sub-3ms latency from Zerve infrastructure.",
    icon: Activity,
    color: "cyan"
  },
  {
    title: "Divergence Alerts",
    description: "Identify institutional sentiment shifts 72 hours before price action follows.",
    icon: TrendingUp,
    color: "fuchsia"
  },
  {
    title: "Risk Control",
    description: "Institutional-grade risk management with real-time HUD visualization.",
    icon: ShieldCheck,
    color: "emerald"
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
      <div className="scanline"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center rounded-sm">
              <Zap className="text-cyan-400 size-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter digital-font">
              Nexus<span className="text-cyan-400">Divergence</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Intelligence</a>
            <a href="#tech" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Infrastructure</a>
            <a href="#pricing" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Partners</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" id="nav-login">
              <button className="px-6 py-2 text-xs font-bold uppercase tracking-widest hover:text-cyan-400 transition-colors">Sign In</button>
            </Link>
            <Link href="/dashboard" id="nav-terminal">
              <button className="px-6 py-2 bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-all active:scale-95 flex items-center gap-2">
                Launch Terminal <ChevronRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-cyan-500/20 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <span className="h-2 w-2 bg-cyan-500 rounded-full animate-ping"></span>
                v4.8 Institutional Release
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 uppercase italic digital-font">
                The Edge of <br />
                <span className="text-cyan-400">Divergence</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-12 font-light">
                Institutional-grade sentiment analysis and correlation intelligence. 
                Nexus identifies market pivots before the tape moves, powered by Zerve's hyper-scale computing infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                <Link href="/dashboard" id="hero-cta">
                  <button className="w-full sm:w-auto px-10 py-5 bg-cyan-500 text-slate-950 text-sm font-black uppercase tracking-[0.2em] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95">
                    Establish Connection <ArrowRight size={18} />
                  </button>
                </Link>
                <button className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:bg-white/5 text-sm font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                  Read Technical Docs
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <img 
                src="/nexus_core_hero_1777107322623.png" 
                alt="Nexus Core" 
                className="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-float"
              />
            </div>
            
            {/* Floating Data Tags */}
            <div className="absolute top-1/4 -right-10 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 p-4 rounded-sm z-20 hidden xl:block">
              <div className="text-[10px] text-cyan-400 font-black mb-1 uppercase tracking-widest">Global Sync</div>
              <div className="text-2xl font-black digital-font">99.98%</div>
            </div>
            <div className="absolute bottom-1/4 -left-10 bg-slate-950/80 backdrop-blur-md border border-fuchsia-500/40 p-4 rounded-sm z-20 hidden xl:block">
              <div className="text-[10px] text-fuchsia-400 font-black mb-1 uppercase tracking-widest">Divergence Detected</div>
              <div className="text-2xl font-black digital-font">+14.2%</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 border-t border-white/5 relative bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black text-cyan-400 uppercase tracking-[0.5em] mb-4">Deep Intelligence</h2>
            <div className="text-4xl md:text-6xl font-black tracking-tighter uppercase digital-font">Engineered for the 1%</div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="hud-card p-10 group">
                <div className={`h-14 w-14 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:border-cyan-500/60`}>
                  <feature.icon className={`text-cyan-400 size-7`} />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-light italic">
                  "{feature.description}"
                </p>
                <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                  <span className={`text-[10px] font-black text-cyan-400 uppercase tracking-widest`}>Read Protocol</span>
                  <ArrowRight size={14} className={`text-cyan-400 group-hover:translate-x-2 transition-transform`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Proof */}
      <section className="py-20 border-t border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Assets Tracked", val: "12,000+" },
              { label: "Live Signals", val: "24/7" },
              { label: "Institutional Users", val: "850" },
              { label: "Predictive Accuracy", val: "89.2%" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black digital-font mb-2 text-white">{stat.val}</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center rounded-sm">
              <Zap className="text-cyan-400 size-4" />
            </div>
            <span className="text-xl font-black tracking-tighter digital-font uppercase">
              Nexus<span className="text-cyan-400">Core</span>
            </span>
          </div>
          <div className="flex items-center gap-12">
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Privacy</a>
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">Terms</a>
            <a href="#" className="text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest">API Docs</a>
          </div>
          <div className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
            © 2026 NEXUS ENGINE. SYSTEM SECURED BY QUANTUM_CRYPTO.
          </div>
        </div>
      </footer>

      {/* Floating Demo Trigger (For Hackathon Judges) */}
      <div className="fixed bottom-8 right-8 z-[1000]">
         <button 
           onClick={() => window.dispatchEvent(new CustomEvent('nexus-demo-start'))}
           className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black text-[10px] uppercase tracking-[0.2em] px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(217,70,239,0.5)] border border-fuchsia-400/50 transition-all active:scale-95 flex items-center gap-3 group"
         >
           <Zap className="size-4 animate-pulse" /> 
           Start Platform Walkthrough
           <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-white text-fuchsia-600 text-[8px] font-black rounded-full">New</div>
         </button>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
