import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { FadeUp } from "@/components/motion-fade";
import { SectionHeader } from "@/components/section-header";
import { departments } from "@/lib/site-data";

export function Departments() {
  return (
    <section id="departments" className="py-20 max-w-7xl mx-auto px-5">
      <SectionHeader
        eyebrow="Medical Departments"
        title="Five Centres of Excellence"
        description="From specialist consultations to diagnostics and support — comprehensive healthcare under one roof."
      />

      <Tabs defaultValue={`dept-${departments[0].id}`}>
        <TabsList className="flex w-full h-auto bg-transparent p-0 border-b border-border rounded-none overflow-x-auto hide-scrollbar justify-start">
          {departments.map((d) => (
            <TabsTrigger
              key={d.id}
              value={`dept-${d.id}`}
              className="flex items-center gap-2 px-4 py-3.5 text-xs font-bold whitespace-nowrap border-b-2 border-transparent rounded-none data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground flex-shrink-0"
            >
              <d.icon size={13} />
              <span className="hidden sm:inline">{d.title}</span>
              <span className="sm:hidden">Dept {d.id}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {departments.map((dept) => (
          <TabsContent key={dept.id} value={`dept-${dept.id}`} className="mt-10">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <FadeUp delay={0.05}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 bg-primary/10 flex items-center justify-center rounded-sm">
                      <dept.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-black">{dept.title}</h3>
                  </div>
                </FadeUp>
                <FadeUp delay={0.15}>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {dept.desc}
                  </p>
                </FadeUp>
                <FadeUp delay={0.25}>
                  <Button asChild>
                    <a href="#contact" className="flex items-center gap-2">
                      Book Appointment <ChevronRight size={14} />
                    </a>
                  </Button>
                </FadeUp>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dept.specialties.map((spec, j) => (
                  <FadeUp key={spec} delay={j * 0.05} y={12}>
                    <div className="flex items-center gap-2.5 py-2.5 px-3 border border- bg-secondary/40 text-sm text-foreground/75 hover:border-primary/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {spec}
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
