'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PluginConsole, PluginConsoleRef } from './PluginConsole';

type ScriptStep =
  | { type: 'cursor'; targetId?: string; x?: number | string; y?: number | string; delay?: number }
  | { type: 'click'; targetId?: string; delay?: number }
  | { type: 'subtitle'; text: string; delay?: number }
  | { type: 'log'; text: string; delay?: number }
  | { type: 'event'; eventType: string; message: string; delay?: number }
  | { type: 'scroll'; targetId?: string; y: number; delay?: number }
  | { type: 'wait'; delay: number };

const SCRIPT: ScriptStep[] = [
    // --- 0:00 - 0:20: INTRODUCTION ---
    { type: 'cursor', x: '50%', y: '50%', delay: 1000 },
    { type: 'subtitle', text: 'NEXUS ENGINE: AI-Native Analytical Command Center for ZerveHack 2026.', delay: 4000 },
    { type: 'log', text: '[System] Nexus v4.8.2 initialized' },
    { type: 'log', text: '[System] Memory Core: STABLE' },
    { type: 'subtitle', text: 'Scenario: Identifying high-alpha market anomalies in real-time.', delay: 4000 },

    // --- 0:20 - 0:40: THE PROBLEM ---
    { type: 'subtitle', text: 'The Problem: The "Divergence Dilemma" – the lag between crowd sentiment and institutional execution.', delay: 4000 },
    { type: 'cursor', targetId: 'hud-header', delay: 1500 },
    { type: 'log', text: '[System] Scanning global domain vectors...' },

    // --- 0:40 - 1:20: TECHNICAL WORKFLOW ---
    { type: 'subtitle', text: 'Step 1: Ingesting Polymarket data vs the S&P 500 Index.', delay: 3000 },
    { type: 'cursor', targetId: 'sys-status', delay: 1500 },
    { type: 'log', text: '[Ingestion] Inbound ticket: SPY (Alpha Vantage)' },
    { type: 'log', text: '[Ingestion] Inbound sentiment: Polymarket Gamma API' },
    
    { type: 'subtitle', text: 'Step 2: Real-time vector correlation via our Zerve-hosted Python engine.', delay: 4000 },
    { type: 'cursor', targetId: 'sys-sync', delay: 1500 },
    { type: 'log', text: '[Engine] Running Lead/Lag Sweep (30-day window)...' },
    { type: 'log', text: '[Engine] Multi-axis correlation score calculated: 0.824 FIXED' },

    { type: 'subtitle', text: 'Step 3: Stateful memory tracking using Backboard.io.', delay: 3000 },
    { type: 'cursor', targetId: 'memory-card', delay: 1500 },
    { type: 'log', text: '[Memory] Storing vector state in Backboard ledger...' },
    { type: 'log', text: '[Memory] Pattern recognized: Sentiment leads by 72 hours.' },

    // --- 1:20 - 2:00: THE DASHBOARD ---
    { type: 'subtitle', text: 'Step 4: Visualizing the "Divergence HUD".', delay: 3000 },
    { type: 'cursor', targetId: 'intensity-card', delay: 1500 },
    { type: 'subtitle', text: 'Live Intensity monitors the absolute strength of the sentiment-price bond.', delay: 4000 },
    
    { type: 'cursor', targetId: 'yield-chart', delay: 1500 },
    { type: 'subtitle', text: 'Primary Yield Convergence shows the exact point where sentiment and price decouple.', delay: 5000 },
    { type: 'log', text: '[Visual] Rendering Primary_Yield_Convergence...' },

    // --- 2:00 - 2:40: CASE STUDY ---
    { type: 'subtitle', text: 'Step 5: The "Pivot Proof" – A Quantified Case Study.', delay: 3000 },
    { type: 'cursor', targetId: 'divergence-card', delay: 1500 },
    { type: 'subtitle', text: 'In Dec \'23, Nexus flagged a 14% sentiment surge 3 days before the Fed Pivot moved yields.', delay: 5000 },
    { type: 'log', text: '[Alpha] Divergence Level 04 Verified (Dec \'23 Event)' },

    { type: 'cursor', targetId: 'global-map', delay: 1500 },
    { type: 'subtitle', text: 'Global Correlation Map ensures our alpha is stable across all underlying macro factors.', delay: 5000 },

    // --- 2:40 - 3:00: CONCLUSION ---
    { type: 'subtitle', text: 'Deployed on Zerve as a production-grade API + High-Fidelity HUD.', delay: 4000 },
    { type: 'log', text: '[Status] Service live: nexus-engine-api.hub.zerve.cloud' },
    { type: 'subtitle', text: 'Nexus Engine: Victory through Visual Authority. Built for ZerveHack 2026.', delay: 4000 },
    { type: 'cursor', x: '95%', y: '5%', delay: 1500 },
];

