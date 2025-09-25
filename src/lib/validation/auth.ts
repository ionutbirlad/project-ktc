import { z } from "zod";

const emailSchema = z.string().trim().toLowerCase().email("Inserisci un'email valida");

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: z
      .string()
      .min(8, "La password deve avere almeno 8 caratteri")
      .max(100, "La password è troppo lunga"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Le password non coincidono",
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Inserisci la password"),
});

// Inferred types
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signUpSchema>;
