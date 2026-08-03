/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, MapPin, Star, ShieldCheck, X, Phone } from "lucide-react";
import { MOCK_GARAGES, Garage } from "../types";
import { motion } from "motion/react";
import { TiltCard } from "./TiltCard";
import garageBgClassicImg from "../assets/images/garage_bg_classic_1785671455542.jpg";

const NairobiMap = React.lazy(() => import("./NairobiMap"));

function MapSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 h-[480px] lg:h-[620px] flex flex-col justify-center items-center shadow-2xl w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="font-mono text-xs text-amber-400 uppercase tracking-widest font-bold">LOADING GPS RADAR SYSTEM...</span>
      </div>
    </div>
  );
}

function GarageSkeleton() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between h-full shadow-xl animate-pulse backdrop-blur-xl">
      <div>
        <div className="h-48 sm:h-52 w-full bg-white/10" />
        <div className="p-6 space-y-4">
          <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
          <div className="h-4 w-1/2 bg-white/10 rounded-lg" />
          <div className="space-y-2 pt-2">
            <div className="h-3 w-1/4 bg-white/10 rounded-md" />
            <div className="flex gap-2">
              <div className="h-5 w-16 bg-white/10 rounded-full" />
              <div className="h-5 w-16 bg-white/10 rounded-full" />
              <div className="h-5 w-16 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-12 bg-white/10 rounded-md" />
          <div className="h-4 w-24 bg-white/10 rounded-md" />
        </div>
        <div className="h-10 w-28 bg-white/10 rounded-lg" />
      </div>
    </div>
  );
}

interface GarageFinderProps {
  onBookGarage: (garage: Garage) => void;
  selectedServiceFilter: string;
  onClearServiceFilter: () => void;
}

// Distance dictionary for mock garages to fit the diagnostic localization tag
const GARAGE_DISTANCES: Record<string, string> = {
  "g1": "1.2 km away (Westlands Hub)",
  "g2": "2.8 km away (Kilimani Sector)",
  "g3": "5.4 km away (Mombasa Rd Corridor)",
  "g4": "8.1 km away (Karen Enclave)",
};

