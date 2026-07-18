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
          className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-5 md:top-1/2 md:-translate-y-1/2 md:bottom-auto w-[90%] max-w-xs md:w-14 md:hover:w-36 transition-all duration-300 ease-out group/dock overflow-hidden"
        >
          {/* Main Pill Wrapper: Row on Mobile, Column on Desktop */}
          <div className="bg-gray-950/95 backdrop-blur-md border border-white/10 shadow-2xl rounded-full md:rounded-2xl px-5 py-3 md:py-6 md:px-2 flex flex-row md:flex-col items-center justify-around md:justify-center md:space-y-5 gap-1.5">
            
            {/* 1. Book Action (Amber) */}
            <button
              onClick={() => onScrollToSection("garages")}
              className="flex flex-col md:flex-row items-center md:space-x-3.5 space-y-0.5 md:space-y-0 text-center md:text-left cursor-pointer focus:outline-none w-full justify-center md:justify-start md:px-2 group"
              title="Book verified mechanics"
            >
              <div className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 p-2 rounded-full transition-all duration-300 transform group-hover:scale-110 border border-amber-500/25 shrink-0">
                <Calendar className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] md:text-xs font-mono text-gray-400 group-hover:text-amber-500 transition-colors uppercase tracking-wider font-semibold md:opacity-0 md:group-hover/dock:opacity-100 md:max-w-0 md:group-hover/dock:max-w-[100px] overflow-hidden whitespace-nowrap transition-all duration-300">
                Book
              </span>
            </button>

            {/* Divider for Desktop list separation */}
            <div className="hidden md:block w-8 h-[1px] bg-white/5" />

            {/* 2. SOS Action (Red/Warning) */}
            <button
              onClick={onOpenSos}
              className="flex flex-col md:flex-row items-center md:space-x-3.5 space-y-0.5 md:space-y-0 text-center md:text-left cursor-pointer focus:outline-none w-full justify-center md:justify-start md:px-2 group"
              title="Request emergency roadside flatbed towing"
            >
              <div className="bg-red-500/15 hover:bg-red-500/25 text-red-500 p-2 rounded-full transition-all duration-300 transform group-hover:scale-115 border border-red-500/25 group-hover:border-red-500/50 animate-pulse shrink-0">
                <AlertTriangle className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] md:text-xs font-mono text-gray-400 group-hover:text-red-500 transition-colors uppercase tracking-wider font-bold md:opacity-0 md:group-hover/dock:opacity-100 md:max-w-0 md:group-hover/dock:max-w-[100px] overflow-hidden whitespace-nowrap transition-all duration-300">
                SOS
              </span>
            </button>

            {/* Divider for Desktop list separation */}
            <div className="hidden md:block w-8 h-[1px] bg-white/5" />

            {/* 3. Diagnostics Action (Teal) */}
            <button
              onClick={() => onScrollToSection("diagnostics-info")}
              className="flex flex-col md:flex-row items-center md:space-x-3.5 space-y-0.5 md:space-y-0 text-center md:text-left cursor-pointer focus:outline-none w-full justify-center md:justify-start md:px-2 group"
              title="Initiate virtual OBD diagnostics"
            >
              <div className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 p-2 rounded-full transition-all duration-300 transform group-hover:scale-110 border border-teal-500/25 shrink-0">
                <Cpu className="h-4.5 w-4.5" />
              </div>
              <span className="text-[9px] md:text-xs font-mono text-gray-400 group-hover:text-teal-400 transition-colors uppercase tracking-wider font-semibold md:opacity-0 md:group-hover/dock:opacity-100 md:max-w-0 md:group-hover/dock:max-w-[100px] overflow-hidden whitespace-nowrap transition-all duration-300">
                Diag
              </span>
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
