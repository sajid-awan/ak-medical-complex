import { z } from "zod";

const phoneRegex = /^[0-9+()\s-]{7,20}$/;

export const CV_ACCEPT = ".pdf,.doc,.docx";
export const CV_MAX_BYTES = 5 * 1024 * 1024;
const CV_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function isAllowedCvFile(file: File) {
  return (
    CV_MIME_TYPES.has(file.type) || /\.(pdf|doc|docx)$/i.test(file.name)
  );
}

const cvSchema = z
  .custom<File>((value) => value instanceof File, {
    message: "Please upload your CV",
  })
  .refine((file) => isAllowedCvFile(file), "Upload PDF, DOC, or DOCX")
  .refine((file) => file.size <= CV_MAX_BYTES, "CV must be under 5MB");

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
  cv: cvSchema,
});

export type CareerValues = z.infer<typeof careerSchema>;
