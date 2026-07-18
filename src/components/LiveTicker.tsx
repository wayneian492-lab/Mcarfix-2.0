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
    <div className="bg-gray-50 border-y border-gray-100 py-3.5 overflow-hidden flex items-center select-none">
      <div className="flex-shrink-0 flex items-center space-x-2 bg-white px-4 py-1.5 z-10 border border-gray-200 text-teal-600 font-mono text-xs uppercase tracking-wider font-semibold mr-4 rounded-md shadow-xs">
        <Activity className="h-3.5 w-3.5 animate-pulse text-teal-600" />
        <span>Live Feed</span>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex space-x-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm font-mono text-gray-600">
              <span className="text-signal font-semibold">⚡ {item.location}</span>
              <span className="text-gray-300">•</span>
              <span className="text-gray-800">{item.text}</span>
              <span className="text-gray-300">•</span>
              <span className="text-teal-600 text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
