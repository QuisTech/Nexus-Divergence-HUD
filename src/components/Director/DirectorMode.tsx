'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PluginConsole, PluginConsoleRef } from './PluginConsole';
import { useRouter } from 'next/navigation';
import { Radar as LucideRadar } from 'lucide-react';

// CONFIGURATION: Adjusted for more deliberate, professional pacing
const LIVE_NARRATION_TIME = 9000;  // 9 seconds per statement
const TRANSITION_DELAY = 1800;     // 1.8s delay after navigation
const CURSOR_DURATION = 1.5;       // Slower cursor movement (seconds)

export type ScriptStep =
  | { type: 'cursor'; targetId?: string; x?: number | string; y?: number | string; delay?: number }
  | { type: 'click'; targetId?: string; delay?: number }
  | { type: 'subtitle'; text: string; delay?: number }
  | { type: 'log'; text: string; delay?: number }
  | { type: 'event'; eventType: string; message: string; delay?: number }
  | { type: 'scroll'; targetId?: string; y: number; delay?: number }
  | { type: 'navigate'; url: string; delay?: number }
  | { type: 'wait'; delay: number };

const SCRIPT: ScriptStep[] = [
    { type: 'log', text: '[System] Nexus Protocol Initiated', delay: 100 },
    { type: 'cursor', x: '50%', y: '50%', delay: 500 },
    { type: 'subtitle', text: 'Welcome to the Nexus Engine. Our mission is to solve the Divergence Dilemma.' },
    { type: 'subtitle', text: 'In today\'s competitive hackathon landscape, a single page isn\'t enough. We built a full production-ready ecosystem.' },
    
    { type: 'scroll', targetId: 'window', y: 800, delay: 1000 },
    { type: 'subtitle', text: 'From powerful landing visuals that demonstrate institutional authority and engineering excellence...' },
    
    { type: 'scroll', targetId: 'window', y: 0, delay: 1000 },
    { type: 'cursor', targetId: 'nav-login', delay: 1200 },
    { type: 'subtitle', text: 'To secure, encrypted authentication flows designed for enterprise-grade institutional security.' },
    
    { type: 'click', targetId: 'nav-login', delay: 400 },
    { type: 'navigate', url: '/auth/login', delay: 1000 },
    { type: 'subtitle', text: 'Our auth gateway utilizes RSA-4096 encryption and multi-node handshakes for total data integrity.' },
    
    { type: 'log', text: '[Security] TLS 1.3 Handshake established', delay: 300 },
    { type: 'cursor', targetId: 'login-btn', delay: 1200 },
    { type: 'subtitle', text: 'Once provisioned, the user is granted access to the core Analytical Hub.' },
    
    { type: 'click', targetId: 'login-btn', delay: 400 },
    { type: 'navigate', url: '/dashboard', delay: 1000 },
    { type: 'subtitle', text: 'The Institutional Risk Desk. Here, we correlate real-time data from Zerve-hosted divergence models.' },
    
    { type: 'log', text: '[Ingestion] Syncing SPY (Alpha Vantage) & Polymarket Data', delay: 300 },
    { type: 'cursor', targetId: 'main-chart-card', delay: 1500 },
    { type: 'subtitle', text: 'Notice the dual-axis convergence chart. We track the S and P 500 index against Polymarket prediction market odds.' },
    
    { type: 'cursor', targetId: 'divergence-card', delay: 1500 },
    { type: 'subtitle', text: 'When sentiment leads price action, Nexus flags a Divergence Alert. This is where high-alpha opportunities are born.' },
    
    { type: 'cursor', targetId: 'nav-trading', delay: 1200 },
    { type: 'subtitle', text: 'For immediate execution, we provided an industry-standard, high-fidelity Trading Terminal.' },
    
    { type: 'click', targetId: 'nav-trading', delay: 400 },
    { type: 'navigate', url: '/dashboard/trading', delay: 1000 },
    { type: 'subtitle', text: 'Equipped with real-time order books, depth charts, and institutional position management panels.' },
    
    { type: 'cursor', targetId: 'nav-settings', delay: 1200 },
    { type: 'subtitle', text: 'Finally, the platform includes full Role-Based Access Control and secure System Audit logging.' },
    
    { type: 'click', targetId: 'nav-settings', delay: 400 },
    { type: 'navigate', url: '/dashboard/settings', delay: 1000 },
    { type: 'subtitle', text: 'Identity management, neural telemetry sync, and encrypted audit trails for full compliance.' },
    
    { type: 'subtitle', text: 'Nexus Engine. Not just a dashboard, but a complete institutional product. Engineered for Victory.' },
    { type: 'cursor', x: '95%', y: '5%', delay: 2000 },
];

