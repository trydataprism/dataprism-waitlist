import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email must be at least 5 characters")
    .max(254, "Email must be less than 255 characters")
    .toLowerCase()
    .trim(),
});

export const validateEmail = (data: unknown) => {
  return emailSchema.parse(data);
};

export type ValidatedEmailInput = z.infer<typeof emailSchema>;