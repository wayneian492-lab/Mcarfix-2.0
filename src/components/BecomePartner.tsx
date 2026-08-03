import React, { useState } from "react";
import { Wrench, Package, Building2, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PartnerType {
  id: string;
  title: string;
  category: string;
  icon: React.ElementType;
  pitch: string;
  benefits: string[];
  accentColor: "amber" | "teal" | "gold";
}

const PARTNER_TYPES: PartnerType[] = [
  {
    id: "mechanics-garages",
    title: "Mechanics & Garages",
    category: "SERVICE PROVIDERS",
    icon: Wrench,
    pitch: "Join a trusted network, reach verified customers, and receive mCarFix diagnosed vehicle bookings directly.",
    benefits: [
      "Receive pre-diagnosed OBD-II customer bookings",
      "Upfront labor rate protection & digital invoicing",
      "Build your workshop's verified review reputation"
    ],
    accentColor: "amber"
  },
  {
    id: "parts-dealers",
    title: "Auto Parts Dealers",
    category: "SUPPLY NETWORK",
    icon: Package,
    pitch: "Connect with motorists actively searching for authentic OEM spare parts and certified components across Kenya.",
    benefits: [
      "Direct requests from motorists & repair garages",
      "List verified OEM inventory with digital serial tagging",
      "Fast payout escrow settlement system"
    ],
    accentColor: "teal"
  },
  {
    id: "dealers-manufacturers",
    title: "Vehicle Dealers & Manufacturers",
    category: "ENTERPRISE & FLEETS",
    icon: Building2,
    pitch: "Reach motorists, mechanics, and dealers while maintaining your fleet's Digital DNA record from day one.",
    benefits: [
      "Maintain lifetime Digital DNA service records",
      "Direct access to 400,000+ active registered motorists",
      "Automated warranty & compliance tracking"
    ],
    accentColor: "gold"
  }
];

export default function BecomePartner() {
  const [selectedPartner, setSelectedPartner] = useState<PartnerType | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", businessName: "" });

  const handleOpenModal = (partner: PartnerType) => {
    setSelectedPartner(partner);
    setSubmitted(false);
    setFormData({ name: "", phone: "", email: "", businessName: "" });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSelectedPartner(null);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <section id="become-partner" className="relative py-20 bg-[#0c0e12] text-white border-t border-b border-gray-800/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/5 blur-[130px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 translate-y-1/2 w-[600px] h-[350px] bg-teal-500/5 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-whitegold font-bold uppercase tracking-widest bg-whitegold/10 border border-whitegold/30 px-4 py-1.5 rounded-full inline-flex items-center space-x-2 mb-4 backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-whitegold animate-pulse" />
            <span>BECOME A PARTNER</span>
          </span>
          <h2 className="font-serif font-medium text-3xl sm:text-5xl tracking-tight text-white mt-2">
            Grow Your Business with mCarFix
          </h2>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 via-whitegold to-teal-400 mx-auto mt-4 rounded-full" />
          <p className="font-sans text-gray-300 mt-5 leading-relaxed font-light text-base sm:text-lg">
            Founded in Nairobi in 2019, mCarFix connects over 400,000+ registered users with certified workshops, parts distributors, and automotive dealers across Kenya.
          </p>
        </div>

        {/* 3 Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {PARTNER_TYPES.map((partner, index) => {
            const IconComp = partner.icon;

            const isAmber = partner.accentColor === "amber";
            const isTeal = partner.accentColor === "teal";

            const borderHover = isAmber 
              ? "hover:border-amber-500/60" 
              : isTeal 
              ? "hover:border-teal-500/60" 
              : "hover:border-whitegold/60";

            const badgeStyle = isAmber 
              ? "bg-amber-500/10 text-amber-400 border-amber-500/30" 
              : isTeal 
              ? "bg-teal-500/10 text-teal-400 border-teal-500/30" 
              : "bg-whitegold/10 text-whitegold border-whitegold/30";

            const iconStyle = isAmber 
              ? "bg-amber-500/15 text-amber-400 border-amber-500/30 group-hover:bg-amber-500 group-hover:text-black" 
              : isTeal 
              ? "bg-teal-500/15 text-teal-400 border-teal-500/30 group-hover:bg-teal-500 group-hover:text-black" 
              : "bg-whitegold/15 text-whitegold border-whitegold/30 group-hover:bg-whitegold group-hover:text-black";

            const buttonStyle = isAmber
              ? "bg-amber-500 hover:bg-amber-400 text-gray-950"
              : isTeal
              ? "bg-teal-500 hover:bg-teal-400 text-gray-950"
              : "bg-whitegold hover:bg-amber-300 text-gray-950";

            return (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white/5 backdrop-blur-xl border border-white/10 ${borderHover} rounded-2xl p-7 flex flex-col justify-between shadow-xl transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden`}
              >
                <div>
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`h-12 w-12 rounded-xl ${iconStyle} border flex items-center justify-center transition-all duration-300 shadow-sm`}>
                      <IconComp className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className={`font-mono text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${badgeStyle}`}>
                      {partner.category}
                    </span>
                  </div>

                  {/* Title & Pitch */}
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-whitegold transition-colors leading-snug mb-3">
                    {partner.title}
                  </h3>
                  <p className="font-sans text-gray-300 text-sm font-light leading-relaxed mb-6">
                    {partner.pitch}
                  </p>

                  {/* Bullet Benefits */}
                  <div className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                    {partner.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2.5 text-xs text-gray-300 font-light">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${isAmber ? "text-amber-400" : isTeal ? "text-teal-400" : "text-whitegold"}`} />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleOpenModal(partner)}
                  className={`w-full py-3 px-5 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 shadow-md cursor-pointer ${buttonStyle}`}
                >
                  <span>Partner With Us</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Fact Banner Bar */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                Kenya's Premier Automotive Platform
              </h4>
              <p className="font-sans text-xs text-gray-400 font-light mt-0.5">
                Founded 2019 in Nairobi • 400,000+ Registered Motorists • 450+ Verified Garages & Service Hubs
              </p>
            </div>
          </div>
          <a
            href="mailto:partner-ops@mcarfix.co.ke"
            className="text-xs font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider font-semibold underline underline-offset-4 whitespace-nowrap"
          >
            Inquire via Corporate Ops &rarr;
          </a>
        </div>

      </div>

      {/* Partner Registration Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#111419] border border-white/20 rounded-2xl p-6 sm:p-8 max-w-lg w-full relative shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedPartner(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase text-white mb-2">
                    Application Received!
                  </h3>
                  <p className="font-sans text-sm text-gray-300 font-light max-w-sm mx-auto">
                    Thank you for applying to join the mCarFix Partner Network. Our Nairobi onboarding team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-wider">
                      PARTNER ONBOARDING
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl uppercase text-white">
                    Partner with mCarFix
                  </h3>
                  <p className="font-sans text-xs text-gray-400 font-light mt-1 mb-6">
                    Application for: <span className="text-white font-semibold">{selectedPartner.title}</span>
                  </p>

                  <form onSubmit={handleSubmitForm} className="space-y-4">
                    <div>
                      <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                        Business / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Westlands Auto Care Ltd"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Kamau"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+254 7XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div>
                        <label className="block text-2xs font-mono uppercase tracking-wider text-gray-400 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="partner@business.co.ke"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-amber-500 hover:bg-amber-400 text-gray-950 font-display font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>Submit Partner Application</span>
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