export function DirectorMode({ onClose }: { onClose: () => void }) {
    const [subtitle, setSubtitle] = useState('');
    const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
    const [isClicking, setIsClicking] = useState(false);
   
    const consoleRef = useRef<PluginConsoleRef>(null);

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.95;
            window.speechSynthesis.speak(utterance);
        }
    };

    const runScript = async () => {
        // Countdown
        for (let i = 5; i > 0; i--) {
            setSubtitle(`Initializing Director Mode in ${i}...`);
            await new Promise(r => setTimeout(r, 1000));
        }
        setSubtitle("");

        for (const step of SCRIPT) {
            if (step.type === 'subtitle') {
                setSubtitle(step.text);
                speak(step.text);
            }
            else if (step.type === 'log') {
                consoleRef.current?.log(step.text, 'info');
            }
           
            let nextPos = null;
           
            if ('targetId' in step && step.targetId) {
                const el = document.getElementById(step.targetId);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    nextPos = {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    };
                }
            }
            else if (step.type === 'cursor' && step.x !== undefined && step.y !== undefined) {
                nextPos = {
                    x: typeof step.x === 'string' ? (parseFloat(step.x) / 100) * window.innerWidth : step.x,
                    y: typeof step.y === 'string' ? (parseFloat(step.y) / 100) * window.innerHeight : step.y
                };
            }

            if (nextPos) {
                setCursorPos(nextPos);
            }

            if (step.type === 'click') {
                setIsClicking(true);
                await new Promise(r => setTimeout(r, 200));
                if (step.targetId) {
                    const el = document.getElementById(step.targetId);
                    if (el) el.click();
                }
                await new Promise(r => setTimeout(r, 200));
                setIsClicking(false);
            }
           
            if (step.type === 'scroll') {
                if (step.targetId === 'window') {
                    window.scrollTo({ top: step.y, behavior: 'smooth' });
                } else if (step.targetId) {
                    const el = document.getElementById(step.targetId);
                    if (el) el.scrollTo({ top: step.y, behavior: 'smooth' });
                }
            }
           
            if (step.delay) await new Promise(r => setTimeout(r, step.delay));
        }
       
        setSubtitle("Analysis Demo Complete.");
        setTimeout(onClose, 3000);
    };

    useEffect(() => {
        runScript();
    }, []);

    return (
        <div className="director-overlay">
            <motion.div
                className="virtual-mouse"
                animate={{ x: cursorPos.x, y: cursorPos.y }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <div className={`cursor-pointer ${isClicking ? 'cursor-clicking' : ''}`}></div>
            </motion.div>

            <AnimatePresence>
                {subtitle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="demo-subtitle"
                    >
                        {subtitle}
                    </motion.div>
                )}
            </AnimatePresence>

            <PluginConsole ref={consoleRef} />

            <button className="stop-btn" onClick={onClose}>
                <div style={{width: 10, height: 10, background: 'red', borderRadius: '50%'}}></div>
            </button>
        </div>
    );
}
