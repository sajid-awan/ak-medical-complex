import Image from "next/image";
import { Activity, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeUp } from "@/components/motion-fade";
import { CONTACT, HERO_STATS, IMAGES } from "@/lib/site-data";

export function Hero() {
  return (
    <section className="pt-16 min-h-[100svh] grid md:grid-cols-[1fr_1fr] lg:grid-cols-[55%_45%]">
      <div className="bg-[#111114] flex flex-col justify-center px-8 lg:px-16 py-20 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/2 left-0 right-0 opacity-5 pointer-events-none"
        >
          <Activity
            size={320}
            strokeWidth={0.5}
            className="text-white w-full"
          />
        </div>

        <div className="relative z-10">
          <FadeUp delay={0.05} y={16}>
            <div className="flex items-center gap-2.5 mb-7">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
                {CONTACT.region}
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] font-black text-white leading-[1.1] mb-6">
              Comprehensive<br />Healthcare<br />
              <span className="text-primary">You Deserve.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-white/70 text-base leading-relaxed mb-10 max-w-md">
              Al-Karim Medical Complex delivers specialist care across five
              departments — bringing advanced medicine to every family in
              Minchinabad and beyond.
            </p>
          </FadeUp>

          <FadeUp delay={0.45}>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#departments" className="flex items-center gap-2">
                  Our Departments <ChevronRight size={15} />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white bg-transparent hover:bg-white/5 hover:text-white"
              >
                <a href="#contact">Book Appointment</a>
              </Button>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 gap-3 mt-10 md:hidden">
            {HERO_STATS.map((stat, i) => (
              <FadeUp key={stat.label} delay={0.6 + i * 0.08}>
                <div className="border border-white/10 px-4 py-3 rounded-sm">
                  <div className="text-2xl font-black text-primary">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-xs font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      <FadeIn
        className="hidden md:block relative bg-gray-200 overflow-hidden"
        duration={0.9}
        delay={0.15}
      >
        <Image
          src={IMAGES.heroFacility}
          alt="Al-Karim Medical Complex facility"
          fill
          sizes="(min-width: 1024px) 45vw, 50vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#111114]/40 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-6 right-6 grid grid-cols-2 gap-2.5">
          {HERO_STATS.map((stat, i) => (
            <FadeUp key={stat.label} delay={0.5 + i * 0.1}>
              <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-sm border border-white/30">
                <div className="text-2xl font-black text-primary leading-none">
                  {stat.value}
                </div>
                <div className="text-foreground/60 text-xs font-semibold mt-1 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
