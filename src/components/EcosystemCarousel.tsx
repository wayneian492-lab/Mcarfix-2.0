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
  ArrowRight,
  Play,
  X,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import motoristsBikersImg from "../assets/images/motorists_bikers_card_1785740110667.jpg";
import garageMechanicImg from "../assets/images/garage_mechanic_card_1785740255989.jpg";
import fleetsIllustrationImg from "../assets/images/fleets_illustration_card_1785740451463.jpg";
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
  hasVideo?: boolean;
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
    image: garageMechanicImg,
    hasVideo: true
  },
  {
    id: "fleets",
    title: "Fleet Manufacturers & Dealers",
    subtitle: "Commercial & Distributors",
    description: "Track vehicle history and maintain your fleet's Digital DNA record from day one.",
    icon: Truck,
    badge: "ENTERPRISE",
    accentColor: "gold",
    image: fleetsIllustrationImg
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
    image: emergencyAmbulanceImg,
    hasVideo: true
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
  const [activeVideoModal, setActiveVideoModal] = useState<EcosystemCard | null>(null);

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
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-2 mb-3 shadow-sm">
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
                  {/* Optional Featured Image Header */}
                  {card.image && (
                    <div 
                      className={`relative w-full h-36 rounded-xl overflow-hidden mb-4 border border-white/10 group-hover:border-teal-400/50 transition-colors shadow-md ${card.hasVideo ? 'cursor-pointer' : ''}`}
                      onClick={() => {
                        if (card.hasVideo) setActiveVideoModal(card);
                      }}
                    >
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/20 to-transparent" />
                      
                      {card.hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-11 w-11 rounded-full bg-teal-500/90 hover:bg-teal-400 text-gray-950 flex items-center justify-center shadow-lg transition-transform duration-300 transform group-hover:scale-110 border border-white/40">
                            <Play className="h-5 w-5 fill-current ml-0.5" />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md border border-teal-500/40 text-teal-300 font-mono text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center space-x-1">
                            <Sparkles className="h-2.5 w-2.5 animate-pulse" />
                            <span>VIDEO DEMO</span>
                          </span>
                        </div>
                      )}
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

      {/* Interactive Workshop Video Demo Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#111419] border border-teal-500/30 rounded-2xl overflow-hidden max-w-2xl w-full relative shadow-2xl"
            >
              {/* Header */}
              <div className="p-4 bg-gray-900/90 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center">
                    <Wrench className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                      {activeVideoModal.title} — Video Demo
                    </h3>
                    <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest block">
                      mCarFix Certified Garage Operations • Nairobi
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Video Player Display Container */}
              <div className="relative aspect-video bg-black w-full overflow-hidden flex items-center justify-center group">
                <img
                  src={activeVideoModal.image}
                  alt={activeVideoModal.title}
                  className="w-full h-full object-cover filter brightness-90"
                />
                
                {/* Simulated live scanner overlay animation */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-black/40" />

                <div className="absolute top-4 left-4 bg-black/75 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-400 font-mono text-xs flex items-center space-x-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold uppercase tracking-wider">LIVE WORKSHOP REEL</span>
                </div>

                {/* Center play icon overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black/30 backdrop-blur-[1px]">
                  <div className="h-16 w-16 rounded-full bg-teal-500 text-gray-950 flex items-center justify-center shadow-2xl ring-4 ring-teal-500/30 animate-pulse mb-3">
                    <Play className="h-8 w-8 fill-current ml-1" />
                  </div>
                  <h4 className="font-display font-bold text-lg text-white uppercase tracking-wide">
                    Certified Garage Workshop Bay
                  </h4>
                  <p className="font-sans text-xs text-gray-300 font-light max-w-md mt-1">
                    OBD-II diagnostic inspection & verified technician servicing for Toyota SUV vehicle in Nairobi.
                  </p>
                </div>

                {/* Video controls bar simulation */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center justify-between font-mono text-xs text-gray-300">
                  <div className="flex items-center space-x-3">
                    <button className="text-teal-400 hover:text-teal-300">
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                    <span className="text-[10px] text-gray-400">0:14 / 1:30</span>
                  </div>
                  <div className="flex-1 mx-4 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-teal-400 rounded-full" />
                  </div>
                  <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">1080p HD</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-[#0d0f14] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <p className="font-sans text-gray-400 font-light">
                  Want to feature your garage in the mCarFix Partner Directory?
                </p>
                <button
                  onClick={() => {
                    setActiveVideoModal(null);
                    const el = document.getElementById("become-partner");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-teal-500 hover:bg-teal-400 text-gray-950 font-display font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition-all whitespace-nowrap"
                >
                  Join Partner Network &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
