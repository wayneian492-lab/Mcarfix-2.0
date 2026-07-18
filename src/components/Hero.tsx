/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star, Shield, Cpu, Activity, AlertTriangle, Play } from "lucide-react";

interface HeroProps {
  onOpenSos: () => void;
  onOpenDiagnostics: () => void;
  onScrollToSection: (sectionId: string) => void;
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
    <section id="hero" className="relative bg-asphalt text-white py-16 lg:py-24 overflow-hidden">
      {/* Subtle Grid Texture Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: "radial-gradient(#eceef2 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      
      {/* Decorative Radial glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-diagnostic/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-signal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline and Pitch */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="inline-flex items-center space-x-2 bg-steel/80 border border-steel-light px-3.5 py-1.5 rounded-full w-fit">
              <Shield className="h-4 w-4 text-diagnostic" />
              <span className="font-mono text-xs text-diagnostic font-medium tracking-wider uppercase">
                AI-Powered OBD-II Diagnostic Network
              </span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase leading-tight text-white">
              Your car, <span className="text-signal">fully diagnosed</span> <br className="hidden sm:inline" /> before it fails.
            </h1>

            <p className="font-sans text-gray-300 text-lg max-w-xl leading-relaxed font-light">
              Don't guess what your check engine light means. mCarFix bridges the gap between OBD diagnostics and Nairobi's most trusted certified garages. Track live engine data, find top-rated mechanics, and request immediate roadside assistance in one unified hub.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => onScrollToSection("estimator")}
                className="bg-signal text-asphalt hover:bg-signal/90 font-display font-bold text-base tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center space-x-2 border-2 border-transparent hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Instantly Estimate Cost</span>
              </button>
              <button
                onClick={() => onScrollToSection("garages")}
                className="bg-transparent border border-gray-400 hover:border-white hover:bg-white/5 text-white font-display font-bold text-base tracking-wider uppercase px-8 py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Find Verified Garages</span>
              </button>
            </div>

            {/* Statistics Row */}
            <div className="border-t border-steel/60 pt-8 mt-4 grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">12,000+</span>
                <span className="font-display text-xs text-gray-400 uppercase tracking-wider mt-1">Vehicles Serviced</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">450+</span>
                <span className="font-display text-xs text-gray-400 uppercase tracking-wider mt-1">Verified Garages</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">4.9</span>
                  <Star className="h-4 w-4 fill-signal text-signal inline" />
                </div>
                <span className="font-display text-xs text-gray-400 uppercase tracking-wider mt-1">Google Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Diagnostic HUD Device Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-steel border-2 border-steel/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-diagnostic/30">
              
              {/* Glass Glare */}
              <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 transform rotate-12 pointer-events-none" />
              
              {/* Device Header */}
              <div className="flex items-center justify-between border-b border-asphalt pb-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Cpu className="h-5 w-5 text-diagnostic" />
                  <span className="font-display text-sm font-bold tracking-wider uppercase text-white">mCarFix HUD v4.1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-diagnostic animate-ping" />
                  <span className="h-2 w-2 rounded-full bg-diagnostic" />
                  <span className="font-mono text-2xs text-diagnostic uppercase tracking-wider">OBD-II Link OK</span>
                </div>
              </div>

              {/* Screen Display Area */}
              <div className="bg-asphalt border border-steel rounded-xl p-5 font-mono text-sm space-y-4 shadow-inner relative">
                
                {/* Simulated Grid Scan Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,21,27,0)_95%,rgba(79,209,197,0.04)_95%)] bg-[size:100%_16px] pointer-events-none rounded-xl" />

                {/* HUD Grid Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-steel/30 border border-steel/50 p-2.5 rounded-lg">
                    <div className="text-2xs text-gray-400 uppercase tracking-widest">ECU Status</div>
                    <div className="text-sm font-bold text-white mt-1 flex items-center space-x-1.5">
                      <span className="h-2 w-2 rounded-full bg-diagnostic" />
                      <span>OPTIMAL</span>
                    </div>
                  </div>
                  <div className="bg-steel/30 border border-steel/50 p-2.5 rounded-lg">
                    <div className="text-2xs text-gray-400 uppercase tracking-widest">OBD-II Code</div>
                    <div className={`text-sm font-bold mt-1 ${hudStatus === "DONE" || hudProgress >= 60 ? 'text-warning' : 'text-diagnostic'}`}>
                      {hudStatus === "DONE" || hudProgress >= 60 ? "P0101 MAF" : "NO CODES"}
                    </div>
                  </div>
                  <div className="bg-steel/30 border border-steel/50 p-2.5 rounded-lg">
                    <div className="text-2xs text-gray-400 uppercase tracking-widest">Temp / Coolant</div>
                    <div className="text-sm font-bold text-white mt-1">92°C <span className="text-xs text-gray-400">/ 4.2 Bar</span></div>
                  </div>
                  <div className="bg-steel/30 border border-steel/50 p-2.5 rounded-lg">
                    <div className="text-2xs text-gray-400 uppercase tracking-widest">Engine Load</div>
                    <div className="text-sm font-bold text-white mt-1">21.4% <span className="text-xs text-gray-400">@ 850 RPM</span></div>
                  </div>
                </div>

                {/* Live Console Output Log */}
                <div className="bg-black/40 border border-steel/50 rounded-lg p-3 h-28 overflow-y-auto text-3xs leading-relaxed text-gray-400 select-all space-y-1">
                  {hudLog.map((log, index) => (
                    <div key={index} className={log.includes("ERR") || log.includes("OBD-II Code") ? "text-warning" : log.includes("COMPLETE") ? "text-diagnostic font-semibold" : "text-gray-400"}>
                      &gt; {log}
                    </div>
                  ))}
                </div>

                {/* Scanning Progress Bar */}
                {hudStatus === "SCANNING" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-3xs text-diagnostic uppercase tracking-widest font-semibold">
                      <span>Analyzing Diagnostics Bus</span>
                      <span>{hudProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-steel/50 rounded-full overflow-hidden">
                      <div className="h-full bg-diagnostic transition-all duration-300" style={{ width: `${hudProgress}%` }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Button */}
              <div className="mt-5 flex justify-between items-center">
                <button
                  onClick={runHudScan}
                  disabled={hudStatus === "SCANNING"}
                  className={`w-full ${hudStatus === "SCANNING" ? 'bg-steel text-gray-500 cursor-not-allowed' : 'bg-steel border border-steel-light hover:border-diagnostic text-diagnostic hover:bg-diagnostic/10'} font-display font-bold uppercase tracking-wider text-xs py-3 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer`}
                >
                  <Activity className={`h-4 w-4 ${hudStatus === "SCANNING" ? 'animate-spin' : ''}`} />
                  <span>{hudStatus === "SCANNING" ? "Running Scanner..." : hudStatus === "DONE" ? "Scan Again" : "Trigger Live Diagnostics"}</span>
                </button>
              </div>

              {/* Extra Link to deep scanner */}
              <div className="mt-3 text-center">
                <button 
                  onClick={onOpenDiagnostics}
                  className="text-xs font-mono text-gray-400 hover:text-signal transition-colors underline decoration-dotted"
                >
                  Launch Full Symptom Troubleshooter &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
