/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calendar, Cpu, Wrench, X, Truck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FloatingDockProps {
  onOpenSos: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function FloatingDock({ onOpenSos, onScrollToSection }: FloatingDockProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    // Only show the floating dock after scrolling past the hero section to keep the landing clean
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false); // Auto collapse when hiding
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed z-50 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-5 md:top-1/2 md:-translate-y-1/2 md:bottom-auto select-none"
        >
          {!isExpanded ? (
            /* Collapsed State: Sleek circular floating action trigger */
            <motion.button
              layoutId="dock-container"
              onClick={() => setIsExpanded(true)}
              className="w-14 h-14 bg-gray-950/95 backdrop-blur-md border border-white/15 shadow-2xl rounded-full flex flex-col items-center justify-center text-signal hover:text-white hover:border-signal/50 hover:bg-black transition-all duration-300 cursor-pointer focus:outline-none relative group"
              title="Expand mCarFix Quick Tools"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing background ring */}
              <span className="absolute inset-0 rounded-full bg-signal/10 animate-ping pointer-events-none" />
              <Wrench className="h-5.5 w-5.5 animate-pulse" />
              <span className="absolute -bottom-1 bg-signal text-asphalt font-mono font-bold text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded-full scale-75 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Tools
              </span>
            </motion.button>
          ) : (
            /* Expanded State: Highly polished centered control window */
            <motion.div
              layoutId="dock-container"
              className="bg-gray-950/95 backdrop-blur-md border border-white/15 shadow-2xl rounded-2xl p-4 w-72 md:w-20 transition-all duration-300 flex flex-col items-stretch"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                  Quick Panel
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
                  title="Minimize Panel"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Centered Buttons Container */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-6 md:gap-5 py-1">
                {/* 1. Book Action */}
                <button
                  onClick={() => {
                    onScrollToSection("garages");
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
                  title="Book verified mechanics"
                >
                  <div className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-110 border border-amber-500/20 group-hover:border-amber-500/40 shrink-0">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 group-hover:text-amber-500 transition-colors uppercase tracking-wider font-semibold mt-1.5">
                    Book
                  </span>
                </button>

                {/* Vertical/Horizontal Dividers */}
                <div className="w-[1px] h-8 bg-white/10 md:hidden" />
                <div className="hidden md:block w-8 h-[1px] bg-white/10" />

                {/* 2. Help Action */}
                <button
                  onClick={() => {
                    onOpenSos();
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
                  title="Request quick roadside flatbed towing or mechanics"
                >
                  <div className="bg-signal/10 hover:bg-signal/20 text-signal p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-115 border border-signal/20 group-hover:border-signal/50 shrink-0">
                    <Truck className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 group-hover:text-signal transition-colors uppercase tracking-wider font-bold mt-1.5">
                    Help
                  </span>
                </button>

                {/* Vertical/Horizontal Dividers */}
                <div className="w-[1px] h-8 bg-white/10 md:hidden" />
                <div className="hidden md:block w-8 h-[1px] bg-white/10" />

                {/* 3. Diagnostics Action */}
                <button
                  onClick={() => {
                    onScrollToSection("diagnostics-info");
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
                  title="Initiate virtual OBD diagnostics"
                >
                  <div className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 p-2.5 rounded-full transition-all duration-300 transform group-hover:scale-110 border border-teal-500/20 group-hover:border-teal-500/40 shrink-0">
                    <Cpu className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[9px] font-mono text-gray-400 group-hover:text-teal-400 transition-colors uppercase tracking-wider font-semibold mt-1.5">
                    Diag
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
