/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { X, Calendar, Clock, Car, Trash2, CheckCircle2 } from "lucide-react";
import { BookingRecord } from "./BookingModal";

interface ActiveBookingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onCancelBooking: (id: string) => void;
}

export default function ActiveBookingsPanel({ isOpen, onClose, bookings, onCancelBooking }: ActiveBookingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      
      {/* Container */}
      <div className="relative bg-steel border border-steel-light rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden text-white flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="bg-asphalt px-6 py-4 border-b border-steel/60 flex items-center justify-between">
          <div>
            <span className="font-mono text-3xs text-diagnostic uppercase tracking-widest block font-bold">
              Database Records
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-wider text-white mt-0.5">
              Active Service Reminders ({bookings.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-steel transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* List of Bookings */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          {bookings.length > 0 ? (
            bookings.map((b) => (
              <div
                key={b.id}
                className="bg-asphalt border border-steel-light/10 hover:border-diagnostic/20 rounded-xl p-5 space-y-4 transition-all duration-200"
              >
                {/* Header: ID & Status */}
                <div className="flex justify-between items-center border-b border-steel/40 pb-3">
                  <div className="space-y-0.5">
                    <span className="block text-3xs text-gray-500 uppercase tracking-widest font-mono">Reference Code</span>
                    <span className="font-display text-sm font-bold tracking-widest text-signal uppercase">
                      {b.id}
                    </span>
                  </div>
                  <span className="bg-diagnostic/10 border border-diagnostic/30 text-diagnostic font-mono text-3xs font-bold px-2 py-0.5 rounded tracking-widest">
                    {b.status}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
                  <div className="space-y-1">
                    <span className="block text-3xs text-gray-500 uppercase font-mono tracking-widest">Workshop Bay</span>
                    <span className="text-white font-medium uppercase font-display">{b.garageName}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-3xs text-gray-500 uppercase font-mono tracking-widest">Repair Specialty</span>
                    <span className="text-white font-medium uppercase font-display truncate block max-w-[180px]" title={b.service}>
                      {b.service}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-3xs text-gray-500 uppercase font-mono tracking-widest">Registered Asset</span>
                    <span className="text-gray-300 font-medium">{b.vehicle}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-3xs text-gray-500 uppercase font-mono tracking-widest">Estimated Cost</span>
                    <span className="text-signal font-bold font-mono">{b.cost}</span>
                  </div>
                </div>

                {/* Schedule banner */}
                <div className="bg-steel/60 p-2.5 rounded-lg flex items-center justify-between text-2xs text-gray-300 font-mono">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="h-3.5 w-3.5 text-signal" />
                    <span>{b.date}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-signal" />
                    <span>{b.time}</span>
                  </div>
                </div>

                {/* Cancellation Trigger */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to cancel appointment ${b.id}?`)) {
                        onCancelBooking(b.id);
                      }
                    }}
                    className="text-gray-500 hover:text-warning text-2xs font-mono flex items-center space-x-1 transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Cancel Appointment</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500 space-y-3">
              <span className="text-4xl block">📅</span>
              <h4 className="font-display font-bold text-sm uppercase text-white">No Upcoming Service Reminders</h4>
              <p className="font-sans text-xs text-gray-400 max-w-xs mx-auto leading-normal">
                You do not have any pending workshop reservations. Click "Book now" on any of our verified garages to secure your repair slot.
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="bg-asphalt px-6 py-4 border-t border-steel/60 flex justify-end">
          <button
            onClick={onClose}
            className="bg-steel hover:bg-steel-light text-white font-display text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-colors cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}
