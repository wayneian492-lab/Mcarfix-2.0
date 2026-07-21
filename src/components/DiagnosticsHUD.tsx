/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, ShieldAlert, CheckCircle2, ChevronRight, RefreshCw, Cpu, Gauge, Zap, Thermometer, Wind, AlertTriangle, BookOpen, Info } from "lucide-react";

interface DiagnosticsHUDProps {
  onBookService: (serviceName: string, notes: string) => void;
}

export default function DiagnosticsHUD({ onBookService }: DiagnosticsHUDProps) {
  const [selectedSymptom, setSelectedSymptom] = React.useState("check-engine");
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanProgress, setScanProgress] = React.useState(0);
  const [scanLogs, setScanLogs] = React.useState<string[]>([]);
  const [scanResult, setScanResult] = React.useState<any | null>(null);
  
  // Real-time fluctuating gauge states
  const [rpm, setRpm] = React.useState(800);
  const [temp, setTemp] = React.useState(90);
  const [volts, setVolts] = React.useState(14.2);
  const [maf, setMaf] = React.useState(3.4);
  const [activeHover, setActiveHover] = React.useState<string | null>(null);

  const symptoms = [
    { id: "check-engine", label: "Check Engine Light On", icon: "⚠️" },
    { id: "squeaking-brakes", label: "Squeaking / Grinding Brakes", icon: "🛑" },
    { id: "engine-overheating", label: "High Temperature / Overheating", icon: "🔥" },
    { id: "clicking-start", label: "Struggles to Start / Clicking", icon: "🔑" },
    { id: "rough-idle", label: "Rough Idle / Engine Shaking", icon: "💨" },
  ];

  const diagnosticDatabase: Record<string, any> = {
    "check-engine": {
      code: "P0101",
      name: "Mass Air Flow (MAF) Circuit Range/Performance",
      severity: "MEDIUM",
      warningText: "Schedule diagnostic inspection within 48 hours. Avoid aggressive throttle.",
      explanation: "The Mass Air Flow sensor measures the volume and density of air entering the engine. An out-of-range signal causes incorrect fuel mixing, resulting in rough acceleration and poor fuel economy.",
      culprits: ["Dirty MAF sensor element", "Vacuum leak in intake boot", "Faulty MAF wiring harness"],
      fix: "Clean MAF sensor with specialized cleaner spray or replace assembly. Check intake boots for tears.",
      estCost: "KES 4,500 - KES 9,000",
      targetService: "Computer Diagnostics",
    },
    "squeaking-brakes": {
      code: "DTC-BRK-402",
      name: "Friction Lining Thickness Below Minimum Limit",
      severity: "CRITICAL",
      warningText: "Critical safety risk. Brake failure or rotor damage imminent. Inspect immediately.",
      explanation: "Brake pad friction material has worn down past the 2mm wear indicator. Metal-on-metal contact is commencing, which increases stopping distances and will destroy brake disc rotors.",
      culprits: ["Worn brake pads", "Stuck caliper sliders", "Excessively rusted brake discs"],
      fix: "Replace front and rear brake pads immediately. Clean slide pins. Check rotor thickness.",
      estCost: "KES 5,000 - KES 12,000",
      targetService: "General Mechanics",
    },
    "engine-overheating": {
      code: "P0117",
      name: "Engine Coolant Temperature (ECT) Circuit Low Input",
      severity: "EMERGENCY",
      warningText: "SOS Danger! Pull over and turn off the engine immediately. Continued driving will crack the engine block.",
      explanation: "The engine head temperature is exceeding 105°C. This is driven by lack of coolant circulation or localized cooling assembly failures.",
      culprits: ["Failed thermostat stuck closed", "Radiator hose leak / coolant depletion", "Radiator cooling fan motor burnt"],
      fix: "Pressure test cooling system. Replace thermostat and radiator cap. Refill and bleed OEM coolant.",
      estCost: "KES 6,000 - KES 18,000",
      targetService: "Roadside Assistance",
    },
    "clicking-start": {
      code: "P0562",
      name: "System Voltage - Low Electrical Potential",
      severity: "MEDIUM",
      warningText: "Battery depletion imminent. Vehicle may not start again once turned off.",
      explanation: "The main vehicle circuit voltage has dropped below 11.8 Volts while starting. The starter solenoid is clicking rapidly because there is insufficient current to engage the starter flywheel.",
      culprits: ["Weak or exhausted lead-acid battery", "Alternator failing to charge", "Loose or corroded battery terminals"],
      fix: "Perform battery load test. Clean battery posts with copper brush. Replace battery cell if capacity is below 40%.",
      estCost: "KES 8,500 - KES 14,000",
      targetService: "Tyre & Battery Center",
    },
    "rough-idle": {
      code: "P0300",
      name: "Random / Multiple Cylinder Misfire Detected",
      severity: "HIGH",
      warningText: "Avoid heavy acceleration. Unburnt fuel can melt your catalytic converter. Inspect soon.",
      explanation: "The Engine Control Unit detected multiple firing failures within cylinders. The combustion is incomplete, creating vibrations, fuel smell, and major performance loss.",
      culprits: ["Worn or fouled spark plugs", "Weak ignition coils", "Clogged fuel injectors"],
      fix: "Perform ignition system test. Replace spark plugs (standard intervals are 40,000 km) and replace cracked ignition coil boots.",
      estCost: "KES 7,500 - KES 16,000",
      targetService: "Computer Diagnostics",
    },
  };

  // Live sensor values simulation
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (isScanning) {
        // High fluctuation during active scanning sweeps
        setRpm(Math.floor(Math.random() * 3000) + 1200);
        setTemp(Math.floor(Math.random() * 40) + 70);
        setVolts(parseFloat((Math.random() * 3 + 11.5).toFixed(1)));
        setMaf(parseFloat((Math.random() * 12 + 2).toFixed(1)));
      } else {
        // Symptom-dependent realistic idle values
        if (selectedSymptom === "rough-idle" && scanResult) {
          // Unstable engine speed
          setRpm(Math.floor(Math.random() * 250) + 650 + (Math.sin(Date.now() / 150) * 80));
          setTemp(92 + parseFloat((Math.sin(Date.now() / 500) * 0.5).toFixed(1)));
          setVolts(13.8 + parseFloat((Math.random() * 0.3 - 0.15).toFixed(2)));
          setMaf(3.2 + parseFloat((Math.sin(Date.now() / 150) * 0.6).toFixed(1)));
        } else if (selectedSymptom === "engine-overheating" && scanResult) {
          // Extremely hot engine
          setRpm(820 + Math.floor(Math.random() * 15));
          setTemp(115 + parseFloat((Math.sin(Date.now() / 1000) * 0.4).toFixed(1)));
          setVolts(13.9 + parseFloat((Math.random() * 0.1).toFixed(2)));
          setMaf(3.5 + parseFloat((Math.random() * 0.2).toFixed(1)));
        } else if (selectedSymptom === "clicking-start" && scanResult) {
          // Weak battery voltage
          setRpm(0); // Engine cannot sustain start
          setTemp(32); // Cold engine
          setVolts(10.8 + parseFloat((Math.sin(Date.now() / 800) * 0.15).toFixed(2)));
          setMaf(0);
        } else if (selectedSymptom === "check-engine" && scanResult) {
          // MAF failure - wrong reading
          setRpm(800 + Math.floor(Math.random() * 30));
          setTemp(89 + parseFloat((Math.random() * 0.5).toFixed(1)));
          setVolts(14.1 + parseFloat((Math.random() * 0.1).toFixed(2)));
          setMaf(0.3 + parseFloat((Math.sin(Date.now() / 300) * 0.15).toFixed(2))); // extremely low / invalid air reading
        } else {
          // Perfectly healthy baseline idle values
          setRpm(790 + Math.floor(Math.random() * 20));
          setTemp(88 + parseFloat((Math.sin(Date.now() / 1500) * 0.3).toFixed(1)));
          setVolts(14.2 + parseFloat((Math.random() * 0.1 - 0.05).toFixed(2)));
          setMaf(3.4 + parseFloat((Math.random() * 0.2 - 0.1).toFixed(1)));
        }
      }
    }, 200);

    return () => clearInterval(timer);
  }, [isScanning, selectedSymptom, scanResult]);

  const startAnalysis = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);
    
    const logs = [
      `[SYS] Initiating mCarFix OBD-II interface protocol...`,
      `[COMM] Synchronizing baudrate (10400 bps / K-LINE ISO 14230)...`,
      `[ECU] Connecting to Engine Control Module... Link established.`,
      `[OBD] Pulling diagnostic codes from ROM bank...`,
      `[SENS] Reading Oxygen O2 Sensor telemetry: 0.45V (Normal)...`,
      `[SENS] Querying Engine Coolant Temperature PID...`,
      `[DTC] Analysing fault codes...`,
      `[DTC] Processing specific signal out-of-bounds metrics...`,
      `[SYS] Generating localized troubleshooting report...`,
      `[DONE] Data packet successfully compiled.`
    ];

    let currentLogIndex = 0;
    setScanLogs([logs[0]]);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const next = prev + 10;
        
        // Add log lines incrementally
        if (next % 20 === 0 && currentLogIndex < logs.length - 1) {
          currentLogIndex++;
          setScanLogs((prevLogs) => [...prevLogs, logs[currentLogIndex]]);
        }

        if (next >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResult(diagnosticDatabase[selectedSymptom]);
          return 100;
        }
        return next;
      });
    }, 250);
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case "EMERGENCY":
        return "bg-warning/15 border-warning/30 text-warning";
      case "CRITICAL":
        return "bg-warning/10 border-warning/20 text-warning";
      case "HIGH":
        return "bg-signal/15 border-signal/30 text-signal";
      default:
        return "bg-diagnostic/15 border-diagnostic/30 text-diagnostic";
    }
  };

  return (
    <section id="diagnostics-info" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-sky-600 font-bold uppercase tracking-widest bg-sky-50 border border-sky-200 px-3.5 py-1.5 rounded-full">
            Virtual Troubleshooter
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-gray-900">
            mCarFix OBD-II Diagnostic Tool
          </h2>
          <div className="h-1 w-12 bg-sky-500 mx-auto mt-4" />
          <p className="font-sans text-gray-600 mt-4 leading-relaxed font-light">
            Don't pay KES 3,000 for a simple scan. Select your vehicle's physical symptom below and initiate our simulator to decode the underlying fault logs with our interactive systems visualizer.
          </p>
        </div>

        {/* Diagnostic Simulator Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Symptoms List (Left Side) */}
          <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-base uppercase tracking-wider text-gray-500 mb-4 flex items-center space-x-2">
                <Info className="h-4 w-4 text-sky-500" />
                <span>Select Current Symptom</span>
              </h3>

              <div className="space-y-2.5">
                {symptoms.map((s) => (
                  <button
                    key={s.id}
                    id={`symptom-btn-${s.id}`}
                    onClick={() => {
                      if (!isScanning) {
                        setSelectedSymptom(s.id);
                        setScanResult(null);
                      }
                    }}
                    disabled={isScanning}
                    className={`w-full text-left p-4 rounded-lg border transition flex items-center justify-between cursor-pointer ${
                      selectedSymptom === s.id
                        ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500 text-gray-900 font-semibold shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                        : "border-gray-200 bg-white hover:border-sky-400 hover:bg-sky-50/10 text-gray-700"
                    } ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <span className="text-xl shrink-0">{s.icon}</span>
                      <span className="font-display text-sm uppercase tracking-wider text-gray-900">
                        {s.label}
                      </span>
                    </div>
                    <ChevronRight className={`h-4 w-4 ${selectedSymptom === s.id ? "text-sky-500" : "text-gray-400"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Scanner Trigger */}
            <button
              onClick={startAnalysis}
              disabled={isScanning}
              id="initiate-scan-btn"
              className={`w-full cursor-pointer ${isScanning ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-sky-500 hover:bg-sky-600 text-white shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.45)]"} font-display font-bold uppercase tracking-wider text-sm py-4 rounded-lg flex items-center justify-center space-x-2.5 mt-6 transition`}
            >
              <RefreshCw className={`h-4.5 w-4.5 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "Scanning OBD Buses..." : "Initiate System Trace Scan"}</span>
            </button>
          </div>

          {/* Interactive Vehicle Schematic Visualizer (Center Column) */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between items-center shadow-xl relative overflow-hidden min-h-[520px]">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
            
            {/* Ambient Scan Glow */}
            {isScanning && (
              <motion.div 
                className="absolute left-0 right-0 h-1 bg-sky-400/40 shadow-[0_0_15px_#38bdf8] z-10"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            )}

            <div className="w-full text-center mb-2 z-10">
              <span className="font-mono text-[10px] text-sky-400 uppercase tracking-widest font-bold">
                interactive diagnostics grid
              </span>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mt-0.5">
                X-Ray Telemetry Map
              </h4>
            </div>

            {/* Vehicle Vector Schematic */}
            <div className="relative w-full h-[360px] flex items-center justify-center py-2 z-10">
              <svg viewBox="0 0 200 360" className="w-auto h-full max-h-[340px] text-slate-700 select-none filter drop-shadow-[0_0_12px_rgba(56,189,248,0.15)]">
                {/* 4 Wheels (Tires with tread details) */}
                {/* Front Left Wheel */}
                <g>
                  <rect 
                    x="35" y="65" width="16" height="35" rx="3" 
                    fill="#080c14" 
                    stroke={selectedSymptom === "squeaking-brakes" ? "#f43f5e" : "#273549"} 
                    strokeWidth="1.2"
                    className={`transition-colors duration-300 ${selectedSymptom === "squeaking-brakes" ? "animate-pulse" : ""}`}
                  />
                  {/* Wheel Tread Lines */}
                  <line x1="35" y1="72" x2="51" y2="72" stroke="#1e293b" strokeWidth="1" />
                  <line x1="35" y1="82" x2="51" y2="82" stroke="#1e293b" strokeWidth="1" />
                  <line x1="35" y1="92" x2="51" y2="92" stroke="#1e293b" strokeWidth="1" />
                  {/* Glowing brake rotor/caliper behind the wheel */}
                  {selectedSymptom === "squeaking-brakes" && (
                    <path d="M 51,75 A 6,6 0 0,1 51,90" fill="none" stroke="#f43f5e" strokeWidth="2.5" className="animate-pulse" />
                  )}
                </g>

                {/* Front Right Wheel */}
                <g>
                  <rect 
                    x="149" y="65" width="16" height="35" rx="3" 
                    fill="#080c14" 
                    stroke={selectedSymptom === "squeaking-brakes" ? "#f43f5e" : "#273549"} 
                    strokeWidth="1.2"
                    className={`transition-colors duration-300 ${selectedSymptom === "squeaking-brakes" ? "animate-pulse" : ""}`}
                  />
                  {/* Wheel Tread Lines */}
                  <line x1="149" y1="72" x2="165" y2="72" stroke="#1e293b" strokeWidth="1" />
                  <line x1="149" y1="82" x2="165" y2="82" stroke="#1e293b" strokeWidth="1" />
                  <line x1="149" y1="92" x2="165" y2="92" stroke="#1e293b" strokeWidth="1" />
                  {/* Glowing brake rotor/caliper behind the wheel */}
                  {selectedSymptom === "squeaking-brakes" && (
                    <path d="M 149,75 A 6,6 0 0,0 149,90" fill="none" stroke="#f43f5e" strokeWidth="2.5" className="animate-pulse" />
                  )}
                </g>

                {/* Rear Left Wheel */}
                <g>
                  <rect 
                    x="34" y="255" width="17" height="35" rx="3" 
                    fill="#080c14" 
                    stroke={selectedSymptom === "squeaking-brakes" ? "#f43f5e" : "#273549"} 
                    strokeWidth="1.2"
                    className={`transition-colors duration-300 ${selectedSymptom === "squeaking-brakes" ? "animate-pulse" : ""}`}
                  />
                  {/* Wheel Tread Lines */}
                  <line x1="34" y1="262" x2="51" y2="262" stroke="#1e293b" strokeWidth="1" />
                  <line x1="34" y1="272" x2="51" y2="272" stroke="#1e293b" strokeWidth="1" />
                  <line x1="34" y1="282" x2="51" y2="282" stroke="#1e293b" strokeWidth="1" />
                  {/* Glowing brake rotor/caliper behind the wheel */}
                  {selectedSymptom === "squeaking-brakes" && (
                    <path d="M 51,265 A 6,6 0 0,1 51,280" fill="none" stroke="#f43f5e" strokeWidth="2.5" className="animate-pulse" />
                  )}
                </g>

                {/* Rear Right Wheel */}
                <g>
                  <rect 
                    x="149" y="255" width="17" height="35" rx="3" 
                    fill="#080c14" 
                    stroke={selectedSymptom === "squeaking-brakes" ? "#f43f5e" : "#273549"} 
                    strokeWidth="1.2"
                    className={`transition-colors duration-300 ${selectedSymptom === "squeaking-brakes" ? "animate-pulse" : ""}`}
                  />
                  {/* Wheel Tread Lines */}
                  <line x1="149" y1="262" x2="166" y2="262" stroke="#1e293b" strokeWidth="1" />
                  <line x1="149" y1="272" x2="166" y2="272" stroke="#1e293b" strokeWidth="1" />
                  <line x1="149" y1="282" x2="166" y2="282" stroke="#1e293b" strokeWidth="1" />
                  {/* Glowing brake rotor/caliper behind the wheel */}
                  {selectedSymptom === "squeaking-brakes" && (
                    <path d="M 149,265 A 6,6 0 0,0 149,280" fill="none" stroke="#f43f5e" strokeWidth="2.5" className="animate-pulse" />
                  )}
                </g>

                {/* Main Body Outline (Symmetric Blueprint Pickup Truck Silhoutte) */}
                <path 
                  d="M 64,28 
                     C 72,21 128,21 136,28 
                     L 142,42 
                     C 145,55 146,75 146,100
                     L 155,103
                     C 158,105 158,112 155,114
                     L 146,118
                     L 147,225
                     L 145,315
                     C 145,335 132,342 100,342
                     C 68,342 55,335 55,315
                     L 53,225
                     L 54,118
                     L 45,114
                     C 42,105 42,105 45,103
                     L 54,100
                     C 54,75 55,55 58,42 Z"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="1.8"
                />

                {/* Front Bumper line */}
                <path d="M 58,40 L 142,40" stroke="#1e293b" strokeWidth="1" />
                
                {/* Side Mirrors details */}
                {/* Left Mirror */}
                <path d="M 45,103 C 38,102 38,110 45,113 Z" fill="#080c14" stroke="#334155" strokeWidth="1" />
                {/* Right Mirror */}
                <path d="M 155,103 C 162,102 162,110 155,113 Z" fill="#080c14" stroke="#334155" strokeWidth="1" />

                {/* Pickup Bed Frame (Inside liner) */}
                <rect x="58" y="232" width="84" height="92" rx="2" fill="#05080f" stroke="#1e293b" strokeWidth="1.2" />
                
                {/* Ribbed Cargo Bed Liner vertical lines */}
                <g opacity="0.45">
                  <line x1="66" y1="236" x2="66" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="74" y1="236" x2="74" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="82" y1="236" x2="82" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="90" y1="236" x2="90" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="98" y1="236" x2="98" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="106" y1="236" x2="106" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="114" y1="236" x2="114" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="122" y1="236" x2="122" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="130" y1="236" x2="130" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                  <line x1="138" y1="236" x2="138" y2="320" stroke="#1e293b" strokeWidth="1.2" />
                </g>

                {/* Tailgate Handle & Line */}
                <line x1="58" y1="324" x2="142" y2="324" stroke="#334155" strokeWidth="1.2" />
                <rect x="94" y="325" width="12" height="3" rx="0.5" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />

                {/* Cabin glass borders & Windshield (Blueprint styled) */}
                {/* Windshield path */}
                <path 
                  d="M 64,110 C 80,106 120,106 136,110 L 140,132 C 120,129 80,129 60,132 Z" 
                  fill="#0b111e" 
                  stroke="#475569" 
                  strokeWidth="1.2" 
                />
                
                {/* Windshield Wipers */}
                <line x1="75" y1="130" x2="94" y2="123" stroke="#334155" strokeWidth="1.2" />
                <line x1="115" y1="130" x2="134" y2="123" stroke="#334155" strokeWidth="1.2" />

                {/* Side Windows */}
                {/* Front Left Window */}
                <path d="M 57,136 L 57,172 L 60,170 L 60,136 Z" fill="#0b111e" stroke="#475569" strokeWidth="0.8" />
                {/* Front Right Window */}
                <path d="M 143,136 L 143,172 L 140,170 L 140,136 Z" fill="#0b111e" stroke="#475569" strokeWidth="0.8" />
                {/* Rear Left Window */}
                <path d="M 56,177 L 56,215 L 59,213 L 59,177 Z" fill="#0b111e" stroke="#475569" strokeWidth="0.8" />
                {/* Rear Right Window */}
                <path d="M 144,177 L 144,215 L 141,213 L 141,177 Z" fill="#0b111e" stroke="#475569" strokeWidth="0.8" />
                
                {/* Rear Cabin Glass */}
                <path d="M 65,223 C 80,225 120,225 135,223 L 135,227 C 120,229 80,229 65,227 Z" fill="#0b111e" stroke="#475569" strokeWidth="0.8" />

                {/* Roll Bar Protective Frame (Behind Cabin) */}
                <g>
                  {/* Main Tubing across bed front */}
                  <rect x="56" y="228" width="88" height="4" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="0.8" />
                  {/* Left support arm */}
                  <line x1="59" y1="232" x2="59" y2="255" stroke="#475569" strokeWidth="1.8" />
                  {/* Right support arm */}
                  <line x1="141" y1="232" x2="141" y2="255" stroke="#475569" strokeWidth="1.8" />
                </g>

                {/* Cabin Interior layout */}
                {/* Left Passenger Seat */}
                <g opacity="0.85">
                  <rect x="63" y="162" width="22" height="25" rx="4" fill="#0b111e" stroke="#2d3748" strokeWidth="1" />
                  {/* Headrest */}
                  <rect x="69" y="152" width="10" height="6" rx="2" fill="#172033" stroke="#475569" strokeWidth="0.8" />
                </g>
                
                {/* Right Driver Seat (Kenya RHD Detail!) */}
                <g opacity="0.85">
                  <rect x="115" y="162" width="22" height="25" rx="4" fill="#0b111e" stroke="#2d3748" strokeWidth="1" />
                  {/* Headrest */}
                  <rect x="121" y="152" width="10" height="6" rx="2" fill="#172033" stroke="#475569" strokeWidth="0.8" />
                </g>

                {/* Rear Bench Seat */}
                <g opacity="0.8" className="text-slate-700">
                  <rect x="62" y="196" width="76" height="22" rx="3" fill="#0b111e" stroke="#2d3748" strokeWidth="1" />
                  {/* Bench Seat Lines */}
                  <line x1="62" y1="207" x2="138" y2="207" stroke="#1a202c" strokeWidth="1" />
                  {/* 3 Headrests */}
                  <rect x="68" y="190" width="10" height="5" rx="1.5" fill="#172033" stroke="#475569" strokeWidth="0.8" />
                  <rect x="95" y="190" width="10" height="5" rx="1.5" fill="#172033" stroke="#475569" strokeWidth="0.8" />
                  <rect x="122" y="190" width="10" height="5" rx="1.5" fill="#172033" stroke="#475569" strokeWidth="0.8" />
                </g>

                {/* Right-Hand Drive Steering Wheel & Column */}
                <g>
                  {/* Steering Column */}
                  <line x1="126" y1="135" x2="126" y2="142" stroke="#475569" strokeWidth="1.5" />
                  {/* Steering Wheel Ring */}
                  <circle cx="126" cy="144" r="7.5" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  {/* Center hub */}
                  <circle cx="126" cy="144" r="1.5" fill="#475569" />
                  {/* Spokes */}
                  <line x1="126" y1="144" x2="120" y2="144" stroke="#64748b" strokeWidth="1" />
                  <line x1="126" y1="144" x2="132" y2="144" stroke="#64748b" strokeWidth="1" />
                  <line x1="126" y1="144" x2="126" y2="151.5" stroke="#64748b" strokeWidth="1" />
                </g>

                {/* Center Console Dashboard Gear Shift */}
                <rect x="96" y="162" width="8" height="24" rx="2" fill="#0f172a" stroke="#2d3748" strokeWidth="1" />
                <circle cx="100" cy="170" r="1.5" fill="#64748b" />

                {/* Under the Hood (Engine Bay Components & Interactive Telemetry Hotspots) */}
                
                {/* 1. Radiator & Cooling Grid (Overheating) */}
                <g>
                  <rect 
                    x="74" y="24" width="52" height="10" rx="1" 
                    fill={selectedSymptom === "engine-overheating" ? "rgba(239, 68, 68, 0.25)" : "#0c111e"} 
                    stroke={selectedSymptom === "engine-overheating" ? "#f43f5e" : "#2d3748"}
                    strokeWidth={selectedSymptom === "engine-overheating" ? "1.8" : "1"}
                    className={`transition duration-300 ${selectedSymptom === "engine-overheating" ? "animate-pulse" : ""}`}
                  />
                  {/* Dual Cooling Fan circles inside Radiator */}
                  <circle 
                    cx="88" cy="29" r="4.5" 
                    fill="none" 
                    stroke={selectedSymptom === "engine-overheating" ? "#f43f5e" : "#273549"} 
                    strokeWidth="1" 
                    className={isScanning || (selectedSymptom === "engine-overheating" && scanResult) ? "animate-spin" : ""}
                    style={{ transformOrigin: "88px 29px" }}
                  />
                  <circle 
                    cx="112" cy="29" r="4.5" 
                    fill="none" 
                    stroke={selectedSymptom === "engine-overheating" ? "#f43f5e" : "#273549"} 
                    strokeWidth="1" 
                    className={isScanning || (selectedSymptom === "engine-overheating" && scanResult) ? "animate-spin" : ""}
                    style={{ transformOrigin: "112px 29px" }}
                  />
                  {/* Glowing warning vapor indicators when overheating */}
                  {selectedSymptom === "engine-overheating" && (
                    <g className="text-red-500 animate-bounce">
                      <path d="M 80,18 Q 83,12 80,8" stroke="#ef4444" strokeWidth="1" fill="none" />
                      <path d="M 100,18 Q 103,12 100,8" stroke="#ef4444" strokeWidth="1" fill="none" />
                      <path d="M 120,18 Q 123,12 120,8" stroke="#ef4444" strokeWidth="1" fill="none" />
                    </g>
                  )}
                </g>

                {/* 2. Fuel injectors & Spark combustion blocks (Rough Idle / Cylinders) */}
                <g>
                  <rect 
                    x="76" y="44" width="48" height="48" rx="4"
                    fill={selectedSymptom === "rough-idle" ? "rgba(249, 115, 22, 0.15)" : "#080c14"}
                    stroke={selectedSymptom === "rough-idle" ? "#f97316" : "#2d3748"}
                    strokeWidth={selectedSymptom === "rough-idle" ? "1.8" : "1"}
                    className={`transition duration-300 ${selectedSymptom === "rough-idle" ? "animate-pulse" : ""}`}
                  />
                  
                  {/* 4 Engine Cylinders lined up vertically */}
                  <g opacity={selectedSymptom === "rough-idle" ? "1" : "0.5"}>
                    {/* Cylinder 1 */}
                    <circle cx="88" cy="53" r="3.5" fill="none" stroke="#475569" strokeWidth="1" />
                    <circle cx="88" cy="53" r="1.5" fill={selectedSymptom === "rough-idle" ? "#f97316" : "#1e293b"} />
                    
                    {/* Cylinder 2 */}
                    <circle cx="112" cy="53" r="3.5" fill="none" stroke="#475569" strokeWidth="1" />
                    <circle cx="112" cy="53" r="1.5" fill={selectedSymptom === "rough-idle" ? "#f97316" : "#1e293b"} />
                    
                    {/* Cylinder 3 (Misfiring!) */}
                    <circle cx="88" cy="78" r="3.5" fill="none" stroke={selectedSymptom === "rough-idle" ? "#ef4444" : "#475569"} strokeWidth="1" />
                    <circle cx="88" cy="78" r="2" fill={selectedSymptom === "rough-idle" ? "#ef4444" : "#1e293b"} className={selectedSymptom === "rough-idle" ? "animate-ping" : ""} />
                    
                    {/* Cylinder 4 */}
                    <circle cx="112" cy="78" r="3.5" fill="none" stroke="#475569" strokeWidth="1" />
                    <circle cx="112" cy="78" r="1.5" fill={selectedSymptom === "rough-idle" ? "#f97316" : "#1e293b"} />
                  </g>
                </g>

                {/* 3. Car Battery (Clicking Start / Low Voltage) */}
                <g>
                  <rect 
                    x="56" y="80" width="16" height="21" rx="1.5" 
                    fill={selectedSymptom === "clicking-start" ? "rgba(234, 179, 8, 0.18)" : "#0c111e"}
                    stroke={selectedSymptom === "clicking-start" ? "#eab308" : "#2d3748"}
                    strokeWidth={selectedSymptom === "clicking-start" ? "1.8" : "1"}
                    className={`transition duration-300 ${selectedSymptom === "clicking-start" ? "animate-pulse" : ""}`}
                  />
                  {/* Battery positive/negative terminals */}
                  <rect x="58" y="78" width="3" height="2.5" fill={selectedSymptom === "clicking-start" ? "#ef4444" : "#334155"} />
                  <rect x="67" y="78" width="3" height="2.5" fill={selectedSymptom === "clicking-start" ? "#38bdf8" : "#334155"} />
                  
                  {/* Battery Charge level indicator lines */}
                  {selectedSymptom === "clicking-start" ? (
                    <line x1="60" y1="88" x2="68" y2="88" stroke="#eab308" strokeWidth="1.5" className="animate-pulse" />
                  ) : (
                    <line x1="60" y1="88" x2="68" y2="88" stroke="#2d3748" strokeWidth="1" />
                  )}
                </g>

                {/* 4. Air filter intake box and Mass Air Flow (MAF) Sensor assembly (Check Engine) */}
                <g>
                  {/* Mass Air Flow Sensor node on tube */}
                  <rect 
                    x="126" y="72" width="15" height="19" rx="2" 
                    fill={selectedSymptom === "check-engine" ? "rgba(14, 165, 233, 0.18)" : "#0c111e"}
                    stroke={selectedSymptom === "check-engine" ? "#38bdf8" : "#2d3748"}
                    strokeWidth={selectedSymptom === "check-engine" ? "1.8" : "1"}
                    className={`transition duration-300 ${selectedSymptom === "check-engine" ? "animate-pulse" : ""}`}
                  />
                  {/* Air intake tube ducting leading to center manifold block */}
                  <path 
                    d="M 126,82 C 118,84 108,78 100,78" 
                    fill="none" 
                    stroke={selectedSymptom === "check-engine" ? "#38bdf8" : "#2d3748"} 
                    strokeWidth={selectedSymptom === "check-engine" ? "2.2" : "1.2"} 
                    className={`transition duration-300 ${selectedSymptom === "check-engine" ? "animate-pulse" : ""}`}
                  />
                  {/* Detailed airbox element ridges */}
                  <line x1="129" y1="76" x2="138" y2="76" stroke={selectedSymptom === "check-engine" ? "#38bdf8" : "#273549"} strokeWidth="1" />
                  <line x1="129" y1="81" x2="138" y2="81" stroke={selectedSymptom === "check-engine" ? "#38bdf8" : "#273549"} strokeWidth="1" />
                  <line x1="129" y1="86" x2="138" y2="86" stroke={selectedSymptom === "check-engine" ? "#38bdf8" : "#273549"} strokeWidth="1" />
                </g>

                {/* Glowing Heat Exchanger / Radiator hoses (Engine Overheating) */}
                {selectedSymptom === "engine-overheating" && (
                  <path 
                    d="M 80,34 Q 72,50 82,58" 
                    fill="none" 
                    stroke="#ef4444" 
                    strokeWidth="1.8" 
                    className="animate-pulse" 
                  />
                )}

                {/* Hotspot Target Glowing Rings (OBD diagnostics lock overlays) */}
                <AnimatePresence>
                  {selectedSymptom === "check-engine" && (
                    <circle cx="120" cy="80" r="32" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: '120px 80px' }} />
                  )}
                  {selectedSymptom === "squeaking-brakes" && (
                    <g>
                      <circle cx="43" cy="82" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping" />
                      <circle cx="157" cy="82" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping" />
                      <circle cx="42" cy="272" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping" />
                      <circle cx="158" cy="272" r="14" fill="none" stroke="#f43f5e" strokeWidth="0.8" className="animate-ping" />
                    </g>
                  )}
                  {selectedSymptom === "engine-overheating" && (
                    <circle cx="100" cy="30" r="22" fill="none" stroke="#ef4444" strokeWidth="1" className="animate-ping" />
                  )}
                  {selectedSymptom === "clicking-start" && (
                    <circle cx="64" cy="90" r="18" fill="none" stroke="#eab308" strokeWidth="1" className="animate-ping" />
                  )}
                  {selectedSymptom === "rough-idle" && (
                    <circle cx="100" cy="66" r="30" fill="none" stroke="#f97316" strokeWidth="1" className="animate-ping" />
                  )}
                </AnimatePresence>
              </svg>

              {/* Float Panel Tooltip on Hover */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-full text-[10px] text-slate-300 font-mono flex items-center space-x-1.5 shadow-lg backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACTIVE OBD CONNECTION</span>
              </div>
            </div>

            {/* Glowing System Diagnostics Status */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isScanning ? "bg-amber-500 animate-ping" : selectedSymptom === "clicking-start" ? "bg-amber-500" : selectedSymptom === "engine-overheating" ? "bg-red-500" : "bg-sky-400"} shrink-0`} />
                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                  Target Component
                </span>
              </div>
              <span className="font-display font-semibold text-xs text-white uppercase tracking-wider">
                {selectedSymptom === "check-engine" ? "MAF Sensor Block" :
                 selectedSymptom === "squeaking-brakes" ? "Friction Pad Lining" :
                 selectedSymptom === "engine-overheating" ? "Thermal Coolant Unit" :
                 selectedSymptom === "clicking-start" ? "Battery Alternator" :
                 "Cylinder Firing Bus"}
              </span>
            </div>
          </div>

          {/* Interactive Digital Gauges & Diagnostics Output (Right Side) */}
          <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative min-h-[520px]">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />

            <div>
              <div className="border-b border-slate-800 pb-3 mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gauge className="h-4.5 w-4.5 text-sky-400" />
                  <span className="font-mono text-xs text-slate-300 uppercase tracking-wider font-semibold">
                    Live Telemetry Core
                  </span>
                </div>
                <span className="font-mono text-[9px] bg-slate-900 text-sky-400 px-2 py-0.5 rounded border border-slate-800 uppercase tracking-widest">
                  ISO-14230
                </span>
              </div>

              {/* The Live Gauges Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* RPM Gauge */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col relative overflow-hidden group hover:border-slate-700 transition">
                  <span className="font-display text-[10px] text-sky-400 uppercase tracking-wider font-semibold">Engine Spin Speed</span>
                  <span className="text-[9px] text-slate-500 font-sans leading-tight mt-0.5">How fast the engine rotates (RPM)</span>
                  <div className="my-1.5 flex items-baseline space-x-1">
                    <span className={`font-display font-bold text-xl transition ${selectedSymptom === "rough-idle" && scanResult ? "text-amber-500" : "text-white"}`}>
                      {rpm}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">RPM</span>
                  </div>
                  {/* Min/Max indicators */}
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full transition-all duration-200 ${selectedSymptom === "rough-idle" && scanResult ? "bg-amber-500" : "bg-sky-400"}`} 
                      style={{ width: `${Math.min((rpm / 4000) * 100, 100)}%` }} 
                    />
                  </div>
                  <span className="font-mono text-[8px] text-slate-400 mt-1.5 uppercase leading-none">
                    {rpm === 0 ? "🛑 STALLED" : rpm > 1200 ? "⚙️ WARMING UP" : selectedSymptom === "rough-idle" && scanResult ? "⚠️ ROUGH / BOUNCING" : "✅ NORMAL IDLE"}
                  </span>
                  <span className="text-[8px] text-slate-500 font-sans mt-0.5 leading-tight">
                    Normal idle is around 800 RPM.
                  </span>
                </div>

                {/* Coolant Temp Gauge */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col relative overflow-hidden group hover:border-slate-700 transition">
                  <span className="font-display text-[10px] text-sky-400 uppercase tracking-wider font-semibold">Engine Heat Level</span>
                  <span className="text-[9px] text-slate-500 font-sans leading-tight mt-0.5">Water & coolant temperature</span>
                  <div className="my-1.5 flex items-baseline space-x-1">
                    <span className={`font-display font-bold text-xl transition ${temp >= 100 ? "text-rose-500 animate-pulse" : "text-white"}`}>
                      {temp}°
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">C</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full transition-all duration-200 ${temp >= 100 ? "bg-rose-500" : "bg-sky-400"}`} 
                      style={{ width: `${Math.min((temp / 130) * 100, 100)}%` }} 
                    />
                  </div>
                  <span className={`font-mono text-[8px] mt-1.5 uppercase leading-none ${temp >= 100 ? "text-rose-500 font-bold" : "text-slate-400"}`}>
                    {temp >= 100 ? "🔥 OVERHEATING!" : "✅ SAFE TEMP"}
                  </span>
                  <span className="text-[8px] text-slate-500 font-sans mt-0.5 leading-tight">
                    Safe range is 80°C - 95°C.
                  </span>
                </div>

                {/* Battery Voltage Gauge */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col relative overflow-hidden group hover:border-slate-700 transition">
                  <span className="font-display text-[10px] text-sky-400 uppercase tracking-wider font-semibold">Battery Strength</span>
                  <span className="text-[9px] text-slate-500 font-sans leading-tight mt-0.5">Electrical power voltage</span>
                  <div className="my-1.5 flex items-baseline space-x-1">
                    <span className={`font-display font-bold text-xl transition ${volts < 12 ? "text-amber-500 animate-pulse" : "text-white"}`}>
                      {volts}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">V</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full transition-all duration-200 ${volts < 12 ? "bg-amber-500" : "bg-sky-400"}`} 
                      style={{ width: `${Math.min((volts / 15) * 100, 100)}%` }} 
                    />
                  </div>
                  <span className={`font-mono text-[8px] mt-1.5 uppercase leading-none ${volts < 12 ? "text-amber-500 font-bold" : "text-slate-400"}`}>
                    {volts < 12 ? "⚠️ WEAK BATTERY" : "✅ CHARGING ACTIVE"}
                  </span>
                  <span className="text-[8px] text-slate-500 font-sans mt-0.5 leading-tight">
                    12.6V is off, 14.2V is running.
                  </span>
                </div>

                {/* MAF Flow Rate Gauge */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col relative overflow-hidden group hover:border-slate-700 transition">
                  <span className="font-display text-[10px] text-sky-400 uppercase tracking-wider font-semibold">Engine Air Breathing</span>
                  <span className="text-[9px] text-slate-500 font-sans leading-tight mt-0.5">Air entering for clean fuel combustion</span>
                  <div className="my-1.5 flex items-baseline space-x-1">
                    <span className={`font-display font-bold text-xl transition ${selectedSymptom === "check-engine" && scanResult ? "text-amber-500 font-bold" : "text-white"}`}>
                      {maf}
                    </span>
                    <span className="font-mono text-[9px] text-slate-400">g/s</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1">
                    <div 
                      className={`h-full transition-all duration-200 ${selectedSymptom === "check-engine" && scanResult ? "bg-amber-500" : "bg-sky-400"}`} 
                      style={{ width: `${Math.min((maf / 15) * 100, 100)}%` }} 
                    />
                  </div>
                  <span className={`font-mono text-[8px] mt-1.5 uppercase leading-none ${selectedSymptom === "check-engine" && scanResult ? "text-amber-500 font-bold" : "text-slate-400"}`}>
                    {selectedSymptom === "check-engine" && scanResult ? "⚠️ SENSOR FAULT" : "✅ INTAKE OK"}
                  </span>
                  <span className="text-[8px] text-slate-500 font-sans mt-0.5 leading-tight">
                    Bad airflow wastes extra fuel.
                  </span>
                </div>
              </div>

              {/* Relatable Quick Guide Box */}
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 mb-4 text-xs">
                <span className="font-display text-[10px] text-sky-400 font-bold uppercase tracking-wider block mb-1">
                  💡 How does this relate to your drive?
                </span>
                <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                  These numbers are read directly from your car's central computer. When a part fails, it behaves abnormally (like an engine shaking with irregular spins, or running extremely hot). Repairing early stops minor issues from turning into major breakdowns!
                </p>
              </div>

              {/* Logs / Console area inside gauge card */}
              <div className="bg-slate-950 border border-slate-900 p-3 rounded-2xl font-mono text-[9px] text-slate-300 leading-normal max-h-[160px] overflow-y-auto space-y-1">
                {scanLogs.length === 0 && !isScanning && !scanResult && (
                  <div className="py-8 text-center text-slate-600">
                    <Cpu className="h-6 w-6 text-slate-800 mx-auto mb-1" />
                    <p>&gt; Device status: online</p>
                    <p>&gt; OBD-II bus link: idle</p>
                  </div>
                )}
                
                {scanLogs.map((log, index) => (
                  <div key={index} className="truncate">
                    <span className="text-sky-400 font-bold">&gt;</span> {log}
                  </div>
                ))}

                {isScanning && (
                  <div className="text-sky-400 animate-pulse font-bold mt-1">
                    &gt; Scanning bus PIDs: {scanProgress}% complete...
                  </div>
                )}
              </div>
            </div>

            {/* Micro scan details or warning summary if active */}
            {scanResult && !isScanning && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold block">
                    active alarm
                  </span>
                  <span className="font-display font-bold text-sm text-red-400 uppercase tracking-wider block">
                    {scanResult.code} code
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400 text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="font-mono font-bold">{scanResult.severity}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Scan Results Detail Card (Appears after successful trace) */}
        <AnimatePresence>
          {scanResult && !isScanning && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-8 bg-sky-50/20 border border-sky-300 rounded-2xl p-6 sm:p-8 shadow-[0_0_35px_rgba(56,189,248,0.2)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-sky-200/40">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600 shrink-0 shadow-inner">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-sky-600 uppercase tracking-widest font-bold">
                      Troubleshooter Fault Log Detected
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-gray-900 uppercase tracking-wide mt-0.5">
                      {scanResult.code} - {scanResult.name}
                    </h3>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-full text-xs font-bold font-mono tracking-widest uppercase text-center border shrink-0 ${getSeverityStyle(scanResult.severity)}`}>
                  {scanResult.severity} SEVERITY
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-sky-600">
                    Component Explanation
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">
                    {scanResult.explanation}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-sky-600">
                    Common Diagnostics Culprits
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1.5 font-light">
                    {scanResult.culprits.map((cul: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-sky-500 font-bold mt-0.5 leading-none">•</span>
                        <span>{cul}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-sky-600">
                    Professional Repair Steps
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed font-light">
                    {scanResult.fix}
                  </p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-8 pt-6 border-t border-sky-200/40 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                <div className="flex items-center space-x-3.5">
                  <div className="bg-sky-100/60 border border-sky-200/50 px-4 py-2 rounded-2xl text-center">
                    <span className="font-mono text-[9px] text-sky-600 uppercase tracking-widest block">
                      Nairobi Price Guide
                    </span>
                    <span className="font-mono text-base font-bold text-sky-700 block mt-0.5">
                      {scanResult.estCost}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-normal max-w-xs font-light">
                    *Based on genuine spare parts and labor in leading Nairobi workshops (Kilimani, Westlands, Karen, Mombasa Road).
                  </p>
                </div>

                <button
                  onClick={() => onBookService(scanResult.targetService, `OBD Code ${scanResult.code} (${scanResult.name}) decoded. Resolved from symptom: ${selectedSymptom}`)}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-display font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-lg transition flex items-center justify-center space-x-2 cursor-pointer shadow-[0_4px_20px_rgba(14,165,233,0.3)] hover:shadow-[0_4px_25px_rgba(14,165,233,0.45)] shrink-0"
                >
                  <BookOpen className="h-4.5 w-4.5" />
                  <span>Schedule Diagnostic Fix</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
