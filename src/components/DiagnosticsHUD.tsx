/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Terminal, ShieldAlert, CheckCircle2, ChevronRight, RefreshCw, Cpu, HelpCircle } from "lucide-react";

interface DiagnosticsHUDProps {
  onBookService: (serviceName: string, notes: string) => void;
}

export default function DiagnosticsHUD({ onBookService }: DiagnosticsHUDProps) {
  const [selectedSymptom, setSelectedSymptom] = React.useState("check-engine");
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanProgress, setScanProgress] = React.useState(0);
  const [scanLogs, setScanLogs] = React.useState<string[]>([]);
  const [scanResult, setScanResult] = React.useState<any | null>(null);

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
    <section id="diagnostics-info" className="bg-asphalt py-20 text-white border-t border-steel/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-diagnostic font-bold uppercase tracking-widest bg-steel px-3 py-1 rounded">
            Virtual Troubleshooter
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-white">
            mCarFix OBD-II Diagnostic Tool
          </h2>
          <div className="h-1 w-12 bg-diagnostic mx-auto mt-4" />
          <p className="font-sans text-gray-400 mt-4 leading-relaxed font-light">
            Don't pay KES 3,000 for a simple scan. Select your vehicle's physical symptom below and initiate our simulator to decode the underlying fault logs instantly.
          </p>
        </div>

        {/* Diagnostic Simulator Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Symptoms List (Left Side) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-display font-bold text-base uppercase tracking-wider text-gray-400 mb-2 flex items-center space-x-2">
              <HelpCircle className="h-4 w-4 text-signal" />
              <span>Select Current Symptom</span>
            </h3>

            <div className="space-y-2.5">
              {symptoms.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    if (!isScanning) {
                      setSelectedSymptom(s.id);
                      setScanResult(null);
                    }
                  }}
                  disabled={isScanning}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                    selectedSymptom === s.id
                      ? "border-diagnostic bg-diagnostic/5 ring-1 ring-diagnostic text-white font-semibold"
                      : "border-steel/80 bg-steel/40 hover:border-steel hover:bg-steel/60 text-gray-300"
                  } ${isScanning ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-xl shrink-0">{s.icon}</span>
                    <span className="font-display text-sm uppercase tracking-wider text-white">
                      {s.label}
                    </span>
                  </div>
                  <ChevronRight className={`h-4 w-4 ${selectedSymptom === s.id ? "text-diagnostic" : "text-gray-500"}`} />
                </button>
              ))}
            </div>

            {/* Launch Scanner Trigger */}
            <button
              onClick={startAnalysis}
              disabled={isScanning}
              className={`w-full ${isScanning ? "bg-steel text-gray-500" : "bg-diagnostic hover:bg-diagnostic/90 text-asphalt"} font-display font-bold uppercase tracking-wider text-sm py-4 rounded-xl flex items-center justify-center space-x-2.5 mt-6 transition-all shadow-lg shadow-diagnostic/5 cursor-pointer`}
            >
              <RefreshCw className={`h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
              <span>{isScanning ? "Scanning OBD Buses..." : "Initiate System Trace Scan"}</span>
            </button>
          </div>

          {/* Trace Terminal Console (Right Side) */}
          <div className="lg:col-span-7 bg-steel border-2 border-steel/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[460px]">
            
            {/* Terminal Top bar */}
            <div className="bg-asphalt px-5 py-3 border-b border-steel/60 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="h-4.5 w-4.5 text-diagnostic" />
                <span className="font-mono text-xs text-gray-300 uppercase tracking-wider font-semibold">
                  OBD-II Console - Trace Console
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-warning" />
                <span className="h-2 w-2 rounded-full bg-signal" />
                <span className="h-2 w-2 rounded-full bg-diagnostic" />
              </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 bg-black/85 p-5 font-mono text-xs overflow-y-auto leading-relaxed text-gray-300 space-y-1.5 select-text relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_96%,rgba(79,209,197,0.03)_96%)] bg-[size:100%_20px] pointer-events-none" />
              
              {scanLogs.length === 0 && !isScanning && !scanResult && (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-16">
                  <Cpu className="h-10 w-10 text-steel-light mb-3 animate-pulse" />
                  <p>&gt; Connection idle.</p>
                  <p className="text-3xs mt-1">Select a symptom and run "Initiate System Trace Scan" above.</p>
                </div>
              )}

              {/* Live Log Stream */}
              {scanLogs.map((log, index) => (
                <div key={index} className="text-gray-300">
                  <span className="text-diagnostic font-semibold">&gt;</span> {log}
                </div>
              ))}

              {/* scanning progress percentage */}
              {isScanning && (
                <div className="pt-4 text-diagnostic">
                  <span className="inline-block animate-pulse">■ Analyzing system data bus... {scanProgress}%</span>
                  <div className="w-full bg-steel/30 h-1.5 rounded-full overflow-hidden mt-1 max-w-xs">
                    <div className="h-full bg-diagnostic transition-all duration-200" style={{ width: `${scanProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Complete Diagnostic Output Card */}
              {scanResult && !isScanning && (
                <div className="mt-4 pt-4 border-t border-steel/50 space-y-4 animate-fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-gray-500 uppercase text-3xs tracking-wider">Detected Code</span>
                      <div className="text-base text-warning font-bold flex items-center space-x-2">
                        <span>{scanResult.code}</span>
                        <span className="text-white text-xs font-normal">|</span>
                        <span className="text-white text-sm font-semibold">{scanResult.name}</span>
                      </div>
                    </div>

                    <div className={`border px-2.5 py-1 rounded text-2xs font-bold tracking-widest uppercase ${getSeverityStyle(scanResult.severity)}`}>
                      {scanResult.severity}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-normal font-sans border-l-2 border-diagnostic pl-3 py-0.5">
                    {scanResult.explanation}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-sans">
                    <div className="space-y-1.5">
                      <span className="font-mono text-3xs text-gray-500 uppercase tracking-widest font-bold">Common Culprits</span>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {scanResult.culprits.map((cul: string, idx: number) => (
                          <li key={idx} className="flex items-start space-x-1.5">
                            <span className="text-signal font-mono font-bold leading-none mt-0.5">•</span>
                            <span>{cul}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-mono text-3xs text-gray-500 uppercase tracking-widest font-bold">Nairobi Mechanic Solution</span>
                      <p className="text-xs text-gray-300 leading-normal">
                        {scanResult.fix}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-steel/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <span className="font-mono text-3xs text-gray-500 uppercase tracking-widest">Nairobi Price Range</span>
                      <div className="font-mono text-sm font-bold text-signal">{scanResult.estCost}</div>
                    </div>

                    <button
                      onClick={() => onBookService(scanResult.targetService, `OBD Code ${scanResult.code} (${scanResult.name}) decoded. Resolved from symptom: ${selectedSymptom}`)}
                      className="bg-signal text-asphalt hover:bg-signal/90 font-display font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Book Code Fix</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
