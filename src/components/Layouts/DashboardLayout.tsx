'use client';

import React from 'react';
import { Sidebar } from '../Navigation/Sidebar';
import { Navbar } from '../Navigation/Navbar';
import { motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#020617] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="scanline"></div>
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
