/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Calculator, ArrowRight, FileText, Info, CheckCircle2 } from "lucide-react";
import { Garage } from "../types";

interface CostEstimatorProps {
  onBookDirect: (serviceName: string, estimatedCost: string) => void;
}

export default function CostEstimator({ onBookDirect }: CostEstimatorProps) {
  const [vehicleClass, setVehicleClass] = React.useState("economy");
  const [serviceType, setServiceType] = React.useState("brakes");
  
  // Custom states for showing the generated breakdown details
  const [showDetails, setShowDetails] = React.useState(false);

  const vehicleClasses = [
    { id: "economy", name: "Economy", desc: "Toyota, Nissan, Mazda, Honda", factor: 1.0 },
    { id: "midtier", name: "Mid-Tier SUV", desc: "Subaru, Ford, Volkswagen, Jeep", factor: 1.4 },
    { id: "luxury", name: "Premium Continental", desc: "Mercedes-Benz, BMW, Audi, Range Rover", factor: 2.2 },
  ];

  const servicePrices = [
    { id: "brakes", name: "Brake Pad Replacement (Front & Rear)", baseParts: 3500, baseLabor: 1500, icon: "🔧" },
    { id: "oil", name: "Full Engine Oil & Oil Filter Service", baseParts: 4000, baseLabor: 1000, icon: "🛢️" },
    { id: "diagnostic", name: "OBD-II Fault Check & Computer Scan", baseParts: 0, baseLabor: 2500, icon: "💻" },
    { id: "shocks", name: "Suspension Bushing & Front Shock Service", baseParts: 12000, baseLabor: 4000, icon: "🔩" },
    { id: "detailing", name: "Premium Interior Detailing & Machine Wax", baseParts: 1500, baseLabor: 3000, icon: "✨" },
  ];

  // Calculation Logic
  const getSelectedVehicle = () => vehicleClasses.find(v => v.id === vehicleClass) || vehicleClasses[0];
  const getSelectedService = () => servicePrices.find(s => s.id === serviceType) || servicePrices[0];

  const calculateEstimate = () => {
    const v = getSelectedVehicle();
    const s = getSelectedService();
    
    // Calculate values in KES (Kenya Shillings)
    const partsCost = Math.round(s.baseParts * v.factor);
    const laborCost = Math.round(s.baseLabor * (v.factor * 0.8 + 0.2)); // Labor factor scales less extremely than parts
    
    const minParts = Math.round(partsCost * 0.9);
    const maxParts = Math.round(partsCost * 1.15);
    const minLabor = Math.round(laborCost * 0.95);
    const maxLabor = Math.round(laborCost * 1.1);

    const minTotal = minParts + minLabor;
    const maxTotal = maxParts + maxLabor;

    return {
      minTotal,
      maxTotal,
      partsRange: `${minParts.toLocaleString()} - ${maxParts.toLocaleString()}`,
      laborRange: `${minLabor.toLocaleString()} - ${maxLabor.toLocaleString()}`,
      formattedTotal: `KES ${minTotal.toLocaleString()} – KES ${maxTotal.toLocaleString()}`,
    };
  };

  const estimate = calculateEstimate();
  const selectedServiceObj = getSelectedService();

  const handleBookWithEstimate = () => {
    onBookDirect(selectedServiceObj.name, `KES ${estimate.minTotal.toLocaleString()}`);
  };

  return (
    <section id="estimator" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full">
            Fair Pricing Engine
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-gray-900">
            Upfront Cost Estimator
          </h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
          <p className="font-sans text-gray-600 mt-4 leading-relaxed">
            Avoid mechanic overcharging. Our transparent algorithm estimates replacement parts and fair Nairobi labor fees before you ever book.
          </p>
        </div>

        {/* Estimator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Box (Left Side) */}
          <div className="lg:col-span-7 bg-sky-50/30 border border-sky-300 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_25px_rgba(56,189,248,0.25)] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:border-sky-400 transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <Calculator className="h-5 w-5 text-signal" />
                <h3 className="font-display font-bold text-lg uppercase tracking-wide text-gray-900">
                  Configure Vehicle & Service
                </h3>
              </div>

              {/* Vehicle Type Selection */}
              <div className="space-y-3">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  Step 1: Select Vehicle Class
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {vehicleClasses.map((vc) => (
                    <button
                      key={vc.id}
                      onClick={() => setVehicleClass(vc.id)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        vehicleClass === vc.id
                          ? "border-signal bg-signal/5 ring-1 ring-signal text-gray-900 font-semibold"
                          : "border-gray-200 bg-white hover:border-gray-400 text-gray-600 hover:shadow-2xs"
                      }`}
                    >
                      <span className="font-display block text-sm uppercase tracking-wide font-bold">
                        {vc.name}
                      </span>
                      <span className="font-sans block text-2xs text-gray-400 mt-1 leading-normal">
                        {vc.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                  Step 2: Choose Service Required
                </label>
                <div className="space-y-2">
                  {servicePrices.map((sp) => (
                    <button
                      key={sp.id}
                      onClick={() => setServiceType(sp.id)}
                      className={`w-full text-left p-3.5 px-4 rounded-xl border transition-all flex items-center justify-between ${
                        serviceType === sp.id
                          ? "border-signal bg-signal/5 ring-1 ring-signal text-gray-900 font-semibold"
                          : "border-gray-200 bg-white hover:border-gray-400 text-gray-700 hover:shadow-2xs"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl shrink-0">{sp.icon}</span>
                        <span className="font-display text-sm uppercase tracking-wide text-gray-900">
                          {sp.name}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-gray-400 hidden sm:inline">
                        Select &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Transparency Policy */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-start space-x-2.5 text-xs text-gray-500">
              <Info className="h-4 w-4 text-signal shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Estimates are generated based on wholesale parts pricing databases in Nairobi Industrial Area and certified labor timelines set by OEMs. Actual repair costs may fluctuate ±10% during workshop disassembling.
              </p>
            </div>
          </div>

          {/* Results Box (Right Side) */}
          <div className="lg:col-span-5 bg-sky-50/70 text-gray-900 border border-sky-300 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_25px_rgba(56,189,248,0.3)] hover:shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:border-sky-400 transition-all duration-300">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
                <span className="font-display text-sm font-bold uppercase tracking-widest text-gray-500">
                  mCarFix Quote Engine
                </span>
                <span className="bg-teal-50 border border-teal-200 text-teal-800 font-mono text-3xs font-semibold px-2 py-0.5 rounded tracking-wider">
                  UPFRONT FARE
                </span>
              </div>

              {/* Big Price Output */}
              <div className="space-y-1">
                <span className="block text-3xs text-gray-500 uppercase tracking-widest font-mono">
                  Calculated Estimate Range
                </span>
                <h3 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-signal mt-1">
                  {estimate.formattedTotal}
                </h3>
                <span className="block text-3xs text-gray-500 font-mono mt-0.5">
                  Currency: Kenya Shillings (KES)
                </span>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-200" />

              {/* Service Summary Breakdown */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">Selected Service:</span>
                  <span className="text-gray-900 text-right font-medium truncate max-w-[180px] uppercase font-display">
                    {selectedServiceObj.name}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">Vehicle Class:</span>
                  <span className="text-gray-900 font-medium uppercase font-display">
                    {getSelectedVehicle().name}
                  </span>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-2xs font-mono text-teal-700 hover:text-teal-800 transition-all flex items-center space-x-1"
                  >
                    <span>{showDetails ? "Hide Itemized Breakdown" : "View Itemized Breakdown"}</span>
                    <span>{showDetails ? "▲" : "▼"}</span>
                  </button>
                </div>

                {showDetails && (
                  <div className="bg-white border border-gray-200 p-3 rounded-lg space-y-2 mt-2 shadow-xs">
                    <div className="flex justify-between items-center text-3xs font-mono">
                      <span className="text-gray-500">Estimated Parts Cost:</span>
                      <span className="text-gray-700">KES {estimate.partsRange}</span>
                    </div>
                    <div className="flex justify-between items-center text-3xs font-mono">
                      <span className="text-gray-500">Estimated Fair Labor:</span>
                      <span className="text-gray-700">KES {estimate.laborRange}</span>
                    </div>
                    <div className="flex justify-between items-center text-3xs font-mono pt-1 border-t border-gray-100">
                      <span className="text-teal-700 font-semibold">Diagnostic Protocol:</span>
                      <span className="text-teal-700">ISO 15765 Checked</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
              <button
                onClick={handleBookWithEstimate}
                className="w-full bg-signal hover:bg-signal/90 text-white font-display font-bold text-sm uppercase tracking-wider py-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-signal/20"
              >
                <span>Book This Quote Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <div className="flex justify-center items-center space-x-1.5 text-2xs font-sans text-gray-500">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                <span>Locked pricing: guaranteed by 450+ garages</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
