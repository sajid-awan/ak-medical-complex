import type { LucideIcon } from "lucide-react";
import {
  Heart, Stethoscope, FlaskConical, ClipboardList, Users,
  Clock, Shield, Award, UserCheck,
} from "lucide-react";

export type Department = {
  id: number;
  title: string;
  icon: LucideIcon;
  desc: string;
  specialties: string[];
};

export type Reason = { icon: LucideIcon; title: string; desc: string };
export type Leader = {
  initials: string;
  name: string;
  title: string;
  desc: string;
  image: string;
};
export type Perk = { icon: LucideIcon; text: string };

export const CONTACT = {
  whatsAppNumber: "923097728107",
  phoneDisplay: "0309 7728 107",
  address: [
    "Al-Karim Center, Near Khalid Book Depot,",
    "Main Bazar Minchinabad, Bahawalnahar",
  ],
  hours: [
    "OPD: 8:00 AM – 10:00 PM (Daily)",
    "Emergency / Casualty: 24 hours",
  ],
  region: "Minchinabad · Bahawalnahar",
} as const;

export const NAV_LINKS = [
  { href: "#departments", label: "Departments" },
  { href: "#services", label: "Services" },
  { href: "#careers", label: "Careers" },
  { href: "#leadership", label: "Leadership" },
  { href: "#contact", label: "Contact" },
] as const;

export const HERO_STATS = [
  { value: "5+", label: "Departments" },
  { value: "24/7", label: "Emergency" },
  { value: "12+", label: "Specialists" },
  { value: "100%", label: "Patient Focus" },
] as const;

export const departments: Department[] = [
  {
    id: 1,
    title: "Medical & Specialist Doctors",
    icon: Stethoscope,
    desc: "Board-certified physicians and specialists covering a full spectrum of internal and surgical medicine.",
    specialties: [
      "General Physician / MO", "Cardiologist", "Diabetologist",
      "Gastroenterologist", "Pulmonologist", "Gynecologist / Obstetrician",
      "Pediatrician", "General Surgeon", "Orthopedic Surgeon",
      "Anesthetist", "ENT Specialist", "Medical Officer — Casualty / ER",
    ],
  },
  {
    id: 2,
    title: "Nursing & Allied Health",
    icon: Heart,
    desc: "A dedicated nursing workforce providing continuous patient monitoring and bedside care.",
    specialties: [
      "Staff Nurses — M/F", "LHV — Lady Health Visitor", "Midwife",
      "OT Technicians — M/F", "ER / Triage Nurses — M/F",
    ],
  },
  {
    id: 3,
    title: "Pharmacy & Laboratory",
    icon: FlaskConical,
    desc: "On-site diagnostic and dispensing services for rapid, accurate results and medications.",
    specialties: [
      "Category-A Pharmacist", "Assistant Pharmacist — M/F", "Pharmacy Store Keeper",
      "Lab Technicians — M/F", "X-Ray Technician", "Phlebotomist — M/F",
    ],
  },
  {
    id: 4,
    title: "Administration & Front Office",
    icon: ClipboardList,
    desc: "Streamlined patient registration, billing, and records management to make every visit smooth.",
    specialties: [
      "Hospital Administrator", "Office / HR Manager",
      "Front Desk / Receptionist — M/F", "Billing / Accounts Clerk",
      "IT / Records Assistant",
    ],
  },
  {
    id: 5,
    title: "Support & Facility Staff",
    icon: Users,
    desc: "The backbone of daily operations — keeping our facility clean, safe, and fully operational.",
    specialties: [
      "Ward Boys / Compounders — M/F", "Housekeeping / Cleaning — M/F",
      "Ambulance Driver", "Security Guards", "Kitchen / Catering Staff — M/F",
      "General Helpers / Naib Qasid",
    ],
  },
];

export const reasons: Reason[] = [
  { icon: Stethoscope, title: "12+ Medical Specialists", desc: "Qualified consultants across medicine, surgery, gynecology, pediatrics, and more." },
  { icon: Clock, title: "24 / 7 Emergency", desc: "Round-the-clock casualty and ER services with trained triage nurses always on duty." },
  { icon: Shield, title: "Safe & Hygienic", desc: "Strict hospital-grade hygiene protocols maintained across all wards and OT suites." },
  { icon: Award, title: "Affordable Care", desc: "High-quality treatment accessible to all socioeconomic backgrounds without compromise." },
];

export const leadership: Leader[] = [
  {
    initials: "AK",
    name: "Haji Abdul Karim Mughal",
    title: "Chairman",
    desc: "Visionary founder committed to bringing world-class healthcare to Minchinabad and the wider Bahawalnahar region.",
    image: "/imports/abdul-karim.png",
  },
  {
    initials: "SI",
    name: "Shaikh Intisar ul Haq Shami",
    title: "Chief Executive Officer",
    desc: "Leading Al-Karim Medical Complex with a mission to deliver compassionate, affordable, and advanced medical care.",
    image: "/imports/intesar-ul-haq.png",
  },
];

export const serviceStrip = [
  "Emergency Care 24/7", "Specialist OPD", "Laboratory & Diagnostics",
  "In-House Pharmacy", "Maternity & OT Services", "Ambulance Available",
];

export const perks: Perk[] = [
  { icon: Shield, text: "Competitive salary package" },
  { icon: UserCheck, text: "Professional growth & training" },
  { icon: Heart, text: "Supportive work environment" },
  { icon: Award, text: "Equal opportunity employer" },
];

export const IMAGES = {
  heroFacility: "/imports/hero.png",
  hospitalCorridor: "/imports/footer-image.png",
  logo: "/imports/Al-karim-logo.svg",
} as const;
