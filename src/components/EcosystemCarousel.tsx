import React, { useRef, useState, useEffect } from "react";
import { 
  Car, 
  Wrench, 
  Truck, 
  ShieldCheck, 
  Ambulance, 
  Store, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import motoristsBikersImg from "../assets/images/motorists_bikers_card_1785740110667.jpg";
import garageMechanicImg from "../assets/images/garage_mechanic_card_1785740255989.jpg";
import fleetManufacturersPhotoImg from "../assets/images/fleet_manufacturers_photo_1785740762813.jpg";
import governmentEnforcementImg from "../assets/images/government_enforcement_card_1785740462698.jpg";
import emergencyAmbulanceImg from "../assets/images/emergency_ambulance_card_1785740475473.jpg";
import showroomsCarYardImg from "../assets/images/showrooms_caryard_card_1785740487343.jpg";

interface EcosystemCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  accentColor: "amber" | "teal" | "gold" | "signal";
  image?: string;
}

const CARDS: EcosystemCard[] = [
  {
    id: "motorists",
    title: "Motorists",
    subtitle: "Drivers & Owners",
    description: "Book verified mechanics, get instant diagnostics, and request roadside help in seconds.",
    icon: Car,
    badge: "CONSUMER",
    accentColor: "amber",
    image: motoristsBikersImg
  },
  {
    id: "garages",
    title: "Garages & Service Providers",
    subtitle: "Workshops & Technicians",
    description: "Join a trusted network, reach verified customers, and grow your bookings.",
    icon: Wrench,
    badge: "PARTNER NETWORK",
    accentColor: "teal",
    image: garageMechanicImg
  },
  {
    id: "fleets",
    title: "Fleet Manufacturers & Dealers",
    subtitle: "Commercial & Distributors",
    description: "Track vehicle history and maintain your fleet's Digital DNA record from day one.",
    icon: Truck,
    badge: "ENTERPRISE",
    accentColor: "gold",
    image: fleetManufacturersPhotoImg
  },
  {
    id: "government",
    title: "Government & Enforcement",
    subtitle: "Regulatory Bodies",
    description: "Real-time verified compliance and safety data for regulatory bodies.",
    icon: ShieldCheck,
    badge: "REGULATORY",
    accentColor: "teal",
    image: governmentEnforcementImg
  },
  {
    id: "emergency",
    title: "Emergency Services",
    subtitle: "Rapid First Responders",
    description: "GPS-dispatched coordination with hospitals and ambulances for faster crash response.",
    icon: Ambulance,
    badge: "24/7 DISPATCH",
    accentColor: "signal",
    image: emergencyAmbulanceImg
  },
  {
    id: "showrooms",
    title: "Showrooms & Car Yards",
    subtitle: "Dealerships & Deal Makers",
    description: "Showcase verified, service-history-backed vehicles buyers can trust.",
    icon: Store,
    badge: "VERIFIED INVENTORY",
    accentColor: "gold",
    image: showroomsCarYardImg
  }
];

