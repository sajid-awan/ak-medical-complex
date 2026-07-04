import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, IMAGES } from "@/lib/site-data";
import { whatsAppLink } from "@/lib/whatsapp";

export function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#111114] text-white flex flex-col">
      <header className="px-6 py-6 flex justify-center">
        <Image
          src={IMAGES.logo}
          alt="Al-Karim Medical Complex"
          width={658}
          height={235}
          priority
          unoptimized
          className="h-10 w-auto"
        />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-xl w-full text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8">
            <Clock className="size-4 text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">
              Coming Soon
            </span>
          </div>

          <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black leading-[1.1] mb-5">
            Our new website
            <br />
            <span className="text-primary">is on the way.</span>
          </h1>

          <p className="text-white/70 text-base leading-relaxed mb-10">
            Al-Karim Medical Complex is preparing a better online experience.
            For appointments and inquiries, contact us directly on WhatsApp or
            phone.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact on WhatsApp
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href={`tel:+${CONTACT.whatsAppNumber}`}>
                Call {CONTACT.phoneDisplay}
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 text-left sm:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-1">Location</p>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {CONTACT.address.join(" ")}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="flex items-start gap-3">
                <Phone className="size-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold mb-1">Emergency Care</p>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {CONTACT.hours[1]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="px-6 py-6 text-center text-white/50 text-xs border-t border-white/5">
        © {new Date().getFullYear()} Al-Karim Medical Complex, {CONTACT.region}
      </footer>
    </div>
  );
}
