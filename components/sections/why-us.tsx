import { Card, CardContent } from "@/components/ui/card";
import { FadeUp } from "@/components/motion-fade";
import { SectionHeader } from "@/components/section-header";
import { reasons } from "@/lib/site-data";

export function WhyUs() {
  return (
    <section id="services" className="bg-[#F5F5F7] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <SectionHeader eyebrow="Why Al-Karim" title="Care You Can Trust" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.08}>
              <Card className="rounded-sm hover:border-primary/25 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-sm mb-5">
                    <r.icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-black text-base mb-2">{r.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {r.desc}
                  </p>
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
