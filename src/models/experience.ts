import { Json } from "./json";

export type EmploymentType =
  | "full_time"
  | "part_time"
  | "freelance"
  | "contract"
  | "internship"
  | "temporary";
export type ExperienceStatus = "draft" | "published" | "archived";

export interface Experience {
  id: string;
  company_name: string;
  role_title: string;
  location?: string | null;
  employment_type: EmploymentType;
  start_date?: string | null;
  end_date?: string | null;
  summary?: string | null;
  achievements?: Json | null;
  status: ExperienceStatus;
  order_rank?: number | null;
  meta?: Json | null;
  created_at: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}
