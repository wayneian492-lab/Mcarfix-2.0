/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Search, MapPin, Star, ShieldCheck, X, ChevronRight, Check } from "lucide-react";
import { MOCK_GARAGES, Garage } from "../types";

interface GarageFinderProps {
  onBookGarage: (garage: Garage) => void;
  selectedServiceFilter: string;
  onClearServiceFilter: () => void;
}

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
    <section id="garages" className="bg-asphalt py-20 text-white border-t border-steel/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-steel px-3 py-1 rounded">
              Verified Partners
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-wide uppercase mt-4 text-white">
              Nairobi Garage Finder
            </h2>
            <div className="h-1 w-12 bg-signal mt-4" />
            <p className="font-sans text-gray-400 mt-4 leading-relaxed max-w-2xl font-light">
              Connect directly with mCarFix authorized service centers. All garages are fully vetted for diagnostic equipment quality, parts integrity, and fair labor pricing.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block text-left md:text-right">
              Database Sync Status
            </span>
            <span className="font-mono text-xs text-diagnostic font-semibold uppercase tracking-wider flex items-center space-x-1.5 mt-1">
              <span className="h-2 w-2 rounded-full bg-diagnostic animate-pulse" />
              <span>450+ Garages Live</span>
            </span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-steel border border-steel/60 rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search garage name, location, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white pl-10 pr-4 py-3 rounded-lg font-sans text-sm outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
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
              className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-4 py-3 rounded-lg font-sans text-sm outline-none transition-all cursor-pointer"
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
              <div className="flex items-center space-x-2 bg-signal/10 border border-signal/30 px-3.5 py-2.5 rounded-lg text-xs font-mono">
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
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider hidden md:inline">
                Filtering by service specialty
              </span>
            )}
          </div>
        </div>

        {/* Garages Grid */}
        {filteredGarages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGarages.map((garage) => {
              return (
                <div
                  key={garage.id}
                  className="bg-steel border border-steel/60 hover:border-signal/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Name & Verified badge */}
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-signal transition-colors duration-200">
                        {garage.name}
                      </h3>
                      {garage.verified && (
                        <div className="flex items-center space-x-1.5 bg-diagnostic/10 border border-diagnostic/30 text-diagnostic px-2 py-1 rounded text-2xs font-mono font-bold tracking-widest shrink-0">
                          <ShieldCheck className="h-3 w-3" />
                          <span>PARTNER</span>
                        </div>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-gray-400 text-xs mt-2.5">
                      <MapPin className="h-3.5 w-3.5 text-signal" />
                      <span className="font-sans">{garage.location}</span>
                    </div>

                    {/* Rating & Reviews */}
                    <div className="flex items-center space-x-2 mt-3 bg-asphalt/50 px-3 py-1.5 rounded-lg w-fit">
                      <Star className="h-3.5 w-3.5 fill-signal text-signal" />
                      <span className="font-mono text-sm font-bold text-white">{garage.rating.toFixed(1)}</span>
                      <span className="text-gray-500 font-sans text-xs">|</span>
                      <span className="font-mono text-xs text-gray-400">{garage.reviews} verified reviews</span>
                    </div>

                    {/* Service Tags */}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {garage.services.map((tag) => (
                        <span
                          key={tag}
                          onClick={() => {
                            // If user clicks on service tag, set it as the filter
                            if (selectedServiceFilter === tag) {
                              onClearServiceFilter();
                            } else {
                              onClearServiceFilter();
                              onBookGarage({ ...garage }); // Dummy state update or similar
                            }
                          }}
                          className={`font-mono text-2xs px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                            selectedServiceFilter.toLowerCase() === tag.toLowerCase()
                              ? "bg-signal/20 border-signal text-signal font-semibold"
                              : "border-steel-light bg-asphalt/30 text-gray-400 hover:text-white hover:border-gray-500"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking Trigger Button */}
                  <div className="mt-8 pt-4 border-t border-asphalt flex items-center justify-between">
                    <div className="text-left">
                      <span className="block text-3xs text-gray-500 uppercase tracking-wider font-mono">Availability</span>
                      <span className="text-xs text-diagnostic font-medium font-sans flex items-center space-x-1.5 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-diagnostic animate-ping" />
                        <span>Bookable Today</span>
                      </span>
                    </div>
                    
                    <button
                      onClick={() => onBookGarage(garage)}
                      className="bg-signal hover:bg-signal/95 text-asphalt font-display font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg transition-all duration-200 transform active:scale-95 cursor-pointer"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-steel border border-steel/60 rounded-xl p-12 text-center max-w-xl mx-auto">
            <span className="text-3xl">🔍</span>
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
              className="mt-6 bg-transparent border border-gray-400 hover:border-white text-white font-display text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Bottom indicator link */}
        <div className="mt-12 text-center">
          <p className="font-sans text-xs text-gray-400">
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
