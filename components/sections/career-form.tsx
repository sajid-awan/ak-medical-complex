"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/form-field";
import { CvUploadDropzone } from "@/components/cv-upload-dropzone";
import { FadeUp } from "@/components/motion-fade";
import { SuccessPanel } from "@/components/success-panel";
import { departments } from "@/lib/site-data";
import { careerSchema, type CareerValues } from "@/lib/schemas";
import { openWhatsApp } from "@/lib/whatsapp";

const DEFAULTS = {
  name: "",
  phone: "",
  position: "",
  gender: "Male" as const,
  experience: "",
  message: "",
  cv: undefined,
};

const EXPERIENCE_OPTIONS = [
  "Fresh / No Experience",
  "Less than 1 year",
  "1 – 3 years",
  "3 – 5 years",
  "5+ years",
] as const;

type Props = {
  formId: string;
  prefillPosition: string | null;
};

export function CareerForm({ formId, prefillPosition }: Props) {
  const [sent, setSent] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CareerValues>({
    resolver: zodResolver(careerSchema),
    defaultValues: DEFAULTS,
  });

  useEffect(() => {
    if (prefillPosition) {
      setValue("position", prefillPosition, { shouldValidate: true });
    }
  }, [prefillPosition, setValue]);

  const onSubmit = handleSubmit((values) => {
    openWhatsApp("Job Application — Al-Karim Medical Complex", {
      Name: values.name,
      Phone: values.phone,
      Position: values.position,
      Gender: values.gender,
      Experience: values.experience ?? "",
      Message: values.message ?? "",
      CV: values.cv.name,
    });
    setSent(true);
  });

  const handleReset = () => {
    reset(DEFAULTS);
    setSent(false);
  };

  return (
    <FadeUp delay={0.15} className="sticky top-20">
      <Card id={formId} className="rounded-sm overflow-hidden p-0 gap-0">
        <div className="bg-[#111114] px-6 py-5">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase size={16} className="text-primary" />
            <h3 className="font-black text-white text-base">Apply Now</h3>
          </div>
          <p className="text-white/70 text-xs">
            Submit your application via WhatsApp
          </p>
        </div>

        {sent ? (
          <SuccessPanel
            title="Application Sent!"
            body="Your WhatsApp application has been opened. Our HR team will be in touch shortly."
            actionLabel="Submit another application"
            onReset={handleReset}
          />
        ) : (
          <form onSubmit={onSubmit} noValidate className="p-6 space-y-4">
            <FormField
              label="Full Name *"
              htmlFor="career-name"
              error={errors.name?.message}
            >
              <Input
                id="career-name"
                placeholder="Muhammad Ali"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </FormField>

            <FormField
              label="Phone / WhatsApp *"
              htmlFor="career-phone"
              error={errors.phone?.message}
            >
              <Input
                id="career-phone"
                type="tel"
                placeholder="03XX XXXXXXX"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </FormField>

            <FormField
              label="Applying For *"
              error={errors.position?.message}
            >
              <Controller
                control={control}
                name="position"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={!!errors.position}
                    >
                      <SelectValue placeholder="— Select a position —" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectGroup key={dept.id}>
                          <SelectLabel>{dept.title}</SelectLabel>
                          {dept.specialties.map((spec) => (
                            <SelectItem
                              key={spec}
                              value={`${dept.title} — ${spec}`}
                            >
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>

            <div className="grid grid-cols-2 gap-3">
              <FormField label="Gender *" error={errors.gender?.message}>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.gender}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>

              <FormField label="Experience">
                <Controller
                  control={control}
                  name="experience"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormField>
            </div>

            <FormField
              label="Additional Message"
              htmlFor="career-message"
              error={errors.message?.message}
            >
              <Textarea
                id="career-message"
                rows={3}
                placeholder="Tell us about your qualifications..."
                {...register("message")}
              />
            </FormField>

            <FormField
              label="Upload CV *"
              htmlFor="career-cv"
              error={errors.cv?.message as string | undefined}
            >
              <Controller
                control={control}
                name="cv"
                render={({ field }) => (
                  <CvUploadDropzone
                    id="career-cv"
                    value={field.value}
                    onChange={field.onChange}
                    aria-invalid={!!errors.cv}
                  />
                )}
              />
            </FormField>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              <Send size={14} />
              Send Application on WhatsApp
            </Button>
            <p className="text-center text-muted-foreground text-[11px]">
              You will be redirected to WhatsApp — please attach your CV file in
              the chat before sending.
            </p>
          </form>
        )}
      </Card>
    </FadeUp>
  );
}
