"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/section-header";
import { CareerCategories } from "./career-categories";
import { CareerForm } from "./career-form";

export const CAREER_FORM_ID = "career-form";

export function Careers() {
  const [prefillPosition, setPrefillPosition] = useState<string | null>(null);

  const handleApply = (deptTitle: string) => {
    setPrefillPosition(deptTitle);
    document
      .getElementById(CAREER_FORM_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="careers" className="py-20 max-w-7xl mx-auto px-5">
      <SectionHeader
        eyebrow="We Are Hiring"
        title="Join Our Team"
        description="Al-Karim Medical Complex is actively hiring male and female candidates across all 5 departments. Apply today and become part of a growing healthcare institution."
      />

      <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-start">
        <CareerCategories onApply={handleApply} />
        <CareerForm
          formId={CAREER_FORM_ID}
          prefillPosition={prefillPosition}
        />
      </div>
    </section>
  );
}
