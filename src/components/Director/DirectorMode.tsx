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
    { type: 'cursor', x: '50%', y: '50%', delay: 500 },
    { type: 'subtitle', text: 'NEXUS ENGINE. AI-Native Analytical Command Center for ZerveHack 2026.' },
    { type: 'log', text: '[System] Nexus v4.8.2 initialized', delay: 300 },
    { type: 'log', text: '[System] Memory Core: STABLE', delay: 300 },
    { type: 'subtitle', text: 'Scenario: Identifying high-alpha market anomalies in real-time.' },

    // --- 0:20 - 0:40: THE PROBLEM ---
    { type: 'subtitle', text: 'The Problem. The Divergence Dilemma. The lag between crowd sentiment and institutional execution.' },
    { type: 'cursor', targetId: 'hud-header', delay: 1500 },
    { type: 'log', text: '[System] Scanning global domain vectors...', delay: 300 },

    // --- 0:40 - 1:20: TECHNICAL WORKFLOW ---
    { type: 'subtitle', text: 'Step 1. Ingesting Polymarket data versus the S and P 500 Index.' },
    { type: 'cursor', targetId: 'sys-status', delay: 1500 },
    { type: 'log', text: '[Ingestion] Inbound ticket: SPY (Alpha Vantage)', delay: 300 },
    { type: 'log', text: '[Ingestion] Inbound sentiment: Polymarket Gamma API', delay: 300 },
    
    { type: 'subtitle', text: 'Step 2. Real-time vector correlation via our Zerve-hosted Python engine.' },
    { type: 'cursor', targetId: 'sys-sync', delay: 1500 },
    { type: 'log', text: '[Engine] Running Lead Lag Sweep, 30-day window...', delay: 300 },
    { type: 'log', text: '[Engine] Multi-axis correlation score calculated: 0.824 FIXED', delay: 300 },

    { type: 'subtitle', text: 'Step 3. Stateful memory tracking using Backboard dot io.' },
    { type: 'cursor', targetId: 'memory-card', delay: 1500 },
    { type: 'log', text: '[Memory] Storing vector state in Backboard ledger...', delay: 300 },
    { type: 'log', text: '[Memory] Pattern recognized: Sentiment leads by 72 hours.', delay: 300 },

    // --- 1:20 - 2:00: THE DASHBOARD ---
    { type: 'subtitle', text: 'Step 4. Visualizing the Divergence HUD.' },
    { type: 'cursor', targetId: 'intensity-card', delay: 1500 },
    { type: 'subtitle', text: 'Live Intensity monitors the absolute strength of the sentiment price bond.' },
    
    { type: 'cursor', targetId: 'yield-chart', delay: 1500 },
    { type: 'subtitle', text: 'Primary Yield Convergence shows the exact point where sentiment and price decouple.' },
    { type: 'log', text: '[Visual] Rendering Primary_Yield_Convergence...', delay: 300 },

    // --- 2:00 - 2:40: CASE STUDY ---
    { type: 'subtitle', text: 'Step 5. The Pivot Proof. A Quantified Case Study.' },
    { type: 'cursor', targetId: 'divergence-card', delay: 1500 },
    { type: 'subtitle', text: 'In December 2023, Nexus flagged a 14 percent sentiment surge, 3 days before the Fed Pivot moved yields.' },
    { type: 'log', text: '[Alpha] Divergence Level 04 Verified (Dec 23 Event)', delay: 300 },

    { type: 'cursor', targetId: 'global-map', delay: 1500 },
    { type: 'subtitle', text: 'Global Correlation Map ensures our alpha is stable across all underlying macro factors.' },

    // --- 2:40 - 3:00: CONCLUSION ---
    { type: 'subtitle', text: 'Deployed on Zerve as a production-grade API plus a High-Fidelity HUD.' },
    { type: 'log', text: '[Status] Service live: nexus-engine-api.hub.zerve.cloud', delay: 300 },
    { type: 'subtitle', text: 'Nexus Engine. Victory through Visual Authority. Built for ZerveHack 2026.' },
    { type: 'cursor', x: '95%', y: '5%', delay: 1500 },
];

