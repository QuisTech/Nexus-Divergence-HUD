'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Layouts/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
  BarChart, Bar
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Clock, Zap, Shield, ArrowUpRight, ArrowDownRight, 
  Settings, Maximize2, Layers, Crosshair, Activity, List
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data
const priceData = Array.from({ length: 100 }, (_, i) => ({
  time: `${10 + Math.floor(i/10)}:${(i%10)*6}`,
  price: 64200 + Math.sin(i / 10) * 1500 + Math.random() * 500,
  volume: 10 + Math.random() * 20
}));

const orderBook = {
  asks: Array.from({ length: 15 }, (_, i) => ({ price: 65100 + i * 10, amount: (Math.random() * 2).toFixed(4), total: (10 + i * 2).toFixed(2) })),
  bids: Array.from({ length: 15 }, (_, i) => ({ price: 65050 - i * 10, amount: (Math.random() * 2).toFixed(4), total: (10 + i * 2).toFixed(2) }))
};

export default function TradingTerminal() {
  const [activePair, setActivePair] = useState('BTC/USDT');
  const [orderType, setOrderType] = useState('BUY');
  const [leverage, setLeverage] = useState('10x');
  const [amount, setAmount] = useState('1000');
  const [livePrice, setLivePrice] = useState(65074.42);

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePrice(prev => prev + (Math.random() - 0.5) * 10);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-160px)]">
        
        {/* Left: Markets Sidebar */}
        <div className="col-span-2 flex flex-col gap-4">
           <div className="hud-card p-4 flex-1 overflow-hidden flex flex-col">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <List size={14} className="text-cyan-400" /> Markets
              </div>
              <div className="space-y-1 overflow-y-auto custom-scrollbar pr-2">
                 {['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'LINK/USDT', 'ADA/USDT'].map((pair, idx) => (
                   <button 
                     key={pair}
                     onClick={() => setActivePair(pair)}
                     className={cn(
                       "w-full flex items-center justify-between px-3 py-3 rounded-sm transition-all text-xs font-bold tracking-tight",
                       activePair === pair ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5"
                     )}
                   >
                     <span>{pair}</span>
                     <span className={idx % 2 === 0 ? "text-emerald-500" : "text-rose-500"}>{Math.random() > 0.5 ? "+" : "-"}{(Math.random() * 5).toFixed(2)}%</span>
                   </button>
                 ))}
              </div>
           </div>
           
           <div className="hud-card p-4 h-48">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Network Status</div>
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase">Liquidity</span>
                    <span className="text-[10px] text-cyan-400 font-black uppercase">High</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase">Volatility</span>
                    <span className="text-[10px] text-fuchsia-500 font-black uppercase">Elevated</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mt-4">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-600"
                      initial={{ width: '0%' }}
                      animate={{ width: '74%' }}
                    />
                 </div>
              </div>
           </div>
        </div>

        {/* Center: Main Chart Area */}
        <div className="col-span-7 flex flex-col gap-6">
           <div className="hud-card flex-1 p-6 relative flex flex-col overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-6">
                    <div>
                       <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{activePair} / Nexus Core</div>
                       <div className="text-3xl font-black digital-font text-white flex items-baseline gap-3">
                          ${livePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          <span className="text-xs text-emerald-500">+2.42%</span>
                       </div>
                    </div>
                    <div className="h-10 w-[1px] bg-white/5"></div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                       <div className="text-[9px] text-slate-500 uppercase font-bold">24h High</div>
                       <div className="text-[9px] text-white font-black uppercase">$66,240.00</div>
                       <div className="text-[9px] text-slate-500 uppercase font-bold">24h Low</div>
                       <div className="text-[9px] text-white font-black uppercase">$63,120.50</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-sm border border-white/5">
                    {['1M', '5M', '15M', '1H', '4H', '1D'].map(t => (
                      <button key={t} className={cn("px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all", t === '15M' ? "bg-cyan-500 text-slate-950" : "text-slate-500 hover:text-white")}>{t}</button>
                    ))}
                 </div>
              </div>

              {/* Ensure robust height for the main terminal chart */}
              <div className="flex-1 w-full" style={{ height: '350px', position: 'relative' }}>
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData}>
                       <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                             <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                       <XAxis dataKey="time" hide />
                       <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                       <Tooltip 
                         contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(6,182,212,0.2)', color: '#fff' }}
                         itemStyle={{ color: '#06b6d4' }}
                       />
                       <Area type="monotone" dataKey="price" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" isAnimationActive={false} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>

              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-cyan-500/10 pointer-events-none"></div>
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/10 pointer-events-none"></div>
           </div>

           <div className="h-48 grid grid-cols-2 gap-6">
              <div className="hud-card p-4">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Divergence Heatmap</div>
                 <div className="h-24 w-full flex items-end gap-1">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-[1px]" 
                        style={{ 
                          height: `${20 + Math.random() * 80}%`, 
                          backgroundColor: i > 30 ? '#d946ef' : i > 20 ? '#06b6d4' : '#1e293b' 
                        }}
                      ></div>
                    ))}
                 </div>
              </div>
              <div className="hud-card p-4">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                    <span>Active Positions</span>
                    <span className="text-cyan-400">1 Open</span>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-sm">
                    <div>
                       <div className="text-[10px] font-black text-white uppercase">BTC/USDT LONG</div>
                       <div className="text-[9px] text-slate-500 uppercase">10x Leverage</div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs font-black text-emerald-500">+$142.20</div>
                       <div className="text-[9px] text-emerald-500/70 uppercase">+14.2%</div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Order Book & Trade Panel */}
        <div className="col-span-3 flex flex-col gap-6">
           {/* Order Book */}
           <div className="hud-card flex-1 p-4 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                 <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Order Book</div>
                 <div className="flex gap-1">
                    <div className="h-3 w-3 bg-emerald-500/20 border border-emerald-500/50"></div>
                    <div className="h-3 w-3 bg-rose-500/20 border border-rose-500/50"></div>
                 </div>
              </div>
              
              <div className="flex-1 overflow-hidden">
                 <div className="grid grid-cols-3 text-[9px] font-black text-slate-600 uppercase tracking-widest mb-2 px-2">
                    <span>Price</span>
                    <span className="text-right">Amount</span>
                    <span className="text-right">Total</span>
                 </div>
                 
                 {/* Asks (Sells) */}
                 <div className="space-y-[1px] mb-2">
                    {orderBook.asks.slice(0, 8).reverse().map((ask, i) => (
                      <div key={i} className="relative group cursor-pointer h-5 flex items-center px-2">
                        <div className="absolute inset-0 bg-rose-500/5 origin-right scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                        <div className="grid grid-cols-3 w-full text-[10px] font-mono z-10">
                           <span className="text-rose-500 font-bold">{ask.price.toFixed(1)}</span>
                           <span className="text-slate-400 text-right">{ask.amount}</span>
                           <span className="text-slate-500 text-right">{ask.total}</span>
                        </div>
                        <div className="absolute right-0 h-full bg-rose-500/10" style={{ width: `${Math.random() * 60}%` }}></div>
                      </div>
                    ))}
                 </div>

                 {/* Spread */}
                 <div className="py-2 border-y border-white/5 bg-slate-900/30 text-center my-2">
                    <div className="text-sm font-black digital-font text-white">${livePrice.toFixed(2)}</div>
                    <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Spread: 0.12 (0.01%)</div>
                 </div>

                 {/* Bids (Buys) */}
                 <div className="space-y-[1px]">
                    {orderBook.bids.slice(0, 8).map((bid, i) => (
                      <div key={i} className="relative group cursor-pointer h-5 flex items-center px-2">
                        <div className="absolute inset-0 bg-emerald-500/5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                        <div className="grid grid-cols-3 w-full text-[10px] font-mono z-10">
                           <span className="text-emerald-500 font-bold">{bid.price.toFixed(1)}</span>
                           <span className="text-slate-400 text-right">{bid.amount}</span>
                           <span className="text-slate-500 text-right">{bid.total}</span>
                        </div>
                        <div className="absolute left-0 h-full bg-emerald-500/10" style={{ width: `${Math.random() * 60}%` }}></div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Execution Panel */}
           <div className="hud-card p-6 bg-slate-950/80">
              <div className="flex gap-2 mb-6 p-1 bg-slate-900/50 rounded-sm border border-white/5">
                 <button 
                  onClick={() => setOrderType('BUY')}
                  className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all", orderType === 'BUY' ? "bg-emerald-500 text-slate-950" : "text-slate-500 hover:text-white")}
                 >Long</button>
                 <button 
                  onClick={() => setOrderType('SELL')}
                  className={cn("flex-1 py-2 text-[10px] font-black uppercase tracking-widest transition-all", orderType === 'SELL' ? "bg-rose-500 text-slate-950" : "text-slate-500 hover:text-white")}
                 >Short</button>
              </div>

              <div className="space-y-4">
                 <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Investment (USDT)</label>
                    <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 rounded-sm px-4 py-3 text-xs font-mono focus:outline-none focus:border-cyan-500/50 transition-all"
                    />
                 </div>

                 <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Leverage</label>
                    <div className="grid grid-cols-4 gap-2">
                       {['1x', '10x', '50x', '100x'].map(l => (
                         <button 
                          key={l}
                          onClick={() => setLeverage(l)}
                          className={cn("py-2 text-[9px] font-black uppercase tracking-widest border border-white/5 rounded-sm transition-all", leverage === l ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/40" : "text-slate-500 hover:bg-white/5")}
                         >{l}</button>
                       ))}
                    </div>
                 </div>

                 <div className="pt-4 space-y-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-[9px] uppercase font-bold">
                       <span className="text-slate-500">Margin Required</span>
                       <span className="text-white">${(parseInt(amount) / parseInt(leverage)).toFixed(2)} USDT</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] uppercase font-bold">
                       <span className="text-slate-500">Nexus Fee (Zerve)</span>
                       <span className="text-cyan-400">0.00 USDT</span>
                    </div>
                 </div>

                 <button className={cn(
                   "w-full py-4 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] active:scale-95",
                   orderType === 'BUY' ? "bg-emerald-500 text-slate-950 hover:bg-emerald-400" : "bg-rose-500 text-slate-950 hover:bg-rose-400"
                 )}>
                    {orderType === 'BUY' ? 'Open Long Position' : 'Open Short Position'}
                 </button>
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
