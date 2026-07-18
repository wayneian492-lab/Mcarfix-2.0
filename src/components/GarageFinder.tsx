/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, MapPin, Star, ShieldCheck, X, Phone } from "lucide-react";
import { MOCK_GARAGES, Garage } from "../types";
import { motion } from "motion/react";

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
    <section id="garages" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span>SYS.PARTNERS</span>
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-gray-900">
              Nairobi Garage Finder
            </h2>
            <div className="h-1 w-12 bg-signal mt-4" />
            <p className="font-sans text-gray-600 mt-4 leading-relaxed max-w-2xl font-light">
              Connect directly with mCarFix authorized service centers. All garages are fully vetted for diagnostic equipment quality, parts integrity, and fair labor pricing.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block text-left md:text-right">
              Database Sync Status
            </span>
            <span className="font-mono text-xs text-teal-600 font-semibold uppercase tracking-wider flex items-center space-x-1.5 mt-1">
              <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
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
          className="bg-gray-50 border border-gray-200 rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
        >
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search garage name, location, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 hover:border-gray-400 focus:border-signal text-gray-900 pl-10 pr-4 py-3 rounded-lg font-sans text-sm outline-none transition-all shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-900"
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
              className="w-full bg-white border border-gray-200 hover:border-gray-400 focus:border-signal text-gray-900 px-4 py-3 rounded-lg font-sans text-sm outline-none transition-all cursor-pointer shadow-xs"
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
              <div className="flex items-center space-x-2 bg-signal/10 border border-signal/20 px-3.5 py-2.5 rounded-lg text-xs font-mono">
                <span className="text-signal uppercase font-bold">Specialty: {selectedServiceFilter}</span>
                <button 
                  onClick={onClearServiceFilter}
                  className="text-gray-400 hover:text-signal transition-colors ml-1"
                  title="Clear filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wider hidden md:inline">
                Filtering by service specialty
              </span>
            )}
          </div>
        </motion.div>

        {/* Garages Grid with responsive photo & diagnostic card design */}
        {filteredGarages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredGarages.map((garage, index) => {
              const distanceText = GARAGE_DISTANCES[garage.id] || "Near you";
              return (
                <motion.div
                  key={garage.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="bg-white border border-gray-200 hover:border-signal/50 hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group h-full shadow-lg"
                >
                  <div>
                    {/* Garage Visual Header with Real Image */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gray-100">
                      {garage.image ? (
                        <img
                          src={garage.image}
                          alt={`${garage.name} professional automotive service center located in ${garage.location}, Nairobi equipped with certified mechanical and OBD-II diagnostic technologies`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center font-mono text-gray-400">
                          IMAGE OFFLINE
                        </div>
                      )}
                      
                      {/* Diagnostic Overlay Badges */}
                      {/* Live Status Dot Overlay */}
                      <div className="absolute top-3 left-3 bg-teal-500/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        <span>● AVAILABLE NOW</span>
                      </div>

                      {/* Partner Vetted badge */}
                      {garage.verified && (
                        <div className="absolute top-3 right-3 bg-gray-900/90 text-signal border border-signal/30 backdrop-blur-xs px-2.5 py-1 rounded-md text-[9px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
                          <ShieldCheck className="h-3.5 w-3.5 text-signal" />
                          <span>VETTED PARTNER</span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-md text-[9px] font-mono border border-white/10 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-signal" />
                        <span>{distanceText}</span>
                      </div>
                    </div>

                    {/* Card Content body */}
                    <div className="p-6">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display font-bold text-xl uppercase tracking-wide text-gray-900 group-hover:text-signal transition-colors duration-200">
                          {garage.name}
                        </h3>
                      </div>

                      {/* Details row: coordinates & rating */}
                      <div className="flex flex-wrap gap-2.5 mt-4">
                        <div className="flex items-center space-x-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-mono text-xs font-bold text-gray-800">{garage.rating.toFixed(1)}</span>
                          <span className="text-gray-300 font-sans text-2xs">|</span>
                          <span className="font-mono text-[10px] text-gray-500">{garage.reviews} reviews</span>
                        </div>

                        <div className="flex items-center space-x-1.5 bg-teal-50 border border-teal-100 text-teal-800 px-3 py-1.5 rounded-lg text-2xs font-mono font-bold">
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
                              className={`font-mono text-[10px] px-2.5 py-1 rounded-md border transition-colors ${
                                selectedServiceFilter.toLowerCase() === tag.toLowerCase()
                                  ? "bg-signal/15 border-signal text-signal font-bold shadow-xs"
                                  : "border-gray-200 bg-gray-50 text-gray-600 font-medium"
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
                  <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-left">
                      <span className="block text-4xs text-gray-400 uppercase tracking-widest font-mono font-bold">CONTACT SYNC</span>
                      <a 
                        href={`tel:${garage.phone}`}
                        className="text-2xs text-gray-600 font-mono hover:text-signal transition-colors flex items-center gap-1 mt-1"
                      >
                        <Phone className="h-3 w-3" />
                        <span>{garage.phone}</span>
                      </a>
                    </div>
                    
                    <button
                      onClick={() => onBookGarage(garage)}
                      className="bg-signal hover:bg-signal/90 text-white font-display font-bold text-xs uppercase tracking-wider px-5 py-3.5 rounded-lg transition-all duration-200 transform active:scale-95 cursor-pointer shadow-md shadow-signal/10"
                    >
                      Book Appointment
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center max-w-xl mx-auto">
            <span className="text-3xl">🔍</span>
            <h4 className="font-display font-bold text-lg uppercase mt-4 text-gray-900">
              No matching garages found
            </h4>
            <p className="font-sans text-xs text-gray-500 mt-2">
              We couldn't find any garage in "{selectedLocation}" matching your query. Try resetting your search filter or selecting another district in Nairobi.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedLocation("All");
                onClearServiceFilter();
              }}
              className="mt-6 bg-white border border-gray-300 hover:border-gray-800 text-gray-700 font-display text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

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