export default function GarageFinder({ onBookGarage, selectedServiceFilter, onClearServiceFilter }: GarageFinderProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("All");
  const [hoveredGarageId, setHoveredGarageId] = React.useState<string | null>(null);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setIsSearching(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedLocation, selectedServiceFilter]);

  const locations = ["All", "Westlands", "Kilimani", "Karen", "Mombasa Road"];

  // Filter garages
  const filteredGarages = MOCK_GARAGES.filter((garage) => {
    // Search query match
    const matchesSearch =
      garage.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      garage.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Location match
    const matchesLocation =
      selectedLocation === "All" ||
      garage.location.toLowerCase().includes(selectedLocation.toLowerCase());

    // Service specialty match (from clicking on services grid or selected filter)
    const matchesService =
      !selectedServiceFilter ||
      garage.services.some(
        (s) => s.toLowerCase() === selectedServiceFilter.toLowerCase()
      );

    return matchesSearch && matchesLocation && matchesService;
  });

  return (
    <section 
      id="garages" 
      className="relative py-24 text-white border-t border-b border-white/10 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${garageBgClassicImg})` }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0e]/95 via-[#0a0c0e]/85 to-[#0a0c0e]/95 pointer-events-none z-0" />

      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-1.5 rounded-full inline-flex items-center space-x-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>SYS.PARTNERS</span>
            </span>
            <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-white mt-3">
              Nairobi Garage Finder
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-400 mt-4 rounded-full" />
            <p className="font-sans text-gray-300 mt-4 leading-relaxed max-w-2xl font-light text-base sm:text-lg">
              Connect directly with mCarFix authorized service centers. All garages are fully vetted for diagnostic equipment quality, parts integrity, and fair labor pricing.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block text-left md:text-right">
              Database Sync Status
            </span>
            <span className="font-mono text-xs text-teal-400 font-semibold uppercase tracking-wider flex items-center space-x-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span>● 450+ Garages Online</span>
            </span>
          </div>
        </motion.div>

        {/* Search & Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-2xl"
        >
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search garage name, location, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/25 focus:border-amber-500 text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl font-sans text-sm outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-1 top-1 text-gray-400 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Location Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-white/25 focus:border-amber-500 text-white px-4 py-3 rounded-xl font-sans text-sm outline-none transition-all cursor-pointer [&>option]:bg-gray-900 [&>option]:text-white"
            >
              <option value="" disabled>Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All" ? "All Districts" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Active Specialty Filter Info */}
          <div className="md:col-span-4 flex items-center justify-between md:justify-end space-x-3">
            {selectedServiceFilter ? (
              <div className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2.5 rounded-full text-xs font-mono">
                <span className="text-amber-400 uppercase font-bold">Specialty: {selectedServiceFilter}</span>
                <button 
                  onClick={onClearServiceFilter}
                  className="text-gray-400 hover:text-amber-400 transition-colors ml-1 min-w-[44px] min-h-[44px] flex items-center justify-center p-1"
                  title="Clear filter"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider hidden md:inline">
                Filtering by service specialty
              </span>
            )}
          </div>
        </motion.div>

        {/* Interactive Side-by-Side Map & Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
            <React.Suspense fallback={<MapSkeleton />}>
              <NairobiMap
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                filteredGarages={filteredGarages}
                onBookGarage={onBookGarage}
                hoveredGarageId={hoveredGarageId}
                setHoveredGarageId={setHoveredGarageId}
              />
            </React.Suspense>
          </div>

          {/* Right Column: Garages Directory */}
          <div className="lg:col-span-7 xl:col-span-8">
            {isSearching ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <GarageSkeleton />
                <GarageSkeleton />
                <GarageSkeleton />
                <GarageSkeleton />
              </div>
            ) : filteredGarages.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredGarages.map((garage, index) => {
                  const distanceText = GARAGE_DISTANCES[garage.id] || "Near you";
                  const isHovered = hoveredGarageId === garage.id;
                  return (
                    <motion.div
                      key={garage.id}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      onMouseEnter={() => setHoveredGarageId(garage.id)}
                      onMouseLeave={() => setHoveredGarageId(null)}
                      className="h-full"
                    >
                      <TiltCard
                        maxTilt={4}
                        className={`bg-white/5 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-500 flex flex-col justify-between group h-full shadow-2xl ${
                          isHovered 
                            ? "border-amber-500 ring-2 ring-amber-500/40 shadow-[0_20px_50px_rgba(245,158,11,0.2)] scale-[1.01]" 
                            : "border-white/10 hover:border-amber-500/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                        }`}
                      >
                      <div>
                        {/* Garage Visual Header with Real Image */}
                        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-900">
                          {garage.image ? (
                            <>
                              <img
                                src={garage.image}
                                alt={`${garage.name} professional automotive service center located in ${garage.location}, Nairobi equipped with certified mechanical and OBD-II diagnostic technologies`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-85" />
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 text-center">
                              <span className="font-display font-bold text-lg text-white uppercase tracking-wide">{garage.name}</span>
                              <span className="font-mono text-[10px] text-gray-400 mt-2 uppercase tracking-widest bg-white/10 border border-white/10 px-2 py-0.5 rounded-full">Visual Preview Offline</span>
                            </div>
                          )}
                          
                          {/* Live Status Dot Overlay */}
                          <div className="absolute top-3 left-3 bg-teal-500/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-lg border border-teal-400/30">
                            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                            <span>● AVAILABLE NOW</span>
                          </div>

                          {/* Partner Vetted badge */}
                          {garage.verified && (
                            <div className="absolute top-3 right-3 bg-gray-950/90 text-whitegold border border-whitegold/40 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                              <ShieldCheck className="h-3.5 w-3.5 text-whitegold" />
                              <span>VETTED PARTNER</span>
                            </div>
                          )}

                          <div className="absolute bottom-3 left-3 bg-gray-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[9px] font-mono border border-white/15 flex items-center gap-1.5 shadow-md">
                            <MapPin className="h-3 w-3 text-amber-400" />
                            <span>{distanceText}</span>
                          </div>
                        </div>

                        {/* Card Content body */}
                        <div className="p-6">
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-amber-300 transition-colors duration-300">
                              {garage.name}
                            </h3>
                          </div>

                          {/* Details row: coordinates & rating */}
                          <div className="flex flex-wrap gap-2.5 mt-4">
                            <div className="flex items-center space-x-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              <span className="font-mono text-xs font-bold text-white">{garage.rating.toFixed(1)}</span>
                              <span className="text-gray-500 font-sans text-2xs">|</span>
                              <span className="font-mono text-[10px] text-gray-400">{garage.reviews} reviews</span>
                            </div>

                            <div className="flex items-center space-x-1.5 bg-teal-500/10 border border-teal-500/20 text-teal-400 px-3 py-1.5 rounded-full text-2xs font-mono font-bold">
                              <span>LINK STATUS: ACTIVE</span>
                            </div>
                          </div>

                          {/* Service Specialties tags */}
                          <div className="mt-5">
                            <span className="block text-4xs text-gray-400 uppercase tracking-widest font-mono font-bold mb-2">SERVICE CODES:</span>
                            <div className="flex flex-wrap gap-2">
                              {garage.services.map((tag) => (
                                <span
                                  key={tag}
                                  className={`font-mono text-[10px] px-3 py-1 rounded-full border transition-all duration-300 ${
                                    selectedServiceFilter.toLowerCase() === tag.toLowerCase()
                                      ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-sm"
                                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 font-medium"
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Booking Trigger Button & Footer */}
                      <div className="px-6 pb-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <div className="text-left">
                          <span className="block text-4xs text-gray-400 uppercase tracking-widest font-mono font-bold">CONTACT SYNC</span>
                          <a 
                            href={`tel:${garage.phone}`}
                            className="text-2xs text-gray-300 font-mono hover:text-amber-400 transition-colors flex items-center gap-1 mt-1"
                          >
                            <Phone className="h-3 w-3" />
                            <span>{garage.phone}</span>
                          </a>
                        </div>
                        
                        <button
                          onClick={() => onBookGarage(garage)}
                          className="bg-amber-500 hover:bg-amber-400 text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all duration-300 transform active:scale-95 cursor-pointer shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
                        >
                          Book a Mechanic
                        </button>
                      </div>
                    </TiltCard>
                  </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center max-w-xl mx-auto shadow-xl">
                <span className="text-4xl">🔍</span>
                <h4 className="font-display font-bold text-lg uppercase mt-4 text-white">
                  No matching garages found
                </h4>
                <p className="font-sans text-xs text-gray-400 mt-2">
                  We couldn't find any garage in "{selectedLocation}" matching your query. Try resetting your search filter or selecting another district in Nairobi.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedLocation("All");
                    onClearServiceFilter();
                  }}
                  className="mt-6 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-display text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom indicator link */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-gray-500">
            Need specialized continental ECU flash or performance modifications?{" "}
            <span onClick={() => setSearchQuery("luxury")} className="text-signal hover:underline cursor-pointer font-medium font-mono">
              View specialized garages &rarr;
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
