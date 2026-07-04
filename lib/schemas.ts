import { z } from "zod";

const phoneRegex = /^[0-9+()\s-]{7,20}$/;

export const appointmentSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  dept: z.string().min(1, "Please pick a department"),
  date: z.string().optional().default(""),
  message: z.string().max(500, "Keep it under 500 characters").optional().default(""),
});

export type AppointmentValues = z.infer<typeof appointmentSchema>;

export const careerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  position: z.string().min(1, "Please pick a position"),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Please select gender" }),
  }),
  experience: z.string().optional().default(""),
  message: z.string().max(500, "Keep it under 500 characters").optional().default(""),
});

export type CareerValues = z.infer<typeof careerSchema>;
