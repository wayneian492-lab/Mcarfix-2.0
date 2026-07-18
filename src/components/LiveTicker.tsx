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
    <div className="bg-steel/90 border-y border-steel/60 py-3.5 overflow-hidden flex items-center select-none">
      <div className="flex-shrink-0 flex items-center space-x-2 bg-asphalt px-4 py-1.5 z-10 border-r border-steel text-diagnostic font-mono text-xs uppercase tracking-wider font-semibold mr-4">
        <Activity className="h-3.5 w-3.5 animate-pulse text-diagnostic" />
        <span>Live Feed</span>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex space-x-12 animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] cursor-pointer">
          {repeatedItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm font-mono text-gray-300">
              <span className="text-signal font-semibold">⚡ {item.location}</span>
              <span className="text-gray-400">•</span>
              <span className="text-white">{item.text}</span>
              <span className="text-gray-400">•</span>
              <span className="text-diagnostic text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