export function DirectorMode({ 
  onClose, 
  recorderStream, 
  onStartRecording 
}: { 
  onClose: () => void, 
  recorderStream: MediaStream | null,
  onStartRecording: () => Promise<void>
}) {
    const [subtitle, setSubtitle] = useState('');
    const [demoMode, setDemoMode] = useState<'CHOOSING' | 'AI' | 'LIVE'>('CHOOSING');
    const [isUiVisible, setIsUiVisible] = useState(true);
    const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
    const [isClicking, setIsClicking] = useState(false);
    const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
   
    const consoleRef = useRef<PluginConsoleRef>(null);
    const router = useRouter();
    const prompterWindow = useRef<Window | null>(null);
    const scriptActive = useRef(false);
    const isSpeakingRef = useRef(false);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => setWebcamStream(stream))
            .catch(() => console.warn('Webcam not available'));
            
        return () => {
            webcamStream?.getTracks().forEach(t => t.stop());
            if (prompterWindow.current) prompterWindow.current.close();
        };
    }, []);

    const openTeleprompter = () => {
        const w = window.open('', 'NexusTeleprompter', 'width=650,height=350,top=50,left=50');
        if (w) {
            w.document.body.style.background = '#020617';
            w.document.body.style.color = '#06b6d4';
            w.document.body.style.padding = '35px';
            w.document.body.style.fontFamily = 'monospace';
            w.document.body.style.fontSize = '20px';
            w.document.body.style.lineHeight = '1.6';
            w.document.title = 'NEXUS_PROMPTER';
            prompterWindow.current = w;
            return true;
        }
        return false;
    };

    useEffect(() => {
        if (prompterWindow.current && prompterWindow.current.document) {
            prompterWindow.current.document.body.innerHTML = `
                <div style="border-left: 4px solid #d946ef; padding-left: 25px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
                    <div style="color:#475569; font-size:12px; margin-bottom: 15px; font-weight: bold; letter-spacing: 3px;">[LIVE_TELEPROMPTER_SYNC]</div>
                    <div style="color: white; font-weight: bold; font-family: sans-serif;">${subtitle || 'Waiting for script start...'}</div>
                    <div style="margin-top: 20px; height: 2px; background: #ffffff05; width: 100%;">
                         <div id="progress" style="height: 100%; background: #06b6d4; width: 0%; transition: width ${LIVE_NARRATION_TIME}ms linear;"></div>
                    </div>
                </div>
            `;
            setTimeout(() => {
                const prog = prompterWindow.current?.document.getElementById('progress');
                if (prog) prog.style.width = '100%';
            }, 100);
        }
    }, [subtitle]);

    const speak = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            if (!('speechSynthesis' in window) || isSpeakingRef.current) { resolve(); return; }
            window.speechSynthesis.cancel();
            isSpeakingRef.current = true;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95;
            const voices = window.speechSynthesis.getVoices();
            const voice = voices.find(v => v.name.includes('Google') && v.lang === 'en-US') || voices[0];
            if (voice) utterance.voice = voice;
            utterance.onend = () => { isSpeakingRef.current = false; resolve(); };
            utterance.onerror = () => { isSpeakingRef.current = false; resolve(); };
            window.speechSynthesis.speak(utterance);
        });
    };

    const runScript = async (mode: 'AI' | 'LIVE') => {
        if (scriptActive.current) return;
        scriptActive.current = true;
        setDemoMode(mode);
        if (mode === 'LIVE') setIsUiVisible(false);
        if (!recorderStream) { await onStartRecording(); await new Promise(r => setTimeout(r, 2000)); }

        for (let i = 0; i < SCRIPT.length; i++) {
            const step = SCRIPT[i];
            if (step.type === 'navigate') {
                setSubtitle("");
                router.push(step.url);
                await new Promise(r => {
                    const check = setInterval(() => {
                        if (window.location.pathname === step.url) {
                            clearInterval(check);
                            setTimeout(r, TRANSITION_DELAY); // Increased wait after navigation
                        }
                    }, 100);
                });
                continue;
            }

            if (step.type === 'subtitle') {
                setSubtitle(step.text);
                if (mode === 'AI') { await speak(step.text); } 
                else { await new Promise(r => setTimeout(r, LIVE_NARRATION_TIME)); }
                await new Promise(r => setTimeout(r, 1200));
            }
            else if (step.type === 'log') { consoleRef.current?.log(step.text, 'info'); }
           
            let nextPos = null;
            if ('targetId' in step && step.targetId) {
                const el = document.getElementById(step.targetId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    nextPos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
                }
            }
            else if (step.type === 'cursor' && step.x !== undefined && step.y !== undefined) {
                nextPos = {
                    x: typeof step.x === 'string' ? (parseFloat(step.x) / 100) * window.innerWidth : step.x,
                    y: typeof step.y === 'string' ? (parseFloat(step.y) / 100) * window.innerHeight : step.y
                };
            }
            if (nextPos) setCursorPos(nextPos);

            if (step.type === 'click') {
                setIsClicking(true);
                await new Promise(r => setTimeout(r, 400));
                if (step.targetId) {
                    const el = document.getElementById(step.targetId);
                    if (el) el.click();
                }
                await new Promise(r => setTimeout(r, 600));
                setIsClicking(false);
            }
            if (step.type === 'scroll') {
                const scrollTarget = step.targetId === 'window' ? window : document.getElementById(step.targetId!);
                scrollTarget?.scrollTo({ top: step.y, behavior: 'smooth' });
            }
            if (step.type !== 'subtitle' && step.delay) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        setSubtitle("Institutional Demo Complete.");
        await new Promise(r => setTimeout(r, 3000));
        onClose();
    };

    if (demoMode === 'CHOOSING') {
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
                            onClick={() => { runScript('AI'); }} 
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
                            onClick={() => { if(openTeleprompter()) runScript('LIVE'); }} 
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
    }

    return (
        <div className="director-overlay" onMouseEnter={() => setIsUiVisible(true)} onMouseLeave={() => demoMode === 'LIVE' && setIsUiVisible(false)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ willChange: 'transform' }} className="fixed bottom-8 right-8 w-40 h-40 rounded-full border-4 border-cyan-500 overflow-hidden z-[10005] shadow-[0_0_50px_rgba(6,182,212,0.4)] bg-slate-900">
                {webcamStream && <video autoPlay muted ref={v => { if(v) v.srcObject = webcamStream; }} style={{ transform: 'scaleX(-1) translateZ(0)' }} className="w-full h-full object-cover" />}
            </motion.div>

            <motion.div className="virtual-mouse" animate={{ x: cursorPos.x, y: cursorPos.y }} transition={{ duration: CURSOR_DURATION, ease: "easeInOut" }}>
                <div className={`cursor-pointer ${isClicking ? 'cursor-clicking' : ''}`}></div>
            </motion.div>

            <AnimatePresence mode="wait">
                {subtitle && demoMode === 'AI' && (
                    <motion.div key={subtitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="demo-subtitle">
                        {subtitle}
                    </motion.div>
                )}
            </AnimatePresence>

            <PluginConsole ref={consoleRef} />
        </div>
    );
}
