/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, AlertTriangle, MapPin, Navigation, Phone, ShieldAlert, Truck, ChevronRight } from "lucide-react";

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SosModal({ isOpen, onClose }: SosModalProps) {
  const [emergencyType, setEmergencyType] = React.useState("mechanical-stall");
  const [district, setDistrict] = React.useState("Westlands");
  const [phone, setPhone] = React.useState("");
  const [name, setName] = React.useState("");
  
  // Dispatch Tracker States
  const [isDispatched, setIsDispatched] = React.useState(false);
  const [dispatchStep, setDispatchStep] = React.useState(1);
  const [secondsLeft, setSecondsLeft] = React.useState(480); // 8 minutes = 480 seconds
  const [gpsCoords, setGpsCoords] = React.useState({ lat: -1.2642, lng: 36.8044 }); // Westlands default

  // Sync GPS Coordinates with Nairobi districts
  React.useEffect(() => {
    switch (district) {
      case "Westlands":
        setGpsCoords({ lat: -1.2642, lng: 36.8044 });
        break;
      case "Nairobi CBD":
        setGpsCoords({ lat: -1.2921, lng: 36.8219 });
        break;
      case "Mombasa Road":
        setGpsCoords({ lat: -1.3324, lng: 36.8742 });
        break;
      case "Karen":
        setGpsCoords({ lat: -1.3204, lng: 36.7024 });
        break;
      case "Kilimani":
        setGpsCoords({ lat: -1.2882, lng: 36.7932 });
        break;
      case "Kiambu":
        setGpsCoords({ lat: -1.1645, lng: 36.8272 });
        break;
      default:
        setGpsCoords({ lat: -1.2921, lng: 36.8219 });
    }
  }, [district]);

  // Countdown and Step-Up Dispatch Simulator Timers
  React.useEffect(() => {
    let countdownInterval: any = null;
    let stepInterval: any = null;

    if (isDispatched) {
      // Countdown Timer
      countdownInterval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Progressive step increments
      stepInterval = setInterval(() => {
        setDispatchStep((prev) => (prev < 4 ? prev + 1 : 4));
      }, 8000); // Progress to next status every 8 seconds
    }

    return () => {
      clearInterval(countdownInterval);
      clearInterval(stepInterval);
    };
  }, [isDispatched]);

  if (!isOpen) return null;

  // Format countdown seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleSosRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !name) {
      alert("Please provide your contact name and active phone number.");
      return;
    }
    setIsDispatched(true);
    setDispatchStep(1);
    setSecondsLeft(480); // Reset countdown timer to 8:00
  };

  const resetAndClose = () => {
    setIsDispatched(false);
    setDispatchStep(1);
    setPhone("");
    setName("");
    onClose();
  };

  const emergencies = [
    { id: "mechanical-stall", label: "Engine Trouble or Stall", icon: "⚙️" },
    { id: "flat-tyre", label: "Flat Tyre or Puncture", icon: "🚘" },
    { id: "dead-battery", label: "Dead Battery or Starter", icon: "⚡" },
    { id: "accident-towing", label: "Towing or Recovery", icon: "🚨" },
  ];

  const districts = ["Westlands", "Nairobi CBD", "Mombasa Road", "Karen", "Kilimani", "Kiambu"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm animate-fade-in">
      
      {/* Alert Modal Panel */}
      <div className="relative bg-slate-900 border-2 border-signal/40 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Urgent Warning Header */}
        <div className="bg-slate-950 border-b border-white/5 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-signal">
            <div className="p-2 bg-signal/10 rounded-xl">
              <Truck className="h-6 w-6 text-signal" />
            </div>
            <div>
              <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest text-gray-400 block">
                mCarFix Support Network
              </span>
              <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mt-0.5">
                {isDispatched ? "Assistance Dispatched" : "Roadside Assistance"}
              </h3>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {isDispatched ? (
            /* Live Roadside Tracker UI */
            <div className="space-y-6 text-center animate-fade-in">
              
              {/* Massive Countdown Dial */}
              <div className="bg-slate-950 border border-white/5 p-5 rounded-2xl max-w-xs mx-auto space-y-1.5 relative overflow-hidden">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">
                  ESTIMATED ARRIVAL TIME
                </span>
                <div className="font-mono text-4xl sm:text-5xl font-extrabold text-signal tracking-tight">
                  {formatTime(secondsLeft)}
                </div>
                <div className="flex items-center justify-center space-x-1.5 text-teal-400 text-2xs font-mono uppercase tracking-wider">
                  <Navigation className="h-3 w-3 animate-spin text-teal-400" />
                  <span>Tracking support unit position...</span>
                </div>
              </div>

              {/* Progressive Steps Tracker */}
              <div className="max-w-md mx-auto space-y-4 pt-2">
                <div className="space-y-3">
                  {/* Step 1: Received */}
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${dispatchStep >= 1 ? "bg-teal-400 text-slate-900" : "bg-slate-800 border border-white/5 text-gray-400"}`}>
                      ✓
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-white">1. Assistance Request Received</span>
                      <span className="block text-3xs text-gray-400 font-sans mt-0.5">Request registered with AA Kenya roadside dispatch.</span>
                    </div>
                  </div>

                  {/* Step 2: Assigned */}
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${dispatchStep >= 2 ? "bg-teal-400 text-slate-900" : "bg-slate-800 border border-white/5 text-gray-400"}`}>
                      {dispatchStep >= 2 ? "✓" : "2"}
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-white">2. Local Responder Assigned</span>
                      <span className="block text-3xs text-gray-400 font-sans mt-0.5">Assigned Responder: Kamau • License Plate: KDG 405X.</span>
                    </div>
                  </div>

                  {/* Step 3: Enroute */}
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${dispatchStep >= 3 ? "bg-teal-400 text-slate-900" : "bg-slate-800 border border-white/5 text-gray-400"}`}>
                      {dispatchStep >= 3 ? "✓" : "3"}
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-white">3. Responder En-route to Your Location</span>
                      <span className="block text-3xs text-gray-400 font-sans mt-0.5">Departed Westlands support bay, tracking via Expressway.</span>
                    </div>
                  </div>

                  {/* Step 4: Arrival */}
                  <div className="flex items-center space-x-3.5 text-left">
                    <div className={`h-6 w-6 rounded-full flex items-center justify-center font-mono text-xs font-bold ${dispatchStep >= 4 ? "bg-teal-400 text-slate-900" : "bg-slate-800 border border-white/5 text-gray-400"}`}>
                      {dispatchStep >= 4 ? "🏁" : "4"}
                    </div>
                    <div>
                      <span className="block text-xs font-mono font-bold uppercase tracking-wider text-white">4. Arrival & Support</span>
                      <span className="block text-3xs text-gray-400 font-sans mt-0.5">Please turn on your hazard lights and stay safe inside.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dispatch Crew card details */}
              <div className="bg-slate-950 border border-white/5 p-4 rounded-xl text-left flex items-center justify-between">
                <div>
                  <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-mono">Assigned Support vehicle</span>
                  <span className="text-sm font-display font-bold uppercase tracking-wider text-white mt-1 block">
                    Kamau • AA Support Unit 08
                  </span>
                  <span className="text-2xs text-gray-400 font-sans mt-0.5 block">Contact Phone: +254 722 000 999</span>
                </div>
                <div className="p-3 bg-slate-900 border border-white/5 rounded-lg">
                  <Truck className="h-6 w-6 text-signal" />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={resetAndClose}
                className="w-full bg-slate-800 hover:bg-slate-755 border border-white/5 text-white font-display font-bold text-sm uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer"
              >
                Close Tracking Dashboard
              </button>
            </div>
          ) : (
            /* SOS Request Form UI */
            <form onSubmit={handleSosRequest} className="space-y-6">
              
              {/* Satellite GPS Reading Telemetry */}
              <div className="bg-slate-950 border border-white/5 p-4 rounded-xl flex items-center justify-between font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-gray-500 text-[9px] font-bold tracking-widest block uppercase">GPS LOCATION LOCKED</span>
                  <span className="text-teal-400 font-semibold block">{gpsCoords.lat.toFixed(4)}° S, {gpsCoords.lng.toFixed(4)}° E</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-[9px] font-bold tracking-widest block uppercase">SATELLITE ACCURACY</span>
                  <span className="text-white block font-semibold">±3 METERS</span>
                </div>
              </div>

              {/* 1. Emergency Type */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
                  1. Choose Current Incident Class *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {emergencies.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => setEmergencyType(e.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center space-x-3 cursor-pointer ${
                        emergencyType === e.id
                          ? "border-signal bg-signal/5 ring-1 ring-signal text-white font-semibold"
                          : "border-white/5 bg-slate-950/40 hover:border-white/10 text-gray-300"
                      }`}
                    >
                      <span className="text-xl shrink-0">{e.icon}</span>
                      <span className="font-display text-[11px] uppercase tracking-wider leading-tight text-white block max-w-[150px]">
                        {e.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. District Select */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
                  2. Current Nairobi Location Node *
                </label>
                <select
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-signal text-white px-4 py-3 rounded-xl font-sans text-xs outline-none transition-all cursor-pointer"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* 3. Driver Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
                    3. Driver Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Juma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
                    4. Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all"
                  />
                </div>
              </div>

              {/* Roadside assistance Terms */}
              <div className="bg-slate-950 border border-white/5 p-4 rounded-xl text-left text-xs space-y-1.5 flex items-start space-x-3">
                <ShieldAlert className="h-5 w-5 text-signal shrink-0 mt-0.5" />
                <div className="text-gray-300 leading-relaxed font-light text-[10px]">
                  <span className="font-semibold text-white block uppercase font-mono tracking-widest mb-1">Assistance Terms:</span>
                  Roadside assistance is dispatched in partnership with AA Kenya. A dispatch fee of KES 3,500 applies if professional towing hooks or flatbeds are engaged. Let's make sure you stay safe inside your vehicle.
                </div>
              </div>

              {/* Submit trigger */}
              <button
                type="submit"
                className="w-full bg-signal text-white hover:bg-signal/90 font-display font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer shadow-lg shadow-signal/20"
              >
                <span>Request Roadside Assistance</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
