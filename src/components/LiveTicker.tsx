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

  // Repeat items to make it scroll infinitely
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="bg-gray-50 border-y border-gray-100 py-2.5 md:py-3.5 overflow-hidden flex items-center select-none">
      <div className="flex-shrink-0 flex items-center space-x-1.5 sm:space-x-2 bg-white px-2.5 py-1 sm:px-4 sm:py-1.5 z-10 border border-gray-200 text-teal-600 font-mono text-[10px] sm:text-xs uppercase tracking-wider font-semibold mr-2 sm:mr-4 rounded-md shadow-xs">
        <Activity className="h-3.5 w-3.5 animate-pulse text-teal-600" />
        <span className="hidden sm:inline">Live Feed</span>
        <span className="sm:hidden">Live</span>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex space-x-8 sm:space-x-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-mono text-gray-600">
              <span className="text-signal font-semibold">⚡ {item.location}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-800">{item.text}</span>
              <span className="text-gray-300">•</span>
              <span className="text-teal-600 text-[10px] sm:text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
