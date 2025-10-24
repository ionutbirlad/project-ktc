import { Json } from "./json";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type SkillCategory = "frontend" | "backend" | "devops" | "data" | "soft" | "other";
export type SkillStatus = "draft" | "published" | "archived";

export interface Skill {
  id: string;
  name: string;
  slug: string;
  level?: SkillLevel | null;
  category?: SkillCategory | null;
  description?: string | null;
  order_rank: number;
  status: SkillStatus;
  meta?: Json | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
