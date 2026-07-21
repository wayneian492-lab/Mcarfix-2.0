/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Shield, Cpu, Activity, AlertTriangle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import workshopImage from "../assets/images/car_service_lift_1784614889346.jpg";
import nairobiSkylineImg from "../assets/images/nairobi_skyline_expressway_1784614906687.jpg";
import heroBgImage from "../assets/images/hero_garage_bg_1784614872137.jpg";

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
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-gray-950 text-white py-24 lg:py-32 overflow-hidden">
      {/* 1. Full-Bleed Photographic Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBgImage} 
          alt="Clean professional automotive workshop in Westlands, Nairobi equipped with advanced OBD diagnostic systems" 
          className="w-full h-full object-cover opacity-95"
        />
        {/* Dark radial and gradient overlays to keep typography pristine and contrast ultra-high */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/95 to-gray-950 z-10" />
        {/* Subtle decorative grid layer over photo */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none z-10" 
          style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex flex-col items-center">
        
        {/* Centered high-impact hero statement */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center space-y-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 px-4 py-2 rounded-full"
          >
            <Shield className="h-4 w-4 text-teal-400" />
            <span className="font-mono text-xs text-teal-300 font-bold tracking-widest uppercase">
              AI-Powered OBD-II Diagnostic Network
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight uppercase leading-[1.05] text-white"
          >
            Your car, <span className="text-signal">fully diagnosed</span> <br /> before it fails.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-gray-300 text-lg sm:text-xl leading-relaxed font-light max-w-3xl"
          >
            Don't guess what your check engine light means. mCarFix is part of a larger verified vehicle-safety network across Kenya—connecting motorists, certified garages, and emergency responders under a unified ecosystem. Protect your vehicle's resale value with our <span className="text-teal-400 font-semibold font-mono">DIGITAL DNA</span> engine — a permanent, verified digital service history that follows your vehicle wherever you go.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollToSection("estimator")}
              className="bg-signal text-white hover:bg-signal/90 font-display font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center space-x-2 border-2 border-transparent transition-all cursor-pointer shadow-xl shadow-signal/20"
            >
              <span>Instantly Estimate Cost</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onScrollToSection("garages")}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white text-white hover:bg-white/20 font-display font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Find a Garage</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Overlapping, glassy layered cards with premium enterprise design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full max-w-6xl mt-6">
          
          {/* Left Glass Card: Workshop Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 lg:col-span-6 bg-gray-950/60 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-teal-500/30 hover:shadow-teal-500/5 transition-all duration-300 group"
          >
            <div className="relative h-56 overflow-hidden bg-gray-900">
              <img
                src={nairobiSkylineImg}
                alt="Beautiful aerial view of Nairobi skyline showcasing modern skyscrapers and the elevated Nairobi Expressway"
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-teal-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-widest animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                <span>METRO COVERAGE</span>
              </div>
              <div className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md text-signal border border-signal/20 px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider">
                NAIROBI
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5">
                <span className="font-mono text-[9px] text-gray-300 uppercase tracking-widest font-semibold">Broad Coverage</span>
                <h4 className="font-display text-lg font-bold text-white uppercase tracking-wide mt-0.5">Greater Nairobi Network</h4>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="font-sans text-xs text-gray-300 leading-relaxed font-light">
                  mCarFix is integrated directly into a wider verified vehicle-safety network across Kenya—connecting motorists, vetted garages, and AA emergency responders under a single, highly coordinated protective ecosystem.
                </p>
                <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                  <span className="text-teal-400 font-semibold">● 450+ Garages Active</span>
                  <span>•</span>
                  <span>99.8% Response SLA</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="bg-teal-500/10 border border-teal-500/20 p-2 rounded-lg shrink-0">
                    <Activity className="h-4 w-4 text-teal-400 animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[8px] text-gray-400 uppercase tracking-wider font-mono">Rescue Grid</span>
                    <span className="text-[10px] text-teal-300 font-bold font-sans">Active Monitoring</span>
                  </div>
                </div>
                <button
                  onClick={() => onScrollToSection("garages")}
                  className="text-xs font-display font-bold uppercase tracking-wider text-signal hover:underline cursor-pointer"
                >
                  Explore Network &rarr;
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Glass Card: Diagnostic HUD */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="col-span-1 lg:col-span-6 bg-gray-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-signal/50 hover:shadow-signal/10 flex flex-col justify-between text-white"
          >
            {/* Glass Glare */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 transform rotate-12 pointer-events-none" />
            
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
              <div className="bg-black/90 border border-white/10 rounded-2xl p-4 font-mono text-xs space-y-3 shadow-inner relative">
                {/* Simulated Grid Scan Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,27,0)_95%,rgba(20,184,166,0.03)_95%)] bg-[size:100%_16px] pointer-events-none rounded-2xl" />

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
                <div className="bg-black border border-white/5 rounded-lg p-2.5 h-24 overflow-y-auto text-[9px] leading-relaxed text-gray-300 select-all space-y-1">
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
            <div className="mt-5 space-y-3">
              <button
                onClick={runHudScan}
                disabled={hudStatus === "SCANNING"}
                className={`w-full ${hudStatus === "SCANNING" ? 'bg-white/5 text-gray-400 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-signal text-signal'} font-display font-bold uppercase tracking-wider text-xs py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer`}
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

        {/* Bottom statistics row in spacious margin */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full max-w-4xl border-t border-white/10 pt-10 mt-16 grid grid-cols-3 gap-6 text-center"
        >
          <div className="flex flex-col">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
              <CountUp end={12000} suffix="+" />
            </span>
            <span className="font-display text-2xs sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Vehicles Serviced</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
              <CountUp end={450} suffix="+" />
            </span>
            <span className="font-display text-2xs sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Verified Garages</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-center space-x-1">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                <CountUp end={4.9} decimals={1} />
              </span>
              <Star className="h-4 w-4 fill-amber-400 text-amber-400 inline" />
            </div>
            <span className="font-display text-2xs sm:text-xs text-gray-400 uppercase tracking-widest mt-1">Google Rating</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
