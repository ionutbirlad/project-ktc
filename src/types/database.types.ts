export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      experience_projects: {
        Row: {
          created_at: string
          experience_id: number
          project_id: number
        }
        Insert: {
          created_at?: string
          experience_id: number
          project_id: number
        }
        Update: {
          created_at?: string
          experience_id?: number
          project_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "experience_projects_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          achievements: Json | null
          company_name: string
          created_at: string
          deleted_at: string | null
          employment_type: Database["public"]["Enums"]["employment_type"] | null
          end_date: string | null
          id: number
          location: string | null
          meta: Json | null
          order_rank: number
          role_title: string
          start_date: string
          status: Database["public"]["Enums"]["status"]
          summary: string | null
          updated_at: string
        }
        Insert: {
          achievements?: Json | null
          company_name: string
          created_at?: string
          deleted_at?: string | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          end_date?: string | null
          id?: number
          location?: string | null
          meta?: Json | null
          order_rank?: number
          role_title: string
          start_date: string
          status?: Database["public"]["Enums"]["status"]
          summary?: string | null
          updated_at?: string
        }
        Update: {
          achievements?: Json | null
          company_name?: string
          created_at?: string
          deleted_at?: string | null
          employment_type?:
            | Database["public"]["Enums"]["employment_type"]
            | null
          end_date?: string | null
          id?: number
          location?: string | null
          meta?: Json | null
          order_rank?: number
          role_title?: string
          start_date?: string
          status?: Database["public"]["Enums"]["status"]
          summary?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt: string | null
          blurhash: string | null
          caption: string | null
          created_at: string
          credit: string | null
          focal_x: number | null
          focal_y: number | null
          height: number | null
          id: number
          kind: Database["public"]["Enums"]["media_kind"]
          mime: string | null
          owner_id: number
          owner_type: Database["public"]["Enums"]["media_owner_type"]
          size_bytes: number | null
          storage_path: string
          width: number | null
        }
        Insert: {
          alt?: string | null
          blurhash?: string | null
          caption?: string | null
          created_at?: string
          credit?: string | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          kind?: Database["public"]["Enums"]["media_kind"]
          mime?: string | null
          owner_id: number
          owner_type: Database["public"]["Enums"]["media_owner_type"]
          size_bytes?: number | null
          storage_path: string
          width?: number | null
        }
        Update: {
          alt?: string | null
          blurhash?: string | null
          caption?: string | null
          created_at?: string
          credit?: string | null
          focal_x?: number | null
          focal_y?: number | null
          height?: number | null
          id?: number
          kind?: Database["public"]["Enums"]["media_kind"]
          mime?: string | null
          owner_id?: number
          owner_type?: Database["public"]["Enums"]["media_owner_type"]
          size_bytes?: number | null
          storage_path?: string
          width?: number | null
        }
        Relationships: []
      }
      project_skills: {
        Row: {
          created_at: string
          project_id: number
          skill_id: number
          weight: number
        }
        Insert: {
          created_at?: string
          project_id: number
          skill_id: number
          weight?: number
        }
        Update: {
          created_at?: string
          project_id?: number
          skill_id?: number
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_skills_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          deleted_at: string | null
          description: string | null
          end_date: string | null
          id: number
          live_url: string | null
          meta: Json | null
          order_rank: number
          repo_url: string | null
          slug: string
          start_date: string | null
          status: Database["public"]["Enums"]["status"]
          summary: string | null
          title: string
          updated_at: string
          visibility: Database["public"]["Enums"]["visibility"]
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          live_url?: string | null
          meta?: Json | null
          order_rank?: number
          repo_url?: string | null
          slug: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["status"]
          summary?: string | null
          title: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility"]
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          live_url?: string | null
          meta?: Json | null
          order_rank?: number
          repo_url?: string | null
          slug?: string
          start_date?: string | null
          status?: Database["public"]["Enums"]["status"]
          summary?: string | null
          title?: string
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility"]
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: Database["public"]["Enums"]["skill_category"] | null
          created_at: string
          deleted_at: string | null
          description: string | null
          id: number
          level: Database["public"]["Enums"]["skill_level"] | null
          meta: Json | null
          name: string
          order_rank: number
          slug: string
          status: Database["public"]["Enums"]["status"]
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["skill_category"] | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          level?: Database["public"]["Enums"]["skill_level"] | null
          meta?: Json | null
          name: string
          order_rank?: number
          slug: string
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["skill_category"] | null
          created_at?: string
          deleted_at?: string | null
          description?: string | null
          id?: number
          level?: Database["public"]["Enums"]["skill_level"] | null
          meta?: Json | null
          name?: string
          order_rank?: number
          slug?: string
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      employment_type:
        | "full_time"
        | "part_time"
        | "freelance"
        | "contract"
        | "internship"
        | "temporary"
      media_kind: "cover" | "gallery" | "icon" | "other"
      media_owner_type: "project" | "experience" | "skill"
      skill_category:
        | "frontend"
        | "backend"
        | "devops"
        | "data"
        | "soft"
        | "other"
      skill_level: "beginner" | "intermediate" | "advanced" | "expert"
      status: "draft" | "published" | "archived"
      visibility: "public" | "private"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      employment_type: [
        "full_time",
        "part_time",
        "freelance",
        "contract",
        "internship",
        "temporary",
      ],
      media_kind: ["cover", "gallery", "icon", "other"],
      media_owner_type: ["project", "experience", "skill"],
      skill_category: [
        "frontend",
        "backend",
        "devops",
        "data",
        "soft",
        "other",
      ],
      skill_level: ["beginner", "intermediate", "advanced", "expert"],
      status: ["draft", "published", "archived"],
      visibility: ["public", "private"],
    },
  },
} as const