export function DirectorMode({ onClose }: { onClose: () => void }) {
    const [subtitle, setSubtitle] = useState('');
    const [cursorPos, setCursorPos] = useState({ x: 100, y: 100 });
    const [isClicking, setIsClicking] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
   
    const consoleRef = useRef<PluginConsoleRef>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const getBestVoice = (): SpeechSynthesisVoice | null => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) return null;

        // Priority 1: Google US English Female
        const googleFemale = voices.find(v => v.name.includes('Google') && v.name.includes('US English') && v.name.includes('Female'));
        if (googleFemale) return googleFemale;
        
        // Priority 2: Any Google US English
        const googleAny = voices.find(v => v.name.includes('Google') && v.name.includes('US English'));
        if (googleAny) return googleAny;

        // Priority 3: Microsoft Natural / Online (Edge)
        const msNatural = voices.find(v => v.name.includes('Natural') || v.name.includes('Online'));
        if (msNatural) return msNatural;

        // Priority 4: Premium female system voices
        const femaleVoice = voices.find(v => 
            v.name.includes('Zira') || v.name.includes('Samantha') || 
            v.name.includes('Aria') || v.name.includes('Female')
        );
        if (femaleVoice) return femaleVoice;

        return voices[0];
    };

    /** Speaks text and WAITS until the voice finishes before resolving */
    const speakAndWait = (text: string): Promise<void> => {
        return new Promise((resolve) => {
            if (!('speechSynthesis' in window)) {
                resolve();
                return;
            }
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.92;
            utterance.pitch = 1.0;

            const bestVoice = getBestVoice();
            if (bestVoice) {
                utterance.voice = bestVoice;
            }

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();

            window.speechSynthesis.speak(utterance);
        });
    };

    /** Start screen recording via browser MediaRecorder */
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { displaySurface: 'browser' } as any,
                audio: true,
            });
            chunksRef.current = [];
            const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `nexus_demo_${Date.now()}.webm`;
                a.click();
                URL.revokeObjectURL(url);
                stream.getTracks().forEach(t => t.stop());
            };
            recorder.start();
            mediaRecorderRef.current = recorder;
            setIsRecording(true);
        } catch {
            // User cancelled the share dialog — continue without recording
            console.warn('Screen recording was not started (user cancelled or not supported).');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const runScript = async () => {
        // Pre-load voices (Chrome needs a moment)
        window.speechSynthesis?.getVoices();
        await new Promise(r => setTimeout(r, 500));

        // Start screen recording
        await startRecording();

        // Countdown
        for (let i = 5; i > 0; i--) {
            setSubtitle(`Initializing Director Mode in ${i}...`);
            await new Promise(r => setTimeout(r, 1000));
        }
        setSubtitle("");
        await new Promise(r => setTimeout(r, 500));

        for (const step of SCRIPT) {
            if (step.type === 'subtitle') {
                setSubtitle(step.text);
                // WAIT for TTS to finish speaking before advancing
                await speakAndWait(step.text);
                // Small breathing pause between sentences
                await new Promise(r => setTimeout(r, 600));
            }
            else if (step.type === 'log') {
                consoleRef.current?.log(step.text, 'info');
            }
           
            // Handle cursor movement
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

            // Handle click
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
           
            // Handle scroll  
            if (step.type === 'scroll') {
                if (step.targetId === 'window') {
                    window.scrollTo({ top: step.y, behavior: 'smooth' });
                } else if (step.targetId) {
                    const el = document.getElementById(step.targetId);
                    if (el) el.scrollTo({ top: step.y, behavior: 'smooth' });
                }
            }
           
            // Non-subtitle delays (cursor movement, log pauses, etc.)
            if (step.type !== 'subtitle' && step.delay) {
                await new Promise(r => setTimeout(r, step.delay));
            }
        }
       
        setSubtitle("Analysis Demo Complete.");
        await new Promise(r => setTimeout(r, 3000));

        // Auto-stop recording and trigger download
        stopRecording();
        setTimeout(onClose, 1000);
    };

    useEffect(() => {
        runScript();
        return () => {
            window.speechSynthesis?.cancel();
            stopRecording();
        };
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
                        key={subtitle}
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

            {/* Recording indicator */}
            {isRecording && (
                <div style={{
                    position: 'absolute', top: 30, left: 30,
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(0,0,0,0.6)', padding: '8px 16px',
                    borderRadius: 4, border: '1px solid rgba(255,0,0,0.4)',
                    fontSize: 12, color: '#f87171', fontFamily: 'monospace',
                    pointerEvents: 'none', zIndex: 10002,
                }}>
                    <div style={{ width: 8, height: 8, background: '#ef4444', borderRadius: '50%', animation: 'pulse 1s infinite' }}></div>
                    REC
                </div>
            )}

            <button className="stop-btn" onClick={() => { stopRecording(); onClose(); }}>
                <div style={{width: 10, height: 10, background: 'red', borderRadius: '50%'}}></div>
            </button>
        </div>
    );
}
