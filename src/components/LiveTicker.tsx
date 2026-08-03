/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Activity } from "lucide-react";

export default function LiveTicker() {
  const tickerItems = [
    { location: "Nairobi CBD", text: "Brake pads certified & installed", time: "Just now" },
    { location: "Westlands", text: "Roadside dispatch ETA 8 min", time: "2m ago" },
    { location: "Mombasa Rd", text: "OEM alternator verified", time: "5m ago" },
    { location: "Kiambu", text: "Diagnostic scan completed", time: "8m ago" },
    { location: "Karen", text: "Engine service scheduled", time: "12m ago" },
    { location: "Kilimani", text: "Wheel alignment completed", time: "15m ago" },
  ];

  return (
    <div className="w-full bg-[#0a0c0e] border-y border-white/10 py-3 overflow-hidden flex items-center select-none backdrop-blur-md relative z-20">
      {/* Live Badge indicator */}
      <div className="flex-shrink-0 flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 z-20 text-amber-400 font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold ml-4 sm:ml-8 mr-3 sm:mr-6 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.25)] backdrop-blur-md">
        <Activity className="h-3.5 w-3.5 animate-pulse text-amber-400" />
        <span className="hidden sm:inline">LIVE NETWORK FEED</span>
        <span className="sm:hidden">LIVE</span>
      </div>

      {/* Ticker marquee container strictly bound within flex layout */}
      <div className="flex-1 min-w-0 overflow-hidden relative flex items-center">
        {/* Edge Gradient Mask Overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-12 bg-gradient-to-r from-[#0a0c0e] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-12 bg-gradient-to-l from-[#0a0c0e] to-transparent z-10" />

        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          {/* First track copy */}
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12 shrink-0">
            {tickerItems.map((item, index) => (
              <div key={`track1-${index}`} className="flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-sm font-mono text-gray-300">
                <span className="text-amber-400 font-semibold tracking-wide">⚡ {item.location}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-200">{item.text}</span>
                <span className="text-gray-600">•</span>
                <span className="text-teal-400 text-[10px] sm:text-xs font-medium">{item.time}</span>
              </div>
            ))}
          </div>

          {/* Second identical track copy for 100% smooth loop */}
          <div className="flex items-center space-x-8 sm:space-x-12 pr-8 sm:pr-12 shrink-0" aria-hidden="true">
            {tickerItems.map((item, index) => (
              <div key={`track2-${index}`} className="flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-sm font-mono text-gray-300">
                <span className="text-amber-400 font-semibold tracking-wide">⚡ {item.location}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-200">{item.text}</span>
                <span className="text-gray-600">•</span>
                <span className="text-teal-400 text-[10px] sm:text-xs font-medium">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
