import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeUp } from "@/components/motion-fade";
import { SectionHeader } from "@/components/section-header";
import { leadership } from "@/lib/site-data";

export function Leadership() {
  return (
    <section id="leadership" className="bg-[#F5F5F7] py-20">
      <div className="max-w-7xl mx-auto px-5">
        <SectionHeader
          eyebrow="Leadership"
          title="Our Leadership Team"
          description="Guided by experience and driven by a shared vision of accessible, dignified healthcare for all."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {leadership.map((person, i) => (
            <FadeUp key={person.name} delay={i * 0.1}>
              <Card className="rounded-sm overflow-hidden hover:border-primary/25 transition-colors p-0 gap-0 h-full">
                <div className="relative aspect-[370/326] bg-white">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-contain object-center"
                  />
                  <Badge className="absolute top-4 right-4 rounded-sm uppercase tracking-wider text-[10px] px-2.5 py-1">
                    {person.title}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-black text-base mb-1.5">{person.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {person.desc}
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
