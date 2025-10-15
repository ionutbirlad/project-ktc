import { z } from "zod";

export const GithubStatsQuerySchema = z.object({
  owner: z.string().min(1, "Parametro 'owner' mancante"),
  name: z.string().min(1, "Parametro 'name' mancante"),
  weighted: z.union([z.literal("1"), z.literal("0"), z.undefined()]).transform((v) => v === "1"),
});

export type GithubStatsQuery = z.infer<typeof GithubStatsQuerySchema>;
