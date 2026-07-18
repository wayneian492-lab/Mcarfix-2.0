/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How does the garage booking process work?",
      answer: "Once you find a verified garage (such as Apex Auto Care or Karen Luxury Autos) matching your desired service, click 'Book Appointment'. You'll configure your vehicle class, choose an available date and time slot, and confirm. Your booking is instantly transmitted to the garage's workshop dashboard. We send a SMS reference receipt, and you pay directly at the garage after successful completion of work.",
    },
    {
      question: "Are the cost estimates guaranteed?",
      answer: "Our Cost Estimator calculates prices based on wholesale spare parts values in Nairobi Industrial Area and standardized labor times set by manufacturers. While minor fluctuations (±10%) can occur depending on specific car trims or unforeseen bolt seizures, all partner garages commit to staying within our estimated range. If a garage attempts to overcharge without workshop justifications, report them immediately via your booking dashboard for instant remediation.",
    },
    {
      question: "How are mCarFix partner garages verified?",
      answer: "Every workshop undergoes a physical audit before being verified. We evaluate: 1) Advanced OBD-II diagnostic equipment availability, 2) Mechanic qualifications and certifications, 3) Transparency of billing, and 4) Work safety environments. Currently, only about 30% of applicants pass our strict guidelines to receive the verified partner badge.",
    },
    {
      question: "What are your emergency roadside SOS response times?",
      answer: "Emergency dispatches are coordinated via our network of standby flatbeds and mobile service vans located throughout Nairobi county (Westlands, Mombasa Rd, CBD, Langata, Runda, Thika Rd). Once triggered, our closest vehicle is dispatched. Average dispatch arrival times are 8 to 15 minutes depending on current traffic flows.",
    },
    {
      question: "Can I source my own genuine spare parts?",
      answer: "Yes, you are fully empowered to do so. In the booking card or diagnostics code details, we list standard original equipment manufacturer (OEM) part serial codes. You can source them directly from our certified parts dealers or let the garage source them for you. Any part provided via our network includes a standard 6-month manufacturer warranty.",
    },
  ];

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 text-gray-900 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-signal font-bold uppercase tracking-widest bg-gray-50 border border-gray-200 px-3.5 py-1.5 rounded-full">
            Frequently Asked
          </span>
          <h2 className="font-display font-bold text-3xl tracking-wide uppercase mt-4 text-gray-900">
            Support & Clarity
          </h2>
          <div className="h-1 w-12 bg-signal mx-auto mt-4" />
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-gray-300"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex justify-between items-center space-x-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-display font-bold text-sm sm:text-base uppercase tracking-wide text-gray-900 leading-snug">
                    {faq.question}
                  </span>
                  <div className="bg-gray-100 p-1.5 rounded-full text-gray-500 shrink-0">
                    {isOpen ? <ChevronUp className="h-4 w-4 text-signal" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </button>

                {/* Animated content body */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-60 opacity-100 border-t border-gray-100" : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  <p className="p-5 font-sans text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
