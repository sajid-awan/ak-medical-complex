import Image from "next/image";
import { Clock, MapPin, Phone } from "lucide-react";
import { FadeUp } from "@/components/motion-fade";
import { CONTACT, IMAGES } from "@/lib/site-data";
import { whatsAppLink } from "@/lib/whatsapp";
import { AppointmentForm } from "./appointment-form";

export function Contact() {
  return (
    <section id="contact" className="bg-[#111114] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <FadeUp delay={0.15}>
            <AppointmentForm />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div>
      <FadeUp delay={0.05} y={16}>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-primary" />
          <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
            Visit Us
          </span>
        </div>
      </FadeUp>

      <FadeUp delay={0.15}>
        <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
          Book an Appointment<br />or Visit Anytime
        </h2>
      </FadeUp>

      <FadeUp delay={0.25}>
        <p className="text-white/70 mb-10 text-sm leading-relaxed max-w-sm">
          Our team is available around the clock for appointments, inquiries,
          and emergency services.
        </p>
      </FadeUp>

      <div className="space-y-6 mb-10">
        <FadeUp delay={0.35}>
          <ContactItem icon={MapPin} label="Address">
            {CONTACT.address.map((line, i) => (
              <span key={i}>
                {line}
                {i < CONTACT.address.length - 1 && <br />}
              </span>
            ))}
          </ContactItem>
        </FadeUp>

        <FadeUp delay={0.45}>
          <ContactItem icon={Phone} label="WhatsApp & Phone">
            <a
              href={whatsAppLink}
              className="text-primary font-black text-xl hover:text-red-400 transition-colors"
            >
              {CONTACT.phoneDisplay}
            </a>
          </ContactItem>
        </FadeUp>

        <FadeUp delay={0.55}>
          <ContactItem icon={Clock} label="Working Hours">
            {CONTACT.hours.map((line, i) => (
              <span key={i}>
                {line}
                {i < CONTACT.hours.length - 1 && <br />}
              </span>
            ))}
          </ContactItem>
        </FadeUp>
      </div>

      <FadeUp delay={0.65}>
        <div className="relative border border-white/10 rounded-sm overflow-hidden h-52 bg-white/5">
          <Image
            src={IMAGES.hospitalCorridor}
            alt="Al-Karim Medical Complex building exterior"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </FadeUp>
    </div>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-primary/20 flex items-center justify-center rounded-sm flex-shrink-0">
        <Icon size={16} className="text-primary" />
      </div>
      <div>
        <div className="text-white font-bold text-sm mb-1">{label}</div>
        <div className="text-white/70 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
