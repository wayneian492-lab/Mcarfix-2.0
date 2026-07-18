/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Shield, Cpu, Activity, AlertTriangle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import workshopImage from "../assets/images/car_service_lift_1784380558464.jpg";
import heroBgImage from "../assets/images/hero_garage_bg_1784380746194.jpg";

interface HeroProps {
  onOpenSos: () => void;
  onOpenDiagnostics: () => void;
  onScrollToSection: (sectionId: string) => void;
}

function CountUp({ end, suffix = "", duration = 1500, decimals = 0 }: { end: number; suffix?: string; duration?: number; decimals?: number }) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = progress * end;
            setCount(currentCount);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="font-mono">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero({ onOpenSos, onOpenDiagnostics, onScrollToSection }: HeroProps) {
  const [hudStatus, setHudStatus] = React.useState("IDLE");
  const [hudProgress, setHudProgress] = React.useState(0);
  const [hudLog, setHudLog] = React.useState<string[]>([
    "SYSINIT: OBD-II Connection active",
    "VOLTAGE: 14.2V - Alternator stable",
    "ECU STATUS: Active (0xFFFF)",
  ]);

  const runHudScan = () => {
    if (hudStatus === "SCANNING") return;
    setHudStatus("SCANNING");
    setHudProgress(0);
    setHudLog(["SYSINIT: OBD-II Connection active", "COMM: Negotiating protocol ISO 15765-4..."]);

    const interval = setInterval(() => {
      setHudProgress((prev) => {
        const next = prev + 10;
        if (next === 30) {
          setHudLog((prevLog) => [...prevLog, "QUERY: Querying PID 0x01 (Current Data)..."]);
        } else if (next === 60) {
          setHudLog((prevLog) => [...prevLog, "ERR: P0101 Detected in ECU (Mass Air Flow)"]);
        } else if (next === 80) {
          setHudLog((prevLog) => [...prevLog, "SYS: Coolant sensor returned 92°C"]);
        } else if (next >= 100) {
          clearInterval(interval);
          setHudStatus("DONE");
          setHudLog((prevLog) => [
            ...prevLog,
            "SCAN COMPLETE: OBD-II Code P0101 Active",
            "REMEDY: Clean or replace MAF sensor.",
          ]);
          return 100;
        }
        return next;
      });
    }, 300);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-gray-950 text-white py-16 lg:py-24 overflow-hidden">
      {/* 1. Full-Bleed Photographic Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBgImage} 
          alt="mCarFix Advanced Garage Hub" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Dark radial and gradient overlays to keep typography pristine and contrast ultra-high */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-950 via-gray-950/85 to-gray-900/10 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10" />
        {/* Subtle decorative grid layer over photo */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" 
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Pitch, and CTAs */}
          <div className="lg:col-span-5 flex flex-col space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 px-3.5 py-1.5 rounded-full w-fit"
            >
              <Shield className="h-4 w-4 text-teal-400" />
              <span className="font-mono text-xs text-teal-300 font-medium tracking-wider uppercase">
                AI-Powered OBD-II Diagnostic Network
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase leading-tight text-white"
            >
              Your car, <span className="text-signal">fully diagnosed</span> <br className="hidden sm:inline" /> before it fails.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-gray-300 text-lg leading-relaxed font-light"
            >
              Don't guess what your check engine light means. mCarFix bridges the gap between OBD diagnostics and Nairobi's most trusted certified garages. Track live engine data, find top-rated mechanics, and request immediate roadside assistance in one unified hub.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button
                onClick={() => onScrollToSection("estimator")}
                className="bg-signal text-white hover:bg-signal/90 font-display font-bold text-base tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center space-x-2 border-2 border-transparent hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-signal/20"
              >
                <span>Instantly Estimate Cost</span>
              </button>
              <button
                onClick={() => onScrollToSection("garages")}
                className="bg-white/10 backdrop-blur-xs border border-white/20 hover:border-white text-white hover:bg-white/20 font-display font-bold text-base tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Find Verified Garages</span>
              </button>
            </motion.div>

            {/* Statistics Row with counting animations */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border-t border-white/10 pt-8 mt-4 grid grid-cols-3 gap-4"
            >
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  <CountUp end={12000} suffix="+" />
                </span>
                <span className="font-display text-xs text-gray-400 uppercase tracking-wider mt-1">Vehicles Serviced</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  <CountUp end={450} suffix="+" />
                </span>
                <span className="font-display text-xs text-gray-400 uppercase tracking-wider mt-1">Verified Garages</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    <CountUp end={4.9} decimals={1} />
                  </span>
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400 inline" />
                </div>
                <span className="font-display text-xs text-gray-400 uppercase tracking-wider mt-1">Google Rating</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual Bento Grid (Workshop Showcase & Live Diagnostic HUD floating on photo background) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 justify-center items-stretch w-full">
            
            {/* Workshop Showcase Card - Floating look */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full md:w-1/2 bg-gray-950/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-signal/50 hover:shadow-signal/10 transition-all duration-300 group"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-900">
                <img
                  src={workshopImage}
                  alt="mCarFix Nairobi Certified Workshop"
                  className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Live indicators and badges over the image */}
                <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-red-600/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  <span>LIVE CAM</span>
                </div>
                <div className="absolute top-3 right-3 bg-gray-900/85 backdrop-blur-xs text-signal border border-signal/20 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider">
                  BAY 04
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-10">
                  <span className="font-mono text-[9px] text-gray-300 uppercase tracking-widest font-semibold">Verified Location</span>
                  <h4 className="font-display text-base font-bold text-white uppercase tracking-wide mt-0.5">Westlands Partner Hub</h4>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <p className="font-sans text-xs text-gray-300 leading-relaxed font-light">
                    Continuous OBD-II diagnostic streams sync this service bay directly to our active Nairobi partner network.
                  </p>
                  <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                    <span className="text-teal-400 font-semibold">● 15 Bays Active</span>
                    <span>•</span>
                    <span>99.4% SLA Vetted</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="bg-teal-500/10 border border-teal-500/20 p-1.5 rounded-lg shrink-0">
                      <Activity className="h-4 w-4 text-teal-400 animate-pulse" />
                    </div>
                    <div>
                      <span className="block text-[8px] text-gray-400 uppercase tracking-wider font-mono">Bay Status</span>
                      <span className="text-[10px] text-teal-300 font-bold font-sans">Diagnostics Streaming</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onScrollToSection("garages")}
                    className="text-xs font-display font-bold uppercase tracking-wider text-signal hover:underline cursor-pointer"
                  >
                    View Bays &rarr;
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Diagnostic HUD Card - Floating transparent look */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full md:w-1/2 bg-gray-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-signal/50 hover:shadow-signal/10 flex flex-col justify-between text-white"
            >
              {/* Glass Glare */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 transform rotate-12 pointer-events-none" />
              
              {/* Device Header */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Cpu className="h-5 w-5 text-teal-400" />
                    <span className="font-display text-sm font-bold tracking-wider uppercase text-white">mCarFix HUD v4.1</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
                    <span className="h-2 w-2 rounded-full bg-teal-400" />
                    <span className="font-mono text-[9px] text-teal-300 uppercase tracking-wider">OBD Link OK</span>
                  </div>
                </div>

                {/* Screen Display Area */}
                <div className="bg-black/80 border border-white/10 rounded-xl p-4 font-mono text-xs space-y-3 shadow-inner relative">
                  {/* Simulated Grid Scan Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,27,0)_95%,rgba(20,184,166,0.03)_95%)] bg-[size:100%_16px] pointer-events-none rounded-xl" />

                  {/* HUD Grid Stats */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-white/5 border border-white/5 p-2 rounded-lg">
                      <div className="text-[9px] text-gray-400 uppercase tracking-widest">ECU Status</div>
                      <div className="text-2xs font-bold text-white mt-1 flex items-center space-x-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                        <span>OPTIMAL</span>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-2 rounded-lg">
                      <div className="text-[9px] text-gray-400 uppercase tracking-widest">OBD-II Code</div>
                      <div className={`text-2xs font-bold mt-1 ${hudStatus === "DONE" || hudProgress >= 60 ? 'text-amber-500' : 'text-teal-300'}`}>
                        {hudStatus === "DONE" || hudProgress >= 60 ? "P0101 MAF" : "NO CODES"}
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-2 rounded-lg">
                      <div className="text-[9px] text-gray-400 uppercase tracking-widest">Temp / Coolant</div>
                      <div className="text-2xs font-bold text-white mt-1">92°C <span className="text-[10px] text-gray-300">/ 4.2 Bar</span></div>
                    </div>
                    <div className="bg-white/5 border border-white/5 p-2 rounded-lg">
                      <div className="text-[9px] text-gray-400 uppercase tracking-widest">Engine Load</div>
                      <div className="text-2xs font-bold text-white mt-1">21.4% <span className="text-[10px] text-gray-300">@ 850 RPM</span></div>
                    </div>
                  </div>

                  {/* Live Console Output Log */}
                  <div className="bg-black/90 border border-white/5 rounded-lg p-2.5 h-24 overflow-y-auto text-[9px] leading-relaxed text-gray-300 select-all space-y-1">
                    {hudLog.map((log, index) => (
                      <div key={index} className={log.includes("ERR") || log.includes("OBD-II Code") ? "text-amber-400" : log.includes("COMPLETE") ? "text-teal-400 font-semibold" : "text-gray-300"}>
                        &gt; {log}
                      </div>
                    ))}
                  </div>

                  {/* Scanning Progress Bar */}
                  {hudStatus === "SCANNING" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-teal-400 uppercase tracking-widest font-semibold">
                        <span>Analyzing OBD Bus</span>
                        <span>{hudProgress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-400 transition-all duration-300" style={{ width: `${hudProgress}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action and extra links */}
              <div className="mt-4 space-y-3">
                <button
                  onClick={runHudScan}
                  disabled={hudStatus === "SCANNING"}
                  className={`w-full ${hudStatus === "SCANNING" ? 'bg-white/5 text-gray-400 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-signal text-signal'} font-display font-bold uppercase tracking-wider text-xs py-3 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer`}
                >
                  <Activity className={`h-4 w-4 ${hudStatus === "SCANNING" ? 'animate-spin' : ''}`} />
                  <span>{hudStatus === "SCANNING" ? "Running Scanner..." : hudStatus === "DONE" ? "Scan Again" : "Trigger Live Diagnostics"}</span>
                </button>
                <div className="text-center">
                  <button 
                    onClick={onOpenDiagnostics}
                    className="text-[10px] font-mono text-gray-300 hover:text-signal transition-colors underline decoration-dotted"
                  >
                    Launch Full Troubleshooter &rarr;
                  </button>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
