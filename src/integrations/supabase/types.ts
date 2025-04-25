export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      billing_info: {
        Row: {
          created_at: string | null
          id: string
          tax_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          tax_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      carbon_contributions: {
        Row: {
          amount: number
          carbon_offset: number
          contribution_type: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          amount: number
          carbon_offset: number
          contribution_type: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          amount?: number
          carbon_offset?: number
          contribution_type?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      carbon_footprints: {
        Row: {
          battery_emissions: number
          course_id: string
          created_at: string | null
          credits_earned: number
          data_usage_emissions: number
          id: string
          inperson_equivalent: number
          live_online_equivalent: number
          online_emissions: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          battery_emissions: number
          course_id: string
          created_at?: string | null
          credits_earned: number
          data_usage_emissions: number
          id?: string
          inperson_equivalent: number
          live_online_equivalent: number
          online_emissions: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          battery_emissions?: number
          course_id?: string
          created_at?: string | null
          credits_earned?: number
          data_usage_emissions?: number
          id?: string
          inperson_equivalent?: number
          live_online_equivalent?: number
          online_emissions?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      course_token_configs: {
        Row: {
          base_tokens: number
          course_id: string
          created_at: string | null
          creator_id: string
          high_score_threshold: number
          id: string
          min_score_percentage: number
          performance_bonus_tokens: number
          updated_at: string | null
        }
        Insert: {
          base_tokens: number
          course_id: string
          created_at?: string | null
          creator_id: string
          high_score_threshold: number
          id?: string
          min_score_percentage: number
          performance_bonus_tokens: number
          updated_at?: string | null
        }
        Update: {
          base_tokens?: number
          course_id?: string
          created_at?: string | null
          creator_id?: string
          high_score_threshold?: number
          id?: string
          min_score_percentage?: number
          performance_bonus_tokens?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          aspiration: string | null
          avatar_url: string | null
          birthdate: string | null
          created_at: string
          education: string | null
          first_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          profession: string | null
          social_media: Json | null
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          aspiration?: string | null
          avatar_url?: string | null
          birthdate?: string | null
          created_at?: string
          education?: string | null
          first_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          profession?: string | null
          social_media?: Json | null
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          aspiration?: string | null
          avatar_url?: string | null
          birthdate?: string | null
          created_at?: string
          education?: string | null
          first_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          profession?: string | null
          social_media?: Json | null
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      token_earnings_rules: {
        Row: {
          achievement_type: string
          conditions: Json | null
          course_id: string
          created_at: string | null
          created_by: string
          description: string
          id: string
          tokens_awarded: number
        }
        Insert: {
          achievement_type: string
          conditions?: Json | null
          course_id: string
          created_at?: string | null
          created_by: string
          description: string
          id?: string
          tokens_awarded: number
        }
        Update: {
          achievement_type?: string
          conditions?: Json | null
          course_id?: string
          created_at?: string | null
          created_by?: string
          description?: string
          id?: string
          tokens_awarded?: number
        }
        Relationships: []
      }
      token_issuances: {
        Row: {
          achievement_type: string
          assessment_score: number | null
          course_id: string
          id: string
          issued_at: string | null
          tokens_earned: number
          user_id: string
        }
        Insert: {
          achievement_type: string
          assessment_score?: number | null
          course_id: string
          id?: string
          issued_at?: string | null
          tokens_earned: number
          user_id: string
        }
        Update: {
          achievement_type?: string
          assessment_score?: number | null
          course_id?: string
          id?: string
          issued_at?: string | null
          tokens_earned?: number
          user_id?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: string
          invoice_number: string | null
          payment_method: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_number?: string | null
          payment_method?: string | null
          status: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: string
          invoice_number?: string | null
          payment_method?: string | null
          status?: string
          user_id?: string
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
      user_type: "learner" | "creator" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_type: ["learner", "creator", "admin"],
    },
  },
} as const
