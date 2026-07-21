/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import garageApex from "./assets/images/garage_westlands_clean_1784611758216.jpg";
import garageKilimani from "./assets/images/garage_kilimani_clean_1784611775397.jpg";
import garageExperts from "./assets/images/garage_experts_clean_1784611791738.jpg";
import garageKaren from "./assets/images/garage_karen_clean_1784611809462.jpg";

import avatarJane from "./assets/images/avatar_jane_nairobi_clean_1784612247770.jpg";
import avatarBrian from "./assets/images/avatar_brian_nairobi_clean_1784612265183.jpg";
import avatarDennis from "./assets/images/avatar_dennis_nairobi_clean_1784612280990.jpg";
import avatarMercy from "./assets/images/avatar_mercy_nairobi_clean_1784612297408.jpg";

export interface Garage {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  services: string[];
  phone: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  vehicle: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "general-mechanics",
    title: "General Mechanics",
    description: "Engine tune-ups, oil change, brake adjustments, and general mechanical repairs",
    iconName: "Wrench",
  },
  {
    id: "roadside-assistance",
    title: "Roadside Assistance",
    description: "24/7 emergency response for dead batteries, flat tires, and running out of fuel",
    iconName: "ShieldAlert",
  },
  {
    id: "professional-towing",
    title: "Professional Towing",
    description: "Safe flatbed towing of broken down or accident vehicles to your preferred garage",
    iconName: "Truck",
  },
  {
    id: "computer-diagnostics",
    title: "Computer Diagnostics",
    description: "Advanced OBD-II scanning to trace electrical faults and check engine warnings",
    iconName: "Cpu",
  },
  {
    id: "genuine-spare-parts",
    title: "Genuine Spare Parts",
    description: "Verified dealers offering original OEM parts with manufacturer warranty",
    iconName: "Settings",
  },
  {
    id: "tyre-battery-center",
    title: "Tyre & Battery Center",
    description: "Wheel alignment, tyre balancing, battery replacement, and pressure checks",
    iconName: "Disc",
  },
  {
    id: "premium-car-wash",
    title: "Premium Car Wash",
    description: "Thorough interior and exterior auto-detailing, vacuuming, and body waxing",
    iconName: "Sparkles",
  },
  {
    id: "motor-insurance",
    title: "Motor Insurance",
    description: "Compare comprehensive policies and process instant certificates",
    iconName: "FileCheck",
  },
];

export const MOCK_GARAGES: Garage[] = [
  {
    id: "g1",
    name: "Apex Auto Care Westlands",
    location: "Westlands, Nairobi",
    rating: 4.9,
    reviews: 184,
    verified: true,
    services: ["General Mechanics", "Computer Diagnostics", "Tyre & Battery Center"],
    phone: "+254 711 000184",
    image: garageApex,
  },
  {
    id: "g2",
    name: "Kilimani Elite Garages",
    location: "Kilimani, Nairobi",
    rating: 4.8,
    reviews: 142,
    verified: true,
    services: ["General Mechanics", "Computer Diagnostics", "Genuine Spare Parts"],
    phone: "+254 722 000142",
    image: garageKilimani,
  },
  {
    id: "g3",
    name: "Nairobi Auto Experts",
    location: "Mombasa Road, Nairobi",
    rating: 4.7,
    reviews: 310,
    verified: true,
    services: ["Professional Towing", "General Mechanics", "Premium Car Wash"],
    phone: "+254 733 000310",
    image: garageExperts,
  },
  {
    id: "g4",
    name: "Karen Luxury Autos",
    location: "Karen, Nairobi",
    rating: 4.9,
    reviews: 89,
    verified: true,
    services: ["Computer Diagnostics", "Genuine Spare Parts", "Motor Insurance"],
    phone: "+254 744 000089",
    image: garageKaren,
  },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Jane Wambui",
    location: "Kileleshwa, Nairobi",
    vehicle: "Toyota RAV4 (2018)",
    rating: 5,
    quote: "The diagnostics scan was unbelievably accurate. I knew exactly what was wrong before getting to the garage. Saved me KES 15,000 in unnecessary repairs!",
    avatar: avatarJane,
  },
  {
    id: "t2",
    name: "Brian Kiprop",
    location: "Eldoret / Westlands",
    vehicle: "Subaru Forester (2016)",
    rating: 5,
    quote: "Stranded on Mombasa Rd at 11 PM with a dead battery. Used the Emergency SOS, and roadside assistance arrived in 12 minutes flat. Life-saving service!",
    avatar: avatarBrian,
  },
  {
    id: "t3",
    name: "Dennis Ochieng",
    location: "Langata, Nairobi",
    vehicle: "Mazda CX-5 (2017)",
    rating: 5,
    quote: "Superb transparency. I got an upfront estimate of KES 5,500 for my brake pads, booked a verified garage, and paid exactly that amount. No hidden fees.",
    avatar: avatarDennis,
  },
  {
    id: "t4",
    name: "Mercy Cherotich",
    location: "Runda, Nairobi",
    vehicle: "Mercedes-Benz C200 (2019)",
    rating: 5,
    quote: "Finding specialized mechanics for continental cars in Nairobi used to be a gamble. mCarFix connected me with certified pros who solved my complex ECU issue.",
    avatar: avatarMercy,
  },
];
