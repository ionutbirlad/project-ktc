import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.email({ message: "Inserisci un'email valida" }),
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

// Inferred types
export type SignUpInput = z.infer<typeof signUpSchema>;
