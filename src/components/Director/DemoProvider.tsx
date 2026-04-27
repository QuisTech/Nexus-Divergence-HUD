'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DirectorMode } from '@/components/Director/DirectorMode';

export default function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [recorderStream, setRecorderStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const isStartingRecording = useRef(false);

  useEffect(() => {
    const checkActive = () => {
      const active = localStorage.getItem('nexus_demo_active') === 'true';
      setIsActive(active);
    };
    checkActive();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Secret combo: Shift + D
      if (e.shiftKey && e.key.toUpperCase() === 'D') {
        window.dispatchEvent(new CustomEvent('nexus-demo-start'));
      }
    };

    const handleDemoStart = () => {
      localStorage.setItem('nexus_demo_active', 'true');
      localStorage.setItem('nexus_demo_step', '0');
      setIsActive(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('nexus-demo-start', handleDemoStart);
    
    return () => {
      window.removeEventListener('storage', checkActive);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('nexus-demo-start', handleDemoStart);
    };
  }, []);

  const startRecording = async () => {
    if (recorderStream || isStartingRecording.current) return;
    isStartingRecording.current = true;
    
    try {
      // 1. Capture Screen/Tab (and System Audio)
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' } as any,
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
        },
      });

      // 2. Capture User Microphone (Your Voice)
      let micStream: MediaStream | null = null;
      try {
        micStream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            } 
        });
      } catch (e) {
        console.warn("Microphone access denied. Recording system audio only.", e);
      }

      // 3. MIX Audio Streams (System + Microphone)
      const audioCtx = new AudioContext();
      const destination = audioCtx.createMediaStreamDestination();

      // Add System Audio to Mix
      if (displayStream.getAudioTracks().length > 0) {
        const source = audioCtx.createMediaStreamSource(displayStream);
        source.connect(destination);
      }

      // Add Microphone Audio to Mix
      if (micStream && micStream.getAudioTracks().length > 0) {
        const source = audioCtx.createMediaStreamSource(micStream);
        source.connect(destination);
      }

      // 4. Combine Video from Screen and Mixed Audio
      const combinedStream = new MediaStream([
        ...displayStream.getVideoTracks(),
        ...destination.stream.getAudioTracks()
      ]);
      
      chunksRef.current = [];
      const recorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm; codecs=vp9' });
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nexus_presentation_${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        
        displayStream.getTracks().forEach(t => t.stop());
        micStream?.getTracks().forEach(t => t.stop());
        audioCtx.close();
        setRecorderStream(null);
      };
      
      recorder.start();
      mediaRecorderRef.current = recorder;
      setRecorderStream(combinedStream);
    } catch (err) {
      console.warn('Recording failed:', err);
    } finally {
      isStartingRecording.current = false;
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecorderStream(null);
  };

  const handleClose = () => {
    stopRecording();
    localStorage.removeItem('nexus_demo_active');
    setIsActive(false);
  };

  return (
    <>
      {children}
      {isActive && (
        <DirectorMode 
          onClose={handleClose} 
          recorderStream={recorderStream}
          onStartRecording={startRecording}
        />
      )}
    </>
  );
}
