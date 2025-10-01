"use client";

import { useEffect, useMemo, useState } from "react";
import type { z } from "zod";

// Estraggo solo le chiavi stringa (ignoro symbol/number keys)
type StringKeys<T> = Extract<keyof T, string>;

// Errori per campo (es. email?: "messaggio")
type FieldErrorsFor<T> = Partial<Record<StringKeys<T>, string>>;

// Stato "touched" per i campi
type TouchedFor<T> = Partial<Record<StringKeys<T>, boolean>>;

// Funzione che mappa ZodError<T> → { fieldErrors }
export type MapZodErrors<T> = (err: z.ZodError<T>) => { fieldErrors: FieldErrorsFor<T> };

// Opzioni aggiuntive dell’hook
export type UseZodValidationOpts<T> = {
  delay?: number;
  serverErrors?: FieldErrorsFor<T>;
  confirmPairs?: ReadonlyArray<readonly [StringKeys<T>, StringKeys<T>]>; // es. [["password","confirmPassword"]]
};

export function useZodValidation<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  values: z.infer<TSchema>,
  mapZodErrors: MapZodErrors<z.infer<TSchema>>,
  opts: UseZodValidationOpts<z.infer<TSchema>> = {}
) {
  type TValues = z.infer<TSchema>;

  const {
    delay = 300,
    serverErrors = {} as FieldErrorsFor<TValues>, // ✅ tipizzato, niente più {}
    confirmPairs = [] as ReadonlyArray<readonly [StringKeys<TValues>, StringKeys<TValues>]>,
  } = opts;

  const [clientErrors, setClientErrors] = useState<FieldErrorsFor<TValues>>({});
  const [touched, setTouched] = useState<TouchedFor<TValues>>({});
  const [isValid, setIsValid] = useState(false);

  // Validazione (debounced)
  useEffect(() => {
    const t = setTimeout(() => {
      const parsed = schema.safeParse(values);
      if (!parsed.success) {
        const { fieldErrors } = mapZodErrors(parsed.error);
        setClientErrors(fieldErrors);
        setIsValid(false);
      } else {
        setClientErrors({});
        setIsValid(true);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [schema, values, delay, mapZodErrors]);

  // Recupera l’errore di un campo rispettando regole touched/server/confirmPairs
  const getFieldError = useMemo(() => {
    return (name: StringKeys<TValues>): string | undefined => {
      const server = serverErrors[name];
      const client = clientErrors[name];

      // Se fa parte di una coppia di conferma
      const pair = confirmPairs.find(([a, b]) => a === name || b === name);
      if (pair) {
        const [a, b] = pair;
        if (!values[a] || !values[b]) {
          return touched[name] ? (client ?? server) : server;
        }
      }

      if (!touched[name]) return server ?? undefined;
      return client ?? server ?? undefined;
    };
  }, [clientErrors, serverErrors, touched, confirmPairs, values]);

  // Marca un campo come "toccato"
  const markTouched = (name: StringKeys<TValues>) => setTouched((t) => ({ ...t, [name]: true }));

  return {
    isValid,
    getFieldError,
    setTouched: markTouched,
    touched,
    clientErrors,
  };
}
