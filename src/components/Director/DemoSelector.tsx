import React from 'react';
import { motion } from 'framer-motion';
import { Radar as LucideRadar } from 'lucide-react';

interface DemoSelectorProps {
  onSelect: (mode: 'AI' | 'LIVE') => void;
  openTeleprompter: () => boolean;
}

export const DemoSelector: React.FC<DemoSelectorProps> = ({ onSelect, openTeleprompter }) => {
  return (
    <div className="fixed inset-0 z-[20000] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-8 pointer-events-auto">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-black text-white digital-font mb-4 italic tracking-tighter uppercase glow-text-cyan">Select Demo Strategy</h2>
          <p className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase">Choose your engagement protocol for this session</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            onClick={() => onSelect('AI')} 
            className="hud-card p-10 text-left group hover:border-cyan-500/50 transition-all bg-slate-900/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all">
              <LucideRadar size={64} className="text-cyan-500" />
            </div>
            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter group-hover:text-cyan-400 transition-all">AI Autopilot</h3>
            <p className="text-[12px] text-slate-400 uppercase font-bold tracking-widest leading-relaxed">
              Subtitles + AI Voice Narration
            </p>
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-cyan-500 opacity-0 group-hover:opacity-100 transition-all">
              <span>INITIATE_AUTO_PROTOCOL</span>
              <div className="h-px flex-1 bg-cyan-500/30"></div>
            </div>
          </button>

          <button 
            onClick={() => { if(openTeleprompter()) onSelect('LIVE'); }} 
            className="hud-card p-10 text-left group hover:border-fuchsia-500/50 transition-all bg-slate-900/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-all">
              <LucideRadar size={64} className="text-fuchsia-500" />
            </div>
            <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter group-hover:text-fuchsia-400 transition-all">Live Presenter</h3>
            <p className="text-[12px] text-slate-400 uppercase font-bold tracking-widest leading-relaxed">
              Teleprompter only (Voice disabled)
            </p>
            <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-all">
              <span>ACTIVATE_PROMPTER_SYNC</span>
              <div className="h-px flex-1 bg-fuchsia-500/30"></div>
            </div>
          </button>
        </div>

        <div className="mt-16 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
          Secure Environment // Institutional Clearance Level 4
        </div>
      </div>
    </div>
  );
};
