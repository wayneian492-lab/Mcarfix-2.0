/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { MapPin, Star, ShieldCheck, Activity, Wifi, Users, Clock, Compass, AlertTriangle, ExternalLink } from "lucide-react";
import { Garage } from "../types";
import { APIProvider, Map, AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";

interface NairobiMapProps {
  selectedLocation: string;
  setSelectedLocation: (loc: string) => void;
  filteredGarages: Garage[];
  onBookGarage: (garage: Garage) => void;
  hoveredGarageId?: string | null;
  setHoveredGarageId?: (id: string | null) => void;
}

interface MapPinData {
  id: string;
  name: string;
  district: string;
  lat: number;
  lng: number;
  garageId: string;
}

interface HubData {
  id: string;
  name: string;
  district: string;
  mechanicsCount: number;
  avgResponseTime: string;
  signalStrength: number;
  status: "OPTIMAL" | "BUSY" | "STANDBY";
  load: number;
  garageId: string;
}

const PIN_DATA: MapPinData[] = [
  { id: "p1", name: "Apex Auto Care", district: "Westlands", lat: -1.2682, lng: 36.8044, garageId: "g1" },
  { id: "p2", name: "Kilimani Elite", district: "Kilimani", lat: -1.2912, lng: 36.7905, garageId: "g2" },
  { id: "p3", name: "Auto Experts", district: "Mombasa Road", lat: -1.3218, lng: 36.8523, garageId: "g3" },
  { id: "p4", name: "Karen Luxury Autos", district: "Karen", lat: -1.3200, lng: 36.7032, garageId: "g4" },
];

const HUBS: HubData[] = [
  { id: "h1", name: "Apex Dispatch Center", district: "Westlands", mechanicsCount: 4, avgResponseTime: "11 min", signalStrength: 98, status: "OPTIMAL", load: 65, garageId: "g1" },
  { id: "h2", name: "Kilimani Response Unit", district: "Kilimani", mechanicsCount: 3, avgResponseTime: "14 min", signalStrength: 95, status: "OPTIMAL", load: 40, garageId: "g2" },
  { id: "h3", name: "Automotive Experts Hub", district: "Mombasa Road", mechanicsCount: 2, avgResponseTime: "18 min", signalStrength: 88, status: "STANDBY", load: 25, garageId: "g3" },
  { id: "h4", name: "Karen Luxury Fleet", district: "Karen", mechanicsCount: 2, avgResponseTime: "22 min", signalStrength: 91, status: "BUSY", load: 85, garageId: "g4" },
];

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY";

// Helper component to control map panning and zooming based on the selection
function MapController({ selectedLocation }: { selectedLocation: string }) {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;
    if (selectedLocation === "All") {
      // General Nairobi center
      map.panTo({ lat: -1.2921, lng: 36.8219 });
      map.setZoom(12);
    } else {
      const pin = PIN_DATA.find((p) => p.district.toLowerCase() === selectedLocation.toLowerCase());
      if (pin) {
        map.panTo({ lat: pin.lat, lng: pin.lng });
        map.setZoom(14);
      }
    }
  }, [map, selectedLocation]);

  return null;
}

