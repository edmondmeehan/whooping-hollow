export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blocked_dates: {
        Row: {
          created_at: string
          end_date: string
          id: string
          source_id: string | null
          source_name: string
          start_date: string
          summary: string | null
          uid: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          end_date: string
          id?: string
          source_id?: string | null
          source_name?: string
          start_date: string
          summary?: string | null
          uid?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          end_date?: string
          id?: string
          source_id?: string | null
          source_name?: string
          start_date?: string
          summary?: string | null
          uid?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_dates_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "calendar_sources"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_requests: {
        Row: {
          adults: number
          check_in: string
          check_out: string
          children: number | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          phone: string
          property: string
          special_requests: string | null
          status: string | null
        }
        Insert: {
          adults: number
          check_in: string
          check_out: string
          children?: number | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          phone: string
          property: string
          special_requests?: string | null
          status?: string | null
        }
        Update: {
          adults?: number
          check_in?: string
          check_out?: string
          children?: number | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone?: string
          property?: string
          special_requests?: string | null
          status?: string | null
        }
        Relationships: []
      }
      calendar_sources: {
        Row: {
          created_at: string
          ical_url: string | null
          id: string
          is_active: boolean
          last_error: string | null
          last_synced_at: string | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          ical_url?: string | null
          id?: string
          is_active?: boolean
          last_error?: string | null
          last_synced_at?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          ical_url?: string | null
          id?: string
          is_active?: boolean
          last_error?: string | null
          last_synced_at?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      external_service_links: {
        Row: {
          created_at: string
          description: string
          id: string
          name: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          name: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          name?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      guest_reviews: {
        Row: {
          body: string
          created_at: string
          guest_name: string
          id: string
          is_approved: boolean
          rating: number
          stay_id: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          body: string
          created_at?: string
          guest_name: string
          id?: string
          is_approved?: boolean
          rating: number
          stay_id?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          body?: string
          created_at?: string
          guest_name?: string
          id?: string
          is_approved?: boolean
          rating?: number
          stay_id?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guest_reviews_stay_id_fkey"
            columns: ["stay_id"]
            isOneToOne: false
            referencedRelation: "stays"
            referencedColumns: ["id"]
          },
        ]
      }
      home_systems: {
        Row: {
          access: string | null
          created_at: string
          id: string
          notes: string | null
          system: string
          updated_at: string
        }
        Insert: {
          access?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          system: string
          updated_at?: string
        }
        Update: {
          access?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          system?: string
          updated_at?: string
        }
        Relationships: []
      }
      house_services_directory: {
        Row: {
          company: string
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          notes: string | null
          phone: string | null
          service: string
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          company: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          service: string
          status: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          company?: string
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          notes?: string | null
          phone?: string | null
          service?: string
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      property_images: {
        Row: {
          alt: string
          created_at: string
          id: number
          url: string
        }
        Insert: {
          alt: string
          created_at?: string
          id?: number
          url: string
        }
        Update: {
          alt?: string
          created_at?: string
          id?: number
          url?: string
        }
        Relationships: []
      }
      stays: {
        Row: {
          check_in: string
          check_out: string
          created_at: string
          guest_email: string
          guest_name: string
          id: string
          notes: string | null
          review_email_error: string | null
          review_email_sent_at: string | null
          review_token: string
          updated_at: string
        }
        Insert: {
          check_in: string
          check_out: string
          created_at?: string
          guest_email: string
          guest_name: string
          id?: string
          notes?: string | null
          review_email_error?: string | null
          review_email_sent_at?: string | null
          review_token?: string
          updated_at?: string
        }
        Update: {
          check_in?: string
          check_out?: string
          created_at?: string
          guest_email?: string
          guest_name?: string
          id?: string
          notes?: string | null
          review_email_error?: string | null
          review_email_sent_at?: string | null
          review_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_stay_for_review: {
        Args: { _token: string }
        Returns: {
          already_reviewed: boolean
          check_out: string
          guest_name: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      submit_guest_review: {
        Args: { _body: string; _rating: number; _title: string; _token: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
