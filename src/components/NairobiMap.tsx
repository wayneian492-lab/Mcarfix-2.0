/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, Star, ShieldCheck } from "lucide-react";
import { Garage } from "../types";

interface NairobiMapProps {
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  filteredGarages: Garage[];
  onBookGarage: (garage: Garage) => void;
}

interface MapPinData {
  id: string;
  name: string;
  district: string;
  x: number;
  y: number;
  garageId: string;
}

const PIN_DATA: MapPinData[] = [
  { id: "p1", name: "Apex Auto Care", district: "Westlands", x: 150, y: 110, garageId: "g1" },
  { id: "p2", name: "Kilimani Elite", district: "Kilimani", x: 110, y: 180, garageId: "g2" },
  { id: "p3", name: "Auto Experts", district: "Mombasa Road", x: 230, y: 250, garageId: "g3" },
  { id: "p4", name: "Karen Luxury Autos", district: "Karen", x: 60, y: 290, garageId: "g4" },
];

export default function NairobiMap({
  selectedLocation,
  setSelectedLocation,
  filteredGarages,
  onBookGarage,
}: NairobiMapProps) {
  const [hoveredPin, setHoveredPin] = React.useState<MapPinData | null>(null);

  // Find matching garage for pins
  const getGarageForPin = (pin: MapPinData) => {
    return filteredGarages.find((g) => g.id === pin.garageId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between h-[450px] lg:h-[620px] transition-all duration-300">
      {/* Map Header */}
      <div className="border-b border-gray-100 pb-3 mb-3 flex justify-between items-center">
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900">
            Interactive Coverage Map
          </h4>
          <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
            NAIROBI METROPOLITAN GPS COORDS
          </span>
        </div>
        <div className="flex items-center space-x-1 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-full text-[9px] font-mono text-teal-700 font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>LIVE TRACKING</span>
        </div>
      </div>

      {/* Map Canvas Box */}
      <div className="relative flex-grow rounded-xl bg-slate-950 border border-slate-900 overflow-hidden flex items-center justify-center group/map">
        {/* Background Grid Lines */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none"
             style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "16px 16px" }} />

        {/* Outer Tech HUD Rings & Labels */}
        <div className="absolute inset-x-2 bottom-2 flex justify-between text-[8px] font-mono text-gray-500 pointer-events-none select-none">
          <span>LAT: 1.2921° S</span>
          <span>LNG: 36.8219° E</span>
        </div>

        {/* Vector SVG Roads & Rivers */}
        <svg
          viewBox="0 0 300 400"
          className="w-full h-full max-h-[340px] lg:max-h-[500px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Green Spaces (Karura Forest, Arboretum, Karen Plains) */}
          <path
            d="M 120,30 Q 180,10 240,40 Q 220,90 140,80 Z"
            fill="#10b981"
            fillOpacity="0.08"
            stroke="#10b981"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
          <path
            d="M 20,310 Q 50,280 80,340 Q 40,380 10,330 Z"
            fill="#10b981"
            fillOpacity="0.06"
            stroke="#10b981"
            strokeWidth="0.5"
          />

          {/* Nairobi River Curve */}
          <path
            d="M 10,130 Q 90,120 160,160 T 290,150"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
          />

          {/* Major Expressways / Arterial Highways */}
          {/* Waiyaki Way to Mombasa Road */}
          <path
            d="M 10,80 Q 120,110 180,190 T 295,310"
            fill="none"
            stroke="#475569"
            strokeWidth="1.5"
            strokeOpacity="0.3"
          />
          {/* Ngong Road */}
          <path
            d="M 10,260 Q 100,240 180,190"
            fill="none"
            stroke="#475569"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          {/* Ring Road */}
          <path
            d="M 150,40 C 120,160 110,220 60,330"
            fill="none"
            stroke="#475569"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="2 2"
          />

          {/* SVG Map Text Labels */}
          <text x="210" y="55" fill="#94a3b8" fillOpacity="0.4" fontSize="7" fontFamily="monospace">KARURA FOREST</text>
          <text x="22" y="350" fill="#94a3b8" fillOpacity="0.4" fontSize="7" fontFamily="monospace">KAREN PLAINS</text>
          <text x="220" y="325" fill="#4fd1c5" fillOpacity="0.4" fontSize="7" fontFamily="monospace" transform="rotate(25, 220, 325)">MOMBASA RD</text>
          <text x="25" y="90" fill="#94a3b8" fillOpacity="0.4" fontSize="7" fontFamily="monospace" transform="rotate(10, 25, 90)">WAIYAKI WAY</text>

          {/* Draw Map Pins */}
          {PIN_DATA.map((pin) => {
            const activeGarage = getGarageForPin(pin);
            const isSelected = selectedLocation.toLowerCase() === pin.district.toLowerCase();
            const isAnySelected = selectedLocation !== "All";
            const isDimmed = isAnySelected && !isSelected;

            // Determine display color
            const pinColorClass = activeGarage ? "text-signal" : "text-gray-500";
            const pulseColorClass = activeGarage ? "fill-signal" : "fill-gray-500";

            return (
              <g
                key={pin.id}
                className="cursor-pointer transition-all duration-300"
                onClick={() => setSelectedLocation(isSelected ? "All" : pin.district)}
                onMouseEnter={() => setHoveredPin(pin)}
                onMouseLeave={() => setHoveredPin(null)}
                opacity={isDimmed ? 0.35 : 1}
              >
                {/* Active Glowing Pulse */}
                {activeGarage && (
                  <>
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="12"
                      className={`animate-ping origin-center opacity-25 ${pulseColorClass}`}
                      style={{ animationDuration: "2s" }}
                    />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="6"
                      className={`opacity-40 ${pulseColorClass}`}
                    />
                  </>
                )}

                {/* Pin Center Point */}
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r="4"
                  fill={isSelected ? "#FF5E00" : activeGarage ? "#FF5E00" : "#475569"}
                  stroke="#ffffff"
                  strokeWidth="1"
                />

                {/* Visual anchor / marker flag */}
                <line
                  x1={pin.x}
                  y1={pin.y}
                  x2={pin.x}
                  y2={pin.y - 14}
                  stroke={isSelected ? "#FF5E00" : activeGarage ? "#4fd1c5" : "#475569"}
                  strokeWidth="1"
                />

                {/* Little Badge Label */}
                <rect
                  x={pin.x - 30}
                  y={pin.y - 25}
                  width="60"
                  height="10"
                  rx="2"
                  fill="#12151b"
                  fillOpacity="0.85"
                  stroke={isSelected ? "#FF5E00" : activeGarage ? "#4fd1c5" : "#334155"}
                  strokeWidth="0.5"
                />
                <text
                  x={pin.x}
                  y={pin.y - 18}
                  fill="#ffffff"
                  fontSize="6"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {pin.district.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / Tooltip HUD display overlay */}
        {hoveredPin && (() => {
          const matchingGarage = getGarageForPin(hoveredPin);
          return (
            <div className="absolute top-4 inset-x-4 bg-slate-900/95 border border-white/10 backdrop-blur-md p-3 rounded-xl flex items-center justify-between pointer-events-none z-10 transition-all duration-300">
              <div className="space-y-0.5">
                <span className="block text-[8px] font-mono text-signal font-bold uppercase tracking-widest">
                  LOCATED SYSTEM SPECIALIST
                </span>
                <span className="block text-xs font-display font-bold text-white uppercase tracking-wide">
                  {hoveredPin.name}
                </span>
                <span className="block text-3xs font-mono text-gray-400">
                  {hoveredPin.district} District • Vetted Unit
                </span>
              </div>
              {matchingGarage ? (
                <div className="flex items-center space-x-1.5 bg-signal/15 border border-signal/20 px-2 py-1 rounded-md">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="font-mono text-2xs font-bold text-signal">
                    {matchingGarage.rating.toFixed(1)}
                  </span>
                </div>
              ) : (
                <span className="text-[9px] font-mono text-amber-500 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-sm">
                  FILTER OUT
                </span>
              )}
            </div>
          );
        })()}
      </div>

      {/* Map Legend & Filter Reset Button */}
      <div className="mt-4 border-t border-gray-100 pt-3 flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-signal inline-block animate-pulse" />
            <span className="text-3xs text-gray-600 font-sans font-medium uppercase tracking-wider">
              Vetted Partner
            </span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-500 inline-block" />
            <span className="text-3xs text-gray-600 font-sans font-medium uppercase tracking-wider">
              Inactive District
            </span>
          </div>
        </div>

        {selectedLocation !== "All" && (
          <button
            onClick={() => setSelectedLocation("All")}
            className="text-[10px] font-mono font-bold text-signal hover:underline uppercase tracking-wider shrink-0"
          >
            Show All &times;
          </button>
        )}
      </div>
    </div>
  );
}
