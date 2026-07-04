import { ChevronRight } from "lucide-react";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/motion-fade";
import { departments, perks } from "@/lib/site-data";

type Props = {
  onApply: (departmentTitle: string) => void;
};

export function CareerCategories({ onApply }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-6">
        {perks.map((p, i) => (
          <FadeUp key={p.text} delay={i * 0.06} y={12}>
            <Badge
              variant="outline"
              className="gap-1.5 rounded-full text-xs font-semibold px-3 py-1.5 bg-secondary/40 text-foreground/70"
            >
              <p.icon size={11} className="text-primary" />
              {p.text}
            </Badge>
          </FadeUp>
        ))}
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {departments.map((dept, di) => (
          <FadeUp key={dept.id} delay={di * 0.08}>
            <AccordionItem
              value={`career-${dept.id}`}
              className="border border- overflow-hidden hover:border-primary/25 transition-colors"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline">
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded-sm flex-shrink-0">
                    <dept.icon size={15} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm">{dept.title}</div>
                    <div className="text-muted-foreground text-xs mt-0.5 font-normal">
                      {dept.specialties.length} open positions
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t border-border px-5 py-4 bg-secondary/20">
                <div className="grid sm:grid-cols-2 gap-1.5">
                  {dept.specialties.map((spec) => (
                    <div
                      key={spec}
                      className="flex items-center gap-2 text-sm text-foreground/70 py-1"
                    >
                      <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {spec}
                    </div>
                  ))}
                </div>
                <Button
                  variant="link"
                  onClick={() => onApply(dept.title)}
                  className="mt-4 px-0 h-auto text-primary text-xs font-bold"
                >
                  Apply for this department <ChevronRight size={12} />
                </Button>
              </AccordionContent>
            </AccordionItem>
          </FadeUp>
        ))}
      </Accordion>
    </div>
  );
}
