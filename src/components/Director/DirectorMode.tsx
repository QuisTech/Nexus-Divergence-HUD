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

import { SCRIPT, ScriptStep } from './script';
import { DemoSelector } from './DemoSelector';

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
        return () => {
            webcamStream?.getTracks().forEach(t => t.stop());
            if (prompterWindow.current) prompterWindow.current.close();
        };
    }, [webcamStream]);

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
        if (mode === 'LIVE') {
            setIsUiVisible(false);
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => setWebcamStream(stream))
                .catch(() => console.warn('Webcam not available'));
        }
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
        return <DemoSelector onSelect={runScript} openTeleprompter={openTeleprompter} />;
    }

    return (
        <div className="director-overlay" onMouseEnter={() => setIsUiVisible(true)} onMouseLeave={() => demoMode === 'LIVE' && setIsUiVisible(false)}>
            {demoMode === 'LIVE' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ willChange: 'transform' }} className="fixed bottom-8 right-8 w-40 h-40 rounded-full border-4 border-cyan-500 overflow-hidden z-[10005] shadow-[0_0_50px_rgba(6,182,212,0.4)] bg-slate-900">
                    {webcamStream && <video autoPlay muted ref={v => { if(v) v.srcObject = webcamStream; }} style={{ transform: 'scaleX(-1) translateZ(0)' }} className="w-full h-full object-cover" />}
                </motion.div>
            )}

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
