"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/form-field";
import { AppointmentDateTimePicker } from "@/components/appointment-date-time-picker";
import { SuccessPanel } from "@/components/success-panel";
import { departments } from "@/lib/site-data";
import { appointmentSchema, type AppointmentValues } from "@/lib/schemas";
import { openWhatsApp } from "@/lib/whatsapp";

const DEFAULTS: AppointmentValues = {
  name: "",
  phone: "",
  dept: "",
  date: "",
  message: "",
};

export function AppointmentForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: DEFAULTS,
  });

  const onSubmit = handleSubmit((values) => {
    openWhatsApp("Appointment Request — Al-Karim Medical Complex", {
      Name: values.name,
      Phone: values.phone,
      Department: values.dept,
      "Preferred Date & Time": values.date ?? "",
      Message: values.message ?? "",
    });
    setSent(true);
  });

  const handleReset = () => {
    reset(DEFAULTS);
    setSent(false);
  };

  return (
    <div className="flex flex-col overflow-hidden bg-white border-0 outline-none shadow-none ring-0">
      <div className="bg-primary px-6 py-5">
        <h3 className="font-black text-white text-base">Book an Appointment</h3>
        <p className="text-white/70 text-xs mt-0.5">
          We will confirm your appointment via WhatsApp
        </p>
      </div>

      {sent ? (
        <SuccessPanel
          title="Request Sent!"
          body="Your appointment request has been sent on WhatsApp. Our team will confirm your booking shortly."
          actionLabel="Book another appointment"
          onReset={handleReset}
        />
      ) : (
        <form onSubmit={onSubmit} noValidate className="border-0 p-6 space-y-4 outline-none">
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField
              label="Full Name *"
              htmlFor="appt-name"
              error={errors.name?.message}
            >
              <Input
                id="appt-name"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </FormField>
            <FormField
              label="Phone / WhatsApp *"
              htmlFor="appt-phone"
              error={errors.phone?.message}
            >
              <Input
                id="appt-phone"
                type="tel"
                placeholder="03XX XXXXXXX"
                aria-invalid={!!errors.phone}
                {...register("phone")}
              />
            </FormField>
          </div>

          <FormField label="Department / Doctor *" error={errors.dept?.message}>
            <Controller
              control={control}
              name="dept"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" aria-label="Select department" aria-invalid={!!errors.dept}>
                    <SelectValue placeholder="— Select department —" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((d) => (
                      <SelectItem key={d.id} value={d.title}>
                        {d.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Preferred Date & Time">
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <AppointmentDateTimePicker
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </FormField>

          <FormField
            label="Describe Your Concern"
            htmlFor="appt-message"
            error={errors.message?.message}
          >
            <Textarea
              id="appt-message"
              rows={3}
              placeholder="Briefly describe your symptoms or reason for visit..."
              {...register("message")}
            />
          </FormField>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full gap-2"
          >
            <Send size={14} />
            Send via WhatsApp
          </Button>
          <p className="text-center text-muted-foreground text-[11px]">
            You will be redirected to WhatsApp to confirm your appointment.
          </p>
        </form>
      )}
    </div>
  );
}