export default function NairobiMap({
  selectedLocation,
  setSelectedLocation,
  filteredGarages,
  onBookGarage,
  hoveredGarageId = null,
  setHoveredGarageId,
}: NairobiMapProps) {
  const [activeTab, setActiveTab] = React.useState<"radar" | "telemetry">("radar");
  const [hoveredPin, setHoveredPin] = React.useState<MapPinData | null>(null);

  // Find matching garage for pins
  const getGarageForPin = (pin: MapPinData) => {
    return filteredGarages.find((g) => g.id === pin.garageId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col justify-between h-[480px] lg:h-[620px] transition-all duration-300">
      {/* Map Header */}
      <div className="border-b border-gray-100 pb-3 mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gray-900">
            Interactive GPS System
          </h4>
          <span className="text-[10px] text-gray-500 font-mono block mt-0.5">
            NAIROBI REGIONAL COMMAND PANEL
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200 text-[10px] font-mono font-bold self-start sm:self-center">
          <button
            onClick={() => setActiveTab("radar")}
            className={`px-3 py-1 rounded-md transition-all duration-200 ${
              activeTab === "radar"
                ? "bg-white text-signal shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            RADAR MAP
          </button>
          <button
            onClick={() => setActiveTab("telemetry")}
            className={`px-3 py-1 rounded-md transition-all duration-200 ${
              activeTab === "telemetry"
                ? "bg-white text-signal shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            LIVE HUD
          </button>
        </div>
      </div>

      {/* Map or Telemetry View */}
      {activeTab === "radar" ? (
        <div className="relative flex-grow rounded-xl bg-slate-950 border border-slate-900 overflow-hidden flex flex-col items-center justify-center">
          {hasValidKey ? (
            <APIProvider apiKey={API_KEY} version="weekly">
              <div className="w-full h-full relative min-h-[300px]">
                <Map
                  defaultCenter={{ lat: -1.2921, lng: 36.8219 }}
                  defaultZoom={12}
                  mapId="DEMO_MAP_ID"
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                  style={{ width: "100%", height: "100%" }}
                  gestureHandling="cooperative"
                  disableDefaultUI={true}
                >
                  <MapController selectedLocation={selectedLocation} />

                  {PIN_DATA.map((pin) => {
                    const activeGarage = getGarageForPin(pin);
                    const isSelected = selectedLocation.toLowerCase() === pin.district.toLowerCase();
                    const isHovered = hoveredGarageId === pin.garageId;
                    const isAnySelected = selectedLocation !== "All";
                    const isDimmed = isAnySelected && !isSelected && !isHovered;

                    if (!activeGarage) return null;

                    return (
                      <AdvancedMarker
                        key={pin.id}
                        position={{ lat: pin.lat, lng: pin.lng }}
                        onClick={() => setSelectedLocation(isSelected ? "All" : pin.district)}
                        title={pin.name}
                      >
                        <div
                          onMouseEnter={() => setHoveredGarageId?.(pin.garageId)}
                          onMouseLeave={() => setHoveredGarageId?.(null)}
                          className="cursor-pointer transition-transform duration-200"
                        >
                          <Pin
                            background={isSelected || isHovered ? "#FF5E00" : "#0d9488"}
                            borderColor="#ffffff"
                            glyphColor="#ffffff"
                            scale={isSelected || isHovered ? 1.35 : 1.0}
                          />
                        </div>
                      </AdvancedMarker>
                    );
                  })}
                </Map>

                {/* HUD Coordinates Display Overlay on Map */}
                <div className="absolute bottom-2 inset-x-2 flex justify-between text-[8px] font-mono text-white bg-slate-950/70 backdrop-blur-xs px-2 py-1 rounded border border-white/5 pointer-events-none select-none">
                  <span>LAT: 1.2921° S</span>
                  <span>LNG: 36.8219° E</span>
                </div>
              </div>
            </APIProvider>
          ) : (
            /* Splash instructions when no API key configured */
            <div className="absolute inset-0 bg-slate-950 p-5 flex flex-col justify-between overflow-y-auto text-left">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-amber-500">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <span className="font-mono text-xs font-black tracking-widest uppercase">
                    GOOGLE MAPS KEY REQUIRED
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-gray-300 font-sans text-xs leading-relaxed font-light">
                    An active API key is required to render the live Google Map of Nairobi. Follow these steps to provision and inject your key:
                  </p>

                  <div className="space-y-2 font-sans text-2xs text-gray-400">
                    <div className="flex items-start gap-2 bg-slate-900 border border-white/5 p-2 rounded-lg">
                      <span className="font-mono text-amber-500 font-bold shrink-0">STEP 1</span>
                      <p>
                        Get an API key with Maps JavaScript API enabled from the{" "}
                        <a
                          href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-signal hover:underline inline-flex items-center gap-0.5 font-bold"
                        >
                          Google Cloud Console <ExternalLink className="h-2.5 w-2.5 inline" />
                        </a>
                      </p>
                    </div>

                    <div className="flex items-start gap-2 bg-slate-900 border border-white/5 p-2 rounded-lg">
                      <span className="font-mono text-amber-500 font-bold shrink-0">STEP 2</span>
                      <p>
                        Open <strong className="text-white font-medium">Settings</strong> (⚙️ gear icon, top-right corner) &rarr; <strong className="text-white font-medium">Secrets</strong>
                      </p>
                    </div>

                    <div className="flex items-start gap-2 bg-slate-900 border border-white/5 p-2 rounded-lg">
                      <span className="font-mono text-amber-500 font-bold shrink-0">STEP 3</span>
                      <p>
                        Add a secret named <code className="text-amber-400 bg-black/40 px-1 py-0.5 rounded font-mono">GOOGLE_MAPS_PLATFORM_KEY</code>, paste your key, and press Enter.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-white/5 pt-3">
                <p className="text-[10px] font-mono text-gray-500 text-center">
                  The application compiles automatically upon secret injection.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Detailed dispatch HUD / Telemetry view alternative */
        <div className="flex-grow flex flex-col justify-start gap-3 overflow-y-auto max-h-[340px] lg:max-h-[500px] pr-1">
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-3 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-diagnostic animate-pulse" />
              <div>
                <span className="block text-[9px] font-mono text-gray-400 uppercase leading-none">NETWORK CAPACITY</span>
                <span className="block text-xs font-bold uppercase tracking-wider text-white">4 Active Regions Online</span>
              </div>
            </div>
            <div className="text-right font-mono text-[9px] text-gray-400">
              <span>LATENCY: 42ms</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {HUBS.map((hub) => {
              const isSelected = selectedLocation.toLowerCase() === hub.district.toLowerCase();
              const isHovered = hoveredGarageId === hub.garageId;

              return (
                <div
                  key={hub.id}
                  onClick={() => setSelectedLocation(isSelected ? "All" : hub.district)}
                  onMouseEnter={() => setHoveredGarageId?.(hub.garageId)}
                  onMouseLeave={() => setHoveredGarageId?.(null)}
                  className={`border rounded-xl p-3.5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected || isHovered
                      ? "bg-signal/5 border-signal shadow-md shadow-signal/5 ring-1 ring-signal/30"
                      : "bg-gray-50 border-gray-200/80 hover:bg-white hover:border-gray-400 hover:shadow-xs"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          hub.status === "OPTIMAL" ? "bg-emerald-500" : hub.status === "BUSY" ? "bg-amber-500" : "bg-blue-500"
                        }`} />
                        <h5 className="font-display font-bold text-xs uppercase tracking-wide text-gray-900">
                          {hub.name}
                        </h5>
                      </div>
                      <span className="block text-[10px] font-mono text-gray-500 mt-0.5">
                        {hub.district.toUpperCase()} DISTRICT
                      </span>
                    </div>

                    <span className={`text-[8px] font-mono font-black px-2 py-0.5 rounded-sm uppercase ${
                      hub.status === "OPTIMAL"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : hub.status === "BUSY"
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}>
                      {hub.status}
                    </span>
                  </div>

                  {/* On-duty metrics & load bar */}
                  <div className="mt-3.5 space-y-2">
                    <div className="flex justify-between text-[9px] font-mono text-gray-500">
                      <span>LOAD CAPACITY</span>
                      <span className="font-bold text-gray-800">{hub.load}%</span>
                    </div>
                    
                    {/* Visual custom load bar */}
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          hub.load > 80 ? "bg-signal" : hub.load > 50 ? "bg-amber-500" : "bg-diagnostic"
                        }`}
                        style={{ width: `${hub.load}%` }}
                      />
                    </div>

                    {/* Meta Indicators */}
                    <div className="flex items-center justify-between gap-1 pt-1 border-t border-gray-100 text-[9px] font-mono text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span>{hub.mechanicsCount} Staff</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span>{hub.avgResponseTime}</span>
                      </div>
                      <div className="flex items-center space-x-0.5">
                        <Wifi className="h-3 w-3 text-diagnostic" />
                        <span>{hub.signalStrength}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
            className="text-[10px] font-mono font-bold text-signal hover:underline uppercase tracking-wider shrink-0 animate-fade-in"
          >
            Show All &times;
          </button>
        )}
      </div>
    </div>
  );
}
