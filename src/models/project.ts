import type { Json } from "./json";

export type ProjectVisibility = "public" | "private";
export type ProjectStatus = "draft" | "published" | "archived";

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  repo_url?: string | null;
  live_url?: string | null;
  visibility: ProjectVisibility;
  status: ProjectStatus;
  order_rank?: number | null;
  meta?: Json | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