export default function EcosystemCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const cardWidth = 340; // width + gap
    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const getAccentStyles = (accent: EcosystemCard["accentColor"]) => {
    switch (accent) {
      case "teal":
        return {
          badgeBg: "bg-teal-500/10 text-teal-400 border-teal-500/30",
          iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/30 group-hover:bg-teal-500 group-hover:text-black group-hover:border-teal-400",
          hoverBorder: "hover:border-teal-500/50",
          accentLine: "from-teal-500 to-emerald-400",
          glow: "bg-teal-500/10"
        };
      case "gold":
        return {
          badgeBg: "bg-whitegold/10 text-whitegold border-whitegold/30",
          iconBg: "bg-whitegold/10 text-whitegold border-whitegold/30 group-hover:bg-whitegold group-hover:text-black group-hover:border-amber-300",
          hoverBorder: "hover:border-whitegold/50",
          accentLine: "from-amber-300 via-whitegold to-amber-500",
          glow: "bg-amber-400/10"
        };
      case "signal":
        return {
          badgeBg: "bg-signal/15 text-signal border-signal/30",
          iconBg: "bg-signal/15 text-signal border-signal/30 group-hover:bg-signal group-hover:text-black group-hover:border-signal",
          hoverBorder: "hover:border-signal/60",
          accentLine: "from-signal via-red-500 to-orange-500",
          glow: "bg-signal/15"
        };
      case "amber":
      default:
        return {
          badgeBg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-400",
          hoverBorder: "hover:border-amber-500/50",
          accentLine: "from-amber-500 to-orange-400",
          glow: "bg-amber-500/10"
        };
    }
  };

  return (
    <section className="relative py-16 bg-[#0a0c0e] text-white border-t border-b border-gray-800/80 overflow-hidden">
      {/* Repeating Automotive Icon Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] overflow-hidden">
        <svg className="w-full h-full" width="100%" height="100%">
          <pattern id="automotive-pattern" width="160" height="160" patternUnits="userSpaceOnUse">
            {/* Row 1 */}
            <g transform="translate(10, 10)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-400">
              <path d="M5 12h14M12 5l7 7-7 7" />
              <rect x="2" y="2" width="20" height="20" rx="4" />
            </g>
            <g transform="translate(50, 10)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-teal-400">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </g>
            <g transform="translate(90, 10)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-200">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </g>
            <g transform="translate(130, 10)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-red-400">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 10.8 2 11v5c0 .6.4 1 1 1h2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </g>

            {/* Row 2 */}
            <g transform="translate(10, 50)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-teal-400">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </g>
            <g transform="translate(50, 50)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-400">
              <path d="M10 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
              <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
              <path d="M4 8h16" />
            </g>
            <g transform="translate(90, 50)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-300">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </g>
            <g transform="translate(130, 50)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-emerald-400">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </g>

            {/* Row 3 */}
            <g transform="translate(10, 90)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-200">
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </g>
            <g transform="translate(50, 90)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-red-400">
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </g>
            <g transform="translate(90, 90)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-teal-400">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </g>
            <g transform="translate(130, 90)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-400">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </g>

            {/* Row 4 */}
            <g transform="translate(10, 130)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-400">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </g>
            <g transform="translate(50, 130)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-amber-200">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </g>
            <g transform="translate(90, 130)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-teal-300">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </g>
            <g transform="translate(130, 130)" stroke="currentColor" fill="none" strokeWidth="1.2" className="text-orange-400">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </g>
          </pattern>
          <rect width="100%" height="100%" fill="url(#automotive-pattern)" />
        </svg>
      </div>

      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-2 mb-3 shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>MCARFIX ECOSYSTEM</span>
            </span>
            <h2 className="font-serif font-medium text-2xl sm:text-4xl tracking-tight text-white mt-1">
              Built for Every Corner of the Road
            </h2>
            <p className="font-sans text-gray-400 text-sm sm:text-base font-light mt-2">
              A unified digital operating system empowering drivers, mechanics, emergency responders, and fleet managers across Kenya.
            </p>
          </div>

          {/* Desktop Nav Arrows */}
          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => handleScroll("left")}
              disabled={!canScrollLeft}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                canScrollLeft 
                  ? "bg-white/5 border-white/15 text-white hover:bg-white/15 hover:border-amber-400/50 cursor-pointer shadow-md" 
                  : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed opacity-40"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              disabled={!canScrollRight}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                canScrollRight 
                  ? "bg-white/5 border-white/15 text-white hover:bg-white/15 hover:border-amber-400/50 cursor-pointer shadow-md" 
                  : "bg-white/5 border-white/5 text-gray-600 cursor-not-allowed opacity-40"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-5 overflow-x-auto snap-x snap-mandatory scrollbar-none py-2 px-1 -mx-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {CARDS.map((card, index) => {
            const IconComponent = card.icon;
            const styles = getAccentStyles(card.accentColor);

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`snap-start shrink-0 w-[290px] sm:w-[320px] bg-white/5 backdrop-blur-xl border border-white/10 ${styles.hoverBorder} rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}
              >
                {/* Subtle inner background glow */}
                <div className={`absolute -top-12 -right-12 w-28 h-28 ${styles.glow} blur-2xl rounded-full pointer-events-none group-hover:scale-150 transition-transform duration-500`} />

                <div>
                  {/* Accurate Card Photo Header */}
                  {card.image && (
                    <div className="relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-amber-400/40 transition-colors shadow-md">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/20 to-transparent" />
                    </div>
                  )}

                  {/* Badge & Icon Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-10 w-10 rounded-xl ${styles.iconBg} border flex items-center justify-center transition-all duration-300 shadow-sm`}>
                      <IconComponent className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className={`font-mono text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border ${styles.badgeBg}`}>
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-3">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {card.title}
                    </h3>
                    <span className="font-sans text-xs text-gray-400 font-light block mt-0.5">
                      {card.subtitle}
                    </span>
                  </div>

                  {/* Gradient accent line */}
                  <div className={`h-0.5 w-12 bg-gradient-to-r ${styles.accentLine} mb-4 rounded-full group-hover:w-20 transition-all duration-300`} />

                  {/* Description */}
                  <p className="font-sans text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Footer Action Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                  <span className="text-[11px] uppercase tracking-wider font-semibold">Learn More</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-300 text-amber-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden text-center mt-4">
          <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            ← Swipe to explore ecosystem →
          </span>
        </div>

      </div>
    </section>
  );
}
