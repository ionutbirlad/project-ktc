export type FieldErrors = Partial<Record<"email" | "password" | "confirmPassword", string>>;

export type AuthState = {
  ok: boolean;
  message?: string;
  formErrors?: string[]; // "global" form errors
  fieldErrors?: FieldErrors; // field specific errors
};
