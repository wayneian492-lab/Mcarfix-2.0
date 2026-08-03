/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Star } from "lucide-react";
import groundedHeroBgImg from "../assets/images/grounded_garage_hero_bg_1785734927505.jpg";

const workshopImage = "https://raw.githubusercontent.com/wayneian492-lab/Mcarfix-2.0/11b7dae/src/assets/images/car_service_lift_1784614889346.jpg";
const heroBgImage = groundedHeroBgImg;

interface HeroProps {
  onOpenSos: () => void;
  onOpenDiagnostics: () => void;
  onScrollToSection: (sectionId: string) => void;
}

function CountUp({ end, suffix = "", duration = 1500, decimals = 0 }: { end: number; suffix?: string; duration?: number; decimals?: number }) {
  const [count, setCount] = React.useState(0);
  const elementRef = React.useRef<HTMLSpanElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const linearProgress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic formula for smooth deceleration
            const easedProgress = 1 - Math.pow(1 - linearProgress, 3);
            const currentCount = easedProgress * end;
            setCount(currentCount);
            if (linearProgress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration]);

  return (
    <span ref={elementRef} className="font-mono">
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero({ onOpenSos, onOpenDiagnostics, onScrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[88vh] flex flex-col justify-center bg-[#0a0c0e] text-white py-16 lg:py-24 overflow-hidden border-b border-gray-800/60">
      {/* 1. Ultra-Luxury Dark Studio Background with subtle radial spotlighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src={heroBgImage} 
          alt="Luxury Automotive Studio Background" 
          className="w-full h-full object-cover object-center opacity-[0.93] filter brightness-85 contrast-[1.05] transition-all duration-1000"
        />
        {/* Sleek radial spotlight & vignette in elegant shades of black */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0a0c0e]/40 to-[#0a0c0e]/75 z-10" />
        {/* Subtle horizontal gradient for text legibility on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0e]/80 via-[#0a0c0e]/45 to-transparent z-10" />
        {/* Gentle top & bottom black vignette framing */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c0e]/60 via-transparent to-[#0a0c0e]/80 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Premium Typography, Badges, CTAs */}
          <div className="lg:col-span-7 flex flex-col space-y-7 text-left">
            {/* Subtle Luxury Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-whitegold/10 border border-whitegold/30 backdrop-blur-md w-fit shadow-md">
              <span className="w-2 h-2 rounded-full bg-whitegold animate-pulse" />
              <span className="font-mono text-xs text-whitegold tracking-wider uppercase font-semibold">
                mCarFix® Global Operating System
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif font-medium text-4xl sm:text-6xl lg:text-6xl text-white tracking-tight leading-[1.15] drop-shadow-md">
                The World’s 1<sup className="text-2xl sm:text-3xl font-normal text-amber-400">st</sup> Operating System
              </h1>
              <p className="font-serif text-2xl sm:text-3xl text-gray-300 font-normal tracking-wide">
                For the Motor Vehicle Sector
              </p>
            </div>

            <p className="font-sans text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl font-light">
              Founded in Nairobi in 2019, mCarFix is part of a growing platform serving motorists, garages, parts suppliers, vehicle dealers, insurers, and emergency services across Kenya.
            </p>

            {/* Premium Interactive Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => onScrollToSection("services")}
                className="bg-white text-gray-950 hover:bg-gray-100 font-sans font-semibold text-sm sm:text-base px-8 py-3.5 rounded-xl transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] border border-white"
              >
                Click to Explore
              </button>
              <button
                onClick={() => onScrollToSection("estimator")}
                className="bg-white/10 hover:bg-white/20 text-white font-sans font-medium text-sm sm:text-base px-8 py-3.5 rounded-xl border border-white/20 backdrop-blur-md transition-all duration-300 cursor-pointer hover:border-white/40 shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                Download mCarFix
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Glassmorphic mCarFix Shield Logo Banner */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-b from-white/10 via-black/40 to-black/80 border border-white/15 backdrop-blur-xl flex items-center justify-center p-6 group hover:border-amber-500/40 transition-all duration-500">
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-black/60 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Official mCarFix Shield Logo Graphic */}
              <div className="relative z-10 w-full max-w-md p-2 flex flex-col items-center transform group-hover:scale-[1.02] transition-transform duration-500">
                <svg viewBox="0 0 600 520" className="w-full h-auto filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
                  {/* Outer Shield / Triangle Border */}
                  <path 
                    d="M 300 30 C 365 30, 515 340, 555 395 C 580 430, 550 480, 485 480 L 115 480 C 50 480, 20 430, 45 395 C 85 340, 235 30, 300 30 Z" 
                    fill="rgba(255, 255, 255, 0.96)" 
                    stroke="#FF6B00" 
                    strokeWidth="26" 
                    strokeLinejoin="round" 
                    strokeLinecap="round" 
                  />

                  {/* CAR SILHOUETTE (Orange) */}
                  <g transform="translate(195, 110)">
                    {/* Roof / Cabin */}
                    <path d="M 45 65 C 55 25, 75 15, 100 15 C 125 15, 145 25, 155 65 Z" fill="#FF6B00" />
                    {/* Windshield cut */}
                    <path d="M 53 62 C 60 32, 75 22, 100 22 C 125 22, 140 32, 147 62 Z" fill="#FFFFFF" />
                    {/* Rearview mirror */}
                    <rect x="94" y="22" width="12" height="6" rx="2" fill="#FF6B00" />
                    
                    {/* Car Body */}
                    <path d="M 20 70 C 20 62, 35 62, 45 65 L 155 65 C 165 62, 180 62, 180 70 L 188 100 C 192 120, 185 140, 180 155 L 20 155 C 15 140, 8 120, 12 100 Z" fill="#FF6B00" />
                    
                    {/* Headlights */}
                    <path d="M 25 80 C 25 72, 55 72, 60 85 C 62 95, 30 102, 25 80 Z" fill="#FFFFFF" />
                    <path d="M 175 80 C 175 72, 145 72, 140 85 C 138 95, 170 102, 175 80 Z" fill="#FFFFFF" />
                    
                    {/* Grille Lines */}
                    <path d="M 65 110 L 135 110 M 68 118 L 132 118 M 72 126 L 128 126 M 78 134 L 122 134" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                    
                    {/* Wheels base */}
                    <rect x="22" y="150" width="30" height="12" rx="4" fill="#FF6B00" />
                    <rect x="148" y="150" width="30" height="12" rx="4" fill="#FF6B00" />
                  </g>

                  {/* WRENCH GRAPHIC (Dark Navy) */}
                  <g transform="translate(290, 100)">
                    <path d="M 25 0 C 42 0, 55 12, 55 28 C 55 38, 48 46, 40 50 L 40 145 C 48 149, 55 158, 55 168 C 55 184, 42 196, 25 196 C 8 196, -5 184, -5 168 C -5 158, 2 149, 10 145 L 10 50 C 2 46, -5 38, -5 28 C -5 12, 8 0, 25 0 Z" fill="#002B49" />
                    <path d="M 25 8 L 36 28 L 14 28 Z" fill="#FFFFFF" />
                    <circle cx="25" cy="28" r="12" fill="#FFFFFF" />
                    <rect x="16" y="0" width="18" height="28" fill="#FFFFFF" />
                    <polygon points="25,155 33,160 33,170 25,175 17,170 17,160" fill="#FFFFFF" />
                  </g>

                  {/* BRAND NAME TEXT: mCarFix® */}
                  <g transform="translate(300, 350)">
                    <text textAnchor="middle" fontFamily="Arial Black, Trebuchet MS, sans-serif" fontWeight="900" fontSize="78">
                      <tspan fill="#002B49">m</tspan><tspan fill="#FF6B00">Car</tspan><tspan fill="#002B49">Fix</tspan>
                    </text>
                    <text x="215" y="-38" fill="#FF6B00" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24">®</text>
                  </g>

                  {/* SUBTITLE: —— Take Charge! —— */}
                  <g transform="translate(300, 395)">
                    <line x1="-200" y1="-6" x2="-80" y2="-6" stroke="#FF6B00" strokeWidth="2.5" />
                    <text x="0" y="0" textAnchor="middle" fill="#002B49" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="22">Take Charge!</text>
                    <line x1="80" y1="-6" x2="200" y2="-6" stroke="#FF6B00" strokeWidth="2.5" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Premium Stats Strip with Glassmorphic Framing */}
        <div className="w-full border-t border-whitegold/20 pt-8 mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center divide-x-0 sm:divide-x divide-whitegold/15 bg-white/[0.02] backdrop-blur-md rounded-2xl p-6 border border-whitegold/15 shadow-xl">
          <div className="flex flex-col px-2">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
              <CountUp end={400000} suffix="+" />
            </span>
            <span className="font-sans text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-medium">Registered Users</span>
          </div>
          <div className="flex flex-col px-2 border-l sm:border-l-0 border-whitegold/15">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
              <CountUp end={450} suffix="+" />
            </span>
            <span className="font-sans text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-medium">Verified Garages</span>
          </div>
          <div className="flex flex-col px-2 border-t sm:border-t-0 border-whitegold/15 pt-4 sm:pt-0">
            <span className="font-mono text-3xl sm:text-4xl font-bold text-whitegold tracking-tight">
              2019
            </span>
            <span className="font-sans text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-medium">Founded in Nairobi</span>
          </div>
          <div className="flex flex-col px-2 border-t sm:border-t-0 border-whitegold/15 pt-4 sm:pt-0">
            <div className="flex items-center justify-center space-x-1.5">
              <span className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                <CountUp end={4.9} decimals={1} />
              </span>
              <Star className="h-5 w-5 fill-amber-400 text-amber-400 inline" />
            </div>
            <span className="font-sans text-xs sm:text-sm text-gray-400 mt-1 uppercase tracking-wider font-medium">User Rating</span>
          </div>
        </div>

      </div>
    </section>
  );
}
