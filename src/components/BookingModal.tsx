/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Calendar, Clock, Car, Phone, User, CheckCircle, HelpCircle, ShieldCheck } from "lucide-react";
import { Garage } from "../types";

export interface BookingRecord {
  id: string;
  garageName: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  cost: string;
  clientName: string;
  clientPhone: string;
  notes?: string;
  status: "CONFIRMED" | "IN_PROGRESS" | "COMPLETED";
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  garage: Garage | null;
  preselectedService?: string;
  preselectedCost?: string;
  onAddBooking: (booking: BookingRecord) => void;
}

export default function BookingModal({ isOpen, onClose, garage, preselectedService, preselectedCost, onAddBooking }: BookingModalProps) {
  // Form states
  const [carMake, setCarMake] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carYear, setCarYear] = React.useState(new Date().getFullYear().toString());
  const [service, setService] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [clientName, setClientName] = React.useState("");
  const [clientPhone, setClientPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");

  // Confirmation state
  const [isConfirmed, setIsConfirmed] = React.useState(false);
  const [receipt, setReceipt] = React.useState<BookingRecord | null>(null);

  // Sync state if modal inputs open with preselected service from Cost Estimator
  React.useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    } else if (garage && garage.services.length > 0) {
      setService(garage.services[0]);
    }
  }, [preselectedService, garage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!carMake || !carModel || !date || !time || !clientName || !clientPhone) {
      alert("Please fill in all required fields.");
      return;
    }

    const estimatedCost = preselectedCost || (garage?.name.includes("Luxury") ? "KES 14,000" : "KES 6,500");
    const refId = `MCF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingRecord = {
      id: refId,
      garageName: garage?.name || "Apex Auto Care Westlands",
      vehicle: `${carMake} ${carModel} (${carYear})`,
      service: service || "General Maintenance Checkup",
      date,
      time,
      cost: estimatedCost,
      clientName,
      clientPhone,
      notes: notes || "Initial checkup booked from mCarFix.",
      status: "CONFIRMED",
    };

    onAddBooking(newBooking);
    setReceipt(newBooking);
    setIsConfirmed(true);
  };

  const resetAndClose = () => {
    setIsConfirmed(false);
    setReceipt(null);
    setCarMake("");
    setCarModel("");
    setService("");
    setDate("");
    setTime("");
    setClientName("");
    setClientPhone("");
    setNotes("");
    onClose();
  };

  const timeSlots = [
    "08:30 AM - 10:30 AM",
    "10:30 AM - 12:30 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative bg-steel border border-steel-light rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-asphalt px-6 py-4 border-b border-steel/60 flex items-center justify-between">
          <div>
            <span className="font-mono text-3xs text-signal uppercase tracking-widest block font-bold">
              Scheduler Node
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mt-0.5">
              {isConfirmed ? "Booking Confirmed" : `Book Appointment`}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-steel transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          
          {isConfirmed && receipt ? (
            /* Booking Receipt / Confirmation UI */
            <div className="text-center space-y-6 animate-fade-in">
              <div className="mx-auto h-12 w-12 bg-diagnostic/20 border border-diagnostic/40 text-diagnostic rounded-full flex items-center justify-center">
                <CheckCircle className="h-7 w-7" />
              </div>

              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-mono uppercase tracking-widest block">
                  TRANSACTION REFERENCE
                </span>
                <span className="font-display text-2xl font-bold tracking-widest text-signal uppercase">
                  {receipt.id}
                </span>
              </div>

              <p className="font-sans text-xs text-gray-300 leading-relaxed max-w-sm mx-auto font-light">
                Your workshop bay is secured. We sent an encrypted booking copy and SMS confirmation to <span className="font-mono font-medium text-white">{receipt.clientPhone}</span>.
              </p>

              {/* Receipt Details Box */}
              <div className="bg-asphalt border border-steel/80 p-5 rounded-xl text-left space-y-3.5">
                <div className="flex justify-between items-center text-xs font-mono border-b border-steel/40 pb-2.5">
                  <span className="text-gray-400">Workshop Terminal:</span>
                  <span className="text-white font-semibold font-display uppercase tracking-wide">
                    {receipt.garageName}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-b border-steel/40 pb-2.5">
                  <span className="text-gray-400">Selected Specialty:</span>
                  <span className="text-white uppercase font-display font-medium text-right truncate max-w-[200px]">
                    {receipt.service}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-b border-steel/40 pb-2.5">
                  <span className="text-gray-400">Scheduled Asset:</span>
                  <span className="text-white">{receipt.vehicle}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono border-b border-steel/40 pb-2.5">
                  <span className="text-gray-400">Scheduled Date:</span>
                  <span className="text-white">{receipt.date} @ {receipt.time}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-diagnostic font-medium">mCarFix Estimated Cost:</span>
                  <span className="text-signal font-bold font-mono">{receipt.cost}</span>
                </div>
              </div>

              {/* Instructions Panel */}
              <div className="bg-steel/40 border border-steel/60 p-4 rounded-lg text-left text-2xs space-y-2 flex items-start space-x-3">
                <ShieldCheck className="h-5 w-5 text-diagnostic shrink-0 mt-0.5" />
                <div className="text-gray-400 leading-relaxed font-light">
                  <span className="font-semibold text-white block uppercase font-mono tracking-wider mb-1">Driver Instructions:</span>
                  Please arrive 10 minutes before your scheduled slot. Present this transaction reference <span className="font-mono font-medium text-white">{receipt.id}</span> at the reception bay. No initial payment is required online.
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={resetAndClose}
                className="w-full bg-signal hover:bg-signal/90 text-asphalt font-display font-bold text-sm uppercase tracking-wider py-4 rounded-xl transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            /* Booking Form UI */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Selected Workshop Display */}
              <div className="bg-asphalt border border-steel-light/20 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="block text-3xs text-gray-500 uppercase tracking-widest font-mono">Selected Garage</span>
                  <span className="text-base font-display font-bold uppercase tracking-wider text-signal mt-1 block">
                    {garage?.name || "Apex Auto Care Westlands"}
                  </span>
                  <span className="text-2xs text-gray-400 font-sans mt-0.5 block">{garage?.location}</span>
                </div>
                <div className="bg-steel/80 border border-steel/50 rounded-lg p-2 font-mono text-center shrink-0">
                  <span className="block text-3xs text-gray-500 uppercase tracking-widest font-bold">REVIEWS</span>
                  <span className="text-sm font-bold text-white">⭐ {garage?.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Vehicle configuration */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                  <Car className="h-3.5 w-3.5 text-signal" />
                  <span>1. Vehicle Information *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Make (e.g. Toyota)"
                      required
                      value={carMake}
                      onChange={(e) => setCarMake(e.target.value)}
                      className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Model (e.g. RAV4)"
                      required
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all"
                    />
                  </div>
                  <div>
                    <select
                      value={carYear}
                      onChange={(e) => setCarYear(e.target.value)}
                      className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all cursor-pointer"
                    >
                      {Array.from({ length: 15 }).map((_, idx) => {
                        const yr = (new Date().getFullYear() - idx).toString();
                        return <option key={yr} value={yr}>{yr}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              {/* Service specialty selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
                  2. Repair Specialty Required *
                </label>
                <select
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-4 py-3 rounded-lg font-sans text-xs outline-none transition-all cursor-pointer"
                >
                  <option value="" disabled>Choose Repair Specialty</option>
                  {garage?.services.map((srv) => (
                    <option key={srv} value={srv}>{srv}</option>
                  ))}
                  <option value="General Diagnostics & Inspection">General Diagnostics & Inspection</option>
                </select>
              </div>

              {/* Date & Time selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                    <Calendar className="h-3.5 w-3.5 text-signal" />
                    <span>3. Available Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all cursor-pointer"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-signal" />
                    <span>4. Time Slot *</span>
                  </label>
                  <select
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Choose Slot</option>
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                    <User className="h-3.5 w-3.5 text-signal" />
                    <span>5. Contact Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all"
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                    <Phone className="h-3.5 w-3.5 text-signal" />
                    <span>6. Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all"
                  />
                </div>
              </div>

              {/* Custom notes or OBD symptoms */}
              <div className="space-y-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 block">
                  7. Diagnostics Symptoms / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="E.g. Check engine light is on code P0101 MAF. Squeaking brakes during stops..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-asphalt border border-steel/80 hover:border-gray-600 focus:border-signal text-white px-3.5 py-2.5 rounded-lg font-sans text-xs outline-none transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-signal hover:bg-signal/90 text-asphalt font-display font-bold text-sm uppercase tracking-wider py-4 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Transmit Booking to Workshop</span>
                </button>
              </div>

              <div className="text-center text-[10px] text-gray-500 font-sans">
                By booking, you agree to mCarFix fair-labor guarantee, authorizing full workshop coordination.
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
