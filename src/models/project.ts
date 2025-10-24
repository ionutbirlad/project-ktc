import type { Json } from "./json";
import type { Status } from "./status";

export type ProjectVisibility = "public" | "private";

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
  status: Status;
  order_rank?: number | null;
  meta?: Json | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
