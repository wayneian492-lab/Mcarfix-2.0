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
          className="fixed z-30 bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-5 md:top-1/2 md:-translate-y-1/2 md:bottom-auto select-none"
        >
          {!isExpanded ? (
            /* Collapsed State: Highly visible premium pill-shaped Quick Tools trigger */
            <motion.button
              layoutId="dock-container"
              onClick={() => setIsExpanded(true)}
              className="px-5 py-3 bg-gray-950/95 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full flex items-center justify-center space-x-2.5 text-signal hover:text-white hover:border-signal/50 hover:bg-black transition-all duration-300 cursor-pointer focus:outline-none relative group"
              title="Expand mCarFix Quick Tools"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Pulsing background glow ring */}
              <span className="absolute inset-0 rounded-full bg-signal/10 animate-pulse pointer-events-none" />
              <Wrench className="h-5 w-5 text-signal group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-display font-extrabold text-xs uppercase tracking-wider text-white">
                Quick Tools
              </span>
            </motion.button>
          ) : (
            /* Expanded State: Highly polished centered control window with premium animation states */
            <motion.div
              layoutId="dock-container"
              className="bg-gray-950/98 backdrop-blur-md border border-white/20 shadow-[0_12px_48px_rgba(0,0,0,0.6)] rounded-2xl p-4 w-72 md:w-24 transition-all duration-300 flex flex-col items-stretch"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Header with a premium close button */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3.5">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-extrabold">
                  Quick Panel
                </span>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/15 hover:border-white/25 transition-all duration-300 cursor-pointer focus:outline-none flex items-center justify-center group/close"
                  title="Close Tools Panel"
                >
                  <X className="h-3.5 w-3.5 transform group-hover/close:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Centered Buttons Container with staggered animations */}
              <div className="flex flex-row md:flex-col items-center justify-center gap-6 md:gap-5.5 py-1">
                {/* 1. Book Action */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onScrollToSection("garages");
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
                  title="Book verified mechanics"
                >
                  <div className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 p-2.5 rounded-full transition-all duration-300 border border-amber-500/20 group-hover:border-amber-500/50 shrink-0 shadow-sm group-hover:shadow-amber-500/10">
                    <Calendar className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-sans text-gray-300 group-hover:text-amber-500 transition-colors uppercase tracking-wider font-bold mt-2">
                    Book
                  </span>
                </motion.button>

                {/* Vertical/Horizontal Dividers */}
                <div className="w-[1px] h-8 bg-white/10 md:hidden" />
                <div className="hidden md:block w-10 h-[1px] bg-white/10 animate-pulse" />

                {/* 2. Help Action */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onOpenSos();
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
                  title="Request quick roadside flatbed towing or mechanics"
                >
                  <div className="bg-signal/15 hover:bg-signal/25 text-signal p-2.5 rounded-full transition-all duration-300 border border-signal/25 group-hover:border-signal/65 shrink-0 shadow-md group-hover:shadow-signal/15">
                    <Truck className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-sans text-gray-300 group-hover:text-signal transition-colors uppercase tracking-wider font-extrabold mt-2">
                    Help
                  </span>
                </motion.button>

                {/* Vertical/Horizontal Dividers */}
                <div className="w-[1px] h-8 bg-white/10 md:hidden" />
                <div className="hidden md:block w-10 h-[1px] bg-white/10 animate-pulse" />

                {/* 3. Diagnostics Action */}
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    onScrollToSection("diagnostics-info");
                    setIsExpanded(false);
                  }}
                  className="flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
                  title="Initiate virtual OBD diagnostics"
                >
                  <div className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 p-2.5 rounded-full transition-all duration-300 border border-teal-500/20 group-hover:border-teal-500/50 shrink-0 shadow-sm group-hover:shadow-teal-400/10">
                    <Cpu className="h-4.5 w-4.5" />
                  </div>
                  <span className="text-[10px] font-sans text-gray-300 group-hover:text-teal-400 transition-colors uppercase tracking-wider font-bold mt-2">
                    Diag
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
