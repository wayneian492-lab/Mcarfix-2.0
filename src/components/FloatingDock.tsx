/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar, AlertTriangle, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingDockProps {
  onOpenSos: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function FloatingDock({ onOpenSos, onScrollToSection }: FloatingDockProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Only show the floating dock after scrolling past the hero section to keep the landing clean
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-[90%] max-w-sm md:w-auto"
        >
          {/* Main Pill Wrapper: Row on Mobile, Column on Desktop */}
          <div className="bg-gray-950/90 backdrop-blur-lg border border-white/10 shadow-2xl rounded-full md:rounded-2xl px-6 py-4 md:py-8 md:px-4 flex flex-row md:flex-col items-center justify-around md:justify-center md:space-y-8 gap-2">
            
            {/* 1. Book Action (Amber) */}
            <button
              onClick={() => onScrollToSection("garages")}
              className="group flex flex-col items-center justify-center space-y-1 text-center cursor-pointer focus:outline-none"
              title="Book verified mechanics"
            >
              <div className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 p-2.5 md:p-3.5 rounded-full transition-all duration-300 transform group-hover:scale-115 border border-amber-500/25 group-hover:border-amber-500/50">
                <Calendar className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-[10px] md:text-[11px] font-mono text-gray-400 group-hover:text-amber-500 transition-colors uppercase tracking-wider font-semibold">
                Book
              </span>
            </button>

            {/* Divider for Desktop list separation */}
            <div className="hidden md:block w-8 h-[1px] bg-white/5" />

            {/* 2. SOS Action (Red/Warning) */}
            <button
              onClick={onOpenSos}
              className="group flex flex-col items-center justify-center space-y-1 text-center cursor-pointer focus:outline-none"
              title="Request emergency roadside flatbed towing"
            >
              <div className="bg-red-500/15 hover:bg-red-500/25 text-red-500 p-2.5 md:p-3.5 rounded-full transition-all duration-300 transform group-hover:scale-120 border border-red-500/25 group-hover:border-red-500/50 animate-pulse">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-[10px] md:text-[11px] font-mono text-gray-400 group-hover:text-red-500 transition-colors uppercase tracking-wider font-bold">
                SOS
              </span>
            </button>

            {/* Divider for Desktop list separation */}
            <div className="hidden md:block w-8 h-[1px] bg-white/5" />

            {/* 3. Diagnostics Action (Teal) */}
            <button
              onClick={() => onScrollToSection("diagnostics-info")}
              className="group flex flex-col items-center justify-center space-y-1 text-center cursor-pointer focus:outline-none"
              title="Initiate virtual OBD diagnostics"
            >
              <div className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 p-2.5 md:p-3.5 rounded-full transition-all duration-300 transform group-hover:scale-115 border border-teal-500/25 group-hover:border-teal-500/50">
                <Cpu className="h-5 w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-[10px] md:text-[11px] font-mono text-gray-400 group-hover:text-teal-400 transition-colors uppercase tracking-wider font-semibold">
                Diag
              </span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
